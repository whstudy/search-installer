import Mock from 'mockjs';
import { Request, Response } from 'express';
import _ from 'lodash';

// id与操作名对应
export const syncJobNameWithJobId = Mock.mock({
  StartWriteBack: '@integer(10000, 1000000)',
  StartWriteBackRestore: '@integer(10000, 1000000)',
  StartFailOver: '@integer(10000, 1000000)',
  StartRestore: '@integer(10000, 1000000)',
  AbortReplication: '@integer(10000, 1000000)',
  PauseReplication: '@integer(10000, 1000000)',
});

let current_job_status_index = 0; // 测试异步任务当前状态
const JOBS = Mock.mock({
  'items|2-30': [
    {
      'id|+1': 1,
      add_time: '@datetime',
      celery_id: '@uuid',
      cluster_id: 'cluster-@id',
      context:
        '{"inode_id": 19, "snapshot_id": [85], "cluster_id": "7c3baa54-3215-11ec-a78b-66f4c6d99e84"}',
      desc: '',
      end_time: '@datetime',
      initiator: 'admin',
      job_id: 'job-@id',
      job_name: 'CheckNfsShare',
      'job_status|1': ['STARTED', 'SUCCESS', 'FAILURE'],
      'job_type|1': ['ASYNC', 'SYNC'],
      pid: 1,
      'progress|1': ['60%', '100%'],
      pstatus: 'running',
      retry_times: null,
      revoke_time: '@datetime',
      stage: 'CheckNfsShare',
      start_time: '@datetime',
      task_info:
        "{'job_id': 3528, 'context': {'inode_id': 19, 'snapshot_id': [85], 'cluster_id': '7c3baa54-3215-11ec-a78b-66f4c6d99e84', 'task_num': 1, 'manager_ip': '10.128.136.35'}}",
      work_id: -1,
    },
  ],
});

const JOBSMgmt = Mock.mock({
  data: [
    {
      job_id: '@id',
      job_name: 'create resource group',
      'job_status|1': ['PENDING', 'SUCCESS'],
      add_time: '@datetime',
      end_time: '@datetime',
    },
  ],
});
const pollingRes = {};

