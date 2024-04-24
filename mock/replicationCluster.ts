import { Request, Response } from 'express';
import _ from 'lodash';
import { mock } from 'mockjs';

let config: any = {
  port: 500000,
  control_port: 600000,
  ip_pool: '1.1.1.1/24 2.2.2.2/32',
  limit_bandwidth: 300,
  ip_version: 4,
  rep_node_count: 3,
};

let deleteCount = 0;

const repNodeData = mock({
  'items|12': [
    {
      'iid|+1': 1, // only for name
      rep_cluster_id: '@integer(0,4)',
      rep_ip: '',
      rep_port: 'rack_@integer(0,4)',
      rep_control_port: 'rack_@integer(0,4)',
      bandwidth: 'ceph@integer(0,4)',
      limit_bandwidth: 'ens@integer(0,4)',
      rack_name: '@string(5, 10)',
      rep_nic: 'ens@integer(2,4)',
      'rep_service_status|1': ['health', 'error'],
      node_status: 0,
      name: 'ceph@iid',
    },
  ],
  preindex: 1,
  sufindex: 10,
  total: 12,
});
let addedHost = [];

const nodeCandidates = mock({
  'items|23': [
    {
      'iid|+1': 1, // only for node_name
      roles: { REP: 'health', DSM: 'health', CMS: 'health' },
      rack_name: 'rack_@integer(0,4)',
      node_name: 'ceph@iid',
      nics: [
        { name: 'nic1', role: 'public' },
        { name: 'nic2', role: 'cluster' },
      ],
      running_status: 'health',
    },
  ],
  preindex: 1,
  sufindex: 100,
  total: 23,
});

export default {
  'GET /dsm/rep/replication_info/': (req, res) => {
    res.send({
      code: '0',
      msg: 'success',
      data: config,
    });
  },
  'GET /dsm/rep/rep_node_candidates/': (req, res) => {
    const { keyword } = req.query || {};
    // 测试操作失效
    if (keyword === 'ceph2') {
      nodeCandidates.items = nodeCandidates?.items?.filter((v) => v?.node_name !== 'ceph1');
    } else if (keyword === 'ceph3') {
      nodeCandidates.items = nodeCandidates?.items?.filter((v) => v?.node_name !== 'ceph3');
    }

    const searchItem = nodeCandidates?.items?.filter((v) => v?.node_name?.includes(keyword));
    res.send({
      code: '0',
      msg: 'Get not replicate nodes successfully!',
      data: keyword
        ? {
            items: searchItem,
            total: searchItem?.length,
          }
        : nodeCandidates,
    });
  },
  'GET /dsm/rep/rep_nodes/': (req, res) => {
    const { keyword, preindex, sufindex } = req.query || {};
    let newNodes = { items: repNodeData?.items, total: repNodeData?.total };
    if (keyword) {
      newNodes.items = []; // 测试table为空
      newNodes.total = 0;
      // repNodeData?.items?.forEach((v) => {
      //   if (v?.name?.includes(keyword)) {
      //     newNodes?.items.push(v);
      //   }
      // });
    } else {
      // newNodes = repNodeData;
    }

    if (preindex && sufindex) {
      newNodes = {
        items: newNodes?.items?.slice(preindex, sufindex + 1),
        preindex,
        sufindex,
        total: newNodes?.total,
      };
    }
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: newNodes,
      });
    }, 2000);
  },

  'GET /dsm/rep/metrics_history/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get the metrics of replicate node successfully!',
        data: [
          { time: '2022-07-17T11:20:57.214234Z', limit_bandwidth: 0, bandwidth: 0 },
          { time: '2022-07-17T11:20:42.680314Z', limit_bandwidth: 5, bandwidth: 0 },
          { time: '2022-07-17T11:20:27.262509Z', limit_bandwidth: 10, bandwidth: 0 },
          { time: '2022-07-17T11:20:13.214696Z', limit_bandwidth: 20, bandwidth: 0 },
          { time: '2022-07-17T11:19:57.154850Z', limit_bandwidth: 2, bandwidth: 0 },
          { time: '2022-07-17T11:19:42.530635Z', limit_bandwidth: 40, bandwidth: 0 },
          { time: '2022-07-17T11:19:27.406020Z', limit_bandwidth: 26, bandwidth: 0 },
          { time: '2022-07-17T11:19:12.631689Z', limit_bandwidth: 10, bandwidth: 0 },
        ],
      });
    }, 2000);
  },
  'POST /dsm/rep/create_rep_cluster/': (req, res) => {
    config = req.body;
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        data: {
          port: config?.rep_port,
          ip_pool: config?.ip_pool,
          limit_bandwidth: config?.limit_bw,
          rep_node_candidate_count: '@integer(3, 8)',
          available_ip_count: '@integer(2, 4)',
          rep_node_count: addedHost?.length,
          ip_version: config?.ip_version,
          rep_cluster_id: '',
          rep_cluster_name: '',
        },
      });
    }, 2000);
  },
  'POST /dsm/rep/update_rep_cluster/': (req, res) => {
    config = { ...config, ...req.body };
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'Get not replicate nodes successfully!',
        success: true,
        data: {
          port: config?.rep_port,
          ip_pool: config?.ip_pool,
          limit_bandwidth: config?.limit_bw,
          rep_node_candidate_count: '@integer(3, 8)',
          available_ip_count: '@integer(2, 4)',
          rep_node_count: addedHost?.length,
          ip_version: config?.ip_version,
          rep_cluster_id: '',
          rep_cluster_name: '',
        },
      });

      // res.send({
      //   code: '220',
      //   msg: 'Get not replicate nodes failed!',
      //   data: null,
      // });
    }, 2000);
  },
  'POST /dsm/rep/delete_rep_cluster/': (req, res) => {
    config = {};
    console.log(888, config);
    res.send({
      code: '0',
      msg: 'delete replicate config successfully!',
      data: null,
    });
  },
  'POST /dsm/rep/create_rep_nodes/': (req, res) => {
    repNodeData.total = 1;
    res.send({
      code: '0',
      msg: 'create replicate nodes successfully!',
      data: {
        job_id: 2321321312321321,
      },
    });
  },
  'POST /dsm/rep/destroy_rep_nodes/': (req, res) => {
    deleteCount++;
    if (deleteCount === 1) {
      repNodeData.total = 1;
    } else {
      repNodeData.total = 0;
    }
    res.send({
      code: '0',
      msg: 'delete replicate nodes successfully!',
      data: {
        job_id: 2321321312321321,
      },
    });
  },
};
