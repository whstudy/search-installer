import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';
import { postResonse, asyncPostResonse, postResonseFailure } from './utils';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

const Policys = mock([
  {
    'id|+1': 1,
    name: 'policy-@string(5, 10)',
    index_pool: '@name', // 索引池名称
    cache_pool: '@name', // 缓存池名称
    pool_count: '@integer(2, 50)', // 数据池数量
    bucket_count: '@integer(2, 50)', // 桶数量
    'usage_status|1': [0, 1], // 策略使用状态
    create_time: '2020-02-12 10:35:00', // 创建时间
  },
]);

function listPolicy(req: Request, res: Response) {
  const { type } = req.query || {};
  const bbb = [
    ...Policys,
    {
      id: 33,
      name: 'd',
      index_pool: 'd', // 索引池名称
      cache_pool: 'd2', // 缓存池名称
      pool_count: 1, // 数据池数量
      bucket_count: 3, // 桶数量
      usage_status: 0, // 策略使用状态
      creation_time: '2020-02-12 10:35:00', // 创建时间
    },
  ];
  sleep(2, () =>
    res.send({
      data:
        type === 'simpleQuery'
          ? bbb
          : {
              items: bbb,
              total: 20,
              preindex: 1,
              sufindex: 1,
            },
      code: '0',
      msg: 'success',
    }),
  );
}

const pools = mock({
  'cache_pools|10': [
    {
      name: '@name', // 池名
      size: 3, // 副本数
      disk_type: 'ssd', // 数据盘类型
      'used_capacity|1': [75424509, 8504245094, 454245094],
      'total_capacity|1': [754245090, 85042450940, 4542450940], // 总容量
    },
  ],
  'index_pools|5': [
    {
      name: '@name', // 池名
      size: 3, // 副本数
      disk_type: 'ssd', // 数据盘类型
      'used_capacity|1': [75424509, 8504245094, 454245094],
      'total_capacity|1': [754245090, 85042450940, 4542450940], // 总容量
    },
  ],
  'data_pools|5': [
    {
      name: '@name', // 池名
      size: 3, // 副本数
      disk_type: 'ssd', // 数据盘类型
      'used_capacity|1': [75424509, 8504245094, 454245094],
      'total_capacity|1': [754245090, 85042450940, 4542450940], // 总容量
    },
  ],
});

function getpools(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        cache_pools: pools.cache_pools,
        index_pools: pools.index_pools,
        data_pools: pools.data_pools,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

function createPolicy(req: Request, res: Response) {
  let { cluster_id } = req.body;
  if (!_.isEmpty(cluster_id)) {
    sleep(2, () =>
      res.send({
        code: '0',
        msg: 'success',
        data: {},
      }),
    );
  } else {
    res.sendStatus(400);
  }
}

const PolicyInfo = (id, name) => {
  return mock({
    cache_pool: {
      // "name": '@name', // 池名
      // "size": 3, // 副本数
      // "disk_type": "ssd", // 数据盘类型
      // 'pool_status|1': [1, 2, 3],
      // 'used_capacity|1': [75424509, 8504245094, 454245094],
      // 'total_capacity|1': [754245090, 85042450940, 4542450940],// 总容量
    },
    index_pool: {
      name: '@name', // 池名
      size: 3, // 副本数
      disk_type: 'ssd', // 数据盘类型
      'pool_status|1': [1, 2, 3],
      'used_capacity|1': [75424509, 8504245094, 454245094],
      'total_capacity|1': [754245090, 85042450940, 4542450940], // 总容量
    },
    id: Number(id),
    name: name,
    bucket_count: '@integer(2, 50)', // 桶数量
    create_time: '2020-02-12 10:35:00', // 创建时间
  });
};
const PolicyStorage = () => {
  return mock({
    standard: {
      pool_name: '@name', // 池名
      class_id: '@integer(1, 2)', // 存储类别 id
      'pool_compress|1': [0, 1],
      'pool_status|1': [1, 2, 3],
      size: 3, // 副本数
      disk_type: 'NVMe', // 数据盘类型
      'used_capacity|1': [75424509, 8504245094, 454245094],
      'total_capacity|1': [754245090, 85042450940, 4542450940], // 总容量
    },
    standard_ia: {
      // "pool_name": '@name', // 池名
      // "class_id": '@integer(1, 2)', // 存储类别 id
      // 'pool_compress|1': [0, 1],
      // 'pool_status|1': [1, 2, 3],
      // "size": 3, // 副本数
      // "disk_type": "NVMe", // 数据盘类型
      // 'used_capacity|1': [75424509, 8504245094, 454245094],
      // 'total_capacity|1': [754245090, 85042450940, 4542450940],// 总容量
    },
  });
};

function getPolicyInfo(req: Request, res: Response) {
  const { type, id, name } = req.query || {};
  sleep(2, () =>
    res.send({
      data: type === 'info' ? PolicyInfo(id, name) : PolicyStorage(),
      code: '0',
      msg: 'success',
    }),
  );
}

const secondaryList = mock({
  'data|4': [
    {
      'id|+1': 1,
      'status|1': true, // 状态
      'storage_class|1': [
        'CLOUD_OBS_1',
        'CLOUD_OBS_2',
        'CLOUD_OBS_3',
        'CLOUD_AWS_1',
        'CLOUD_AWS_2',
        'CLOUD_AWS_3',
      ], // 存储类别名称
      endpoint: 'http://obs.aa.com', // 访问入口
      region: 'aa', // 区域
      'endpoint_style|1': ['Virtual-Host', 'Path-Style'], // 访问模式
      target_bucket: '@name', // 桶
      'usage_status|1': false, // 使用状态
      access_key: '@string(5, 10)', // 访问密钥
      secret_key: '@string(5, 10)', // 使用状态
      'connect_status|1': [1, 2, 3], // 使用状态
      description: '@string(5, 10)', // 描述
    },
  ],
});

function secondaryStorageList(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      ...secondaryList,
      code: '0',
      msg: 'success',
    }),
  );
}
function secondaryStorageClassList(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        OBS: ['CLOUD_OBS_1', 'CLOUD_OBS_2', 'CLOUD_OBS_3'], // huawei
        AWS: ['CLOUD_AWS_1', 'CLOUD_AWS_2', 'CLOUD_AWS_3'], // aws
      },
      code: '0',
      msg: 'success',
    }),
  );
}

export default {
  'GET /dsm/obj/storage_policy/': listPolicy,
  'GET /dsm/obj/storage_policy/pool/': getpools,
  'POST /dsm/obj/storage_policy/': createPolicy,
  'GET /dsm/obj/storage_policy/info/': getPolicyInfo,
  'POST /dsm/obj/storage_policy/set_compress/': postResonse,
  'POST /dsm/obj/storage_policy/modify/': postResonse,
  'POST /dsm/obj/storage_policy/add_storage_class/': postResonse,
  'POST /dsm/obj/storage_policy/delete/': asyncPostResonse,
  'GET /dsm/obj/secondary_storage/': secondaryStorageList,
  'GET /dsm/obj/secondary_storage/storage_class/': secondaryStorageClassList,
  'POST /dsm/obj/secondary_storage/test_connect/': postResonse,
  'POST /dsm/obj/secondary_storage/modify/': postResonse,
  'POST /dsm/obj/secondary_storage/': postResonse,
  'POST /dsm/obj/secondary_storage/delete/': postResonse,
};
