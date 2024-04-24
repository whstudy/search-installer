import { Request, Response } from 'express';
import _ from 'lodash';
import Mock from 'mockjs';

const DiskTypes = ['SSD', 'HDD', 'NVME'];
const HealthStatus = ['health', 'sub_health', 'error'];
// const GroupIds = [0, 1, 2, 3, -1, -2, -3, -4, -5, -6];
// for test graph to generate only tfs group
const GroupIds = [2];
const GroupNodes = {
  '-1': ['node-10', 'node-11'],
  '0': ['node-12', 'node-13'],
  '1': ['node-1', 'node-2'],
  '2': [],
  '3': [
    'node-3',
    'node-4',
    'node-5',
    'node-6',
    'node-7',
    'node-8',
    'node-13',
    'node-14',
    'node-15',
    'node-16',
    'node-17',
    'node-18',
    'node-23',
    'node-24',
    'node-25',
    'node-26',
    'node-27',
    'node-28',
    'node-29',
    'node-30',
    'node-31',
  ],
};
// const NodeOsds = Mock.mock({
//   'node-1': '@range(1, 10)',
//   'node-2': '@range(11, 30)',
//   'node-3': [],
//   'node-4': '@range(31, 35)',
//   'node-5': '@range(36, 120)',
// });

const NodeOsds = Mock.mock({
  'node--1': [101, 102],
  'node-0': [201, 202],
  'node-1': [1, 2, 3],
  'node-2': [4, 5],
  'node-3': [6],
  'node-4': [7, 8, 9],
  'node-5': [10, 11, 12, 13, 14, 15],
  'node-6': [21, 22, 23],
  'node-7': [31, 32, 33],
  'node-8': [41, 42, 43, 44],
  'node-10': [51],
  'node-11': [52, 53, 54, 55, 56],
  'node-12': [61, 62, 63],
  'node-13': [71, 72, 73],
});

const RackNodes = {
  'rack-1': ['node-1'],
  'rack-2': ['node-2', 'node-3'],
  'rack-3': ['node-4', 'node-5', 'node-6', 'node-7', 'node-8'],
  'rack-4': ['node-10', 'node-11', 'node-12', 'node-13'],
  'rack-5': [
    'node-14',
    'node-15',
    'node-16',
    'node-17',
    'node-18',
    'node-23',
    'node-24',
    'node-25',
    'node-26',
    'node-27',
    'node-28',
    'node-29',
    'node-30',
    'node-31',
  ],
};

const TotalOSDs = () => {
  const states = [0, 1, 2, 3, 4];
  const status = [0, 1];
  let result: any = [];
  _.forEach(_.keys(GroupNodes), (group) => {
    _.forEach(GroupNodes[group], (node) => {
      _.forEach(NodeOsds[node], (item) => {
        const tempItem = {
          id: item,
          name: `su.${item}`,
          status: status[_.floor(_.random(0, 0.9) * status.length)],
          state: states[_.floor(_.random(0, 0.9) * states.length)],
          health_status: HealthStatus[_.floor(_.random(0, 0.9) * HealthStatus.length)],
          // status: 0,
          // state: 0,
          // health_status: 'health',
          host_name: node,
          volume: 0,
          group_id: Number(group),
          block: '/dev/sdd',
          db: '/dev/sdc',
          wal: '/dev/sdc',
          type: DiskTypes[_.floor(_.random(0, 0.9) * DiskTypes.length)],
        };
        result.push(tempItem);
      });
    });
  });
  return result;
};

const TotalNodes = () => {
  const states = [0, 1, 2, 3];
  let result: any = [];
  _.forEach(_.keys(GroupNodes), (map) => {
    _.forEach(GroupNodes[map], (node) => {
      let rack = '';
      const rackNames = _.keys(RackNodes);
      const loopNodeArrs = _.values(RackNodes);
      _.forEach(loopNodeArrs, (v, i) => {
        if (v.includes(node)) {
          rack = rackNames[i];
        }
      });
      const tempItem = {
        group_id: Number(map),
        id: node?.split('-')?.[1] || 0,
        name: node,
        rack: rack,
        state: states[_.floor(_.random(0, 0.9) * states.length)],
      };
      result.push(tempItem);
    });
  });
  return result;
};

function generateResourceGroupOSDs(groupId: number, nodeName?: string) {
  let total = TotalOSDs();
  let result = total.filter((item) => item?.group_id === groupId);
  if (!_.isEmpty(nodeName)) {
    result = result.filter((item) => item?.host_name.includes(nodeName));
  }
  return result;
}

