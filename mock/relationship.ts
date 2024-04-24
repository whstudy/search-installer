import { Request, Response } from 'express';
import _ from 'lodash';
import { mock } from 'mockjs';
import { syncJobNameWithJobId } from './alarm';

const sourceStatus = [
  'unauthorized',
  'initiating',
  'pre_fullsync',
  'pending',
  'replicating',
  'replicated',
  'pausing',
  'pausing',
  'paused',
  'canceling',
  'canceling',
  'cancelled',
  'taking_over',
  'disconnected',
  'restoring',
  'running',
  'stopped',
  'error',
];

const targetStatus = [
  'unauthorized',
  'initiating',
  'running',
  'stopped',
  'failover_doing',
  'failover_failed',
  'failover_done',
  'failover_restoring',
  'failover_restore_failed',
  'writing_back',
  'writeback_failed',
  'pending',
  'replicating',
  'replicated',
  'pausing',
  'paused',
  'canceling',
  'cancelled',
  'error',
  'writeback_restoring',
  'writeback_restore_failed',
];

const relationshipStatus = [...sourceStatus, ...targetStatus];
const sourcePairs = mock({
  'items|22': [
    {
      // 基础信息
      'sourceId|+1': 1,
      'targetId|+2': 100,
      source_cluster_name: 'cluster00000000000@sourceId',
      source_cluster_uuid: '@string(32)',
      source_cluster_ip: '255.255.255.255',
      source_dir: '/dir1/',
      source_access_type: 'RW',
      'mirror_cluster_name|1': ['cluster1111111111', 'cluster2'],
      mirror_cluster_uuid: '@string(32)',
      'mirror_addressed_ip|+1': '255.255.255.255',
      mirror_cluster_ip_pool: '1.1.1.1~1.1.1.4',
      mirror_dir: '/dir1/dir2/dir4/dir5/',
      role: 'source',
      policy_name: '@name',
      relationship_uuid: '@string(32)',
      mirror_access_type: 'RO',
      source_reserved_num: 3,
      mirror_reserved_num: 3,
      sync_source_qos: true,
      sync_source_quota: true,
      copy_on_created: true,
      pair_direction: 'source_to_mirror',
      remote_cluster_control_port: 600000,

      // 状态
      'status|+1': sourceStatus,
      // status: 'error',
      consist_point: '2022-07-08 22:10:00',
      snapshot_name: 'za_snapshot_2022-07-28 14:34:56',
      progress: 30,
      next_copy_time: '2022-09-24T11:30:07',
    },
  ],
})?.items;

const targetPairs = mock({
  'items|40': [
    {
      // 基础信息
      'sourceId|+1': 1,
      'targetId|+2': 100,
      has_remote_apply: true,
      source_cluster_name: 'cluster00000000000@sourceId',
      source_cluster_uuid: '@string(32)',
      source_cluster_ip: '255.255.255.255',
      source_dir: '/dir1/',
      source_access_type: 'RO',
      mirror_cluster_name: 'cluster1111111111@targetId',
      mirror_cluster_uuid: '@string(32)',
      mirror_addressed_ip: '255.255.255.255',
      mirror_cluster_ip_pool: '1.1.1.1~1.1.1.4',
      mirror_dir: '/dir1/',
      role: 'mirror',
      policy_name: '@name',
      relationship_uuid: '@string(32)',
      mirror_access_type: 'RW',
      source_reserved_num: 3,
      mirror_reserved_num: 3,
      sync_source_qos: true,
      sync_source_quota: true,
      copy_on_created: true,

      // 状态
      'status|+1': targetStatus,
      // status: 'error',
      consist_point: '2022-07-08 22:10:00',
      snapshot_name: 'za_snapshot_2022-07-28 14:34:56',
      progress: 30,
      next_copy_time: '2022-09-24T11:30:07',
    },
  ],
})?.items;

// 处理pair_direction
targetPairs?.forEach((v) => {
  if (
    [
      'pending',
      'replicating',
      'replicated',
      'paused',
      'cancelled',
      'writeback_restoring',
      'writeback_restore_failed',
    ]?.includes(v?.status)
  ) {
    v.pair_direction = 'mirror_to_source';
  } else {
    if (v?.status === 'error') {
      v.pair_direction = mock({
        'direction|1': ['source_to_mirror', 'mirror_to_source'],
      })?.direction;
    } else {
      v.pair_direction = 'source_to_mirror';
    }
  }
});

