import { Request, Response } from 'express';
import _ from 'lodash';
import Mock from 'mockjs';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

function shutDown(req: Request, res: Response) {
  setTimeout(() => {
    res.send({
      code: '213',
      data: {},
      msg: 'success',
    });
  }, 3000);
}

export default {
  'GET /dsm/clusters/get_clusters/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: [
        {
          id: 'e93e7f86-1506-11ec-8b54-82e39a428af3',
          name: 'cluster122',
          health: 'HEALTH_WARN',
          health_msg: [
            'Degraded data redundancy: 35/105 objects degraded (33.333%), 24 pgs degraded, 355 pgs undersized',
          ],
          is_local: true,
          ip: '10.128.129.132',
          customIdentity: 'e93e7f86-1506-11ec-8b54-82e39a428af31',
          total: 1256198193152,
          desc: 'beijing11',
          status: 'RUNNING',
        },
        {
          id: 'e93e7f86-1506-11ec-8b54-82e39a428af2',
          name: 'cluster123',
          health: 'HEALTH_WARN',
          health_msg: [
            'Degraded data redundancy: 35/105 objects degraded (33.333%), 24 pgs degraded, 355 pgs undersized',
          ],
          is_local: true,
          ip: '10.128.129.132',
          customIdentity: 'e93e7f86-1506-11ec-8b54-82e39a428af32',
          total: 125619819315,
          desc: 'beijing11',
          status: 'RUNNING',
        },
      ],
      msg: 'Query cluster successed',
    });
  },
  'GET /dsm/license/info/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        cluster_id: 'cbc4043c-11d5-11ec-8d54-82e39a428af3',
        cluster_name: 'cluster1',
        licensed_user: null,
        license_state: 0,
        authorized_node_count: 2,
        activation_node_count: 0,
        probation_node_count: 0,
        free_key_count: 3,
        to_be_activated_key: 1,
        key_num: 0,
        left_time: 57,
        waiting_recycling_key: 0,
      },
      msg: 'Query cluster authorization information successed',
    });
  },
  'GET /dsm/clusters/get_defaultInfo/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {},
      msg: 'Query cluster authorization information successed',
    });
  },
  'POST /dsm/clusters/power_down/': shutDown,

  'GET /dsm/clusters/config/get_collection/': (req: Request, res: Response) => {
    // backend will update the collection record rather than create a new collection record
    // so there has no more than one collection
    const { cluster_id } = req.query;
    if (_.isEmpty(cluster_id)) {
      sleep(0.5, () => {
        res.send({
          code: '0',
          data: {},
          msg: 'invalid parameters',
        });
      });
      return;
    }

    let resp: any = {};
    if (_.random(1, 10) > 5) {
      resp = {
        last_collection_time: new Date(),
      };
    }

    sleep(0.5, () => {
      res.send({
        code: '0',
        data: resp,
        msg: 'get collection successfully',
      });
    });
    return;
  },

  'POST /dsm/clusters/config/create_collection/': (req: Request, res: Response) => {
    const { cluster_id, name } = req.body;
    if (_.isEmpty(cluster_id) || _.isEmpty(name)) {
      sleep(0.5, () => {
        res.send({
          code: '0',
          data: {},
          msg: 'invalid parameters',
        });
        return;
      });
    }

    sleep(0.5, () => {
      res.send(
        Mock.mock({
          code: '0',
          data: {
            job_id: '@integer(1000,10000)',
          },
          msg: 'create collection successfully',
        }),
      );
    });
    return;
  },

  'POST /dsm/clusters/config/cancel_collection/': (req: Request, res: Response) => {
    const { cluster_id, job_id, name } = req.body;
    if (_.isEmpty(cluster_id) || _.isEmpty(job_id) || _.isEmpty(name)) {
      sleep(0.5, () => {
        res.send({
          code: '0',
          data: {},
          msg: 'invalid parameters',
        });
      });
      return;
    }

    sleep(0.5, () => {
      res.send({
        code: '0',
        data: {},
        msg: 'cancel collection successfully',
      });
    });
    return;
  },

  'GET /dsm/clusters/config/create_download/': (req: Request, res: Response) => {
    // current cluster only has one collection and download task,
    // so there is no need to pass collection id
    const { cluster_id } = req.query;
    if (_.isEmpty(cluster_id)) {
      sleep(0.5, () => {
        res.send({
          code: '0',
          data: {},
          msg: 'invalid parameters',
        });
      });
      return;
    }

    if (_.random(1, 10) > 5) {
      res.setHeader('Content-type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment;filename="cluster.cfg"');
      res.setHeader('showtype', '1');

      sleep(0.5, () => {
        res.sendFile(__dirname + '/cluster.cfg', (err) => {
          console.log('something happend during sending file', err?.message);
        });
      });
      return;
    } else {
      sleep(0.5, () => {
        res.send({
          code: '100400',
          data: {},
          msg: 'no cluster configuration file exists',
        });
      });
      return;
    }
  },

  'POST /dsm/clusters/config/cancel_download/': (req: Request, res: Response) => {
    // current cluster only has one collection and download task,
    // so there is no need to pass collection id
    const { cluster_id } = req.body;
    if (_.isEmpty(cluster_id)) {
      sleep(0.5, () => {
        res.send({
          code: '0',
          data: {},
          msg: 'invalid parameters',
        });
      });
      return;
    }

    sleep(0.5, () => {
      res.send({
        code: '0',
        data: {},
        msg: 'cancel download successfully',
      });
    });
    return;
  },
  'POST /dsm/clusters/update_status/': (req: Request, res: Response) => {
    sleep(5, () => {
      res.send({
        code: '0',
        data: {},
        msg: 'Status code modified successfully',
      });
    });
  },
};