function generateResourceGroupOSDInfo(groupId: number) {
  let result: any = [];
  _.forEach(DiskTypes, (item) => {
    const tempItem = {
      block_disk_type: DiskTypes[_.floor(_.random(0, 0.9) * DiskTypes.length)],
      osd_number: generateResourceGroupOSDs(groupId)?.length,
    };
    result.push(tempItem);
  });
  return result;
}

function generateResourceGroupNodeDetail(groupId: number) {
  let loopNodes = TotalNodes();
  return loopNodes.filter((item) => item?.group_id === groupId);
}

// {
//     "group_id": -1,
//     "created_at": "2022-08-10T18:44:34",
//     "name": "default",
//     "leaf_firstn": "host",
//     "pools_num": 1,
//     "vhost_split_num": 1,
//     "avail_capacity": 1796304630784,
//     "v_leaf_firstn_num": 3,
//     "node_count": 3,
//     "osd_medium_info": [
//         {
//             "block_disk_type": "HDD",
//             "osd_number": 9
//         }
//     ],
//     "node_detail": [
//         {
//             "id": 3,
//             "name": "ceph1",
//             "rack": "rack_0",
//             "state": 0
//         },
//         {
//             "id": 6,
//             "name": "ceph2",
//             "rack": "rack_0",
//             "state": 0
//         },
//         {
//             "id": 4,
//             "name": "ceph3",
//             "rack": "rack_0",
//             "state": 0
//         }
//     ],
//     "disk_type": "HDD"
// }

const TotalResourceGroups = () => {
  const leafFirstns = ['host', 'rack', 'osd'];
  let result: any = [];
  _.forEach(GroupIds, (item) => {
    let nodeDetail = generateResourceGroupNodeDetail(item);
    let osdInfo = generateResourceGroupOSDInfo(item);
    let nodeCount = nodeDetail.length;
    const tempItem = {
      group_id: item,
      name: item === -1 ? 'default' : item === 1 ? 'tfs' : `group-${item}`,
      leaf_firstn: leafFirstns[_.floor(_.random(0, 0.9) * leafFirstns.length)],
      disk_type: DiskTypes[_.floor(_.random(0, 0.9) * DiskTypes.length)],
      created_at: item === -1 ? '2022-01-13T08:39:00.677Z' : new Date(),
      pools_num: _.random(1, 20),
      node_count: nodeCount,
      osd_medium_info: osdInfo,
      vhost_split_num: _.random(1, 2),
      v_leaf_firstn_num: _.random(1, 6),
      node_detail: nodeDetail,
    };
    result.push(tempItem);
  });
  return result;
};

function generateResourceGroups(nodeName?: string | undefined) {
  // const result: any = [];
  // let totalGroups = TotalResourceGroups();
  // if (!_.isEmpty(nodeName)) {
  //     _.forEach(totalGroups, (g) => {
  //         const nodes = g.node_detail;
  //         if (_.some(nodes, (n) => n.name.includes(nodeName))) {
  //             result.push(g);
  //         }
  //     });
  //     return result;
  // } else {
  //     return totalGroups;
  // }

  return [
    {
      group_id: -1,
      created_at: '2022-08-10T18:44:34',
      name: 'default',
      leaf_firstn: 'host',
      pools_num: 1,
      vhost_split_num: 1,
      avail_capacity: 1796304630784,
      v_leaf_firstn_num: 3,
      node_count: 3,
      osd_medium_info: [
        // {
        //   block_disk_type: 'HDD',
        //   osd_number: 9,
        // },
      ],
      node_detail: [
        {
          id: 3,
          name: 'ceph1',
          rack: 'rack_0',
          state: 0,
        },
        {
          id: 6,
          name: 'ceph2',
          rack: 'rack_0',
          state: 0,
        },
        {
          id: 4,
          name: 'ceph3',
          rack: 'rack_0',
          state: 0,
        },
      ],
      disk_type: 'HDD',
    },
    {
      group_id: 2,
      created_at: '2022-08-10T18:44:34',
      name: 'NGDS',
      leaf_firstn: 'host',
      pools_num: 1,
      vhost_split_num: 1,
      avail_capacity: 1796304630784,
      v_leaf_firstn_num: 3,
      node_count: 3,
      osd_medium_info: [
        // {
        //   block_disk_type: 'HDD',
        //   osd_number: 9,
        // },
      ],
      node_detail: [
        {
          id: 3,
          name: 'ceph1',
          rack: 'rack_0',
          state: 0,
        },
        {
          id: 6,
          name: 'ceph2',
          rack: 'rack_0',
          state: 0,
        },
        {
          id: 4,
          name: 'ceph3',
          rack: 'rack_0',
          state: 0,
        },
      ],
      disk_type: 'HDD',
    },
  ];
}

