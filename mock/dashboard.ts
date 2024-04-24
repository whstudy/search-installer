import { Request, Response } from 'express';
import _ from 'lodash';
import { mock } from 'mockjs';

const PoolStatus = mock({
  data: {
    health: 2,
    degrade: 1,
    error: 3,
    total: 2,
  },
  code: '0',
  msg: 'successfully',
});

let count = 0;
const NodeStatus = mock({
  data: {
    total: 3,
    health: 2,
    error: 1,
    top_num: 3,
    warning_mem_num: 2,
    warning_cpu_num: 1,
    cpu_threshold: 80,
    mem_threshold: 70,
    top_mem: [
      ['wz-68', 46],
      ['wz-35', 39],
      ['wz-182', 39],
    ],
    top_cpu: [
      ['wz-182', 95],
      ['wz-35', 94],
      ['wz-68', 27],
    ],
  },
  code: '0',
  msg: 'successfully',
});
const resGroupStatus = mock({
  data: [
    ['resGroup-68', 46],
    ['resGroup-35', 39],
    ['resGroup-182', 39],
  ],
  code: '0',
  msg: 'successfully',
});

const poolGroupStatus = mock({
  data: {
    quota_utilization: [
      // ['quota-68', 46],
      // ['quota-35', 39],
      // ['quota-182', 39],
    ],
    capacity_utilization: [
      // ['capacity-182', 95],
      // ['capacity-35', 94],
      // ['capacity-68', 27],
    ],
  },
  code: '0',
  msg: 'successfully',
});

const objectGroupStatus = mock({
  data: {
    bucket_usage: [[{ bucket_name: 'bucket-68', tenant_name: null }, 1029]],
    user_usage: [[{ bucket_name: 'test', tenant_name: 'tenent_user' }, 0]],
  },
  code: '0',
  msg: 'successfully',
});

const DiskStatus = mock({
  data: {
    health: 14,
    error: 0,
    sub_health: 0,
    total: 14,
  },
  code: '0',
  msg: 'successfully',
});

const DiskCapacity = mock({
  data: {
    data_disk: [
      {
        level: 'info',
        name: '<75%',
        value: '@natural(0, 100)',
      },
      {
        level: 'minor',
        name: '70%~85%',
        value: '@natural(0, 100)',
      },
      {
        level: 'major',
        name: '>85%',
        value: '@natural(0, 100)',
      },
    ],
    system_disk: [
      {
        level: 'minor',
        name: '70%~85%',
        value: '@natural(0, 100)',
      },
      {
        level: 'info',
        name: '<70%',
        value: '@natural(0, 100)',
      },
      {
        level: 'major',
        name: '>85%',
        value: '@natural(0, 100)',
      },
    ],
  },
  code: '0',
  msg: 'successfully',
});

const AlertStatus = mock({
  data: {
    critical: '@natural(0, 100)',
    major: '@natural(0, 100)',
    minor: '@natural(0, 100)',
    info: '@natural(0, 100)',
    total: 3,
  },
  code: '0',
  msg: 'successfully',
});

const ClusterCapacity = mock({
  data: {
    total_capacity: 497062731776,
    avail_capacity: 412184870912,
    used_capacity: 84877860864,
  },
  code: '0',
  msg: 'successfully',
});

const SharedDirNum = mock({
  data: {
    count: 100000000,
  },
  code: '0',
  msg: 'successfully',
});

const BucketNum = mock({
  data: {
    bucket_count: '@natural(0, 20)',
    tenant_count: '@natural(0, 20)',
    user_count: '@natural(0, 20)',
  },
  code: '0',
  msg: 'successfully',
});

// 返回的是时间字符串，不是时间戳
function generatePerformanceData(keys: string[], start: number, end: number, interval: number) {
  let pointLength = (end - start) / interval;
  const data: any = [];
  let data0: any = { time: new Date(start) };
  _.forEach(keys, (k) => {
    data0[k] = _.random() * 300;
  });
  data.push(data0);
  for (let i = 1; i < Math.floor(pointLength); i++) {
    const now = new Date((start += interval));
    let temp: any = { time: now };
    _.forEach(keys, (k) => {
      temp[k] = _.round((_.random() - 0.3) * 20 + data[i - 1]?.[k]);
    });
    data.push(temp);
  }
  return data;
}

const CifsNfsClients = mock({
  data: {
    nfs_clients_num: '@natural(0, 20)',
    cifs_clients_num: '@natural(0, 20)',
    ftp_clients_num: '@natural(0, 20)',
  },
  code: '0',
  msg: 'successfully',
});

const SystemDiskList = mock({
  'items|1-8': [
    {
      drive_letter: 'sd-@character',
      node_name: '@string(3,8)',
      node_id: '@id',
      used: '@natural(1000500, 10000000)',
      capacity: '@natural(10000001, 10030000)',
    },
  ],
});

const DiskList = mock({
  'items|1-8': [
    {
      drive_letter: 'sd-@character',
      node_name: 'node-@id',
      node_id: '@id',
      'role|1': ['系统盘', '元数据'],
      'type|1': ['HDD', 'SSD', 'NVME'],
      'position|1': ['前面板', '后面板'],
      capacity: '@natural(1000500, 10000000)',
      slot: '@natural(1,9)-@natural(5, 12)-@natural(8-24)',
      'status|1': ['health', 'error', 'sub_health'],
    },
  ],
});

function getDiskCapacity(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(DiskCapacity);
}

function getPoolStatus(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(PoolStatus);
}

