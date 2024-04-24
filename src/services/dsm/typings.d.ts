declare namespace API {
  type getExa = {
    code?: string;
    msg?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: { test?: string }[] };
  };

  type postExa = {
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type login = {
    /** 0,e12021136,e03021010,e12021135 */
    code?: string;
    data?: {
      deploy_mode?: 'tos' | 'tfs' | 'tfs_tos';
      state_openwizard?: boolean;
      feature_pacs?: boolean;
      feature_tiering?: boolean;
      feature_hdfs?: boolean;
      state_rgw_ready?: boolean;
      state_pwd_changed?: boolean;
      rgw_cache_enabled?: boolean;
      jwt?: string;
      license_cluster?: {
        cluster_name?: string;
        cluster_id?: string;
        license_state?: string;
        days_remaining?: number;
      };
      license_nodes?: {
        license_state?: string;
        node_name?: string;
        days_remaining?: number;
        create_time?: string;
      }[];
      user?: {
        user_id?: string;
        username?: string;
        email?: string;
        is_active?: string;
        role?: string;
      };
    };
    msg?: string;
  };

  type logout = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryViewUser = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: { result?: queryviewuser[]; preindex?: number; sufindex?: number; count?: number };
  };

  type queryviewuser = {
    /** 用户id */
    id: number;
    /** 用户名称 */
    username: string;
    /** 用户email */
    email: string;
    /** 用户角色: user,admin,superadmin */
    role: string;
    /** 是否被禁用 */
    is_active: number;
  };

  type changePasswd = {
    /** 0,e15021142,e03021182,e03031066 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      jwt?: string;
      license_cluster?: Record<string, any>;
      license_nodes?: any[];
    };
  };

  type delViewUser = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type updateViewUser = {
    /** 0,e15021089,e03021010, */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { email?: string; is_active?: string; role?: string };
  };

  type enableViewUser = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type disableViewUser = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type versionInfo = {
    /** 0,e05021162 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { release?: string; version?: string; name_ch?: string; name_en?: string };
  };

  type dashboardCluster = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      time?: string;
      total_capacity?: number;
      avail_capacity?: number;
      used_capacity?: number;
    };
  };

  type dashboardPool = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { health?: number; degrade?: number; error?: number; total?: number };
  };

  type dashboardDisk = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { health?: number; sub_health?: number; error?: number; total?: number };
  };

  type dashboardAlert = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { critical?: number; major?: number; minor?: number; info?: number; total?: number };
  };

  type dashboardHost = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      total?: number;
      error?: number;
      health?: number;
      warning_cpu_num?: number;
      warning_mem_num?: number;
      cpu_threshold?: number;
      mem_threshold?: number;
      top_num?: number;
      top_cpu?: string[][];
      top_mem?: string[][];
    };
  };

  type dashboardresgroup = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 资源组占用率TOP{top_num}的资源组名称及此时占用资源情况 */
    data?: string[][];
  };

  type dashboardpooltop = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { quota_utilization?: string[][]; capacity_utilization?: string[][] };
  };

  type dashboardClusterStaus = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      down_mds?: number;
      down_mon?: number;
      health_mds?: number;
      health_mon?: number;
      down_storage_unit?: number;
      up_storage_unit?: number;
      out_storage_unit?: number;
    };
  };

  type dashboardSnap = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { dirs?: string[]; dirs_num?: number; get_time?: number; snapshots_num?: number };
  };

  type dashboardClient = {
    /** 0,e03021010,e02021077 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { nfs_clients_num?: number; cifs_clients_num?: number; ftp_licents_num?: number };
  };

  type dashboardDiskCapacity = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { data_disk?: dashboarddiskcapacity[]; system_disk?: dashboarddiskcapacity[] };
  };

  type dashboarddiskcapacity = {
    level?: 'major' | 'minor' | 'info';
    name?: string;
    value?: number;
  };

  type dashboardSharedDir = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { count?: number };
  };

  type dashboardBucket = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { bucket_count?: number; tenant_count?: number; user_count?: number };
  };

  type dashboardTopObj = {
    /** 0,e03021010,e05071012 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { bucket_usage?: string[][]; user_usage?: string[][] };
  };

  type dashboardSystemDisk = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: dashboardsystemdisk[]; preindex?: number; sufindex?: number; total?: number };
  };

  type dashboardsystemdisk = {
    /** 盘符 */
    drive_letter: string;
    /** 所属节点名称 */
    node_name: string;
    /** 所属节点id */
    node_id: number;
    /** 盘使用量 */
    used: number;
    /** 盘总容量 */
    capacity: number;
    /** 容量使用等级 */
    status?: string;
  };

  type dashboardDiskList = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: dashboarddisklist[]; preindex?: number; sufindex?: number; total?: number };
  };

  type dashboarddisklist = {
    /** 盘符 */
    drive_letter: string;
    /** 所属节点名称 */
    node_name: string;
    /** 所属节点id */
    node_id: number;
    /** 角色 */
    role?: string;
    /** 类型 */
    type?: string;
    /** 位置 */
    position?: string;
    /** 容量 */
    capacity: number;
    /** 槽位 */
    slot?: string;
    /** 状态 */
    status?: string;
  };

  type queryOSD = {
    /** 0,e01021014,e01021013,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryosd[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryosd = {
    /** 创建时间 */
    created_at: string;
    /** 磁盘SN */
    SN: string;
    /** 盘符 */
    path: string;
    /** 磁盘所属主机id */
    host_id: number;
    /** 所属节点 */
    host_name: string;
    /** 所属资源组 */
    resource_group: string;
    /** 磁盘类型：HDD、SSD等 */
    type: string;
    /** 容量 */
    size: number;
    /** 总容量 */
    total_capacity?: number;
    /** 已用容量 */
    used_capacity?: number;
    /** 使用率 */
    usage?: string;
    /** 磁盘槽位 */
    slot: number;
    /** 磁盘eid */
    eid: string;
    /** 磁盘所属控制器id */
    cid: string;
    /** 位置 */
    enclosure: string;
    /** 磁盘模式：JBOD、RAID等 */
    mode: string;
    /** 磁盘转速 */
    rotate_speed: string;
    /** 存储单元服务状态 */
    status: number;
    /** 健康状态 */
    health_status: number;
    /** 存储单元 */
    name: string;
  };

  type IsolatedOSD = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: isolatedOSD[]; preindex?: number; sufindex?: number; total?: number };
  };

  type isolatedOSD = {
    /** osd名字 */
    name: string;
    /** 状态 */
    status: number;
    /** 主机名字 */
    server_name: string;
    /** 机架 */
    rack: string;
  };

  type startOSD = {
    /** 0,e05021011,e03021010 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type stopOSD = {
    /** 0,e05021011,e03021010 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type moveOSD = {
    /** 0, */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type createResourceGroup = {
    /** 0,e12061026,e03021141,e03021124,e05021011,e03021010 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryResourceGroup = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryresourcegroup[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryresourcegroup = {
    /** 资源组id */
    group_id: number;
    /** 资源组名称 */
    name: string;
    /** 故障域 */
    leaf_firstn: string;
    /** 创建时间 */
    created_at: string;
    /** 存储池数量 */
    pools_num: number;
    /** 节点数量 */
    node_count: number;
    /** 资源组可用容量 */
    avail_capacity: number;
    /** 资源组可用容量（扣除已占用，因tds资源组不可超配而新增字段） */
    avail_capacity_raw: number;
    /** 存储单元对应数据盘介质信息 */
    osd_medium_info: osdMediumInfo[];
    /** 资源组vhost折叠比例 */
    vhost_split_num: number;
    /** 资源组故障域数量 */
    v_leaf_firstn_num: number;
    /** node详情 */
    node_detail: nodeDetail[];
  };

  type osdMediumInfo = {
    /** 存储单元的数据盘介质类型，SSD|HDD|NVME */
    block_disk_type: string;
    /** 存储单元数量 */
    osd_number: number;
  };

  type nodeDetail = {
    /** node id */
    id: number;
    /** 节点名称 */
    name: string;
    /** 节点所在机架 */
    rack: string;
    /** 节点运行状态，0表示运行中，1表示宕机，2表示重启中，3表示关机 */
    state: number;
  };

  type queryResourceGroupStorageUnitInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: nodeStorageUnitMapping; preindex?: number; sufindex?: number };
  };

  type nodeStorageUnitMapping = true;

  type storageUnitInfo = {
    /** storage_unit的id */
    id: number;
    /** storage_unit的名字 */
    name: string;
    /** storage_unit的运行状态，UP = 0, DOWN = 1 */
    status: number;
    /** storage_unit的操作状态，USED = 0, BUILDING = 1, DELETING = 2, MOVING = 3, FREE = 4 */
    state: number;
    /** storage_unit对应主机的name */
    host_name: string;
    /** 待补充 */
    volume: number;
    /** storage_unit对应的资源组id */
    group_id: number;
    /** 待补充 */
    block: string;
    /** 待补充 */
    db: string;
    /** 待补充 */
    wal: string;
    /** osd的类型 */
    type: string;
    /** osd的对应数据盘的类型[health，sub_health，error]-->[健康,亚健康,异常] */
    health_status: string;
  };

  type delResourceGroup = {
    /** 0,e01111060,e16901071,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryAuthorized = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: queryauthorized[];
      preindex?: number;
      sufindex?: number;
      total?: number;
      upgrade?: number;
      revoke?: number;
    };
  };

  type queryauthorized = {
    /** uuid */
    uuid: string;
    /** 节点名称 */
    name: string;
    /** 激活时间 */
    time: number;
    /** KEY */
    key: string;
    /** License类型 */
    type: string;
    /** 节点工作状态,0是在线,1是离线 */
    status: number;
    /** 节点是否允许附加操作的判断标识 */
    additional_button: number;
    /** License状态 */
    license_status: number;
    alertInfo: Queryauthorized;
  };

  type Queryauthorized = Record<string, any>;

  type queryActivation = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryactivation[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryactivation = {
    /** KEY */
    key: string;
    /** 类别 */
    category: number;
    /** 用途 */
    purpose: number;
  };

  type queryCancleNode = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: querycanclenode[]; preindex?: number; sufindex?: number; total?: number };
  };

  type querycanclenode = {
    /** 节点id */
    id: number;
    /** 节点名称 */
    name: string;
    /** KEY */
    key: string;
    /** License类型 */
    type: string;
    /** 节点工作状态 */
    status: number;
    /** 节点激活时间 */
    time: string;
  };

  type queryRecycle = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryrecycle[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryrecycle = {
    /** KEY */
    key: string;
    /** License类型 */
    type: string;
    /** KEY的状态,返回为0(标识为空闲) */
    status: number;
  };

  type queryTrial = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: querytrial[]; preindex?: number; sufindex?: number; total?: number };
  };

  type querytrial = {
    /** 节点名称 */
    name: string;
    /** 试用开始时间 */
    start_time: string;
    /** 剩余天数 */
    left_time: string;
  };

  type queryUnusedkey = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryunusedkey[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryunusedkey = {
    /** KEY */
    key: string;
    /** License类型 */
    type: string;
    /** key的使用情况 */
    status: number;
  };

  type queryLicenseInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      cluster_id?: string;
      cluster_name?: string;
      authorized_node_count?: number;
      activation_node_count?: number;
      probation_node_count?: number;
      free_key_count?: number;
      key_num?: number;
      license_state?: number;
      licensed_user?: string;
      to_be_activated_key?: string;
      left_time?: string;
      waiting_recycling_key?: string;
    };
  };

  type authorizeResult = {
    /** 0,e03021010,e05061008,e03021188,e05021011,e03021197 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { result?: authorizeresult[] };
  };

  type authorizeresult = {
    /** 节点名称 */
    node_name: string;
    /** KEY */
    key: string;
    /** License类型 */
    type: string;
  };

  type clearLicense = {
    /** 0,e05061008 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type docancleLicense = {
    /** 0,e03021010,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { result?: docanclelicense[] };
  };

  type docanclelicense = {
    /** 节点名称 */
    node_name: string;
    /** KEY */
    key: string;
  };

  type recycleKEY = {
    /** 0,e03021010,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { result?: recyclekey[] };
  };

  type recyclekey = {
    /** 节点名称 */
    node_name: string;
    /** KEY */
    key: string;
  };

  type exportLicense = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { license_data?: string; file_name?: string };
  };

  type importLicenseFile = {
    /** 0,e03021010,e05021011,e02031070,e07031247 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      license_id?: string;
      activation_info?: importlicensefileNode[];
      recycle_info?: importlicensefileKey[];
      acertification_failed?: importlicensefileErr[];
    };
  };

  type importlicensefileNode = {
    /** 节点名称 */
    node_name: string;
    /** KEY */
    key: string;
    /** KEY类型 */
    key_type: string;
    /** 节点激活时间 */
    activation_time: string;
    /** 节点标识 */
    node_uuid: string;
  };

  type importlicensefileKey = {
    /** KEY类型 */
    key_type: string;
    /** KEY */
    key: string;
  };

  type importlicensefileErr = {
    /** 节点名称 */
    node_name: string;
    /** KEY */
    key: string;
    /** KEY类型 */
    key_type: string;
  };

  type queryAlert = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: {
        id?: number;
        occur_time?: string;
        severity?: number;
        alert_title?: string;
        entity_attr?: Record<string, any>;
        alerttype_id?: number;
        entity_name?: string;
        entity_type?: number;
        datavalue?: string;
        threshold?: number;
        unit?: string;
        description?: string;
      }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type queryalert = {
    /** 告警id */
    id: number;
    /** 告警触发时间 */
    occur_time: string;
    /** 告警级别 */
    severity: number;
    /** 告警标题 */
    alert_title: string;
    /** 多个属性没有固定格式，不同的告警类型有各自的属性 */
    entity_attr: Record<string, any>;
    /** 告警类型ID */
    alerttype_id: number;
    /** 对象名称 */
    entity_name: string;
    /** 对象类型 */
    entity_type: number;
    /** 告警值 */
    datavalue: string;
    /** 阈值 */
    threshold: number;
    /** 单位 */
    unit: string;
    /** 描述 */
    description: string;
  };

  type clearAlert = {
    /** 0,e03021010,e02091009 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryAlertConf = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryalertconf[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryalertconf = {
    /** 告警配置id */
    id: number;
    /** 告警级别 */
    severity: string;
    /** 告警对象 */
    entity_type: number;
    /** 告警描述 */
    description: string;
    /** 阈值 */
    threshold?: string;
    /** 单位 */
    unit: string;
    /** 是否告警 */
    alert_enabled: number;
    /** 是否可以修改阈值，1可以修改，0不能修改 */
    threshold_switch: number;
  };

  type confAlert = {
    /** 0,e03021010,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type setSnmpv3 = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type getSnmpv3 = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type setSmtpConf = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type testSmtpConf = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: { result?: boolean };
  };

  type getSmtpConf = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type setSmtpMail = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type delSmtpMail = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type getSmtpMail = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryAlertEvents = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryalertevents[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryalertevents = {
    /** 告警id */
    id: number;
    /** 告警清除时间 */
    clear_time: string;
    /** 告警触发时间 */
    occur_time: string;
    /** 告警级别 */
    severity: number;
    /** 告警标题 */
    alert_title: string;
    /** 内部包含属性没有固定格式，不同的告警类型有各自的属性,主要用于对告警进行详细描述 */
    entity_attr: Record<string, any>;
    /** 告警类型ID */
    alerttype_id: number;
    /** 对象名称 */
    entity_name: number;
    /** 对象类型 */
    entity_type: number;
    /** 告警触发当前值 */
    datavalue: string;
    /** 告警触发阈值 */
    threshold: number;
    /** 清除者 */
    clear_executor: string;
    /** 单位 */
    unit: string;
  };

  type exportAlert = {
    /** 0,e03061206,e05061008 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryPoolRecommend = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: Record<string, any> };
  };

  type queryPoolrecommend = {
    /** 推荐配置 */
    n_m_b: Record<string, any>;
  };

  type queryPool = {
    /** o,e05071012,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: querypool[];
      preindex?: number;
      sufindex?: number;
      total?: number;
      pool_used_threshold?: number;
      pool_avail_threshold?: number;
    };
  };

  type querypool = {
    /** 存储池的id */
    id: number;
    /** 存储池的名字 */
    name: string;
    /** 存储池的类型 */
    safe_type: number;
    /** PG数 */
    pg_num: number;
    /** 存储池容量 */
    size: number;
    /** 最小副本 */
    min_size: number;
    /** 数据块数 */
    data_block_num: number;
    /** 校验块数 */
    code_block_num: number;
    /** 资源组的id */
    res_group_id: number;
    /** 存储池配额容量 */
    quota_bytes: number;
    /** 存储池的状态 */
    state: number;
    /** 1:健康  2：异常 3：降级 */
    status?: number;
    /** 资源组的名字 */
    group_name: string;
    /** 已用容量 */
    used_capacity: number;
    /** 总容量 */
    total_capacity: number;
    /** 创建时间 */
    created_at: string;
    /** 存储池用途 1:文件元数据，2: 文件数据 3:文件加速池 4:对象元数据 5：对象数据，6：对象缓存 7:对象索引 */
    purpose: number;
  };

  type createPool = {
    /** 0,e12061026,e03031199,e03031096,e03021095,e03021126,e03021010,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      res_group_id?: number;
      name?: string;
      state?: string;
      pg_num?: number;
      safe_type?: number;
    };
  };

  type delPool = {
    /** 0,e04021187,e01031048,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { cluster_id?: string; pool_id?: number; name?: string };
  };

  type queryHost = {
    /** o,e05071012,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryhost[]; preindex?: number; sufindex?: number; total?: number };
  };

  type hostRole = {
    /** controller => health/warning,  其他服务mon main_mds mds nas mgr同 */
    additionalProperties?: string;
  };

  type queryhost = {
    /** 主机名称 */
    host_id: number;
    /** 主机名称 */
    node_name?: string;
    /** 机架 */
    rack: string;
    /** 状态 */
    running_status: number;
    /** 业务IP */
    public_ip: string;
    /** 操作状态 */
    operation_status: number;
    role: string[];
    /** 存储单元数量 */
    storage_units: string;
    /** 处理器使用率 */
    cpu: string;
    /** 内存使用率 */
    mem: string;
    /** 浮动IP */
    dynamic_ip: string[];
    /** bmc ip */
    ipmi_ip: string;
  };

  type showHostInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      host_id?: number;
      node_name?: string;
      role?: string[];
      rack?: string;
      running_status?: number;
      operation_status?: number;
      public_ip?: string;
      manager_ip?: string;
      cluster_ip?: string;
      cpu?: string;
      cpu_usage?: string;
      mem_size?: number;
      mem_usage?: number;
      os?: string;
      storage_units?: string;
      bmc_ip?: string;
      bmc_port?: number;
    };
  };

  type showHostDiskInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: showhostdiskinfo[]; preindex?: number; sufindex?: number; total?: number };
  };

  type showDiskFree = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: showhostdiskinfo[];
  };

  type dataDiskStatus = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { health?: number; sub_health?: number; error?: number; total?: number };
  };

  type showhostdiskinfo = {
    /** 磁盘SN */
    SN: string;
    /** 盘符 */
    path: string;
    /** 磁盘所属主机id */
    host_id: number;
    /** 磁盘空间 */
    size: string;
    /** 磁盘健康状态 */
    health_status: number;
    /** 磁盘用途：系统盘、空闲盘、数据盘等 */
    purpose: number[];
    /** 磁盘类型：HDD、SSD等 */
    type: string;
    /** 磁盘模式：JBOD、RAID等 */
    mode: string;
    /** 磁盘槽位 */
    slot: number;
    /** 磁盘eid */
    eid: string;
    /** 磁盘所属控制器id */
    cid: string;
    /** 磁盘转速 */
    rotate_speed: string;
    /** 磁盘是否被定位 */
    position_light: boolean;
    /** 盘柜名 */
    enclosure: string;
    /** 创建时间 */
    created_at: string;
    /** 设备类型 */
    interface_type?: string;
    /** 厂商 */
    manufacturer?: string;
    /** 规格 */
    specifications?: string;
    /** 固件版本 */
    firmware?: string;
    /** 总容量 */
    total_capacity?: number;
    /** 已用容量 */
    used_capacity?: number;
    /** 使用率 */
    usage?: string;
  };

  type showHostNicInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      nics?: {
        name?: number;
        roles?: number[];
        ipv4?: string[];
        ipv6?: string[];
        MAC?: string;
        dynamic_ip?: string[];
      }[];
    };
  };

  type modifyBMC = {
    /** 0,e03021010,e05061008,e08121044 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type poweronHost = {
    /** 0,e03021010,e05021011,e05061008 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type shutdownHost = {
    /** 0,e03021010,e05061008,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type restartHost = {
    /** 0,e03021010,e05021011,e05061008 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type setStaticIP = {
    /** 0,e03021010,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type delDisk = {
    /** 0,e03021010,e05021011,e12021161,e03031204 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type loadDisk = {
    /** 0,e03021010,e05021011,e12021161,e03031204 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type lightDisk = {
    /** 0,e03021010,e05021011,e12021161 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type AsyncJobResponses = {
    /** 0,e03021010,e05021011,e12021161 */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type syncResponse = {
    /** 0,e03021010,e05021011,e12021161 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type loginConfig = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { LOGIN_LOCK_TIME?: number; LOGIN_LOCK_COUNT?: number; LOGIN_OBSERVATION_TIME?: number };
  };

  type setloginConfig = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { LOGIN_LOCK_TIME?: number; LOGIN_LOCK_COUNT?: number; LOGIN_OBSERVATION_TIME?: number };
  };

  type queryDir = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: querydir[];
      preindex?: number;
      sufindex?: number;
      total?: number;
      files_count?: number;
    };
  };

  type querydir = {
    /** 目录配额告警情况，0当前目录无配额告警,其他数字同告警severity */
    dir_alert_lv: number;
    /** 目录名称 */
    dir_name: string;
    /** 目录父路径 */
    father_path: string;
    /** 全路径 */
    full_path: string;
    /** 目录权限 */
    rights: string;
    /** 属主id */
    uid: number;
    /** 属组id */
    gid: number;
    /** 存储池 */
    storage_pool: string;
    /** 容量配额 */
    capa_quota: number;
    /** 文件数配额 */
    file_quota: number;
    /** 递归查询目录下子目录数及文件数 */
    file_used: number;
    /** 当前目录是否开启了快照回滚 */
    restore_enabled: boolean;
    /** 当前目录使用的加速池 */
    performance_pool: string;
    /** 当前目录智能分层启用开关 */
    terra_tier_enabled: number;
    /** 当前目录使用的放置策略名称 */
    placement_policy: string;
    /** 当前目录使用的迁移策略名称 */
    migration_policy: string;
    /** 共享协议 */
    share_protocol: string[];
    /** 快照个数 */
    snapshoot_num: number;
    /** 修改时间 */
    LastModified: string;
    /** 创建时间 */
    CreationTime: string;
    /** 目录关联的复制对数量 */
    relationship_count?: string;
  };

  type createDir = {
    /** 0,e03021010,e03021500,e03021127,e04021352,e04021341,e03021343 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type RemoteApplyConfigCheck = {
    /** 0,e03021010,e03021127,e05021011 */
    code?: string;
    msg?: string;
    data?: {
      config_file?: {
        cifs?: Record<string, any>;
        nfs?: Record<string, any>;
        ftp?: Record<string, any>;
      };
      err_data?: Record<string, any>[];
    };
  };

  type RemoteApplyConfigModifyGroup = {
    /** 0,e03021010,e03021127,e05021011 */
    code?: string;
    msg?: string;
    data?: { gid?: number };
  };

  type RemoteApplyConfigModifyUser = {
    /** 0,e03021010,e03021127,e05021011 */
    code?: string;
    msg?: string;
    data?: { gid?: number };
  };

  type RemoteApplyConfigModifyShareName = {
    /** 0,e03021010,e03021127,e05021011 */
    code?: string;
    msg?: string;
    data?: { share_name?: string };
  };

  type LogicDir = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: logicdir[] };
  };

  type logicdir = {
    /** 目录配额告警情况，0当前目录无配额告警,其他数字同告警severity */
    dir_alert_lv: number;
    /** 目录名称 */
    dir_name: string;
    /** 目录父路径 */
    father_path: string;
    /** 全路径 */
    full_path: string;
    /** 共享协议 */
    share_protocol: string[];
    /** 创建时间 */
    CreationTime: string;
  };

  type ModifyWorm = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type SetWorm = {
    /** 0 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type TerraTier = {
    /** 0,e03021010,e01031043,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type modifyDir = {
    /** 0,e03021010,e01031043,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type dirsetquota = {
    /** 0,e03021010,e03021202,e03021203,e01031043,e05021011 */
    code?: string;
    msg?: string;
    data?: { dir_name?: string; parent_path?: string };
  };

  type DirQosData = {
    /** 0,e05021011 */
    code?: string;
    data?: { result?: dirqosdata };
  };

  type dirqosdata = {
    /** iops限制值 */
    iops_limit?: number;
    /** 带宽限制值 */
    bandwidth_limit?: number;
    /** 当前目录是否允许设置iops或者带宽 */
    is_it_set: boolean;
    /** 如果设置过，返回值 1 代表上级设置过，-1 代表下级设置过 */
    is_it_layer: number;
  };

  type dirqos = {
    /** 0,e03021010,e03021202,e03021203,e01031043 */
    code?: string;
    msg?: string;
    data?: { iops_limit?: number; bandwidth_limit?: number };
  };

  type logicdirinfo = {
    /** 0,e03021010,e03021202,e03021203,e01031043 */
    code?: string;
    msg?: string;
    data?: {
      iops?: number;
      bandwidth?: number;
      capa_quota?: number;
      file_quota?: number;
      capa_used?: number;
      file_used?: number;
    };
  };

  type LogicNodeInfo = {
    /** 0,e03021010 */
    code?: string;
    msg?: string;
    data?: { used_cpa?: number; total_cpa?: number; error?: number; sub_health?: number };
  };

  type delDir = {
    /** 0,e03021010,e05021011,e01941176 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type StartWormClock = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { set_worm_clock?: number; worm_clock_time?: string };
  };

  type GetWormClockInfo = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { set_worm_clock?: number; worm_clock_time?: string };
  };

  type GetAllWorms = {
    /** 0 */
    code?: string;
    /** 获取所有worm信息成功或失败的描述 */
    msg?: string;
    data?: { items?: WormInfo[]; preindex?: number; sufindex?: number; total?: number };
  };

  type WormInfo = {
    /** 目录绝对路径 */
    asb_path: string;
    /** 最小保护周期 */
    min_protect_period: number;
    /** 最大保护周期 */
    max_protect_period: number;
    /** 默认保护周期 */
    default_protect_period: number;
    /** 自动锁定时间 */
    lock_period: number;
  };

  type GetOneWormInfo = {
    /** 最小保护周期 */
    min_protect_period: number;
    /** 最大保护周期 */
    max_protect_period: number;
    /** 默认保护周期 */
    default_protect_period: number;
    /** 自动锁定时间 */
    lock_period: number;
    /** 是否允许修改已有的WORM属性，1表示允许，即设置WORM的目录，0表示不允许 */
    allow_modify: number;
    /** 1表示该目录下为空，0表示该目录下不为空 */
    dir_is_null: number;
    /** 已经设置了WORM的目录总数是否大于128，1:大于，0:不大于 */
    more_than_128: number;
  };

  type GetQuotaInfo = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      file_used?: number;
      capacity_used?: number;
      quota_capacity?: number;
      quota_files?: number;
      capacity_threshold?: number;
      files_threshold?: number;
    };
  };

  type checkDir = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { existed?: number };
  };

  type checkDirTree = {
    /** 状态码 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { p?: string; n?: string; c?: Record<string, any> };
  };

  type queryUser = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryuser[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryuser = {
    /** 认证用户id */
    uid: number;
    /** 认证用户名字 */
    name: string;
    /** 认证用户类型:local、LD、LDAP */
    type: string;
    /** 认证用户状态 */
    status: string;
    /** 用户所属用户组id */
    gid: number;
    /** 用户所属用户组 */
    group_name: string;
    /** 容量配额，0表示未设置 */
    capacity_quota: number;
    /** 文件数配额，0表示未设置 */
    file_quota: number;
  };

  type createUser = {
    /** 0,e03021010,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      uid?: number;
      name?: string;
      passwd?: string;
      type?: string;
      status?: string;
      group_id?: number;
      created_at?: string;
    };
  };

  type modifyUser = {
    /** 0,e03021010,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type DelUser = {
    /** 0,e03021010,e05021011,e01941176 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type QueryUserGroupQuota = {
    /** 0, */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: UserGroupQuotaValues[]; preindex?: number; sufindex?: number; total?: number };
  };

  type UserGroupQuotaValues = {
    /** 用户|用户组配额id */
    id: number;
    /** 用户或用户组[user|group] */
    user_group_type: string;
    /** 用户|用户组所属的域[LOCAL|AD|LDAP|NIS] */
    domain_type: string;
    /** 用户|用户组名字 */
    name: string;
    /** 用户|用户组容量配额 */
    capacity: number;
    /** 用户|用户组文件数配额 */
    file_number: number;
    /** 用户|用户组已使用配额容量 */
    used_capacity: number;
    /** 用户|用户组已使用配额文件数 */
    used_file_number: number;
    /** 用户组名字 */
    group_name: string;
  };

  type SetUserGroupQuota = {
    /** 0, */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type ModifyUserGroupQuota = {
    /** 0, */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type DeleteUserGroupQuota = {
    /** 0, */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { job_id?: number };
  };

  type queryCluster = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querycluster[];
  };

  type querycluster = {
    /** 集群id */
    id: string;
    /** 集群名字 */
    name: string;
    /** 集群健康状况 */
    health: string;
    /** 是否是本地集群 */
    is_local: boolean;
    /** 集群IP地址 */
    ip: string;
    /** 自定义标识 */
    customIdentity: string;
    /** 集群总容量 */
    total: number;
    /** 集群描述 */
    desc: string;
    /** 集群健康状态 */
    status: string;
    /** 集群运行状态 */
    state: string;
  };

  type delCluster = {
    /** 0,e03021010,e00061055,e12061026,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type updateClusterName = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type takeoverCluster = {
    /** 0,e03021010,e08021079,e08021186,e03021099,e15021223 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querycluster;
  };

  type getClusterConf = {
    /** 0,e03021010,e12061026,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { NTP_IP?: string; customIdentity?: string };
  };

  type configCluster = {
    /** 0,e03021010,e12061026,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type getHostBmc = {
    /** 0,e03021010,e05061008,e08121044 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { ipmi_ip?: string; ipmi_user?: string; ipmi_pwd?: string; ipmi_port?: string };
  };

  type queryGroup = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: querygroup[]; preindex?: number; sufindex?: number; total?: number };
  };

  type querygroup = {
    /** 认证用户组gid */
    gid: string;
    /** 认证用户组名字 */
    name: string;
    /** 认证用户组类型:local、LD、LDAP */
    type: string;
    /** 认证用户组状态 */
    status: string;
    /** 容量配额,0表示未设置 */
    capacity_quota: number;
    /** 文件数配额,0表示未设置 */
    file_quota: number;
  };

  type createGroup = {
    /** 0,e03021010,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      gid?: number;
      name?: string;
      type?: string;
      status?: string;
      created_at?: string;
      deleted_at?: number;
      updated_at?: string;
    };
  };

  type delGroup = {
    /** 0,e03021010,e05021011,e07021145 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type modifyGroup = {
    /** 0,e03021010,e05021011 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type ModifyData = {
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type modifyData = {
    gid?: number;
    name?: string;
    type?: string;
    created_at?: string;
    deleted_at?: string;
    updated_at?: string;
    status?: string;
  };

  type ResponseData = {
    /** 0,e */
    code?: string;
    msg?: Record<string, any>;
    data?: string;
  };

  type ShareData = {
    /** 共享id */
    id: number;
    /** 集群ID */
    cluster_id: string;
    /** 共享名称 */
    share_name: string;
    /** 共享路径 */
    share_path: string;
    /** 共享类型 */
    type_name: string;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
  };

  type GetShare = {
    /** 0,e05061008 */
    code?: string;
    data?: {
      nfs?: number;
      cifs?: number;
      cifs_path?: string[];
      nfs_path?: string[];
      nfs_version?: string;
      ftp?: number;
    };
    msg?: string;
  };

  type GetCIFSShareData = {
    /** 0,e03021010,e05061008 */
    code?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: ShareData[] };
    msg?: string;
  };

  type GetNFSShareData = {
    /** 0,e03021010,e05061008 */
    code?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: ShareData[] };
    msg?: string;
  };

  type PerformanceData = {
    code?: string;
    msg?: string;
    data?: { items?: performancedata[] };
  };

  type performancedata = {
    time?: string;
    riops?: number;
    wiops?: number;
    recover_iops?: number;
    rbw?: number;
    wbw?: number;
    recover_bw?: number;
  };

  type QueryProtocol = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryprotocol[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryprotocol = {
    /** 客户端ip */
    remote_ip: string;
    /** 本机ip */
    local_ip: string;
    /** 主机名 */
    servername: string;
    /** 协议类型 */
    protocol: string;
    /** 协议带宽读性能值 */
    read_bytes: number;
    /** 协议带宽写性能值 */
    write_bytes: string;
  };

  type PerformanceDirQos = {
    code?: string;
    msg?: string;
    data?: {
      length?: number;
      bandwidth?: { bandwidth?: number; mean?: number; time?: string }[];
      iops?: { mean?: number; iops?: number; time?: string }[];
      client_num?: { client_num?: number; mean?: number; time?: string }[];
    };
  };

  type ApiResponse = {
    code?: number;
    type?: string;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type Snapshot = {
    full_path: string;
    snapshot_name: string;
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type Order = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };

  type GetSortedDir = {
    /** 0 */
    code?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: getsorteddir[] };
    msg?: string;
  };

  type getsorteddir = {
    /** 目录路径 */
    full_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 父路径 */
    father_path: string;
    /** 目录配额告警情况，0当前目录无配额告警,其他数字同告警severity */
    dir_alert_lv: number;
    share_protocol?: string[];
    /** 查询共享为cifs是，将共享名称返回 */
    share_name?: string;
    /** 目录设置的快照数量，当传递参数为snapshot时返回 */
    snapshoot_num?: number;
    /** 目录设置的带宽上限，当传递参数为qos时返回 */
    bandwidth_limit?: number;
    /** 目录设置的iops上限，当传递参数为qos时返回 */
    iops_limit?: number;
    /** 目录设置的容量配额，当传递参数为quota时返回 */
    capa_quota?: number;
    /** 目录设置的文件数配额，当传递参数为quota时返回 */
    file_quota?: number;
    /** 递归统计子目录及文件数，当传递参数为quota时返回 */
    file_used?: number;
    /** 使用加速池的名字 */
    performance_pool?: string;
    /** 放置策略 */
    placement_policy?: string;
    /** 迁移策略 */
    migration_policy?: string;
    /** 数据池名字 */
    data_pool?: string;
    type?: number[];
  };

  type GetDirDetail = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      dir_name?: string;
      father_path?: string;
      storage_pool?: string;
      LastModified?: string;
      CreationTime?: string;
      capa_quota?: number;
      file_quota?: number;
      rights?: string;
      share_protocol?: string[];
      snapshoot_num?: number;
      bandwidth_limit?: number;
      iops_limit?: number;
    };
  };

  type SnapshotRollback = {
    /** 0,e03021010,e05021011,e12021161 */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type GetSnapshotData = {
    /** 0,e05021011 */
    code?: string;
    data?: {
      preindex?: number;
      sufindex?: number;
      total?: number;
      modes?: string[];
      items?: SnapshotData[];
    };
    msg?: string;
  };

  type SnapshotData = {
    /** 快照id */
    snapshot_id: number;
    inode_id: string;
    /** 创建时间 */
    create_time: string;
    size: number;
    /** 快照名称 */
    snap_name: string;
    /** 快照描述 */
    describe: string;
    /** 目录原始路径 */
    initial_path: number;
    /** 是否被共享 */
    is_share: boolean;
    /** source, target */
    role?: string;
    /** 快照类型：others手动快照 / replicated远程复制 / timing定时快照  */
    mode?: string;
    /** 复制对从目录且为处理接管前状态为true，其他都为false */
    share_capability: string;
  };

  type delSnap = {
    /** 0,e05021011,e03021010,e00021207,e04031481,e19031489,e01111139 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type createSnap = {
    /** 0,e05021011,e03021010,e00021209,e00021210,e00021181,e00021208 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type queryDirSnapPolicy = {
    /** 0,e05021011 */
    code?: string;
    msg?: string;
    data?: {
      snap_policy_info?: {
        snap_policy_name?: string;
        mode?: string;
        rules?: {
          mode?: string;
          rule?: { week?: number[]; day?: number; hour?: number; minute?: number; second?: number };
        }[];
        snap_expire_time?: number;
        snap_expire_time_unit?: string;
        snap_policy_enabled?: boolean;
      };
      is_replication_target_dir?: boolean;
      is_restore_on_path_enabled?: boolean;
      is_relationship_on_path_used?: boolean;
    };
  };

  type queryPlacementPolicy = {
    /** 0,e05021011 */
    code?: string;
    msg?: string;
    data?: {
      items?: {
        cluster_id?: string;
        name?: string;
        local_users?: string;
        domain_users?: string;
        local_groups?: string;
        domain_groups?: string;
        is_white_list?: boolean;
        files?: string;
        file_types?: string;
        default_target_type?: string;
        is_default?: boolean;
        associated_dir_count?: number;
        invalid_local_groups?: number;
        invalid_local_users?: number;
      }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type queryMigrationPolicy = {
    /** 0,e05021011 */
    code?: string;
    msg?: string;
    data?: {
      items?: {
        cluster_id?: string;
        name?: string;
        local_users?: string;
        domain_users?: string;
        local_groups?: string;
        domain_groups?: string;
        is_white_list?: boolean;
        creation_time?: number;
        modification_time?: number;
        default_target_type?: string;
        is_default?: boolean;
        associated_dir_count?: number;
        invalid_local_groups?: number;
        invalid_local_users?: number;
      }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type dirSnapPolicyRequestBody = {
    /** 集群ID */
    cluster_id: string;
    /** 父路径 */
    parent_path: string;
    /** 目录名称 */
    dir_name: string;
    /** 快照策略名称 */
    snap_policy_name: string;
    /** 删除时间 */
    snap_expire_time: number;
    /** 删除时间的单位:hour/day/month/year */
    snap_expire_time_unit: string;
    /** 定时快照是否启用，false 为禁用 */
    snap_policy_enabled: boolean;
  };

  type defaultResponseNoData = {
    /** 0,e05021011,e03021010,e00021209,e00021210,e00021181,e00021208 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type GetCIFSShareTargetData = {
    /** 0,e03021010,e05061008 */
    code?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: ShareTargetData[] };
    msg?: string;
  };

  type GetNFSShareTargetData = {
    /** 0,e03021010,e05061008 */
    code?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: ShareTargetData[] };
    msg?: string;
  };

  type ShareTargetData = {
    /** 共享授权id */
    id: number;
    /** 共享id */
    share_id: number;
    /** 集群ID */
    cluster_id: string;
    /** 共享授权名称 */
    target_name: string;
    /** 共享类型 */
    target_type: string;
    /** 权限 */
    rights: string;
    /** 写入模式(NFS共享) */
    advance: string;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
  };

  type ResponseClusterData = {
    code?: string;
    data?: {
      id?: number;
      name?: string;
      addr?: string;
      uuid?: string;
      status?: number;
      state?: number;
      is_local?: boolean;
      health?: string;
      data_total?: number;
      created_at?: string;
      updated_at?: string;
    };
    msg?: string;
  };

  type createCIFS = {
    /** 0,e04031130,e11031129,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: string;
      cluster_id?: string;
      share_name?: string;
      type_name?: string;
      share_path?: number;
      created_at?: string;
      updated_at?: string;
    };
  };

  type createCIFStarget = {
    /** 0,e04031130,e11031129,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      share_id?: string;
      cluster_id?: string;
      target_name?: string;
      target_type?: string;
      rights?: number;
      advance?: number;
      created_at?: string;
      updated_at?: string;
    };
  };

  type createNFStarget = {
    /** 0,e03021010,e04021134,e11021132,e05061008,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      share_id?: string;
      cluster_id?: string;
      target_name?: string;
      target_type?: string;
      rights?: number;
      advance?: number;
      name?: string;
    };
  };

  type modifyCIFStarget = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      share_id?: string;
      cluster_id?: string;
      target_name?: string;
      target_type?: string;
      rights?: number;
      advance?: number;
      created_at?: string;
      updated_at?: string;
    };
  };

  type modifyNFStarget = {
    /** 0,e03021010,e04021134,e11021132,e05061008,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      share_id?: number;
      cluster_id?: string;
      target_name?: string;
      target_type?: string;
      rights?: string;
      advance?: string;
      name?: string;
    };
  };

  type modifyNFS = {
    /** 0,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { share_id?: number; cluster_id?: string; name?: string; nfs_version?: string };
  };

  type delCIFS = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type delCIFSTarget = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type delNFSTarget = {
    /** 0,e05021011,e03021010,e05021104,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type delNFS = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ClearAlert = {
    /** 0为成功，1为部分成功（待定），错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: string[] };
  };

  type jobCensus = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { successful?: number; doing?: number; failed?: number; total?: number };
  };

  type queryJob = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryjob[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryjob = {
    /** 任务Id */
    job_id: string;
    /** 任务名称 */
    job_name: string;
    /** 任务状态 */
    job_status: string;
    /** 创建时间 */
    add_time: string;
    /** 持续时间 */
    duration_time: number;
    /** 进度 */
    progress: string;
    /** 已存在任务名称 */
    name_list: string;
  };

  type queryJobInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      initiator?: string;
      job_name?: string;
      job_status?: string;
      task_info?: string;
      work_id?: number;
      add_time?: string;
      progress?: string;
      duration_time?: number;
      task_list?: string[];
      stage?: string;
      next_job_id?: number;
    };
  };

  type queryJobStatus = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: queryjobstatus[];
  };

  type queryjobstatus = {
    /** 任务id */
    id?: number;
    /** 任务名称 */
    job_name: string;
    /** 任务状态 */
    job_status: string;
    /** 创建时间 */
    add_time: string;
    /** 结束时间 */
    end_time: string;
    /** 任务的当前进程 */
    stage: string;
    /** 任务失败异常信息 */
    task_info: string;
    /** 当前任务结束后的下一个任务id */
    next_job_id: number;
  };

  type operationRecordSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { count?: number; doing?: number; failed?: number; successful?: number };
  };

  type currentAlertSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      total?: number;
      info?: number;
      warning?: number;
      normal?: number;
      important?: number;
      urgent?: number;
    };
  };

  type historyAlertSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      total?: number;
      info?: number;
      warning?: number;
      normal?: number;
      important?: number;
      urgent?: number;
    };
  };

  type alertConfigSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      info?: number;
      warning?: number;
      normal?: number;
      important?: number;
      urgent?: number;
    };
  };

  type DirSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      share_count?: number;
      cifs_count?: number;
      nfs_count?: number;
      ftp_count?: number;
      snap_count?: number;
      quota_count?: number;
      qos_count?: number;
      capacity_threshold?: number;
      files_threshold?: number;
      worm_count?: number;
      terra_tier_count?: number;
    };
  };

  type poolSummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      count?: number;
      replicated?: number;
      erasure?: number;
      health?: number;
      degrade?: number;
      error?: number;
    };
  };

  type queryOperationRecord = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: queryoperationrecord[] };
  };

  type queryoperationrecord = {
    /** 操作记录 Id */
    id: string;
    /** 操作者名称 */
    u_name: string;
    /** 操作 */
    operation: string;
    /** 对象名称 */
    target_names: string;
    /** 操作记录状态 */
    status: string;
    /** 操作开始时间 */
    start_time: string;
    /** 操作结束时间 */
    end_time: string;
  };

  type queryOperationRecordInfo = {
    /** 0为成功，其它错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: string;
      u_name?: string;
      operation?: string;
      target_type?: string;
      target_names?: string;
      status?: string;
      start_time?: string;
      end_time?: string;
    };
  };

  type exportOperationRecord = {
    /** 0,e03061003,e05061008 */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type exportHistoryAlert = {
    example?: string;
  };

  type getADInfo = {
    /** 0,e01061056 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      AD_domain_name?: string;
      AD_domain_server_ip?: string;
      AD_domain_user_name?: string;
      AD_domain_user_pass?: string;
      AD_domain_status?: string;
      other_domain?: string;
    };
  };

  type getLDAPInfo = {
    /** 0,e01061057 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      LDAP_domain_server_ip?: string;
      LDAP_domain_server_port?: string;
      LDAP_domain_base_DN?: string;
      LDAP_domain_status?: string;
      other_domain?: string;
    };
  };

  type testADdomain = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type quitADdomain = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type JoinNISDomain = {
    /** 0,e05021011,e01021109 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type getNISDomainInfo = {
    /** 0,e01061057 */
    code?: string;
    /** 成功或失败的描述,当集群没有加入NIS域时，data为空字典 */
    msg?: string;
    data?: {
      NIS_domain_server_ip?: string;
      NIS_domain_name?: string;
      NIS_domain_status?: string;
      other_domain?: string;
    };
  };

  type testNISdomain = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { test_successful?: boolean };
  };

  type quitNISdomain = {
    /** 0, */
    code?: string;
    msg?: string;
    data?: Record<string, any>;
  };

  type addLDAPdomain = {
    /** 0,e05021011,e01021109 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type testLDAPdomain = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type quitLDAPdomain = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type addNISdomain = {
    /** 0,e01061056 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type asynJobResponse = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { job_id?: string };
  };

  type getCIFSGlobal = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      guest?: string;
      notify?: string;
      oplock?: string;
      signing?: string;
      acl_enabled?: string;
    };
  };

  type getClusterSetting = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { clock_service?: string; show_snapshot?: string };
  };

  type getTieringMigrationCycle = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { migration_cycle?: string };
  };

  type getDNSSetting = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      standby_dns?: string;
      main_dns?: string;
      cluster_dns?: string;
      cluster_dns_domain?: string;
      balance_strategy?: number;
    };
  };

  type getFloatingIP = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { ipv4_list?: string[]; ipv6_list?: string[] };
  };

  type getObjFloatingIP = {
    /** 0,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { ipv4_list?: string[] };
  };

  type setCIFSGlobal = {
    /** 0,e05021011,e01031184,e15031147,e01031073 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type setClusterSetting = {
    /** 0,e05021011,e01031184,e15031154,e01031073 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type setOutsideDNS = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功描述: Set external DNS 192.168.1.1 successfully 或者 设置外部DNS:  192.168.1.1 成功 失败描述：Failed to set external DNS 192.168.1.1 或者 设置外部DNS: 192.168.1.1 失败 */
    msg?: string;
    data?: { main_dns?: string; standby_dns?: string };
  };

  type setClusterDNS = {
    /** 0,e05021011,e03021010 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type addFloatingIP = {
    /** 0,e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type delFloatingIP = {
    /** 0, e05021011, e03021010, e01031184, e01031178, e06031317,e07031169,e01031171,e01031170 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type delObjFloatingIP = {
    /** 0, e05021011, e03021010, e01031184, e01031178, e06031317 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type upgrade = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: Record<string, any>[] };
  };

  type queryadditionkey = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryAdditionkey; upgrade_key?: boolean };
  };

  type queryAdditionkey = Record<string, any>;

  type addadditionkey = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: Record<string, any>[] };
  };

  type removeadditionkey = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type deleteadditionkey = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type queryObjUser = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryobjuser[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryobjuser = {
    /** 用户id */
    id?: number;
    /** 租户名字 */
    tenant_name?: string;
    /** 用户名字 */
    user_name?: string;
    /** 用户邮箱 */
    email?: string;
    /** 用户状态 */
    status?: number;
    /** 是否禁用 */
    suspended?: number;
    /** 创建时间 */
    create_time?: string;
    /** 更新时间 */
    update_time?: string;
    /** 总带宽 */
    total_bandwidth?: string;
    /** 下载带宽 */
    read_bandwidth?: string;
    /** 上传带宽 */
    write_bandwidth?: string;
    /** 总iops */
    total_iops?: string;
    /** 下载iops */
    read_iops?: string;
    /** 上传iops */
    write_iops?: string;
    /** 存储策略名称 */
    storage_policy_name?: string;
    /** 存储策略id */
    storage_policy_id?: string;
  };

  type objGatewayPerf = {
    /** 0 */
    code?: string;
    /** 获取成功或失败的描述 */
    msg?: string;
    /** 性能数据列表 */
    data?: number;
  };

  type objGatewayNodeCandidates = {
    /** 0, e03021500, e05021011 */
    code?: string;
    /** 创建任务成功或失败的描述 */
    msg?: string;
    /** 任务信息 */
    data?: { job_id?: number };
  };

  type createobjgateway = {
    /** 0, e03021500, e05021011 */
    code?: string;
    /** 创建任务成功或失败的描述 */
    msg?: string;
    /** 任务信息 */
    data?: { job_id?: number };
  };

  type queryobjroutercandidates = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryobjroutercandidate[] };
  };

  type queryobjroutercandidate = {
    /** 节点名字 */
    node_name?: string;
    /** 节点对应IPV4网口信息 */
    ipv4?: { interface_name?: string; ip?: string }[];
    /** 节点对应IPV6网口信息 */
    ipv6?: { interface_name?: string; ip?: string }[];
    role_public?: { http_port?: number; https_port?: number };
    role_es?: { http_port?: number; https_port?: number };
    role_data_synchronization?: { http_port?: number; https_port?: number };
  };

  type queryobjgateway = {
    /** 对象网关服务名字 */
    name?: string;
    /** 对象网关服务所在节点名字 */
    node_name?: string;
    /** 对象网关服务状态【health=1，warn=2，err=3】 */
    status?: number;
    /** 对象网关服务对应的https端口号 */
    https_port?: number;
    /** 对象网关服务对应https端口号 */
    http_port?: number;
    /** 对象网关服务当前连接数 */
    concurrent_connections?: number;
    /** 对象网关服务上传带宽 */
    upload_bandwidth?: number;
    /** 对象网关服务下载带宽 */
    download_bandwidth?: number;
    /** 对象网关服务下载iops */
    download_iops?: number;
    /** 对象网关服务上传iops */
    upload_iops?: number;
    /** 创建时间 */
    create_time?: string;
    /** 网关服务角色，返回值是一个list，将来网关服务可能有多个角色【1表示业务】 */
    role?: number;
  };

  type queryobjtenant = {
    /** 用户id */
    id?: number;
    /** 用户名字 */
    tenant_name?: string;
    /** 用户描述 */
    desc?: string;
    /** 容量配额 */
    quota_capacity?: number;
    /** 对象数配额 */
    quota_object?: number;
    /** 用户数量 */
    obj_user_count?: number;
    /** 创建时间 */
    create_time?: string;
    /** 总带宽 */
    total_bandwidth?: string;
    /** 下载带宽 */
    read_bandwidth?: string;
    /** 上传带宽 */
    write_bandwidth?: string;
    /** 总iops */
    total_iops?: string;
    /** 下载iops */
    read_iops?: string;
    /** 上传iops */
    write_iops?: string;
  };

  type createobjtenant = {
    /** 用户名字 */
    tenant_name?: string;
    /** 用户描述 */
    desc?: string;
  };

  type queryObjTenant = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryobjtenant[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryObjTenantInfo = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      cluster_id?: string;
      tenant_name?: string;
      desc?: string;
      quota_object?: number;
      quota_capacity?: number;
      used_quota_capacity?: number;
      used_quota_object?: number;
    };
  };

  type getObjTenantQos = {
    /** 0, e03021010, e01151357, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      total_bandwidth?: string;
      read_bandwidth?: string;
      write_bandwidth?: string;
      total_iops?: string;
      read_iops?: string;
      write_iops?: string;
    };
  };

  type getObjCors = {
    /** 0, e03021010, e01151357, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: {
        AllowedOrigins?: string[];
        AllowedMethods?: string;
        AllowedHeaders?: string;
        ExposeHeaders?: string;
        MaxAgeSeconds?: string;
      }[];
    };
  };

  type createObjTenant = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: createobjtenant;
  };

  type createObjUser = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: queryobjuser;
  };

  type queryObjUserShare = {
    /** 0, e03021010, e01151357, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      share_with_users?: Record<string, any>[];
      share_by_users?: Record<string, any>[];
      tenant_name?: string;
    };
  };

  type setObjUserShares = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type queryObjUserQos = {
    /** 0, e03021010, e01151357, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      total_bandwidth?: string;
      read_bandwidth?: string;
      write_bandwidth?: string;
      total_iops?: string;
      read_iops?: string;
      write_iops?: string;
    };
  };

  type queryObjUserInfo = {
    /** 0, e03021010, e05021011, e11151229, e01151230, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      id?: number;
      tenant_name?: string;
      user_name?: string;
      email?: string;
      suspended?: number;
      max_byte?: number;
      used_cap?: number;
      max_bucket_num?: number;
      used_bucket?: number;
      max_obj_num?: number;
      used_obj?: number;
      create_time?: string;
      storage_policy_name?: string;
      storage_policy_id?: number;
      key?: any;
    };
  };

  type ObjUserSuspended = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ObjTenantDelete = {
    /** 0, e03021010, e05021011. e01151232 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ObjUserDelete = {
    /** 0, e03021010, e05021011. e01151232 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type LifecycleDelete = {
    /** 0, e03021010, e05021011. e01151232 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ObjUserModify = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type querybucket = {
    /** 桶id */
    id?: number;
    /** 桶名字 */
    bucket_name?: string;
    /** 桶所属对象服务用户 */
    user_name?: string;
    /** 桶所属对象服务用户 */
    user_id?: number;
    /** 桶所属对象租户名称 */
    tenant_name?: string;
    /** 已用容量 */
    used_byte?: number;
    /** 当前桶的对象个数 */
    used_obj?: number;
    /** 桶容量配额 -1:不限额 */
    max_byte?: number;
    /** 桶对象配额 -1:不限额 */
    max_obj_num?: number;
    /** 桶多版本: 0/1/2 */
    multi_version?: number;
    /** 桶ACL: 0/1/2 */
    acl_status?: number;
    /** 桶WORM 保护期 */
    worm_num?: number;
    /** 桶WORM保护期单位: 0/天，1/年 */
    worm_unit?: number;
    /** 桶WORM模式: 0/监管，1/合规 */
    worm_mode?: number;
    /** 桶版本号 */
    bucket_version?: string;
    /** 桶最大可用容量 */
    total_capacity?: number;
    /** 创建时间 */
    create_time?: string;
    /** 更新时间 */
    update_time?: string;
    /** 存储策略名称 */
    storage_policy_name?: string;
    /** 存储策略id */
    storage_policy_id?: number;
    /** 是否设置过回源 */
    has_origin?: boolean;
    /** 是否配置过次级存储 */
    is_up_to_cloud?: boolean;
    /** 次级存储同步删除覆盖状态 */
    is_sync_cover?: boolean;
    /** 次级存储同步删除开关状态 */
    is_sync_delete?: boolean;
    /** 占用空间 */
    space_usage?: number;
    origin_info?: {
      mirror_size?: number;
      mirror_num?: number;
      cdn_size?: number;
      cdn_num?: number;
    };
  };

  type querybucketqos = {
    /** 桶id */
    id?: number;
    /** 总带宽 */
    total_bandwidth?: string;
    /** 下载带宽 */
    read_bandwidth?: string;
    /** 上传带宽 */
    write_bandwidth?: string;
    /** 总iops */
    total_iops?: string;
    /** 下载iops */
    read_iops?: string;
    /** 上传iops */
    write_iops?: string;
  };

  type querybucketlist = {
    /** 桶id */
    id?: number;
    /** 桶名字 */
    bucket_name?: string;
    /** 桶所属对象服务用户 */
    user_name?: string;
    /** 桶所属对象服务用户 */
    user_id?: number;
    /** 桶所属对象租户名称 */
    tenant_name?: string;
    /** 已用容量 */
    used_byte?: number;
    /** 当前桶的对象个数 */
    used_obj?: number;
    /** 桶容量配额 -1:不限额 */
    max_byte?: number;
    /** 桶对象配额 -1:不限额 */
    max_obj_num?: number;
    /** 桶多版本: 0/1/2 */
    multi_version?: number;
    /** 桶ACL: 0/1/2 */
    acl_status?: number;
    /** 桶WORM 保护期 */
    worm_num?: number;
    /** 桶WORM保护期单位: 0/天，1/年 */
    worm_unit?: number;
    /** 桶WORM模式: 0/监管，1/合规 */
    worm_mode?: number;
    /** 桶最大可用容量 */
    total_capacity?: number;
    /** 桶版本信息 */
    bucket_version?: string;
    /** 创建时间 */
    create_time?: string;
    /** 更新时间 */
    update_time?: string;
    /** 总带宽 */
    total_bandwidth?: string;
    /** 下载带宽 */
    read_bandwidth?: string;
    /** 上传带宽 */
    write_bandwidth?: string;
    /** 总iops */
    total_iops?: string;
    /** 下载iops */
    read_iops?: string;
    /** 上传iops */
    write_iops?: string;
    /** 存储策略名称 */
    storage_policy_name?: string;
    /** 存储策略id */
    storage_policy_id?: number;
  };

  type querybucketlifecycle = {
    /** 桶生命周期状态 */
    status?: number;
    /** 桶生命周期规则名称 */
    rule_name?: string;
    /** 桶生命周期规则前缀 */
    rule_prefix?: string;
    /** 桶生命周期规则标签 */
    rule_tag?: { key?: string; value?: string }[];
    /** 对象生命周期 */
    current_object_lifecycle?: number;
    /** 碎片生命周期 */
    current_fragment_lifecycle?: number;
    /** 桶生命周期历史版本 */
    history_object_lifecycle?: number;
    /** 归档生命周期 */
    current_standard_ia_lifecycle?: number;
    /** 次级存储类别id */
    current_secondary_storage_class?: number;
    /** 次级存储天数 */
    current_secondary_storage_lifecycle?: number;
    /** 历史归档天数 */
    history_standard_ia_lifecycle?: number;
  };

  type queryBucketSecondaryStorageList = {
    /** true表示有低频池，false表示没有 */
    is_standard_ia?: boolean;
    /** 桶存储策略中可选次级存储 */
    secondary_storage?: { id?: number; storage_class?: string }[];
  };

  type querybucketpolicy = {
    /** 桶策略id */
    id?: number;
    /** 桶id */
    bucket_id?: number;
    /** 桶策略允许状态，0 拒绝/ 1 允许 */
    effect?: number;
    /** 桶策略名称 */
    policy_name?: string;
    /** 桶策略资源范围桶相关 */
    res_scope_bucket?: number;
    /** 桶策略资源范围对象的 */
    res_scope_obj?: string;
    /** 桶策略授权用户名 */
    user_names?: string;
    /** 桶策略权限名称 */
    action_names?: string;
    /** 是否包含指定桶或对象 */
    res_scope_included?: number;
    /** 是否包含指定权限 */
    action_included?: number;
    /** 是否包含指定用户 */
    user_included?: number;
    /** 条件 */
    condition?: Record<string, any>;
  };

  type querybucketaction = {
    /** 桶策略权限id */
    id?: number;
    /** 桶策略权限名称 */
    action_name?: string;
  };

  type querybucketcondition = {
    /** 该运算符/键所属的类型，1表示String，2表示Numeric，3表示Date，4表示Boolean，5表示IP address */
    type?: string;
    /** 运算符/键名称 */
    value?: string;
  };

  type createbucketpolicy = {
    /** 桶策略id */
    id?: number;
    /** 桶对象id */
    bucket_id?: number;
    /** 桶策略名称 */
    policy_name?: string;
    /** 桶策略效应，0 拒绝 1 允许 */
    effect?: number;
    /** 资源范围桶属性 0 不开启， 1 开启桶属性 */
    res_scope_bucket?: number;
    /** 资源范围对象属性 前缀开头/ 全名 / *  */
    res_scope_obj?: string;
    /** 被授权用户名称,多个用逗号分隔 */
    user_names?: string;
    /** 被授权权限id,多个用逗号分隔 */
    action_id?: string;
    /** 包含/排除资源范围，0排除，1包含 */
    res_scope_included?: number;
    /** 包含/排除权限，0排除，1包含 */
    action_included?: number;
    /** 包含/排除用户，0排除，1包含 */
    user_included?: number;
    /** 策略的条件 */
    condition?: Record<string, any>;
  };

  type createBucketPolicy = {
    /** 0, e03021010, e05021011, e11151239, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: createbucketpolicy;
  };

  type ModifyBucketPolicy = {
    /** 0, e03021010, e05021011, e11151239, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type PolicyDelete = {
    /** 0, e03021010, e05021011. e01151232 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type QueryBucketPolicy = {
    /** 0, e03021010, e05021011, e11151239, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querybucketpolicy;
  };

  type modifybucketpolicy = {
    /** 桶策略权限id */
    id?: number;
    /** 桶策略权限名称 */
    action_name?: string;
    /** 桶对象id */
    bucket_id?: number;
    /** 桶策略名称 */
    policy_name?: string;
    /** 桶策略效应，0 拒绝 1 允许 */
    effect?: number;
    /** 资源范围桶属性 0 不开启， 1 开启桶属性 */
    res_scope_bucket?: number;
    /** 资源范围对象属性 前缀开头/ 全名 / *  */
    res_scope_obj?: string;
    /** 被授权用户id,多个用逗号分隔 */
    user_ids?: string;
    /** 被授权权限id,多个用逗号分隔 */
    action_id?: string;
  };

  type queryBucket = {
    /** 0, e03021010, e03000000, e03151235 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: querybucketlist[]; preindex?: number; sufindex?: number; total?: number };
  };

  type bucketInfo = {
    /** 0, e03021010, e03000000, e03151235 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querybucket;
  };

  type getbucketQos = {
    /** 0, e03021010, e01151357, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querybucketqos;
  };

  type queryBucketLifecycle = {
    /** 0, e03021010, e03000000, e03151235 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      multi_version?: number;
      items?: querybucketlifecycle[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type queryBucketAction = {
    /** 0, e03021010, e03000000, e03151235 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: querybucketaction[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryBucketCondition = {
    /** 0, e03021010, e03000000, e03151235 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { operator_list?: querybucketcondition[]; key_list?: querybucketcondition[] };
  };

  type createBucket = {
    /** 0, e03021010, e05021011, e11151239, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querybucket;
  };

  type createBucketlifecycle = {
    /** 0, e03021010, e05021011, e11151239, e12151231 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: querybucketlifecycle;
  };

  type bucketDelete = {
    /** 0, e03021010, e05021011, e01151237 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type bucketModify = {
    /** 0, e03021010, e05021011, e03151236 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ModifyObjTenant = {
    /** 0, e03021010, e05021011, e03151236 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type log = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      log_info?: {
        name?: string;
        start_time?: string;
        end_time?: string;
        last_collection_time?: string;
      };
      log_size?: number;
    };
  };

  type logDownload = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** nginx提供的实际文件下载链接地址 */
    data?: string;
  };

  type logCollectionGet = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { nodes?: { nodename?: string; host_id?: number; status?: string } };
  };

  type logCollectionPost = {
    /** 0, e03021500, e05021011 */
    code?: string;
    /** 创建任务成功或失败的描述 */
    msg?: string;
    /** 任务信息 */
    data?: { job_id?: number };
  };

  type logCollectionCancel = {
    /** 0, e03021010, e05021011 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type createCollection = {
    /** 0, e03021010, e05021011, e03151236 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type configCollectionInfo = {
    /** 0, e03021010, e05021011, e03151236 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type configCollection = {
    /** 0, e03021010, e05021011, e03151236 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type FtpQuery = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type CreateFTPTarget = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type ModifyFTPTarget = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type DeleteFTPTarget = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type GetFTPGlobal = {
    /** 0,e03021094,e03021010,e03031284,e03031285 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type SetFtpGlobal = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 Set FTP global configuration succeeded/failed 配置 FTP 全局参数成功/失败  */
    msg?: string;
    /** 空字典 */
    data?: Record<string, any>;
  };

  type NICPerformanceData = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      length?: number;
      total_num?: number;
      lost?: { time?: string; mean?: number }[];
      delay_time?: { time?: string; mean?: number }[];
      down_bandwidth?: { time?: string; mean?: number }[];
      up_bandwidth?: { time?: string; mean?: number }[];
    };
  };

  type QueryFtpInfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: queryftpinfo[]; preindex?: number; sufindex?: number; total?: number };
  };

  type queryftpinfo = {
    /** 本机ip */
    server_ip: string;
    /** 客户端ip */
    client_ip: string;
    /** 客户端port */
    client_port: string;
    /** 主机名 */
    server_name: string;
  };

  type objQuota = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type objTenantQos = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type objUserQos = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type objBucketQos = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type bucketQuota = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type bucketVersion = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type bucketlifecycle = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type bucketacl = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: queryBucketAclInfo;
  };

  type queryBucketAclInfo = {
    /** ACL:0 私有, 1 可读, 2 可读写 */
    acl_status?: number;
    /** Acl 继承：true 继承，false 不继承 */
    inherit_acl_status?: boolean;
  };

  type bucketworm = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type powerDownInfo = {
    /** 0,e05021011,e03021010,e05021103,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type objhttpsinfo = {
    /** 0,e03021010,e05061008 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { https_set?: number; domain_name?: string; https_port?: string; http_port?: string };
  };

  type defaultInfo = {
    /** 0,e03021316 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      default_pool?: string;
      default_group?: string;
      default_user?: string;
      default_right?: string;
    };
  };

  type GetUgName = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** uid或gid不存在或为空，返回空字符串, 用户组名接口实际返回字段名是group */
    data?: { user?: string; group?: string };
  };

  type getHdfsSetting = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { enable_hdfs?: boolean; hdfs_pool?: string; hdfs_root_dir?: string };
  };

  type getObjDomainName = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      https_set?: number;
      obj_domain_name?: string;
      obj_https?: string;
      obj_http?: string;
      crt_content?: string;
      crt_name?: string;
      crt_source?: string;
    };
  };

  type repClusterConfig = {
    /** 集群名称 */
    rep_cluster_name?: string;
    /** 复制集群uuid */
    rep_cluster_id?: string;
    /** 复制IP池 */
    ip_pool?: string;
    /** ip版本， 4/6 */
    ip_version?: number;
    /** 端口号 */
    port?: number;
    /** 带宽 */
    limit_bandwidth?: number;
    /** 可用IP数 */
    available_ip_count?: number;
    /** 是否存在复制节点 */
    rep_node_count?: number;
    /** 可添加的节点数 */
    rep_node_candidate_count?: number;
  };

  type repClusterConfigResponse = {
    /** '0'是成功 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: repClusterConfig;
  };

  type nodesToRepResponse = {
    /** '0'是成功 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: freeNodesItems[] };
  };

  type freeNodesItems = {
    /** 运行状态，需要正常运行的主机来添加成复制节点 */
    running_status?: number;
    roles?: hostRole;
    /** 机架 */
    rack_name?: string;
    nics?: { name?: string; role?: string }[];
    /** 主机名称 */
    node_name?: string;
  };

  type repNode = {
    /** 复制集群uuid */
    rep_cluster_id?: string;
    /** 使用的复制ip */
    rep_ip?: string;
    /** 端口 */
    rep_port?: string;
    /** 带宽 */
    bandwidth?: number;
    /** 带宽上限 */
    limit_bandwidth?: number;
    rack_name?: string;
    rep_nic?: string;
    rep_service_status?: string;
    name?: string;
    /** 节点健康状态 */
    node_status?: number;
  };

  type listRepedNodesResponse = {
    /** '0'是成功 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: repNode; total?: number; preindex?: number; sufindex?: number };
  };

  type clusterConfigRequestBody = {
    /** 控制端口号 */
    control_port: number;
    /** 数据端口号 */
    port: number;
    /** ip池,地址段，单个IP的列表 */
    ip_pool: string;
    /** 带宽上限 */
    limit_bandwidth?: number;
    /** 初始化操作不传 更新操作必传 */
    rep_cluster_id?: string;
    /** 初始化配置接口需要 */
    cluster_id?: string;
  };

  type repNodeBwMetricResponse = {
    code?: string;
    msg?: string;
    data?: { time?: string; bandwidth?: number; limit_bandwidth?: number }[];
  };

  type GetUserDefaultQuota = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 未设置配额返回0 */
    data?: { capacity_quota?: number; file_quota?: number };
  };

  type SetUserDefaultQuota = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type GetGroupDefaultQuota = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 未设置配额返回0 */
    data?: { capacity_quota?: number; file_quota?: number };
  };

  type SetGroupDefaultQuota = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type relationshipStatistic = {
    code?: string;
    msg?: string;
    data?: {
      total?: number;
      enabled_count?: number;
      paused_count?: number;
      unauthorized_count?: number;
    };
  };

  type relationshipInfoResponse = {
    code?: string;
    msg?: string;
    data?: { total?: number; preindex?: number; sufindex?: number; items?: relationshipInfo[] };
  };

  type pairStatus =
    | 'unauthorized'
    | 'initiating'
    | 'replicating'
    | 'replicated'
    | 'paused'
    | 'cancelled'
    | 'error';

  type relationshipInfo = {
    source_cluster_name?: string;
    /** 复制集群的uuid */
    source_repcluster_uuid?: string;
    source_cluster_ip?: string;
    source_dir?: string;
    source_access_type?: string;
    mirror_cluster_name?: string;
    /** 复制集群的uuid */
    mirror_repcluster_uuid?: string;
    /** 后端首次拿这个值去寻目标集群的ip pool（ip pool为寻址后有效值） */
    mirror_addressed_ip?: string;
    /** 目标端proxy服务的端口号 */
    remote_cluster_control_port?: string;
    mirror_cluster_ip_pool?: string;
    mirror_dir?: string;
    /** 主/备  source|mirror */
    role?: string;
    status?: string;
    relationship_uuid?: string;
    /** 进行态存在进度值, 整数不带百分号 */
    progress?: number;
    mirror_access_type?: string;
    consist_point?: string;
    snapshot_name?: string;
    source_reserved_num?: number;
    mirror_reserved_num?: number;
    sync_source_qos?: boolean;
    sync_source_quota?: boolean;
    copy_on_created?: boolean;
    /** source_to_mirror, mirror_to_source */
    pair_direction?: string;
    /** 是否一键共享过，前端控制一键共享操作 */
    has_remote_apply?: boolean;
    /** 故障中状态是否可以自动恢复，前端手动恢复操作 */
    is_auto_restored?: boolean;
  };

  type relationshipStatusResponse = {
    code?: string;
    msg?: string;
    data?: relationshipStatus[];
  };

  type relationshipProcessData = {
    /** 字节 */
    size_byte?: string;
    file_num?: number;
  };

  type relationshipStatus = {
    status?: string;
    role?: string;
    /** 整数 不带百分号 */
    progress?: number;
    relationship_uuid?: string;
    next_copy_time?: string;
    start_time?: string;
    end_time?: string;
    estimated_seconds?: number;
    /** byte/s */
    average_bandwidth?: number;
    /** 实时带宽值，单位byte/s */
    bandwidth?: number;
    /** 一致性时间点 */
    consist_point?: string;
    snapshot_name?: string;
    /** source_to_mirror, mirror_to_source */
    pair_direction?: string;
    /** 是否一键共享过，前端控制一键共享操作 */
    has_remote_apply?: boolean;
    /** 故障中状态是否可以自动恢复，前端手动恢复操作 */
    is_auto_restored?: boolean;
    written_data?: relationshipProcessData;
    deleted_data?: relationshipProcessData;
    unchanged_data?: relationshipProcessData;
    changed_data?: relationshipProcessData;
    remaining_data?: relationshipProcessData;
  };

  type relationshipMessageResponse = {
    code?: string;
    msg?: string;
    data?: {
      items?: {
        id?: number;
        relationship_uuid?: string;
        source_cluster?: string;
        source_directory?: string;
        mirror_cluster?: string;
        mirror_directory?: string;
        role?: string;
        type?: relationshipMessageActions;
      }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type relationshipMessageActions =
    | 'relationship_rejected'
    | 'relationship_authorizing'
    | 'relationship_deleted';

  type relationshipCapabilityResponse = {
    code?: string;
    msg?: string;
    data?: { relationship_creation?: boolean };
  };

  type mgntIpResponse = {
    code?: string;
    data?: { pair_direction?: string; vip?: string };
    msg?: string;
  };

  type snapshotStrategyListRespone = {
    code?: string;
    msg?: string;
    data?: { preindex?: number; sufindex?: number; total?: number; items?: snapshotStrategy[] };
  };

  type snapshotStrategy = {
    /** 唯一标识 */
    name?: string;
    /** 复制关系对数量 */
    relationship_num?: number;
    /** 使用该策略设置定时快照的目录数量 */
    dir_num?: number;
    /** 指定时间配置明细 与 时间间隔配置明细 */
    rules?: {
      mode?: string;
      rule?: { week?: number[]; day?: number; hour?: number; minute?: number; second?: number };
    }[];
  };

  type modifyStrategyResponse = {
    /** 0,e03021010,e05021011,e12021161 */
    code?: string;
    msg?: string;
    data?: { job_id?: number };
  };

  type DirTierInfoResponse = {
    code?: string;
    msg?: string;
    data?: {
      allow_modify?: boolean;
      replication?: boolean;
      tiering?: boolean;
      over_count?: boolean;
      empty?: boolean;
      version?: boolean;
    };
  };

  type ResourceGroupQosResponse = {
    code?: string;
    msg?: string;
    data?: { qos_strategy?: number; bandwidth?: number; iops?: number };
  };

  type queryObjRouters = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: {
        id?: number;
        name?: string;
        domain_name?: string;
        nodes_count?: number;
        tos_primary_access_floating_ip?: string;
        create_at?: string;
      }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };

  type queryObjRouterNodes = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: { node_name?: string; floating_ip?: string; interface_name?: string }[] };
  };

  type queryObjRouterlicense = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { name?: string; context?: string };
  };

  type queryObjRouterDetail = {
    /** 0 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      name?: string;
      roles_info?: {
        role_public?: {
          http_port?: number;
          https_port?: number;
          domain_http_port?: number;
          domain_https_port?: number;
          primary_access_floating_ip?: string;
          backup_access_floating_ip?: string;
        };
      };
      create_at?: string;
      domain_name?: string;
      load_balance_policy?: string;
      ip_version?: number;
      mode?: string;
    };
  };

  type queryObjStoragePolicy = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { items?: objStoragePolicyItem[]; preindex?: number; sufindex?: number; total?: number };
  };

  type objStoragePolicyItem = {
    /** 存储策略id */
    id: string;
    /** 存储策略名称 */
    name: string;
    /** 索引池名称 */
    index_pool: string;
    /** 缓存池名称 */
    cache_pool: string;
    /** 数据池数量 */
    pool_count: number;
    /** 桶数量 */
    bucket_count: number;
    /** 创建时间 */
    creation_time: string;
    /** 策略使用状态 1表示被使用 0表示未被使用  */
    usage_status: number;
  };

  type CreateObjStoragePolicy = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: objStoragePolicyItem;
  };

  type QueryObjStoragePolicyInfo = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: objStoragePolicyInfo;
  };

  type objStoragePolicyInfo = {
    /** 存储策略id */
    id?: string;
    /** 存储策略名称 */
    name?: string;
    /** 索引池 */
    index_pool?: { name?: objStoragePolicyPoolInfo };
    /** 缓存池 */
    cache_pool?: { name?: objStoragePolicyPoolInfo };
    /** 桶数量 */
    bucket_count?: number;
    /** 创建时间 */
    creation_time?: string;
    standard?: objStoragePolicyStorageClassInfo;
    standard_ia?: objStoragePolicyStorageClassInfo;
  };

  type objStoragePolicyStorageClassInfo = {
    /** 池名称 */
    pool_name?: string;
    /** 数据池是否开启压缩 1表示开启，0表示关闭 */
    pool_compress?: number;
    /** 池健康状态:1:健康/2:异常/3:降级 */
    pool_status?: number;
    /** 数据盘 */
    data_disk?: string;
    /** 副本数 */
    size?: string;
    /** 已用容量 */
    used_capacity?: number;
    /** 总容量 */
    total_capacity?: number;
  };

  type ObjectGatewaySummary = {
    /** 0为成功，错误码为失败 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: { total?: number; warn?: number; err?: number; health?: number };
  };

  type queryObjStoragePolicyPools = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      cache_pools?: objStoragePolicyPoolInfo[];
      index_pools?: objStoragePolicyPoolInfo[];
      data_pools?: objStoragePolicyPoolInfo[];
    };
  };

  type objStoragePolicyPoolInfo = {
    /** 存储池名称 */
    name?: string;
    /** 数据盘 */
    disk_type?: string;
    /** 副本数 */
    size?: string;
    /** 已用容量 */
    used_capacity?: number;
    /** 总容量 */
    total_capacity?: number;
  };

  type queryObjSecondaryStorage = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询存储策略下次级存储信息 */
    data?: ObjSecondaryStorageItemInfo[];
  };

  type ObjSecondaryStorageItemInfo = {
    /** 次级存储的id */
    id?: number;
    /** 状态: true 开启 / false 关闭 */
    status?: boolean;
    /** 存储类别名称 */
    storage_class?: string;
    /** 描述 */
    description?: string;
    /** 访问入口 */
    endpoint?: string;
    /** 区域 */
    region?: string;
    /** 访问模式 */
    endpoint_style?: string;
    /** 访问密钥 */
    access_key?: string;
    /** 目标存储桶 */
    target_bucket?: string;
    /** 连通状态, 已连接: 1 / 已中断:2 / 繁忙: 3 */
    connect_status?: number;
    /** 被使用: true / 没有被使用: false */
    usage_status?: boolean;
  };

  type queryObjSecondaryStorageClass = Record<string, any>;

  type OperationResponseInfo = {
    /** 0, e03021010, e05021011, e11151229, e01151230 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: Record<string, any>;
  };

  type queryObjBucketsRmote = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询桶回源规则信息 */
    data?: ObjBucketsRmoteItemInfo[];
  };

  type ObjBucketsRmoteItemInfo = {
    /** 回源规则的id */
    rule_id?: number;
    /** 前缀 */
    object_prefix?: string;
    /** 回源模式 ：1.镜像 2 代理 3.CDN */
    origin_mode?: number;
    /** 平台类型 */
    platform_type?: string;
    /** 访问模式 0: Path-Style, 1: virtual-host */
    access_mode?: number;
    /** 回源路径 */
    access_url?: string;
    /** 目标桶 */
    target_bucket?: string;
    /** 访问密钥 */
    access_key?: string;
    /** 安全秘钥 */
    secret_key?: string;
    /**  缓存时间 */
    cache_days?: number;
    /** 连通状态, 已连接: 1 , 已中断:2 , 繁忙: 3 */
    connect_status?: number;
  };

  type getbucketCloudStatistics = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询桶次级存储统计信息 */
    data?: { storage_class?: string; used_bytes?: number; used_number?: number }[];
  };

  type getWizardObjTaskStatus = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询对象配置任务状态 */
    data?: {
      object_initialize?: number;
      res_group?: number;
      pool?: number;
      object_gateway?: number;
      object_router?: number;
      storage_policy?: number;
      object_user?: number;
    };
  };

  type objOperationGuidance = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询对象配置任务状态 */
    data?: {
      initialize?: number;
      gateway?: number;
      router?: number;
      storage_policy?: number;
      object_user?: number;
    };
  };

  type wizardObjNodeInfo = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    data?: {
      items?: {
        node_name?: string;
        ipv4?: { interface_name?: string; static_ip?: string };
        ipv6?: { interface_name?: string; static_ip?: string };
      }[];
    };
  };

  type logicBucketInfo = {
    /** 桶id */
    id?: number;
    /** 桶名字 */
    bucket_name?: string;
    /** 桶所属对象服务用户 */
    user_name?: string;
    /** 桶所属对象租户名称 */
    tenant_name?: string;
  };

  type LogicBucketList = {
    /** 0, e03021010, e03000000, e03151226 */
    code?: string;
    /** 成功或失败的描述 */
    msg?: string;
    /** 查询桶的相关结果 */
    data?: logicBucketInfo[];
  };

  type GlobalSearchResult = {
    code?: string;
    msg?: string;
    data?: {
      summary?: {
        share_dir?: number;
        file_user?: number;
        file_group?: number;
        object_bucket?: number;
        object_tenant?: number;
        object_user?: number;
        storage_pool?: number;
        resource_group?: number;
        object_gateway?: number;
        storage_policy?: number;
        host?: number;
      };
      items?: { id?: any; name?: string; resource_type?: string }[];
      preindex?: number;
      sufindex?: number;
      total?: number;
    };
  };
}
