import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';
import { postResonse, asyncPostResonse, postResonseFailure } from './utils';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

const Buckets = mock({
  'items|20': [
    {
      'id|+1': 1,
      'user_id|+3': 3,
      bucket_name: 'bucket-@string(5, 10)',
      user_name: '@name',
      tenant_name: '@name',
      storage_policy_name: '@name',
      size: '@natural',
      count: '@natural',
      qt_cap: '@natural',
      desc: '@paragraph',
      create_time: '@datetime',
      'update_time|1': [null, '@datetime'],
      used_byte: null,
      used_obj: 10,
      max_byte: 1024,
      max_obj_num: 10000,
      worm_num: '@integer(68, 24855)',
      'worm_unit|1': [0, 1],
      'worm_mode|1': [0, 1],
      'acl_status|0-2': 0,
      multi_version: 0,
      total_capacity: 137055973,
    },
  ],
});

function listBucket(req: Request, res: Response) {
  res.send({
    data: {
      items: Buckets.items,
      total: 20,
      preindex: 1,
      sufindex: 1,
    },
    code: '0',
    msg: 'success',
  });
}

function createBucket(req: Request, res: Response) {
  let { bucket_name } = req.body;
  if (!_.isEmpty(bucket_name)) {
    sleep(2, () =>
      res.send({
        code: '0',
        msg: 'success',
        data: {
          id: Buckets.items.length + 1,
          bucket_name,
        },
      }),
    );
  } else {
    res.sendStatus(400);
  }
}

const BucketInfo = (id) => {
  return mock({
    id: Number(id),
    'user_id|+3': 3,
    bucket_name: 'bucket-@string(5, 10)',
    user_name: '@name',
    tenant_name: '@name',
    storage_policy_name: '@name',
    size: '@natural',
    count: '@natural',
    qt_cap: '@natural',
    desc: '@paragraph',
    create_time: '@datetime',
    'update_time|1': [null, '@datetime'],
    used_byte: null,
    used_obj: 10,
    max_byte: 1024,
    max_obj_num: 10000,
    worm_num: '@integer(68, 24855)',
    'worm_unit|1': [0, 1],
    'worm_mode|1': [0, 1],
    'acl_status|0-2': 0,
    'expand_acl_status|0-1': 0,
    multi_version: 0, // 桶多版本字段解释：0 不开启/ 2 暂停/ 1 启动多版本
    total_capacity: 137055973,
  });
};

function getBucketById(req: Request, res: Response) {
  let cluster_id = req.query?.cluster_id;
  let id = req.query?.bucket_id;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(id)) {
    res.send({
      code: '0',
      msg: 'success',
      data: BucketInfo(req.query?.bucket_id),
    });
  } else {
    res.sendStatus(400);
  }
}