function getNodeStatus(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  // 模拟数据刷新后变化
  if (count) {
    NodeStatus.data.cpu_threshold = 30 + count * 5;
    NodeStatus.data.mem_threshold = 45 + count * 4;
    NodeStatus.data.warning_mem_num = 2 + count * 2;
    NodeStatus.data.warning_cpu_num = 4 + count * 1;
  }
  count += 1;

  res.send(NodeStatus);
}
function getResGroup(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(resGroupStatus);
}

function getPoolGroup(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(poolGroupStatus);
}
function objectGroup(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(objectGroupStatus);
}

function getDiskStatus(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(DiskStatus);
}

function getAlertStatus(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(AlertStatus);
}

function getClusterCapacity(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(ClusterCapacity);
}

function getDashboardPerformance(req: Request, res: Response) {
  // is_dashboard: true
  // cluster_id: 535fdcf2-3e06-11ec-b9f2-5aaa3fd4af6d
  // monitor_db: cluster
  // time_from: 1639375478
  // time_till: 1639375483
  // monitor_item: riops,wiops,recover_iops,rbw,wbw,recover_bw
  const { cluster_id, monitor_item, time_from, time_till, interval } = req.query;
  if (
    _.isEmpty(cluster_id) ||
    _.isEmpty(monitor_item) ||
    _.isEmpty(time_from) ||
    _.isEmpty(time_till)
    // _.isEmpty(interval)
  ) {
    res.sendStatus(400);
  }

  const dataItems = generatePerformanceData(
    (monitor_item as string)!.split(','),
    Number(time_from) * 1000,
    Number(time_till) * 1000,
    _.isEmpty(interval) ? 5 * 1000 : Number(interval) * 1000,
  );

  res.send(
    mock({
      code: '0',
      data: {
        items: dataItems,
      },
      msg: 'get performance data successful!',
    }),
  );
}

function getCifsNfsClients(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(CifsNfsClients);
}

function getSharedDirNum(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(SharedDirNum);
}

function getBucketNum(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(BucketNum);
}

function getSystemDiskListByCapacity(req: Request, res: Response) {
  const { cluster_id, filters } = req.query;
  if (_.isEmpty(cluster_id) || _.isEmpty(filters)) {
    res.sendStatus(400);
  }

  res.send({
    code: '0',
    msg: 'get system disk list successfully',
    data: {
      items: SystemDiskList.items,
      preindex: 1,
      sufindex: 10,
      total: SystemDiskList.items.length,
    },
  });
}

function getDiskList(req: Request, res: Response) {
  const { cluster_id } = req.query;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send({
    code: '0',
    msg: 'get system disk list successfully',
    data: {
      items: DiskList.items,
      preindex: 1,
      sufindex: 10,
      total: DiskList.items.length,
    },
  });
}

function getProtocol(req: Request, res: Response) {
  const { cluster_id, protocol } = req.query;
  if (_.isEmpty(cluster_id) || _.isEmpty(protocol)) {
    res.sendStatus(400);
  }

  const clients = mock({
    'items|0-26': [
      {
        remote_ip: '@ip',
        local_ip: '@ip',
        servername: '@name',
        protocol: protocol,
        read_bytes: '@natural(10240, 23456)',
        write_bytes: '@natural(10240, 23456)',
      },
    ],
  });

  res.send({
    code: '0',
    msg: 'get system disk list successfully',
    data: {
      items: clients.items,
      preindex: 1,
      sufindex: 10,
      total: clients.items.length,
    },
  });
}

function getFtpInfo(req: Request, res: Response) {
  const { cluster_id, protocol } = req.query;
  if (_.isEmpty(cluster_id) || _.isEmpty(protocol)) {
    res.sendStatus(400);
  }

  const Ftps = mock({
    'items|0-13': [
      {
        server_ip: '@ip',
        client_ip: '@ip',
        client_port: '8900',
        server_name: '@name',
      },
    ],
  });

  res.send({
    code: '0',
    msg: 'Query ftp info succeed',
    data: {
      items: Ftps.items,
      preindex: 1,
      sufindex: 10,
      total: Ftps.items.length,
    },
  });
}

export default {
  'GET /dsm/dashboard/pool_status/': getPoolStatus,
  'GET /dsm/dashboard/host_status/': getNodeStatus,
  'GET /dsm/dashboard/disk_status/': getDiskStatus,
  'GET /dsm/dashboard/disk_capacity/': getDiskCapacity,
  'GET /dsm/dashboard/alert_status/': getAlertStatus,
  'GET /dsm/dashboard/cluster_capacity/': getClusterCapacity,
  //   'GET /dsm/perf/': getDashboardPerformance,
  'GET  /dsm/perf/cluster/': getDashboardPerformance,
  'GET /dsm/dashboard/clients/': getCifsNfsClients,
  'GET /dsm/dashboard/shared_dir/': getSharedDirNum,
  'GET /dsm/dashboard/bucket_num/': getBucketNum,
  'GET /dsm/dashboard/system_disk/': getSystemDiskListByCapacity,
  'GET /dsm/dashboard/disk_list/': getDiskList,
  'GET /dsm/dashboard/top_res_group_cap/': getResGroup,
  'GET /dsm/dashboard/top_pool_cap/': getPoolGroup,
  'GET /dsm/dashboard/top_obj_usage/': objectGroup,
  'GET /dsm/protocol/': getProtocol,
  'GET /dsm/protocol/ftp_info/': getFtpInfo,
};