const allPairs = [...sourcePairs, ...targetPairs];
// 修整假数据
allPairs?.forEach((v, k, data) => {
  const randomError = k === data?.findIndex((val) => val?.status === 'error'); // 初始化过程中error
  const isBeforeCreateStatus = ['unauthorized', 'pre_fullsync', 'initiating'].includes(v?.status);
  const firstPending = k === data?.findIndex((val) => val?.status === 'pending');
  if (isBeforeCreateStatus || randomError || firstPending) {
    v.consist_point = '';
    v.snapshot_name = '';
  }

  // 手动恢复
  if ('error' === v?.status) {
    v.is_auto_restored = Math.random() > 0.5;
  }

  // 可写状态
  if (
    [
      'writing_back',
      'writeback_failed',
      'replicating',
      'replicated',
      'paused',
      'cancelled',
    ]?.includes(v?.status)
  ) {
    v.mirror_access_type = Math.random() > 0.5 ? 'RW' : 'RO';
  }

  if (['pausing', 'canceling']?.includes(v?.status)) {
    // 增加反向pausing, conceling测试
    v.pair_direction = mock({
      direction: 'source_to_mirror', //['source_to_mirror', 'mirror_to_source'],
    })?.direction;
  }
});
let pairList = {
  items: allPairs,
  // items: [...targetPairs],
  total: allPairs.length,
  preindex: -1,
  sufindex: -1,
};

let messages = mock({
  'items|20': [
    {
      'id|+1': 1,
      relationship_uuid: '@string(32)',
      source_cluster: 'cluster01',
      source_directory: '/file/file2/file3/',
      mirror_cluster: 'cluster122',
      mirror_directory: '/file2/file1/file9/',
      'role|1': ['source', 'mirror'],
      'type|1': ['relationship_deleted', 'relationship_unauthorized', 'relationship_rejected'],
    },
  ],
  total: 20,
  preindex: 1,
  sufindex: 20,
});

// 控制轮询status的请求次数，以便在某个点更改其状态
let statusRequestCount = {};

