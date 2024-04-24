// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取CORS http://127.0.0.1/dsm/object/cors/ GET /dsm/object/cors/ */
export async function dsmObjectCorsGet(
  params?: {
    // query
    /** 桶id */
    bucket_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.getObjCors & API.RequestExtend>('/dsm/object/cors/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改CORS http://127.0.0.1/dsm/object/cors/ POST /dsm/object/cors/ */
export async function dsmObjectCors(
  body: {
    /** 桶id */
    bucket_id?: number;
    /** 桶名称 */
    bucket_name?: string;
    /** cors列表 */
    items?: {
      AllowedOrigins?: string[];
      AllowedMethods?: string;
      AllowedHeaders?: string;
      ExposeHeaders?: string;
      MaxAgeSeconds?: string;
    }[];
  },
  options?: { [key: string]: any },
) {
  return request<API.getObjCors & API.RequestExtend>('/dsm/object/cors/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶 http://127.0.0.1/dsm/bucket/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/ */
export async function dsmBucketGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 排序字段 */
    sort_field?: string;
    /** 排序规则 */
    sort_rule?: string;
    fuzzy?: string;
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucket & API.RequestExtend>('/dsm/bucket/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建桶 http://127.0.0.1/dsm/bucket/ POST /dsm/bucket/ */
export async function dsmBucket(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 新建桶名称 */
    bucket_name: string;
    /** 对象用户id */
    user_id: number;
    /** 对象服务 容量配额 */
    max_byte?: number;
    /** 对象服务 对象个数配额 */
    max_obj_num?: number;
    /** 桶多版本字段解释：0 不开启/ 2 暂停/ 1 启动多版本 */
    multi_version: number;
    /** true 表示开启, false表示不开启 */
    inherit_acl_status?: boolean;
    /** ACL状态：0 私有/ 1 可读/ 2 可读写 */
    acl_status: number;
    /** 存储策略id */
    storage_policy_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.createBucket & API.RequestExtend>('/dsm/bucket/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶详情 http://127.0.0.1/dsm/bucket/info?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/info/ */
export async function dsmBucketInfoGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 桶ID */
    bucket_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketInfo & API.RequestExtend>('/dsm/bucket/info/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除桶,异步操作 http://127.0.0.1/dsm/bucket/delete/ POST /dsm/bucket/delete/ */
export async function dsmBucketDelete(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 对象桶id，多个用逗号分割 */
    ids: string;
    /** 对象桶名称，多个用逗号分割 */
    names: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketDelete & API.RequestExtend>('/dsm/bucket/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改桶 http://127.0.0.1/dsm/bucket/modify/ POST /dsm/bucket/modify/ */
export async function dsmBucketModify(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 要修改的桶名称 */
    name: string;
    /** 修改描述内容 */
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketModify & API.RequestExtend>('/dsm/bucket/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置桶配额 http://127.0.0.1/dsm/bucket/modify/ POST /dsm/bucket/setquota/ */
export async function dsmBucketSetquota(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 要设置配额的桶名称 */
    bucket_name: string;
    /** 对象桶所属用户id */
    user_id: number;
    /** 容量配额,单位B */
    max_byte: number;
    /** 对象数配额 */
    max_obj_num: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketQuota & API.RequestExtend>('/dsm/bucket/setquota/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 桶多版本设置 http://127.0.0.1/dsm/bucket/version/ POST /dsm/bucket/version/ */
export async function dsmBucketVersion(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 对象桶所属用户id */
    user_id: number;
    /** 要设置配额的桶名称 */
    bucket_name: string;
    /** 对象多版本字段解释：0 不开启/ 2 暂停/ 1 启动多版本 */
    multi_version?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketVersion & API.RequestExtend>('/dsm/bucket/version/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶生命周期 http://127.0.0.1/dsm/bucket/lifecycle/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/lifecycle/ */
export async function dsmBucketLifecycleGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 桶生命周期所属桶id */
    bucket_id: number;
    /** 精确查询的字段及字符串 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucketLifecycle & API.RequestExtend>('/dsm/bucket/lifecycle/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建桶生命周期 http://127.0.0.1/dsm/bucket/lifecycle/ POST /dsm/bucket/lifecycle/ */
export async function dsmBucketLifecycle(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶对象id */
    bucket_id: number;
    /** 生命周期：0 启用/ 1 禁用 */
    status: number;
    /** 生命周期规则名称 */
    rule_name: string;
    /** 生命周期规则前缀 */
    rule_prefix: string;
    /** 生命周期规则标签 */
    rule_tag: { key?: string; value?: string }[];
    /** 当前版本对象生命周期 */
    current_object_lifecycle: number;
    /** 当前版本碎片生命周期 */
    current_fragment_lifecycle: number;
    /** 历史版本生命周期 */
    history_object_lifecycle: number;
    /** 归档生命周期 */
    current_standard_ia_lifecycle?: number;
    /** 次级存储类别id */
    secondary_storage_id?: number;
    /** 次级存储天数 */
    secondary_storage_lifecycle?: number;
    /** 历史归档天数 */
    history_standard_ia_lifecycle?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.createBucketlifecycle & API.RequestExtend>('/dsm/bucket/lifecycle/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑桶生命周期 http://127.0.0.1/dsm/bucket/lifecycle/modify/ POST /dsm/bucket/lifecycle/modify/ */
export async function dsmBucketLifecycleModify(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶对象id */
    bucket_id: number;
    /** 生命周期：0 启用/ 1 禁用 */
    status: number;
    /** 修改前生命周期规则名称 */
    old_rule_name: string;
    /** 生命周期规则名称 */
    rule_name: string;
    /** 生命周期规则前缀 */
    rule_prefix: string;
    /** 生命周期规则标签 */
    rule_tag: { key?: string; value?: string }[];
    /** 当前版本对象生命周期 */
    current_object_lifecycle: number;
    /** 当前版本碎片生命周期 */
    current_fragment_lifecycle: number;
    /** 历史版本生命周期 */
    history_object_lifecycle: number;
    /** 归档生命周期 */
    current_standard_ia_lifecycle?: number;
    /** 次级存储类别id */
    current_secondary_storage_class?: number;
    /** 次级存储天数 */
    current_secondary_storage_lifecycle?: number;
    /** 历史归档天数 */
    history_standard_ia_lifecycle?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketlifecycle & API.RequestExtend>('/dsm/bucket/lifecycle/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除桶生命周期 http://127.0.0.1/dsm/bucket/lifecycle/delete/ POST /dsm/bucket/lifecycle/delete/ */
export async function dsmBucketLifecycleDelete(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶id */
    bucket_id: number;
    /** 生命周期规则名称 */
    rule_name: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.LifecycleDelete & API.RequestExtend>('/dsm/bucket/lifecycle/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶生命周期可选次级存储类别 http://127.0.0.1/dsm/obj/secondary_storage/available_policy/?bucket_id=3 GET /dsm/obj/secondary_storage/available_policy/ */
export async function dsmObjSecondaryStorageAvailablePolicyGet(
  params?: {
    // query
    /** 桶生命周期所属桶id */
    bucket_id: number;
    /** 桶生命周期所用存储策略id */
    policy_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucketSecondaryStorageList & API.RequestExtend>(
    '/dsm/obj/secondary_storage/available_policy/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取桶ACL相关状态 http://127.0.0.1/dsm/bucket/acl/acl_status/?bucket_id=3 GET /dsm/bucket/acl_status/ */
export async function dsmBucketAclStatusGet(
  params?: {
    // query
    /** 桶id */
    bucket_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucketAclInfo & API.RequestExtend>('/dsm/bucket/acl_status/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑桶ACL http://127.0.0.1/dsm/bucket/acl/ POST /dsm/bucket/acl/ */
export async function dsmBucketAcl(
  body: {
    /** 对象桶id */
    bucket_id: number;
    /** 桶名称 */
    bucket_name: string;
    /** 请求来源：acl  / inherit_acl  */
    target: string;
    /** ACL状态：0 私有/ 1 可读/ 2 可读写 */
    acl_status: number;
    /** ACL 继承状态 true:继承; false:不继承 */
    inherit_acl_status: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketacl & API.RequestExtend>('/dsm/bucket/acl/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑桶WORM http://127.0.0.1/dsm/bucket/worm/ POST /dsm/bucket/worm/ */
export async function dsmBucketWorm(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 对象桶所属用户id */
    user_id: number;
    /** 桶名称 */
    bucket_name: string;
    /** WORM保护期 */
    worm_num: number;
    /** WORM保护期的单位：0/天，1/年 */
    worm_unit: number;
    /** WORM模式：0/监管，1/合规 */
    worm_mode: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.bucketworm & API.RequestExtend>('/dsm/bucket/worm/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶策略相关的条件列表 http://127.0.0.1/dsm/bucket/policy/condition/?cluster_id=453477c6-04e0-11ee-97fa-005056850a21 GET /dsm/bucket/policy/condition/ */
export async function dsmBucketPolicyConditionGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucketCondition & API.RequestExtend>('/dsm/bucket/policy/condition/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取桶策略权限列表 http://127.0.0.1/dsm/bucket/policy/bucket_action/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/policy/bucket_action/ */
export async function dsmBucketPolicyBucketActionGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 策略列表id */
    policy_id?: number;
    /** 桶策略权限  1. 桶相关权限 2.对象的相关权限, 3 桶和对象的所有权限 */
    status: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryBucketAction & API.RequestExtend>('/dsm/bucket/policy/bucket_action/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取桶策略列表 http://127.0.0.1/dsm/bucket/policy/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/policy/ */
export async function dsmBucketPolicyGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 桶策略所属桶id */
    bucket_id: number;
    /** 精确查询的字段及字符串 */
    filters?: string;
    /** 分页查询前索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 要排序的字段 */
    sort_field?: string;
    /** 排序规则正序倒序,asc,desc */
    sort_rule?: string;
    /** 模糊查询的字段 */
    fuzzy?: string;
    /** 模糊查询的关键字 */
    keyword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.QueryBucketPolicy & API.RequestExtend>('/dsm/bucket/policy/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建桶策略 http://127.0.0.1/dsm/bucket/policy/ POST /dsm/bucket/policy/ */
export async function dsmBucketPolicy(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶对象id */
    bucket_id: number;
    /** 桶策略名称 */
    policy_name: string;
    /** 桶策略效应，0 拒绝 1 允许 */
    effect: number;
    /** 资源范围桶属性 0 不开启， 1 开启桶属性 */
    res_scope_bucket: number;
    /** 资源范围对象属性 前缀开头/ 全名 / *  */
    res_scope_obj: string;
    /** 被授权用户名称,多个用逗号分隔 */
    user_names: string;
    /** 被授权权限id,多个用逗号分隔 */
    action_id: string;
    /** 是否包含指定桶或对象，1表示包含，0表示排除 */
    res_scope_included: number;
    /** 是否包含指定权限，1表示包含，0表示排除 */
    action_included: number;
    /** 是否包含指定用户，1表示包含，0表示排除 */
    user_included: number;
    /** 条件 */
    condition: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.createBucketPolicy & API.RequestExtend>('/dsm/bucket/policy/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑桶策略 http://127.0.0.1/dsm/bucket/policy/modify/ POST /dsm/bucket/policy/modify/ */
export async function dsmBucketPolicyModify(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶策略ID */
    id: number;
    /** 桶策略名称 */
    policy_name: string;
    /** 桶策略效应，0 拒绝 1 允许 */
    effect: number;
    /** 资源范围桶属性 0 不开启， 1 开启桶属性 */
    res_scope_bucket: number;
    /** 资源范围对象属性 前缀开头/ 全名 / *  */
    res_scope_obj: string;
    /** 被授权用户名称,多个用逗号分隔 */
    user_names: string;
    /** 被授权权限id,多个用逗号分隔 */
    action_id: string;
    /** 是否包含指定桶或对象，1表示包含，0表示排除 */
    res_scope_included: number;
    /** 是否包含指定权限，1表示包含，0表示排除 */
    action_included: number;
    /** 是否包含指定用户，1表示包含，0表示排除 */
    user_included: number;
    /** 条件 */
    condition: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.ModifyBucketPolicy & API.RequestExtend>('/dsm/bucket/policy/modify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除桶策略 http://127.0.0.1/dsm/bucket/policy/delete/ POST /dsm/bucket/policy/delete/ */
export async function dsmBucketPolicyDelete(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 桶策略ids,多个用逗号分隔 */
    ids: string;
    /** 桶策略名称 */
    policy_names?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PolicyDelete & API.RequestExtend>('/dsm/bucket/policy/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置桶Qos http://127.0.0.1/dsm/bucket/setqos/ POST /dsm/bucket/setqos/ */
export async function dsmBucketSetqos(
  body: {
    /** 集群名ID */
    cluster_id: string;
    /** 要设置Qos的桶id */
    id: number;
    /** 要设置Qos的桶名称 */
    bucket_name: string;
    /** 要设置Qos的用户id */
    user_id: number;
    /** 总带宽 */
    total_bandwidth?: string;
    /** 读带宽 */
    read_bandwidth?: string;
    /** 写带宽 */
    write_bandwidth?: string;
    /** 总iops */
    total_iops?: string;
    /** 读iops */
    read_iops?: string;
    /** 写iops */
    write_iops?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.objBucketQos & API.RequestExtend>('/dsm/bucket/setqos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取桶qos http://127.0.0.1/dsm/bucket/getqos/?cluster_id=95b40698-d978-11eb-bd92-66f4c6d99e84 GET /dsm/bucket/getqos/ */
export async function dsmBucketGetqosGet(
  params?: {
    // query
    /** 集群ID */
    cluster_id: string;
    /** 桶ID */
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.getbucketQos & API.RequestExtend>('/dsm/bucket/getqos/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取桶回源规则 http://127.0.0.1/dsm/object/remote_buckets/?bucket_id=2 GET /dsm/object/remote_buckets/ */
export async function dsmObjectRemoteBucketsGet(
  params?: {
    // query
    cluster_id?: string;
    /** 分页查询后索引 */
    preindex?: number;
    /** 分页查询后索引 */
    sufindex?: number;
    /** 用于筛选的关键字 */
    filters?: string;
    /** 桶id */
    bucket_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.queryObjBucketsRmote & API.RequestExtend>('/dsm/object/remote_buckets/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加桶回源规则 http://127.0.0.1/dsm/object/remote_buckets/ POST /dsm/object/remote_buckets/ */
export async function dsmObjectRemoteBuckets(
  body: {
    /** 桶id */
    bucket_id: number;
    /** 桶名称(用于操作记录） */
    name: string;
    /** 前缀 */
    object_prefix: string;
    /** 回源模式 ：1.镜像 2 代理 3.CDN */
    origin_mode: number;
    /** 平台类型 */
    platform_type: string;
    /** 访问模式 0: Path-Style, 1: virtual-host */
    access_mode: number;
    /** 回源路径 */
    access_url: string;
    /** 访问密钥 */
    access_key: string;
    /** 安全密钥 */
    secret_key: string;
    /** 目标存储桶 */
    target_bucket: string;
    /** 缓存时间（仅访问模式为 CDN 时需要） */
    cache_days?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>('/dsm/object/remote_buckets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改桶回源规则 http://127.0.0.1/dsm/object/remote_buckets/modify/ POST /dsm/object/remote_buckets/modify/ */
export async function dsmObjectRemoteBucketsModify(
  body: {
    /** 桶id */
    bucket_id: number;
    /** 桶名称(用于操作记录） */
    name: string;
    /** 桶回源规则id */
    rule_id: number;
    /** 前缀 */
    object_prefix: string;
    /** 回源模式 ：1.镜像 2 代理 3.CDN */
    origin_mode: number;
    /** 平台类型 */
    platform_type: string;
    /** 访问模式 0: Path-Style, 1: virtual-host */
    access_mode: number;
    /** 回源路径 */
    access_url: string;
    /** 访问密钥 */
    access_key: string;
    /** 安全密钥 */
    secret_key: string;
    /** 目标存储桶 */
    target_bucket: string;
    /** 缓存时间（仅访问模式为 CDN 时需要） */
    cache_days?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>(
    '/dsm/object/remote_buckets/modify/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除桶回源规则 http://127.0.0.1/dsm/object/remote_buckets/delete/ POST /dsm/object/remote_buckets/delete/ */
export async function dsmObjectRemoteBucketsDelete(
  body: {
    /** 桶id */
    bucket_id: number;
    /** 桶名称(用于操作记录） */
    name: string;
    /** 桶回源规则id */
    rule_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>(
    '/dsm/object/remote_buckets/delete/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 测试桶回源规则连通状态 http://127.0.0.1/dsm/object/remote_buckets/test_connect/ POST /dsm/object/remote_buckets/test_connect/ */
export async function dsmObjectRemoteBucketsTestConnect(
  body: {
    /** 桶id */
    bucket_id: number;
    /** 桶名称(用于操作记录） */
    name: string;
    /** 回源路径 */
    access_url: string;
    /** 访问密钥 */
    access_key: string;
    /** 安全密钥 */
    secret_key: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>(
    '/dsm/object/remote_buckets/test_connect/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 桶详情次级存储同步覆盖/同步删除开关 http://127.0.0.1/dsm/bucket/synchro_switch/ POST /dsm/bucket/synchro_switch/ */
export async function dsmBucketSynchroSwitch(
  body: {
    /** 对象桶id */
    id: number;
    /** 桶名称 */
    name: string;
    /** cover表示同步覆盖 delete表示同步删除 */
    operation: string;
    /** true表示开启，false表示关闭 */
    status: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.OperationResponseInfo & API.RequestExtend>('/dsm/bucket/synchro_switch/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取次级存储统计数据 http://127.0.0.1/dsm/bucket/cloud_volume_statistics/?bucket_id=1 GET /dsm/bucket/cloud_volume_statistics/ */
export async function dsmBucketCloudVolumeStatisticsGet(
  params?: {
    // query
    /** 桶ID */
    bucket_id: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.getbucketCloudStatistics & API.RequestExtend>(
    '/dsm/bucket/cloud_volume_statistics/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
