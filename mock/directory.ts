import { Request, Response } from 'express';
import Mock from 'mockjs';
import moment from 'moment';
import dirData from './dir';

function getParentIds(paths) {
  const pids = [];
  const pDatas = [];
  if (!paths?.length) {
    return { pDatas: dirData, pids: [0] };
  } else {
    paths.map((p) => {
      dirData.map((d) => {
        if (p === d.dir_name) {
          pids.push(d?.id);
          pDatas.push(d);
          return;
        }
      });
    });
  }
  return { pids, pDatas };
}

function getChildren(pid) {
  let list = [];
  dirData.map((ele) => {
    if (pid === ele?.father_id) {
      list.push(ele);
    }
  });
  return list;
}

function getFullPath(items, id) {
  let fPath = '';
  items.map((t) => {
    if (t?.id == id) {
      fPath = getFullPath(items, t?.father_id);
      fPath += '/' + t?.dir_name;
      return;
    }
  });
  return fPath;
}

function getFullPath1(dir: API.querydir): string {
  const linkSymbol = dir?.father_path?.slice(-1) === '/' ? '' : '/';
  const dirName = dir?.dir_name?.slice(-1) === '/' ? dir?.dir_name : dir?.dir_name + '/';
  return `${dir?.father_path}${linkSymbol}${dirName}`;
}

dirData.map((ele) => {
  ele.full_path = getFullPath1(ele);
});

const shareIds = [];
for (let i = 1; i < 25; i++) {
  shareIds.push(i);
}

// 获取分类数据
const shareDirData = dirData?.filter((ele) => ele?.share_protocol);
const cifsData = dirData?.filter((ele) => ele?.share_protocol?.includes('cifs'));
const nfsData = dirData?.filter((ele) => ele?.share_protocol?.includes('nfs'));
const ftpData = dirData?.filter((ele) => ele?.share_protocol?.includes('ftp'));
const snapshootData = dirData?.filter((ele) => ele?.snapshoot_num);
const quotaData = dirData?.filter((ele) => ele?.capa_quota !== null || ele?.file_quota !== null);
const thresholdData = dirData
  ?.filter((ele) => ele?.thresholdType)
  ?.map((ele) => {
    ele.type = ele.thresholdType;
    return ele;
  });
const relationshipData = dirData?.map((ele: any) => {
  const newEle = { ...ele };
  newEle.relationship_count = Math.round(Math.random());
  return newEle;
});

function sleep(seconds, callback) {
  setTimeout(() => {
    // console.log(`延迟${seconds}s`);
    callback();
  }, seconds * 1000);
}

function getScheduledSnapPolicy(req, res) {
  sleep(2, () =>
    res.send({
      data: Mock.mock({
        // snap_policy_info:null,
        snap_policy_info: {
          snap_policy_name: 'policy1',
          'mode|1': ['cron', 'interval'],
          rules: [
            {
              mode: 'cron',
              rule: {
                week: [1, 2, 3, 4, 5], // (指定时间: week每周/天)
                day: -1, // (指定时间: day每月 第一天:1 ,最后一天：-1, 其他（2-27)
                hour: 10,
                minute: 20,
                second: 183720, // (指定时间: 时间点)
              },
            },
          ],
          snap_expire_time: 70,
          resource_scope_bucket: 1,
          snap_expire_time_unit: 'day',
          // 'snap_expire_time_unit|1': ['hour', 'day' , 'month', 'year'],
          snap_policy_enabled: true,
        },
        // 'is_replication_target_dir|1':true,
        is_replication_target_dir: false,
        is_restore_on_path_enabled: false,
        is_relationship_on_path_used: false,
      }),
      code: '0',
      msg: 'success',
    }),
  );
}

function modifyScheduledSnapPolicy(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'modify Scheduled Snap Policy successful',
      data: '',
    }),
  );
}

function deleteScheduledSnapPolicy(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'delete Scheduled Snap Policy successful',
      data: '',
    }),
  );
}