function generateResourceGroupDetail(groups: any[], groupId: number, nodeName?: string) {
  let result: any = [];
  const filterdGroup = groups.filter((item) => item.group_id == groupId)?.[0];
  if (!_.isEmpty(filterdGroup)) {
    const nodes = filterdGroup.node_detail;
    if (!_.isEmpty(nodeName)) {
      const filteredNode = _.filter(nodes, (item) => item?.name === nodeName)?.[0];
      if (!_.isEmpty(filteredNode)) {
        let tempNode = {};
        const key = `${filteredNode.name}|${filteredNode.rack}`;
        tempNode[key] = generateResourceGroupOSDs(groupId, nodeName);
        result.push(tempNode);
        result.push(tempNode);
      }
    } else {
      _.forEach(nodes, (item) => {
        let tempNode = {};
        const key = `${item.name}|${item.rack}`;
        tempNode[key] = generateResourceGroupOSDs(groupId, item.name);
        result.push(tempNode);
        result.push(tempNode);
      });
    }
  }
  return result;
}

function getResourceGroups(req: Request, res: Response) {
  const { cluster_id, fuzzy, keyword } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  let result: any = generateResourceGroups(keyword);

  res.send({
    code: '0',
    data: Mock.mock({
      items: result,
      preindex: 1,
      sufindex: 10,
      total: result.length,
    }),
    msg: 'get resource group success',
  });
}

function createResourceGroups(req: Request, res: Response) {
  const { cluster_id, name, disk_type, leaf_firstn } = req.body;
  if (_.isEmpty(cluster_id) || _.isEmpty(name) || _.isEmpty(disk_type) || _.isEmpty(leaf_firstn)) {
    res.sendStatus(400);
  }

  res.send({
    code: '0',
    data: {},
    msg: 'create resource group successfully',
  });
}

function getResourceGroupOSDs(req: Request, res: Response) {
  const { cluster_id, group_id, fuzzy, keyword, preindex, sufindex } = req.query;
  if (_.isEmpty(cluster_id) || _.isEmpty(group_id)) {
    res.sendStatus(400);
  }

  let rgs = generateResourceGroups();
  let result: any = [];

  if (_.isEmpty(fuzzy) || _.isEmpty(keyword)) {
    result = generateResourceGroupDetail(rgs, Number(group_id));
  } else {
    result = generateResourceGroupDetail(rgs, Number(group_id), keyword);
  }

  let total = result?.length;

  if (Number(preindex) > 0 && Number(sufindex) > 0) {
    result = result.slice(Number(preindex) - 1, Number(sufindex));
  }

  res.send({
    code: '0',
    data: {
      items: result,
      preindex: preindex,
      sufindex: sufindex,
      total: total,
    },
    msg: 'get storage unit info successfully',
  });
}

function moveResource(req: Request, res: Response) {
  const { cluster_id, object_type, object_ids, target_group_id, source_group_id, name } = req.body;
  if (_.isEmpty(cluster_id) || _.isEmpty(object_type) || _.isEmpty(object_ids) || _.isEmpty(name)) {
    res.sendStatus(400);
  }
  res.send({
    code: '0',
    data: {
      job_id: 349,
    },
    msg: 'move resource successfully',
  });
}

function deleteResourceGroups(req: Request, res: Response) {
  const { cluster_id, group_id, name } = req.body;
  if (_.isEmpty(cluster_id) || group_id < 1 || _.isEmpty(name)) {
    res.sendStatus(400);
  }

  res.send({
    code: '0',
    data: {},
    msg: 'delete storage group successfully',
  });
}

export default {
  'GET /dsm/storage/group/': getResourceGroups,
  'POST /dsm/storage/group/': createResourceGroups,
  'GET /dsm/storage/group/storage_unit_info/': getResourceGroupOSDs,
  'POST /dsm/storage/group/move/': moveResource,
  'POST /dsm/storage/group/delete/': deleteResourceGroups,
};