export default {
  'GET /ui/summary/relationship_status/': (req, res) => {
    res.send({
      code: '0',
      msg: 'get statistic status success',
      data: {
        total: 3,
        enabled_count: 3,
        paused_count: 2,
        unauthorized_count: 1,
      },
    });
  },
  'GET /dsm/relationship/': (req, res) => {
    statusRequestCount = {};
    const { preindex, sufindex } = req.query || {};
    let items: any[] = [];
    if (preindex || sufindex) {
      items = pairList?.items?.slice(preindex ? preindex - 1 : 0, sufindex ?? 0);
    }
    res.send({
      code: '0',
      msg: 'get relationship success',
      data: {
        ...pairList,
        preindex: Number(preindex),
        sufindex: Number(sufindex),
        items,
      },
    });
  },
  'POST /dsm/relationship/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'create pair successfully',
        data: null,
      });
    }, 5000);
  },
  'GET /dsm/relationship/status/': (req, res) => {
    const { relationship_uuids } = req.query || {};
    const uuids = relationship_uuids?.split(',');
    const resStatus = {};
    const resRoles = {};
    const resDirection = {};
    uuids?.forEach((u) => {
      const cs = pairList?.items?.filter((v) => v?.relationship_uuid === u)?.[0];
      resRoles[u] = cs?.role;
      resDirection[u] = cs?.pair_direction;
      if (statusRequestCount[u] === undefined) {
        statusRequestCount[u] = 0;
      } else {
        statusRequestCount[u] += 1;
      }
      if (statusRequestCount[u] >= 5) {
        resStatus[u] =
          relationshipStatus[relationshipStatus?.findIndex((s) => s === cs?.status) + 1];
      } else {
        resStatus[u] = relationshipStatus[relationshipStatus?.findIndex((s) => s === cs?.status)];
      }
    });

    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: Object.keys(resStatus)?.map((st) => {
          let recoveryPoint = '';
          let snapName = '';
          if (!['pre_fullsync', 'unauthorized', 'initiating']?.includes(resStatus?.[st])) {
            recoveryPoint = '2022-07-08 22:10:00';
            snapName = 'za_snapshot_2022-07-28 14:34:56';
          }
          return {
            status: resStatus?.[st],
            relationship_uuid: st,
            progress: 20,
            next_copy_time: '2022-09-24T11:30:07',
            start_time: new Date('2022-07-28 20:40:56'),
            end_time: new Date('2022-07-28 22:40:56'),
            estimated_seconds: 6709,
            average_bandwidth: 2056,
            bandwidth: 636,
            pair_direction: resDirection?.[st],
            consist_point: recoveryPoint,
            snapshot_name: snapName,
            role: resRoles?.[st],
            written_data: {
              file_num: 100,
              size_byte: 0,
            },
            deleted_data: {
              file_num: 0,
              size_byte: 0,
            },
            unchanged_data: {
              file_num: 100,
              size_byte: 1240,
            },
            changed_data: {
              file_num: 100,
              size_byte: 1240,
            },
            remaining_data: {
              file_num: 100,
              size_byte: 1240,
            },
          };
        }),
      });
    }, 4000);
  },
  'GET /dsm/relationship/messages/': (req, res) => {
    // messages.items = messages?.items?.slice(0, messages?.items?.length - 1);
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'success',
        data: messages,
      });
    }, 3000);
  },
  'GET /dsm/relationship/capability/': (req, res) => {
    res.send({
      code: '0',
      msg: '创建能力不足',
      data: {
        relationship_creation: true,
      },
    });
  },
  'GET /dsm/relationship/get_mgmt_ip/': (req, res) => {
    res.send({
      code: '0',
      msg: 'get mgnt ip successfully',
      data: {
        pair_direction: 'source',
        vip: '1.1.1.1',
      },
    });
  },
  'POST /dsm/relationship/start/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList?.items?.forEach((v) => {
      if (v?.relationship_uuid === relationship_uuid) {
        statusRequestCount[relationship_uuid] = 0;
        v.status = v?.status === 'cancelled' ? 'replicated' : 'replicating';
      }
    });

    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/relationship/pause/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList?.items?.forEach((v) => {
      if (v?.relationship_uuid === relationship_uuid) {
        statusRequestCount[relationship_uuid] = 0;
        v.status = v?.status === 'replicating' ? 'paused' : 'cancelled';
      }
    });
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: { job_id: Number(syncJobNameWithJobId?.PauseReplication) },
      });
    }, 2000);
  },
  'POST /dsm/relationship/reject/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: {
          job_id: Number(syncJobNameWithJobId?.repReject) || 12321321321,
        },
      });
    }, 2000);
  },
  'POST /dsm/relationship/authorize/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList?.items?.forEach((v) => {
      if (v?.relationship_uuid === relationship_uuid) {
        statusRequestCount[relationship_uuid] = 0;
        v.status = 'initiating';
      }
    });
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: {
          job_id: 333333333333333333,
        },
      });
    }, 2000);
  },
  'POST /dsm/relationship/abort_replication/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList?.items?.forEach((v) => {
      if (v?.relationship_uuid === relationship_uuid) {
        statusRequestCount[relationship_uuid] = 0;
        v.status = 'cancelled';
      }
    });
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: { job_id: Number(syncJobNameWithJobId?.AbortReplication) },
      });
    }, 2000);
  },
  'POST /dsm/relationship/delete/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList.items = pairList?.items?.filter((v) => v?.relationship_uuid !== relationship_uuid);
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/relationship/start_replication': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    pairList?.items?.forEach((v) => {
      if (v?.relationship_uuid === relationship_uuid) {
        statusRequestCount[relationship_uuid] = 0;
        v.status = 'replicating';
      }
    });
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/relationship/create/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/relationship/modify/': (req, res) => {
    const { relationship_uuid } = req?.body || {};
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    if (index !== -1) {
      pairList.items[index] = {
        ...pairList.items?.[index],
        ...req?.body,
      };
    }

    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 1000);
  },
  'POST /dsm/relationship/confirm_message/': (req, res) => {
    setTimeout(() => {
      const { message_id } = req.body || {};
      messages.items = messages?.items?.filter((v) => v?.id !== message_id);
      messages.total--;
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/relationship/set_permission/': (req, res) => {
    const { relationship_uuid, permission } = req?.body;
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    pairList.items[index].mirror_access_type = permission;
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'set permission successfully',
        data: null,
      });
    }, 5000);
  },
  'POST /dsm/relationship/failover/': (req, res) => {
    const { relationship_uuid } = req?.body;
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    if (index != -1 && pairList.items) {
      pairList.items[index].status = 'failover_doing';
    }
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'failover successfully',
        data: {
          job_id: Number(syncJobNameWithJobId?.StartFailOver),
        },
      });
    }, 5000);
  },
  'POST /dsm/relationship/restore/': (req, res) => {
    const { relationship_uuid } = req?.body;
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    if (index != -1 && pairList.items) {
      pairList.items[index].status = 'running';
    }
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'restore successfully',
        data: {
          job_id: Number(syncJobNameWithJobId?.StartRestore),
        },
      });
    }, 5000);
  },
  'POST /dsm/relationship/writeback/': (req, res) => {
    const { relationship_uuid } = req?.body;
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    if (index !== -1 && pairList.items) {
      pairList.items[index].status = 'writing_back';
    }
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'writeback successfully',
        data: {
          job_id: Number(syncJobNameWithJobId?.StartWriteBack),
        },
      });
    }, 5000);
  },
  'POST /dsm/relationship/writeback_restore/': (req, res) => {
    const { relationship_uuid } = req?.body;
    const index = pairList?.items?.findIndex((v) => v?.relationship_uuid === relationship_uuid);
    if (index !== -1 && pairList.items) {
      pairList.items[index].status = 'running';
    }
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'writeback restore successfully',
        data: {
          job_id: Number(syncJobNameWithJobId?.StartWriteBackRestore),
        },
      });
    }, 5000);
  },
  'POST /dsm/relationship/manual_repair/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'repair successfully',
        data: null,
      });
    }, 5000);
  },
  'POST /dsm/remote_apply/modify_share_name/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'modify_share_name successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/remote_apply/modify_user/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'modify_user successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/remote_apply/modify_group/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'modify_group successfully!',
        data: null,
      });
    }, 2000);
  },
  'POST /dsm/remote_apply/': (req, res) => {
    setTimeout(() => {
      res.send(
        {
          code: 'e0432432rew',
          msg: 'modify_group failed!',
          data: null,
        },
        // {
        //   code: '0',
        //   msg: 'modify_group success!',
        //   data: null,
        // }
      );
    }, 2000);
  },
  'GET /dsm/remote_apply/check/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        data: {
          config_file: {
            cifs: {
              share_name: 'war',
              target_infos: [
                {
                  user_id: 4003,
                  user_name: 'tom',
                  passwd: 'passw0rd!',
                  group_id: 4001,
                  group_name: 'police',
                  rights: 'read-write',
                  target_name: 'tom',
                  target_type: 'CerUser',
                },
                {
                  group_id: 4001,
                  group_name: 'police',
                  rights: 'read-write',
                  target_name: 'police',
                  target_type: 'CerGroup',
                },
              ],
            },
            nfs: {
              share_name: 'nfs_1662344099363',
              target_infos: {
                netgroup: [
                  {
                    advance: 'standard',
                    rights: 'read-write',
                    squash: 'all_squash',
                    target_name: 'ow6nfs',
                    target_type: 'netgroup',
                  },
                ],
                host: [
                  {
                    advance: 'standard',
                    rights: 'read-write',
                    squash: 'all_squash',
                    target_name: 'ow6nfs',
                    target_type: 'host',
                  },
                ],
              },
            },
            ftp: {
              target_infos: [
                {
                  rights: 'file_list;create_dir;upload_file;download_file;del_file;rename',
                  user_id: 4002,
                  user_name: 'yezi',
                  group_id: 4001,
                  group_name: 'police',
                  passwd: '119390Yz$&',
                },
              ],
            },
          },
          err_data: [
            {
              uniq_name: 'cifs_group_4001',
              group_id: 4002,
              group_name: 'toufu',
              tip: 'name',
              conflict_type: 'group',
              current_info: {
                group_id: 4002,
                group_name: 'douxian',
              },
            },
            {
              uniq_name: 'cifs_group_4001',
              group_id: 4002,
              group_name: 'tom',
              tip: 'id',
              conflict_type: 'group',
              current_info: {
                group_id: 4003,
                group_name: 'tom',
              },
            },
            {
              uniq_name: 'cifs_user_4003',
              user_id: 4002,
              user_name: 'tom',
              group_name: 'police',
              tip: 'name',
              conflict_type: 'user',
              current_info: {
                user_id: 4002,
                user_name: 'jerry',
              },
            },
            {
              uniq_name: 'cifs_user_4003',
              user_id: 4003,
              user_name: 'tom',
              group_name: 'police',
              tip: 'id',
              conflict_type: 'user',
              current_info: {
                user_id: 4006,
                user_name: 'tom',
              },
            },
            {
              share_name: 'war',
              tip: 'name',
              conflict_type: 'share',
            },
          ],
        },
        msg: 'check shared directory config file successfully',
      });
    }, 3000);
  },
};