export default {
  'GET /dsm/dir/': (req: Request, res: Response) => {
    let list = dirData;
    let { filters } = req.query || {};
    let parent_path;
    if (req.query?.parent_path) {
      parent_path = req.query.parent_path;
    } else {
      parent_path = '/';
    }
    if (parent_path) {
      parent_path = parent_path.slice(-1) === '/' ? parent_path.slice(0, -1) : parent_path;
      parent_path = parent_path.slice(0, 1) !== '/' ? '/' + parent_path : parent_path;
      list = list.filter((d) => d?.father_path === parent_path);
    }

    if (filters) {
      filters = JSON.parse(filters);
      if ('dir_name' in filters) {
        list = list.filter(
          (d) => d?.father_path === parent_path && d?.dir_name === filters?.dir_name,
        );
      }
    } else if (req.query?.keyword) {
      const { keyword } = req.query;
      if (keyword) {
        list = list.filter((d) => d?.dir_name?.indexOf(keyword) !== -1);
      }
    }

    let resData = list;
    if (!filters && req.query?.preindex && req.query?.sufindex) {
      const { preindex, sufindex } = req.query;
      resData = list.slice(Number(preindex) - 1, Number(sufindex));
    }

    resData = resData?.map((v) => {
      return {
        ...v,
        performance_pool: 'performance_pool',
        terra_tier_enabled: true,
        placement_policy: 'placement_policy',
        migration_policy: 'migration_policy',
      };
    });
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: {
          items: resData?.map((v) => ({
            ...v,
            data_pool: v?.storage_pool,
          })),
          total: list.length,
          files_count: Math.round(Math.random() * 12 * 10),
          preindex: req.query?.preindex || 1,
          sufindex: req.query?.sufindex || 1,
          share_count: 23,
        },
        msg: 'Query dir successed',
      }),
    );
  },
  'GET /dsm/dir/check': (req, res) => {
    const { path } = req.query || {};
    let existed = false;
    if (path === '/') {
      existed = true;
    } else {
      existed = !!dirData.filter(
        (d) => d?.full_path === (path.slice(-1) === '/' ? path : `${path}/`),
      )?.length;
      console.log(existed);
    }

    res.send({
      code: '0',
      data: { existed },
      msg: 'check dir successed',
    });
  },
  'GET /dsm/dir/get_dir_detail/': (req: Request, res: Response) => {
    let detail = {};
    const { full_path } = req.query || {};
    if (full_path) {
      detail = dirData.filter(
        (d) => getFullPath1(d) === (full_path.slice(-1) === '/' ? full_path : `${full_path}/`),
      )?.[0];
      // 模仿实际接口返回
      if (!detail) {
        let dirName = '',
          fatherPath = '';
        if (full_path.includes('/')) {
          const pathArr = full_path.split('/');
          if (full_path.slice(-1) === '/') {
            dirName = pathArr?.[pathArr.length - 2];
            fatherPath = pathArr.slice(0, pathArr.length - 2).join('/');
          } else {
            dirName = pathArr?.[pathArr.length - 1];
            fatherPath = pathArr.slice(0, pathArr.length - 1).join('/');
          }
        } else {
          dirName = full_path;
          fatherPath = '/';
        }
        detail = {
          dir_name: dirName,
          father_path: fatherPath,
          storage_pool: null,
          LastModified: null,
          CreationTime: null,
          capa_quota: null,
          file_quota: null,
          bandwidth_limit: null,
          iops_limit: null,
          rights: ['777', '755', '555', '741', '725', '717', '577', undefined, null, '557']?.[
            Math.floor(Math.random() * 10)
          ],
          share_protocol: [],
          snapshoot_num: 0,
        };
      }
    }

    res.send({
      code: '0',
      data: detail,
      msg: 'Query dir detail successed',
    });
  },
  'GET /ui/summary/dir_summary/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        share_count: shareDirData?.length,
        cifs_count: cifsData?.length,
        nfs_count: nfsData?.length,
        ftp_count: ftpData?.length,
        snap_count: snapshootData?.length,
        quota_count: quotaData?.length,
        qos_count: 0,
        capacity_threshold: 80,
        files_threshold: 80,
        relationship_count: 20,
        terra_tier_count: 3,
      },
      msg: 'Query dir summary successed',
    });
  },
  'GET /dsm/dir/get_summary/': (req: Request, res: Response) => {
    let list: any[] = [];
    const { share_type } = req.query || {};
    const map = {
      snap: snapshootData,
      share: shareDirData,
      quota: quotaData,
      qos: [],
      threshold: thresholdData,
      cifs: cifsData,
      nfs: nfsData,
      ftp: ftpData,
      relationship: relationshipData,
      terraTier: dirData,
    };
    if ('snapshot' in req.query) {
      list = map.snap;
    } else if (Number(share_type) === 0) {
      list = map.share;
    } else if (Number(share_type) === 1) {
      list = map.cifs;
      list?.map((ele) => {
        ele.share_name = 'cifs_' + new Date().getTime();
      });
    } else if (Number(share_type) === 2) {
      list = map.nfs;
    } else if (Number(share_type) === 3) {
      list = map.ftp;
    } else if ('quota' in req.query) {
      list = map.quota;
    } else if ('qos' in req.query) {
      list = map.qos;
    } else if ('alert' in req.query) {
      list = map.threshold;
    } else if ('relationship' in req.query) {
      list = map.relationship;
    } else if ('terra_tier' in req.query) {
      list = map.terraTier;
    }
    const { preindex, sufindex } = req.query || {};
    let items = list;
    if (preindex && sufindex) {
      items = list?.slice(Number(preindex), Number(sufindex));
    }
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: {
          items: items,
          total: list.length,
          preindex: 1,
          sufindex: 1,
        },
        msg: 'Query summary successed',
      }),
    );
  },
  'GET /dsm/dir/get_quota_info/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        file_used: null,
        capacity_used: null,
        quota_capacity: null,
        quota_files: null,
        capacity_threshold: 80,
        files_threshold: 80,
      },
      msg: 'Query quota info successed',
    });
  },
  'GET /dsm/dir/tier_capability/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {},
      msg: 'Query tier_capability successed',
    });
  },
  'GET /dsm/share/': (req: Request, res: Response) => {
    let dir: any;
    const { share_path, snap_name } = req.query || {};
    // 查询目录共享，来自造的数据
    if (share_path) {
      const path = share_path.slice(-1) === '/' ? share_path : `${share_path}/`;
      dir = dirData.filter((ele) => path === getFullPath1(ele))?.[0];
    }
    const shareProtocol = dir?.share_protocol;
    const data: any = {
      cifs_path: ['\\\\1.1.1.1\\share1'],
      nfs_path: [
        '1.1.1.1: /share',
        '2.2.2.2: /share',
        '3.3.3.3: /share',
        '4.4.4.4: /share',
        '5.5.5.5: /share',
      ],
    };
    if (shareProtocol?.includes('cifs')) {
      data.cifs = 11;
      data.cifs_share_name = `share_${snap_name ? snap_name : dir?.dir_name}`;
    } else if (shareProtocol?.includes('nfs')) {
      data.nfs = 1;
    }

    // 测试快照共享
    // data.cifs = 100;
    // data.cifs_share_name = `share_${snap_name ?? dir?.dir_name}`;

    res.send({
      code: '0',
      data: data,
      msg: 'Query share successed',
    });
  },
  'GET /dsm/share/ftp/query/': (req: Request, res: Response) => {
    let shareProtocol: any = [];
    if (req.query.parent_path && req.query.dir_name) {
      const { parent_path, dir_name } = req.query;
      shareProtocol = dirData.filter((ele) => {
        return parent_path === ele?.father_path && dir_name === ele?.dir_name;
      })?.[0]?.share_protocol;
    }
    let items = [];
    if (shareProtocol?.includes('ftp')) {
      items = Mock.mock({
        'items|20': [
          {
            'id|+1': '@ID',
            user: 'test@id',
            share_path: '/mnt/tfs/dir@id',
            rights: 'file_list;create_dir;upload_file;download_file;delete_file;rename',
            // rights: ['LIST,NLST', 'MKD', 'STOR', 'RETR', 'RMD,DELE', 'RNFR,RNTO'],
            dir_name: 'dir@id',
            create_at: '2021-07-04T19:29:31',
            updated_at: '2021-07-04T19:29:31',
          },
        ],
      })?.items;
    }
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: {
          items: items,
          total: items?.length,
          preindex: 1,
          sufindex: 1,
        },
        msg: 'Query ftp successed',
      }),
    );
  },
  'GET /dsm/dir_qos/get_one_qos/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        result: {
          is_it_set: true,
          is_it_layer: 1,
          bandwidth_limit: 10485760,
          iops_limit: 104,
          dir_ino: 144115188075855900,
        },
      },
      msg: 'Query qos successed',
    });
  },
  'GET /dsm/dir_qos/perf/': (req: Request, res: Response) => {
    const bandwidth = Mock.mock({
      'data|80': [
        {
          bandwidth: '@integer(1048576, 20485760)', // 同入参monitor_item
          // bandwidth: '@integer(100, 800)',
          // mean: '@integer(100, 800)',
          // client_num: 2,
          'time|+10': Math.floor(new Date().getTime() / 1000),
        },
      ],
    })?.data;
    bandwidth.map((ele) => {
      ele.time = moment(ele?.time * 1000).format('YYYY-MM-DD HH:mm:ss');
    });
    const iops = Mock.mock({
      'data|450': [
        {
          'iops|+3': 2,
          // iops: '@integer(100, 800)',
          // mean: '@integer(100, 800)',
          // client_num: 1,
          'time|+10': Math.floor(new Date().getTime() / 1000),
        },
      ],
    })?.data;
    iops.map((ele) => {
      ele.time = moment(ele?.time * 1000).format('YYYY-MM-DD HH:mm:ss');
    });

    const client_num = Mock.mock({
      'data|450': [
        {
          client_num: 2,
          mean: '@integer(100, 800)',
          'time|+10': Math.floor(new Date().getTime() / 1000),
        },
      ],
    })?.data;
    res.send({
      code: '0',
      data: {
        bandwidth,
        iops: iops,
        length: 100,
        client_num,
      },
      msg: 'Query qos perf successed',
    });
  },
  'POST /dsm/dir/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: { job_id: 1231232323213213 },
      msg: 'create dir successed',
    });
  },
  'POST /dsm/dir/modify/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: null,
      msg: 'modify dir successed',
    });
  },
  'POST /dsm/share/ftp/create_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'create ftp successed',
      }),
    );
  },
  'POST /dsm/share/modify_nfsv3_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'modify nfs successed',
      }),
    );
  },
  'POST /dsm/dir/setquota/': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        data: {
          dir_name: '321',
          parent_path: '/',
        },
        msg: 'set qos successfully',
      });
    }, 2000);
  },
  'POST /dsm/dir/delete/': (req: Request, res: Response) => {
    res.send({ code: '0', data: {}, msg: 'Directory deleted successfully' });
  },
  'POST /dsm/dir/snapshot/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: {},
        msg: 'delete dir successful!',
      }),
    );
  },
  'POST /dsm/dir/delete_snapshot/': (req: Request, res: Response) => {
    res.send({ code: '0', data: {}, msg: 'DeleteDirSnapshot successful!' });
  },
  'GET /dsm/dir/snapshot/': (req: Request, res: Response) => {
    const data = Mock.mock({
      'items|16': [
        {
          snapshot_id: '@id',
          inode_id: '@id',
          create_time: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
          size: '@integer(10000, 400000)',
          snap_name: '@NAME',
          'role|1': ['target', 'source'],
          describe: '@string(5, 20)',
          'is_share|1': [true, false],
          initial_path: '/test/',
          'share_capability|1': [true, false],
          'mode|1': ['replicated', 'others'],
        },
      ],
    })?.items;
    const { preindex, sufindex } = req.query || {};
    let items = data;
    if (preindex && sufindex) {
      items = data?.slice(Number(preindex), Number(sufindex));
    }
    res.send({
      code: '0',
      data: {
        modes: ['others', 'replicated', 'timing'],
        items: items,
        total: data?.length,
        preindex: preindex || -1,
        sufindex: sufindex || -1,
      },
      msg: 'delete snapshoot  successed!',
    });
  },
  'GET /dsm/share/cifs/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'items|20': [
          {
            'id|+1': shareIds,
            'userType|1': ['localUser', 'localGroup', 'Ldapuser', 'ldapGroup', 'anonymity'],
            cluster_id: '@id',
            share_name: '@NAME',
            share_path: '@PATH',
            type_name: 'nfs',
            created_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            updated_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
          },
        ],
        total: 20,
        preindex: 1,
        sufindex: 1,
      }),
      msg: 'get Cifs share success',
    });
  },
  'GET /dsm/share/nfsv3/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'items|20': [
          {
            'id|+1': shareIds,
            cluster_id: '@id',
            share_name: '@NAME',
            share_path: '@PATH',
            'type_name|1': ['nfs'],
            created_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            updated_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
          },
        ],
        total: 20,
        preindex: 1,
        sufindex: 1,
      }),
      msg: 'get nfs share success',
    });
  },
  'GET /dsm/share/cifs_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: Mock.mock({
          'items|12': [
            {
              id: '@id',
              'share_id|1': shareIds,
              cluster_id: '1',
              target_name: 'test',
              'target_type|1': ['CerUser', 'CerGroup', 'ADUser', 'ADGroup', 'AnonymousUser'],
              'rights|1': ['read-write', 'read-only', 'full-control', 'disable'],
              created_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
              updated_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            },
          ],
          total: 1,
          preindex: 1,
          sufindex: 1,
        }),
        msg: 'get cifs share target success',
      }),
    );
  },
  'GET /dsm/share/nfsv3_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: Mock.mock({
          'items|14': [
            {
              id: '@id',
              'share_id|1': shareIds,
              cluster_id: '32bd1b38-d978-11eb-b95f-66f4c6d99e84',
              target_name: 'root;@ip;@string(1,100)',
              target_type: 'host',
              'rights|1': ['read-write', 'read-only'],
              'advance|1': ['sync', 'async', 'standard'],
              'squash|1': ['root_squash', 'no_root_squash', 'all_squash'],
              created_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
              updated_at: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
            },
          ],
          total: 1,
          preindex: 1,
          sufindex: 1,
        }),
        msg: 'get nfs share target success',
      }),
    );
  },
  'GET /dsm/storage/pool/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'items|5': [
          {
            code_block_num: 0,
            data_block_num: 0,
            group_name: 'default',
            id: 3,
            min_size: 1,
            name: '@string(5)',
            pg_num: 128,
            quota_bytes: 0,
            res_group_id: -1,
            safe_type: 0,
            size: 3,
            state: 1,
            total_capacity: '@integer(5, 8)',
            used_capacity: 0,
          },
        ],
        total: 1,
        preindex: 1,
        sufindex: 1,
      }),
      msg: 'get storage pool success',
    });
  },
  'POST /dsm/share/create_nfsv3_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: Mock.mock({
          'items|5': [
            {
              share_id: shareIds,
              cluster_id: 'dsadsadsdsadsds',
              target_name: '@NAME',
              target_type: 'host',
              'rights|1': ['read-write', 'read-only'],
              'advance|1': ['sync', 'async', 'standard'],
              name: '@ip',
            },
          ],
          total: 1,
          preindex: 1,
          sufindex: 1,
        }),
        msg: 'create nfs target success',
      }),
    );
  },
  'POST /dsm/share/create_cifs/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: Mock.mock({
          'items|5': [
            {
              share_id: shareIds,
              cluster_id: 'dsadsadsdsadsds',
              target_name: '@NAME',
              target_type: 'host',
              'rights|1': ['read-write', 'read-only', 'full-control', 'disable'],
              name: '@ip',
            },
          ],
          total: 1,
          preindex: 1,
          sufindex: 1,
        }),
        msg: 'create cifs success',
      }),
    );
  },
  'POST /dsm/share/delete_nfsv3/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'delete nfs successed',
      }),
    );
  },
  'POST /dsm/share/delete_cifs/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'delete cifs successed',
      }),
    );
  },
  'POST /dsm/share/ftp/delete_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'delete ftp successed',
      }),
    );
  },
  'POST /dsm/share/create_cifs_target/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        data: null,
        msg: 'create cifs target successed',
      }),
    );
  },
  // 'GET /dsm/alert/current/': (req: Request, res: Response) => {
  //   sleep(0.6, () =>
  //     res.send({
  //       code: '0',
  //       msg: 'querying current alert successful',
  //       data: {
  //         items: [
  //           {
  //             id: 17,
  //             last_change: '2022-01-21T17:44:52',
  //             severity: 3,
  //             alert_title: 'Disk is too busy',
  //             description: null,
  //             entity_name: '/目录5/',
  //             entity_type: 9,
  //             datavalue: '23',
  //             threshold: '1',
  //             unit: '%',
  //             entity_attr: {
  //               server_name: 'zz6603',
  //               disk_path: 'sda',
  //               threshold: 1,
  //               cluster_uuid: 'c53aa554-79ee-11ec-bf2a-6805cab90168',
  //               manager_ip: '10.128.130.179',
  //               slot: '',
  //             },
  //             alerttype_id: 17,
  //           },
  //           {
  //             id: 18,
  //             last_change: '2022-01-21T17:44:52',
  //             'severity|+1': 1,
  //             alert_title: 'Disk is too busy',
  //             description: null,
  //             entity_name: '/目录2/',
  //             entity_type: 9,
  //             datavalue: '22',
  //             threshold: '1',
  //             unit: '%',
  //             entity_attr: {
  //               server_name: 'zz6603',
  //               disk_path: 'sdb',
  //               threshold: 1,
  //               cluster_uuid: 'c53aa554-79ee-11ec-bf2a-6805cab90168',
  //               manager_ip: '10.128.130.179',
  //               slot: '',
  //             },
  //             alerttype_id: 18,
  //           },
  //           {
  //             id: 19,
  //             last_change: '2022-01-21T17:44:52',
  //             severity: 3,
  //             alert_title: 'Disk is too busy',
  //             description: null,
  //             entity_name: '/目录8/',
  //             entity_type: 9,
  //             datavalue: '76',
  //             threshold: '1',
  //             unit: '%',
  //             entity_attr: {
  //               server_name: 'zz6603',
  //               disk_path: 'sdc',
  //               threshold: 1,
  //               cluster_uuid: 'c53aa554-79ee-11ec-bf2a-6805cab90168',
  //               manager_ip: '10.128.130.179',
  //               slot: '',
  //             },
  //             alerttype_id: 19,
  //           },
  //           {
  //             id: 2,
  //             last_change: '2022-01-25T07:22:08',
  //             severity: 3,
  //             alert_title: 'High usage of node CPU',
  //             description: null,
  //             entity_name: 'node-41',
  //             entity_type: 3,
  //             datavalue: '84',
  //             threshold: '80',
  //             unit: '%',
  //             entity_attr: {
  //               threshold: 80,
  //               cluster_uuid: 'da315a26-7b82-11ec-b7d0-664a1d8ba42a',
  //               server_name: 'node-41',
  //               rack_name: 'rack_0',
  //               manager_ip: '10.128.136.41',
  //             },
  //             alerttype_id: 31,
  //           },
  //         ],
  //       },
  //     }),
  //   );
  // },
  'GET /dsm/alert/config/': (req: Request, res: Response) => {
    sleep(0.6, () => {
      const result = Mock.mock({
        'items|5-30': [
          {
            'id|+1': 1,
            'severity|1-5': 1,
            'alert_title|1': [
              'RPO超时',
              '复制关系对状态异常',
              '资源组容量使用比例过高',
              '资源组可用裸容量不足',
              '存储系统远程复制服务异常',
              '存储系统远程复制服务故障',
              '时钟服务异常',
              '外部时钟源不可达',
              '节点时钟偏差小于1s',
              '节点时钟偏差1s~5s',
            ],
            'entity_type|1': ['RPO', '远程复制对', '资源组', '远程复制服务', '时钟服务'],
            description:
              'The replication job on the {cluster_uuid} cluster cannot start on time, which source directory is {source_directory} and tareget directory is {target_directory}',
            'threshold|1': ['not up', '70', '10', 'N/A'],
            threshold_switch: 0,
            alert_enabled: 1,
            'unit|1': ['', '%'],
          },
        ],
      });

      res.send({
        code: '0',
        data: {
          items: result.items,
          preindex: 1,
          sufindex: 10,
          total: result.items.length,
        },
        msg: 'Query current alerts successed',
      });
    });
  },

  'GET /dsm/alert/get_smtp_config/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'query smtp configuration successful',
        data: {
          host: '',
          port: '25',
          lang: 'zh-CN',
          name: '',
          password: '',
          email: '',
          enable: false,
          auth: false,
          encrypt: 'none',
        },
      }),
    );
  },

  'GET /dsm/alert/get_snmpv3_config/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'query snmpv3 configuration successful',
        data: {
          ip: '',
          port: '162',
          authproto: '',
          password: '',
          username: '',
          encrptAlgo: 'AES',
          encrptPass: '',
          enable: false,
        },
      }),
    );
  },

  'GET /dsm/version/get_version/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'getting version info successful!',
        data: {
          name_ch: 'DXN分布式文件存储',
          name_en: 'DXN Distributed File Storage System',
          version: '3.0.0',
          release: '2022-11-25',
        },
      }),
    );
  },

  'POST /dsm/share/create_nfsv3/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'create nfs target successful',
        data: {},
      }),
    );
  },
  'GET /dsm/worm/get_clock/': (req: Request, res: Response) => {
    const resp = Mock.mock({
      'res|1': [
        {
          code: '0',
          msg: 'get worm  successful',
          // data: null,
          data: {
            set_worm_clock: 1,
            worm_clock_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          },
        },
        // {
        //   code: '40001',
        //   success: false,
        //   msg: 'get worm failed',
        //   data: {},
        // },
        // {
        //   code: '0',
        //   msg: 'get worm success',
        //   data: {},
        // },
        // {
        //   code: '0',
        //   msg: 'get worm success',
        //   data: null,
        // }
      ],
    })?.res;
    sleep(1, () => res.send(resp));
  },
  'POST /dsm/worm/start_clock/': (req: Request, res: Response) => {
    sleep(2, () =>
      res.send({
        code: '0',
        msg: 'start worm  successful',
        data: {
          set_worm_clock: 1,
          worm_clock_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      }),
    );
  },
  'GET /dsm/dir/get_worm/': (req: Request, res: Response) => {
    const { parent_path, dir_name } = req.query;
    let resp = {};
    if (dir_name === 'worm_not_empty_for_create') {
      resp = {
        dir_is_null: 0,
        more_than_128: 0,
      };
    } else if (dir_name === 'worm_empty_for_create') {
      resp = {
        dir_is_null: 1,
        more_than_128: 0,
      };
    } else if (dir_name === 'worm_create_with_no_quota') {
      resp = {
        min_protect_period: 3600,
        max_protect_period: 220752000,
        default_protect_period: 604800,
        lock_period: 7200,
        allow_modify: 1,
        dir_is_null: 1,
        more_than_128: 0,
      };
    } else if (dir_name === 'worm_modify') {
      resp = {
        min_protect_period: 3600,
        max_protect_period: 3153600000,
        default_protect_period: 604800,
        lock_period: 7200,
        allow_modify: 1,
        dir_is_null: 1,
        more_than_128: 0,
      };
    } else if (dir_name === 'worm_no_modify') {
      resp = {
        min_protect_period: 3600,
        max_protect_period: 3153600000,
        default_protect_period: 604800,
        lock_period: 7200,
        allow_modify: 0,
        dir_is_null: 1,
        more_than_128: 0,
      };
    } else {
      resp = {
        dir_is_null: 0,
        more_than_128: 0,
      };
    }
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'get worm  successful',
        data: resp,
      }),
    );
  },
  'GET /dsm/dir/get_all_worms/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'get worm  successful',
        data: {
          items: Mock.mock({
            'data|17': [
              {
                dir_name: '@string()',
                father_path: '/',
                full_path: '/@dir_name',
                min_protect_period: 3600,
                default_protect_period: 3600,
                max_protect_period: 3153600000,
                lock_period: 7200,
              },
            ],
          })?.data,
          total: 17,
          preindex: 1,
          sufindex: 10,
        },
      }),
    );
  },
  'GET /dsm/dir/get_user_group_name/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'get worm  successful',
        data: {
          user: 'user4',
          group: 'group12',
        },
      }),
    );
  },
  'POST /dsm/dir/set_worm/': (req: Request, res: Response) => {
    sleep(2.5, () =>
      res.send({
        code: '0',
        msg: 'start set worm job successful',
        data: { job_id: 3032934932473 },
      }),
    );
  },
  'POST /dsm/dir/modify_worm/': (req: Request, res: Response) => {
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'start modify worm job successful',
        data: { job_id: 3032934932473 },
      }),
    );
  },

  'GET /dsm/logic/dir/': (req: Request, res: Response) => {
    sleep(0.6, () => {
      res.send({
        code: '0',
        msg: 'Query dir info successfully!',
        data: {
          items: [
            {
              share_protocol: ['cifs'],
              dir_alert_lv: 0,
              dir_name: 'mirror123',
              father_path: '/',
              full_path: '/mirror123/',
              CreationTime: '2022-11-15T13:53:32',
            },
          ],
        },
      });
    });
  },

  'GET /dsm/logic/dir_info/': (req: Request, res: Response) => {
    sleep(0.6, () => {
      res.send({
        code: '0',
        msg: 'Query dir  info successfully!',
        data: { file_used: 4 },
      });
    });
  },

  'GET /dsm/dir/get_group_default_quota/': (req: Request, res: Response) => {
    const { cluster_id } = req.query;
    if (!cluster_id) {
      res.send({
        code: '10001',
        data: {},
        msg: 'invalid parameters',
      });
      return;
    }
    sleep(0.6, () => {
      res.send({
        code: '0',
        data: {
          capacity_quota: 10240,
          file_quota: 0,
        },
        msg: 'get group default quota success!',
      });
    });
  },

  'POST /dsm/dir/set_group_default_quota/': (req: Request, res: Response) => {
    const { cluster_id, capacity_quota, file_quota } = req.body;
    if (!cluster_id || isNaN(capacity_quota) || isNaN(file_quota)) {
      res.send({
        code: 10001,
        data: {},
        msg: 'invalid parameters',
      });
      return;
    }
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'set group default quota success!',
        data: {},
      }),
    );
  },

  'GET /dsm/dir/get_user_default_quota/': (req: Request, res: Response) => {
    const { cluster_id } = req.query;
    if (!cluster_id) {
      res.send({
        code: 10001,
        data: {},
        msg: 'invalid parameters',
      });
      return;
    }
    sleep(0.6, () => {
      res.send({
        code: '0',
        data: {
          capacity_quota: 0,
          file_quota: 0,
        },
        msg: 'get user default quota success!',
      });
    });
  },

  'POST /dsm/dir/set_user_default_quota/': (req: Request, res: Response) => {
    const { cluster_id, capacity_quota, file_quota } = req.body;
    if (!cluster_id || isNaN(capacity_quota) || isNaN(file_quota)) {
      res.send({
        code: 10001,
        data: {},
        msg: 'invalid parameters',
      });
      return;
    }
    sleep(0.6, () =>
      res.send({
        code: '0',
        msg: 'set user default quota success!',
        data: {},
      }),
    );
  },
  'POST dsm/share/create_snapshot_cifs/': (req, res) => {
    sleep(2, () =>
      res.send({
        code: '0',
        msg: 'set snap share success!',
        data: {},
      }),
    );
  },
  'GET /dsm/dir/snap_policy_config/': getScheduledSnapPolicy,
  'POST /dsm/dir/delete_snap_policy_config/': deleteScheduledSnapPolicy,
  'POST /dsm/dir/modify_snap_policy_config/': modifyScheduledSnapPolicy,
};