export default {
  'GET /ui/summary/current_alert_summary/': {
    code: '0',
    data: {
      important: 0,
      info: 0,
      normal: 0,
      total: 1,
      urgent: 0,
      warning: 1,
    },
    msg: 'Query current alerts successed',
  },

  'GET /dsm/alert/current/': (req, res) => {
    const result = Mock.mock({
      'items|5-30': [
        {
          alert_title: 'High usage of host CPU',
          last_change: '2022-01-21T17:44:52',
          'alerttype_id|+1': 31,
          datavalue: '87',
          description: null,
          entity_attr: {
            cluster_uuid: '10711dee-3630-11ec-9fc2-66f4c6d99e84',
            manager_ip: '10.128.136.182',
            rack_name: 'rack_0',
            server_name: 'wz-182',
            threshold: 80,
          },
          entity_name: 'wz-182',
          entity_type: 3,
          'id|+1': 1,
          occur_time: '@date',
          'severity|1-5': 1,
          threshold: '80',
          unit: '%',
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
  },

  'GET /ui/summary/history_alert_summary/': {
    code: '0',
    data: {
      important: 0,
      info: 0,
      normal: 0,
      total: 1,
      urgent: 0,
      warning: 1,
    },
    msg: 'Query current alerts successed',
  },

  'GET /dsm/alert/history/': (req, res) => {
    const result = Mock.mock({
      'items|5-30': [
        {
          alert_title: 'High usage of host CPU',
          alerttype_id: 31,
          clear_executor: 'Auto',
          clear_time: '2021-11-01T13:53:23',
          datavalue: '80',
          entity_attr: {
            cluster_uuid: '6d2d815a-3890-11ec-a65e-66f4c6d99e84',
            manager_ip: '10.128.136.35',
            rack_name: 'rack_0',
            server_name: 'wz-35',
            threshold: 80,
          },
          entity_name: 'wz-35',
          entity_type: 3,
          'id|+1': 56,
          occur_time: '2021-11-01T12:57:57',
          'severity|+1': [1, 2, 3, 4, 5],
          threshold: '80',
          unit: '%',
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
  },

  'GET /dsm/job/status/': function (req: Request, res: Response) {
    let { cluster_id, job_ids } = req.query;

    if (_.isEmpty(cluster_id) || _.isEmpty(job_ids)) {
      res.sendStatus(400);
    }

    let result: any = [];
    let jobIds = (job_ids as string).split(',');
    // _.forEach(jobIds, (id) => {
    //   let tmp = JOBSMgmt.data.filter((item) => item?.job_id === id)?.[0];
    //   if (!_.isEmpty(tmp)) {
    //     result.push(tmp);
    //   }
    // });

    let state = 'PENDING';
    _.forEach(jobIds, (id) => {
      const jobName = Object.keys(syncJobNameWithJobId)?.filter(
        (v) => syncJobNameWithJobId?.[v] == id,
      )?.[0];
      if (pollingRes?.[id] > 2) {
        state = 'SUCCESS';
      }
      if (jobName) {
        result.push({
          id: Number(id),
          job_name: jobName,
          job_status: state,
          add_time: '2022-07-08 22:10:00',
          end_time: '2022-07-08 22:10:00',
        });
      }
      if (pollingRes?.[id]) {
        pollingRes[id] += 1;
      } else {
        pollingRes[id] = 1;
      }
    });

    // return res.send({
    //   code: '0',
    //   msg: 'get jobs successfully',
    //   data: result,
    // });

    return res.send({
      code: '0',
      msg: 'get job status successfully',
      data: [
        {
          id: 10,
          job_name: 'CreateStoragePool',
          job_status: 'SUCCESS',
          // "job_status": "FAILURE",
          add_time: '2023-08-08T11:05:25',
          end_time: '2023-08-08T11:05:32',
          stage: 'CheckStoragePool',
          task_info: '任务成功',
          next_job_id: null,
        },
      ],
    });
  },

  'GET /dsm/job/census/': {
    code: '0',
    data: {
      successful: 3,
      doing: 0,
      failed: 0,
      total: 3,
    },
    msg: 'Query current alerts successed',
  },

  'GET /dsm/job/': function (req: Request, res: Response) {
    let { cluster_id, filters } = req.query;

    if (_.isEmpty(cluster_id) || _.isEmpty(filters)) {
      res.sendStatus(400);
    }

    let result = JOBS.items;
    let job_status = JSON.parse(filters as string)?.job_status;
    result = result.filter((j) => job_status?.split(',')?.includes(j.job_status));

    return res.send({
      code: '0',
      data: {
        items: JOBS.items,
        preindex: 1,
        sufindex: 10,
        total: JOBS.items.length,
      },
      msg: 'get resource group success',
    });
  },
  'GET /dsm/job/info/1': (req, res) => {
    const mapping = ['STARTED', 'PENDING'];
    const testSceno = 'success'; //  fail|success
    if (testSceno === 'fail') {
      // 测试失败情况
      mapping.push('FAILURE');
    } else {
      mapping.push('SUCCESS');
    }
    if (!mapping?.[current_job_status_index]) {
      current_job_status_index = 0;
    }
    setTimeout(() => {
      res.send({
        code: '0',
        success: true,
        data: {
          job_id: Number(req?.query?.job_id),
          initiator: 'admin',
          job_name: 'StartStorageUnit',
          // job_status: mapping?.[current_job_status_index],
          job_status: 'STARTED',
          task_info: 'None2',
          work_id: -1,
          add_time: '2021-07-04T16:53:30',
          progress: '100.00%',
        },
        msg: 'success!',
      });
      current_job_status_index += 1;
    }, 0.6 * 1000);
  },

  'GET /ui/summary/operationrecordsummary/': {
    code: '0',
    data: {
      count: 8,
      doing: 0,
      failed: 4,
      successful: 4,
    },
    msg: 'Query current alerts successed',
  },

  'GET /dsm/operationrecord/': (req, res) => {
    const result = Mock.mock({
      'items|5-30': [
        {
          end_time: '2021-11-02T16:42:05',
          'id|+1': 1,
          ip: '10.128.80.21',
          operation: 'login',
          return_info: null,
          start_time: '2021-11-02T16:42:05',
          status: 'successful',
          target_names: 'admin',
          target_type: 'manage_user',
          u_name: 'admin',
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
      msg: 'Query operation record successed',
    });
  },
  'POST /dsm/alert/clear/': (req, res) => {
    res.send({
      code: '0',
      data: {
        items: [],
      },
      msg: 'Query operation record successed',
    });
  },
  'POST /dsm/alert/conf_smtp_mail/': {
    code: '0',
    data: {},
    msg: '',
  },
  'GET /dsm/alert/get_smtp_mails/': {
    code: '0',
    data: Mock.mock({
      'items|18': [
        {
          email: '@email',
          level: ['critical', 'important', 'normal', 'warning', 'info'],
        },
      ],
      preindex: 1,
      sufindex: 10,
      total: 18,
    }),
    msg: '',
  },
  'POST /dsm/alert/del_smtp_mail/': {
    code: '0',
    msg: '',
    data: {},
  },
  'GET /dsm/log/': (req, res) => {
    let resp: any = {};
    if (_.random(1, 10) > 5) {
      resp = Mock.mock({
        log_info: {
          name: '@name', //日志压缩包名称，
          starttime: new Date(), //日志开始时间，
          endtime: new Date(), //日志结束时间
          last_collection_time: new Date(), //日志收集时间
        },
        'log_size|1': [77309410000, 77309412000],
      });
    }

    setTimeout(() => {
      res.send({
        code: '0',
        data: resp,
        msg: 'Query operation record successed',
      });
    }, 1000);
  },

  'GET /dsm/log/collection': (req, res) => {
    const result = Mock.mock({
      'nodes|5-10': [
        {
          node_name: '@name', // 节点名称
          'host_id|+1': 1, // 节点ID
          'status|1': ['normal', 'error'], // 节点状态
        },
      ],
    });

    res.send({
      code: '0',
      data: result,
      msg: 'Query operation record successed',
    });
  },

  'POST /dsm/log/collection/': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        Mock.mock({
          code: '0',
          data: {
            job_id: '@integer(1000,10000)',
          },
          msg: 'create collection successfully',
        }),
      );
    }, 500);
  },

  'POST /dsm/log/collection/cancel/': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        data: {},
        msg: 'cancel collection successfully',
      });
    }, 1000);
  },

  'GET /dsm/log/download/': (req: Request, res: Response) => {
    // if (_.random(1, 10) > 5) {
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename="logdownloadTest.zip"');
    res.setHeader('showtype', '1');
    res.setHeader('Transfer-Encoding', 'chunked');

    setTimeout(() => {
      res.sendFile(__dirname + '/logdownloadTest.zip', (err) => {
        console.log('something happend during sending file', err?.message);
      });
    }, 2000);
    return;
    // } else {
    //   setTimeout(() => {
    //     res.send({
    //       code: '100400',
    //       data: {},
    //       msg: 'no cluster configuration file exists',
    //     });
    //   }, 2000)

    //   return;
    // }
  },
};