function editBucket(req: Request, res: Response) {
  let { name, desc } = req.body;
  if (!_.isEmpty(name) && !_.isEmpty(desc)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function deleteBucket(req: Request, res: Response) {
  let names = req.body?.names;
  if (!_.isEmpty(names)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function setBucketQuota(req: Request, res: Response) {
  let name = req.body?.name;
  if (!_.isEmpty(name)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

const lifecycles = mock({
  'data|55': [
    {
      'id|+1': 1,
      bucket_id: 2,
      'status|1': [1, 0],
      rule_name: '@name',
      // "rule_prefix": '',
      'rule_prefix|1': ['@string(4, 10)', '*', '@string(800, 1024)'],
      // "rule_tag": [],
      rule_tag: [
        {
          'key|1': ['@string(4, 10)', '@string(2, 128)'],
          'value|1': ['@string(4, 10)', '@string(2, 256)'],
        },
      ],
      'current_object_lifecycle|1': '@integer(1, 0)',
      'current_fragment_lifecycle|1': '@integer(1, 0)',
      'history_object_lifecycle|1': '@integer(1, 0)',
    },
  ],
}).data;

function getLifeCycles(req, res) {
  res.send({
    code: '0',
    msg: 'Query bucket lifecycle success',
    data: {
      items: lifecycles,
      total: lifecycles.length,
      preindex: 1,
      sufindex: 1,
    },
  });
}

const policyList = mock({
  'items|20': [
    {
      'id|+1': 2,
      bucket_id: '@id',
      'effect|0-1': 0,
      policy_name: 'policy1',
      'res_scope_included|0-1': 0,
      'res_scope_bucket|0-1': 0,
      // res_scope_obj: '*',
      res_scope_obj: '321,12,32,5,fds,gfd,f,fd,as',
      'user_included|0-1': 0,
      // obj_user_ids: [3],
      // user_names: '@name,@name',
      user_names: '*',
      'action_included|0-1': 0,
      action_names:
        'DeleteBucket,ListBucket,ListBucketVersions,GetBucketAcl,PutBucketAcl,GetBucketVersioning,PutBucketVersioning,ListBucketMultipartUploads,PutBucketPolicy,GetBucketPolicy,DeleteBucketPolicy,GetBucketLocation,GetBucketPolicyStatus,GetBucketTagging,PutBucketTagging,GetLifecycleConfiguration,PutLifecycleConfiguration,PutBucketObjectLockConfiguration,GetBucketObjectLockConfiguration,GetBucketPublicAccessBlock,PutBucketPublicAccessBlock,DeleteBucketPublicAccessBlock,GetObject,GetObjectVersion,PutObject,GetObjectAcl,GetObjectVersionAcl,PutObjectVersionAcl,PutObjectAcl,GetObjectTagging,PutObjectTagging,DeleteObjectTagging,GetObjectVersionTagging,PutObjectVersionTagging,DeleteObjectVersionTagging,PutObjectRetention,GetObjectRetention,PutObjectLegalHold,GetObjectLegalHold,DeleteObject,DeleteObjectVersion,ListMultipartUploadParts,AbortMultipartUpload',
      condition: [
        ['StringLike', 'CurrentTime', 'aaa'],
        [
          'StringNotLike',
          'EpochTime',
          'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        ],
      ],
    },
  ],
});
function getPolicyList(req, res) {
  const { preindex, sufindex } = req.query;
  setTimeout(() => {
    res.send({
      data: {
        items: policyList.items.slice(preindex - 1, sufindex),
        total: 20,
        preindex: 1,
        sufindex: 1,
      },
      code: '0',
      msg: 'success',
    });
  }, 2000);
}

function geActionList(req, res) {
  res.send({
    data: {
      selected_list: [],
      action_list: [
        {
          id: 1,
          action_name: 'DeleteBucket',
        },
        {
          id: 4,
          action_name: 'ListBucket',
        },
      ],
      policy_id: '',
    },
    code: '0',
    msg: 'success',
  });
}
function getConditionList(req, res) {
  res.send({
    data: {
      operator_list: [
        {
          value: 'StringLike',
          type: 1,
        },
        {
          value: 'StringNotLike',
          type: 2,
        },
      ],
      key_list: [
        {
          value: 'CurrentTime',
          type: 1,
        },
        {
          value: 'EpochTime',
          type: 1,
        },
        {
          value: 'SecureTransport',
          type: 1,
        },
        {
          value: 'SourceIp',
          type: 1,
        },
        {
          value: 'username',
          type: 1,
        },
        {
          value: 'RequestObjectTag/<key>',
          type: 1,
        },
        {
          value: 'prefix',
          type: 2,
        },
      ],
    },
    code: '0',
    msg: 'success',
  });
}

function deleteBucketPolicy(req: Request, res: Response) {
  res.send({
    code: '0',
    msg: 'delete BucketPolicy success',
    data: null,
  });
}
function getBucketQos(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        id: 10,
        total_bandwidth: '0',
        read_bandwidth: '0',
        write_bandwidth: '0',
        total_iops: '0',
        read_iops: '0',
        write_iops: '0',
      },
      code: '0',
      msg: 'success',
    }),
  );
}

const remoteList = mock({
  is_multi_version: false,
  'items|8': [
    {
      'rule_id|+1': 1,
      'object_prefix|1': ['@string(4, 10)', '*', '@string(800, 1024)'], // 前缀
      // 'origin_mode|1': [1, 2, 3], //  int 回源模式 ：1.镜像 2 代理 3.CDN
      origin_mode: 3, //  int 回源模式 ：1.镜像 2 代理 3.CDN
      'platform_type|1': ['AWS', 'OBS'], // 平台类型
      'access_mode|1': [0, 1], // 访问模式 1:'Virtual-Host', 0:'Path-Style'
      access_url: 'http://bucket.obs.aa.comfdsafsafsafdasfsadfdsf.ds', // 访问入口
      target_bucket: '@name', // 桶
      access_key: '@string(5, 10)', // 访问密钥
      secret_key: '@string(5, 10)', // 安全秘钥
      // cache_days:  '@integer(360, 370)',  // 缓存时间
      cache_days: 365, // 缓存时间
      'connect_status|1': [1, 2, 3], // 连通状态
    },
  ],
});

function getRemoteList(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        ...remoteList,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

const bucketSecondary = mock({
  // 'is_standard_ia|1': [true, false],
  is_standard_ia: false,
  'secondary_storage|6': [
    {
      'id|+1': 2,
      storage_class: '@name',
    },
  ],
});
function getBucketSecondary(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      ...bucketSecondary,
      code: '0',
      msg: 'success',
    }),
  );
}
function getBucketAcl(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        acl_status: 1, //0 私有, 1 可读, 2 可读写
        inherit_acl_status: true, //true 继承，false 不继承
      },
      code: '0',
      msg: 'success',
    }),
  );
}

const CorsList = mock({
  'items|5': [
    {
      AllowedOrigins: /^(?![\.])[a-zA-Z0-9-\._@]{1,128}$/,
      AllowedMethods: '9223372036854775807',
      AllowedHeaders: '52428800',
      ExposeHeaders: '800',
      MaxAgeSeconds: '50',
    },
  ],
});

function getCors(req, res) {
  res.send({
    data: CorsList,
    code: '0',
    msg: 'success',
  });
}

function setCors(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'post Tenant User successful',
      data: [
        {
          storage_class: 'aaa',
          used_bytes: 1111,
          used_number: 2222,
        },
        {
          storage_class: 'aaa',
          used_bytes: 1111,
          used_number: 2222,
        },
      ],
    }),
  );
}

export default {
  'GET /dsm/bucket/': listBucket,
  'POST /dsm/bucket/': createBucket,
  'GET /dsm/bucket/info/': getBucketById,
  'POST /dsm/bucket/modify/': editBucket,
  'POST /dsm/bucket/delete/': deleteBucket,
  'POST /dsm/bucket/setquota/': setBucketQuota,
  'GET /dsm/bucket/lifecycle/': getLifeCycles,
  'GET /dsm/bucket/policy/': getPolicyList,
  'GET /dsm/bucket/policy/bucket_action/': geActionList,
  'GET /dsm/bucket/policy/condition/': getConditionList,
  'POST /dsm/bucket/policy/delete/': deleteBucketPolicy,
  'GET /dsm/bucket/getqos/': getBucketQos,
  'POST /dsm/bucket/getqos/': getBucketQos,
  'GET /dsm/object/remote_buckets/': getRemoteList,
  'POST /dsm/object/remote_buckets/': postResonse,
  'POST /dsm/obj/bucket/origin/test_connect/': postResonse,
  'POST /dsm/object/remote_buckets/modify/': postResonse,
  'POST /dsm/object/remote_buckets/delete/': postResonse,
  'GET /dsm/obj/secondary_storage/available_policy/': getBucketSecondary,
  'GET /dsm/bucket/acl_status/': getBucketAcl,
  'POST /dsm/bucket/acl/': postResonse,
  'GET /dsm/object/cors/': getCors,
  'POST /dsm/object/cors/': setCors,
  'GET /dsm/bucket/cloud_volume_statistics/': setCors,
};
