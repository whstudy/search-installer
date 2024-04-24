export default {
  // 对象租户
  'objectTenant.action.creat': 'Creat',
  'objectTenant.action.edit': 'Edit',
  'objectTenant.action.delete': 'Delete',
  'objectTenant.tenant_name': 'Tenant Name',
  'objectTenant.name.search': 'Please input tenant name to search',
  'objectTenant.email': 'Email',
  'objectTenant.userNum': 'Users',
  'objectTenant.desc': 'Description',
  'objectTenant.searchTip': 'Plese input tenant name',
  'objectTenant.action.create': 'Create Tenant',
  'objectTenant.regex.name.invalidMsg':
    'The length is 1~128 characters, and English letters, numbers and "_"',
  'objectTenant.action.delete.title': 'Delete Tenant',
  'objectTenant.action.delete.confirm':
    'The following tenants will be deleted. Once this operation is executed, it cannot be recovered. Are you sure?',
  'objectTenant.action.delete.tip': 'There are users in this tenant, which cannot be deleted',
  'objectTenant.quota_capacity': 'Capacity Quota',
  'objectTenant.used_quota_capacity': 'Capacity Used',
  'objectTenant.quota_object': 'Object Quota',
  'objectTenant.used_quota_object': 'Object Count',
  'objectTenant.action.detail': 'Detail',

  // 性能
  'objectTenant.QOS.bandwidth_info':
    'Tenant QoS controls the data traffic for the specific tenant within 1 second.',
  'objectTenant.QOS.iops_info':
    'Tenant QoS controls the input and output for the specific tenant within 1 second.',

  // 对象用户
  'storage.objectService.user.search.placeholder': 'Please input user name',
  'storage.objectService.user.id': 'ID',
  'storage.objectService.user.user_name': 'User Name',
  'storage.objectService.user.tenant_name': 'Tenant',
  'storage.objectService.user.email': 'Email',
  'storage.objectService.user.status': 'Status',
  'storage.objectService.user.suspended': 'User Status',
  'storage.objectService.user.suspended.1': 'Disabled',
  'storage.objectService.user.suspended.0': 'Enabled',
  'storage.objectService.user.create_time': 'Create Time',
  'storage.objectService.user.update_time': 'Update Time',
  'storage.objectService.user.desc': 'Description',
  'storage.objectService.user.available': 'Available Capacity',
  'storage.objectService.user.bucket_count': 'Number of existing barrels',
  'storage.objectService.user.obj_count': 'Object Count',
  'storage.objectService.user.key': 'Key',
  'storage.objectService.user.key.ak': 'AK',
  'storage.objectService.user.key.sk': 'SK',
  'storage.objectService.user.action.create': 'Create User',
  'storage.objectService.user.action.edit': 'Edit User',
  'storage.objectService.user.action.delete': 'Delete User',
  'storage.objectService.user.action.delete.confirm':
    'The following users will be deleted. Once this operation is executed, it cannot be resumed. Are you sure?',
  'storage.objectService.user.action.enable': 'Enable User:',
  'storage.objectService.user.action.enable.confirm': 'Are you sure to enable following user?',
  'storage.objectService.user.action.disable': 'Disable User:',
  'storage.objectService.user.action.disable.confirm': 'Are you sure to disable following user?',
  'storage.objectService.user.regex.name.invalidMsg':
    'name can only contain case-sensitive letter, number, special characters(@.-_) within 1 to 128, which can not be started with hyphen and dot, and pure number is not acceptable',
  'storage.objectService.user.regex.email.invalidMsg': 'Please enter a valid email address',
  'storage.objectService.regex.desc.invalidMsg':
    'name can only contain letter, number, and special characters(@.-_) within 1 to 128',
  'storage.objectService.objUser': 'Object User',
  'storage.objectService.bucket': 'Bucket',
  'storage.objectService.setQuota': 'Set Quota',
  'storage.objectService.setCapacityQuotaRuleMsg':
    'User capacity quota is less than used capacity, please re-enter.',
  'storage.objectService.setBucketCapacityQuotaRuleMsg':
    'The bucket capacity quota is less than the used capacity, please re-enter.',
  'storage.objectService.setBucketQuotaRuleMsg':
    'Bucket quota is less than the number of existing buckets, please re-enter.',
  'storage.objectService.setBucketObjQuotaRuleMsg':
    'The number of objects in the bucket is less than the number of existing objects, please re-enter',
  'storage.objectService.setObjQuotaRuleMsg':
    'The number of user objects is less than the number of existing objects, please re-enter.',
  'storage.objectService.objQuotaNum': 'Object Quota',
  'storage.objectService.bucketQuota': 'Bucket Quota',
  'storage.objectService.individual': 'individual',
  'storage.objectService.tenThousand': 'ten thousand',
  'storage.objectService.tenMillion': 'ten million',
  'storage.objectService.user.max_byte': 'Capacity Quota',
  'storage.objectService.user.used_cap': 'Capacity Used',
  'storage.objectService.user.max_bucket_num': 'Bucket Quota',
  'storage.objectService.user.used_bucket': 'Bucket Count',
  'storage.objectService.user.max_obj_num': 'Object Quota',
  'storage.objectService.user.used_obj': 'Object Count',
  'storage.objectService.user.details': 'Details',
  'storage.objectService.user.action.detail': 'Details',
  'storage.objectService.user.bucketShare': 'Bucket Sharing',
  'storage.objectService.user.bucketShareInfo':
    'Granting other users the permission to list the buckets under the current user by setting bucket sharing.',
  'storage.objectService.user.authorizedUser': 'Authorized Users',
  'storage.objectService.user.storage_policy_name': 'Default Storage Policy',
  'storage.objectService.user.storage_policy_name.toolTip':
    'The default storage policy for loading buckets by users. When a user creates a bucket using S3 Browser or other clients, their default storage policy will be automatically applied to the bucket.',
  'storage.objectService.user.policy_name.errTip': 'Please select a storage policy',
  'storage.objectService.user.premissions.alreadyShare': 'Grants',
  'storage.objectService.user.premissions.alreadyShareInfo':
    'Other users have been granted permission to list the buckets under the current user.',
  'storage.objectService.user.premissions.beShare': 'Shared',
  'storage.objectService.user.premissions.beShareInfo':
    'The user has the permission to list the buckets under other users.',
  'storage.objectService.user.premissions.shareUser': 'Authorized Users',
  'storage.objectService.user.premissions.sharePMS': 'Permissions',

  // 对象用户性能
  'objectUser.performance.qos.bandwidth_info':
    'User QoS controls the data traffic for the specific user within 1 second.',
  'objectUser.performance.qos.iops_info':
    'User QoS controls the input and output for the specific user within 1 second.',

  // QOS 公共信息
  'object.QOS.label_bandwidth': 'Bandwidth',
  'object.QOS.total_bandwidth': '	Bandwidth Ceiling',
  'object.QOS.write_bandwidth': '	Upload Bandwidth Ceiling',
  'object.QOS.read_bandwidth': 'Download Bandwidth Ceiling',
  'object.QOS.total_iops': 'IOPS Ceiling',
  'object.QOS.write_iops': 'Upload IOPS Ceiling',
  'object.QOS.read_iops': '	Download IOPS Ceiling',
  'object.QOS.input.errTip.iops':
    'Please enter a positive integer within the range of 50 ~ 9223372036854775807',
  'object.QOS.input.errTip.bandwidth.mb':
    'Please enter a positive integer within the range of 50 ~ 8796093022207',
  'object.QOS.input.errTip.bandwidth.gb':
    'Please enter a positive integer within the range of 1 ~ 8589934591',
  'object.QOS.performance.title.down': 'Download',
  'object.QOS.performance.title.up': 'Upload',

  // 对象初始化
  'storage.objectService.tosInit.title': 'Initailize Object Storage',
  'storage.objectService.tosInit.btnInit': 'Initialize',
  'storage.objectService.tosInit.btnRetry': 'Retry',
  'storage.objectService.tosInit.contentFailure':
    'Failed to initailize object storage, please retry!',
  'storage.objectService.tosInit.contentPending.title': 'Initializing, please wait',
  'storage.objectService.tosInit.contentPending': 'To view task details, please go to',
  'storage.objectService.tosInit.contentStart':
    'The metadata pool will be created and the object storage function can only be used after initialization',

  // 网关
  'storage.gateways.checkAll': 'Select all',
  'storage.gateways.nodeEmptyTip': 'Please select node',
  'storage.gateways.httpsPortEmptyTip': 'Please enter HTTPS port',
  'storage.gateways.httpPortEmptyTip': 'Please enter HTTP port',
  'storage.gateways.searchTip': 'Please enter name to search',
  'storage.gateways.business': 'Service',
  'storage.gateways.portSame': 'HTTPS Port and HTTP Port cannot be same',
  'storage.gateways.createGateway': 'Create Gateway',
  'storage.gateways.nodeTip':
    'Note: Creating an object gateway for a single node will create one gateway. If you select multiple nodes, gateways will be created in bulk, and their names will correspond to the tos numbers.',
  'storage.gateways.namePrefix': 'Prefix',
  'storage.gateways.role': 'Role',
  'storage.gateways.gateway': 'Gateway',
  'storage.gateways.warning': 'Warning',
  'storage.gateways.performance': 'Performance',
  'storage.gateways.connection': 'Connections',
  'storage.gateways.node': 'Node',
  'storage.gateways.httpsPort': 'HTTPS Port',
  'storage.gateways.httpPort': 'HTTP Port',
  'storage.gateways.createTime': 'Create Time',

  // 路由
  'storage.route.noNodeTip': 'No available gateway nodes, unable to create HA group',
  'storage.route.DeleteLoadBalancer': 'Delete load balancer',
  'storage.route.ConfirmDeleteLoadBalancer': '	Are you sure to delete load balancer?',
  'storage.route.RD':
    'DR: The client communicates directly with the nodes of the storage system without the involvement of the intermediate nodes',
  'storage.route.FloatingIP': 'Floating IP',
  'storage.route.IPIsRequired': 'IP is required',
  'storage.route.equalizerNeeds': 'Seclect the load balancer',
  'storage.route.least3load': 'Each HA group contains at least 3 load balancers',
  'storage.route.SureDeleteRoute': 'Are you sure you want to delete the HA group?',
  'storage.route.CreateRouter': 'Create HA group',
  'storage.route.LicenseInformation': 'License',
  'storage.route.License': 'License',
  'storage.route.Node': 'Node',
  'storage.route.Network': 'Network',
  'storage.route.NetworkCard': 'Network Card',
  'storage.route.Poll': 'Round Robin',
  'storage.route.BusinessAccessDomainHttpsPort': 'Service Access Domain HTTPS Port',
  'storage.route.BusinessAccessDomainHttpPort': 'Service Access Domain HTTP Port',
  'storage.route.validatorPort.errTip':
    'The port number has been occupied by the gateway, please re-enter',
  'storage.route.BusinessAccessStandbyIP': 'Secondary Service Access',
  'storage.route.BusinessAccessIP': 'Primary Service Access',
  'storage.route.IPType': 'IP Type',
  'storage.route.IPAndDomain': 'IP And Domain',
  'storage.route.ForwardMode': 'Router Mode',
  'storage.route.service': 'Service',
  'storage.route.role': 'Role',
  'storage.route.name': 'Name',
  'storage.route.LoadEquilibriumStrategy': 'Load Balancing Strategy',
  'storage.route.AddLoadEqualizer': 'Add Load Balancers',
  'storage.route.LoadEqualizer': 'Load Balancers',
  'storage.route.domain': 'Domain',
  'storage.route.route': 'High Availability Group',
  'storage.route.err.required': 'This item is required',

  // 存储策略
  'object.storagePolicy.title': 'Storage Policy',
  'object.storagePolicy.table.index_pool': 'Index Pool',
  'object.storagePolicy.table.cache_pool': 'Cache pool',
  'object.storagePolicy.table.cache_pool.tooltip':
    'The cache pool is only available in object mode with TerraAggregation.',
  'object.storagePolicy.table.pool_count': 'Data Pools Count',
  'object.storagePolicy.table.bucket_count': 'Buckets Count',
  'object.storagePolicy.table.operation.deleteTip': '	This policy cannot be deleted while in use.',
  'object.storagePolicy.table.operation.delete.confirmMsg':
    'Are you sure you want to delete this storage policy?',
  'object.storagePolicy.table.operation.delete.loadingMsg': 'Deleting storage policy...',
  'object.storagePolicy.title.create': 'Create Storage Policy',
  'object.storagePolicy.form.labelTip.indexPool':
    'The index pool for storing object index information can only be a replica pool.',
  'object.storagePolicy.form.labelTip.cachePool':
    'This cache pool stores object information smaller than 512KB and can only be a replica pool. The cache pool is only available in object mode with TerraAggregation. ',
  'object.storagePolicy.form.ruleErrTip.policyName':
    'The length should be 1 to 16 characters. Please enter lowercase letters, numbers, "-", or "_".',
  'object.storagePolicy.form.ruleErrTip.indexPool': 'Please select index pool',
  'object.storagePolicy.form.label.clusterStroage': 'Cluster Storage',
  'object.storagePolicy.form.labelTip.clusterStroage':
    'Standard and Standard-IA, with "Standard" selected by default. You can add a data storage pool for each class and configure whether to enable data compression for each pool.',
  'object.storagePolicy.form.stroageTitle.class': 'Class Name',
  'object.storagePolicy.form.stroageTitle.dataPool': 'Data Pool',
  'object.storagePolicy.form.stroageTitle.dataPoolTip':
    'This data pool stores object information larger than or equal to 512KB, and it can be either a replica pool or an EC (Erasure Coding) pool.',
  'object.storagePolicy.form.stroageTitle.compress': 'Data Compression',
  'object.storagePolicy.form.stroageTitle.compressTip':
    'After enabling the object compression, the data written to the object storage will be compressed, resulting in improved utilization of storage space.',
  'object.storagePolicy.form.stroageLabel.standard': 'Standard',
  'object.storagePolicy.form.stroageLabel.standard.toolTip':
    'The Standard storage class features low access latency and high throughput. It is suitable for storing a massive number of hot files.',
  'object.storagePolicy.form.stroageLabel.standard_ia': 'Standard-IA',
  'object.storagePolicy.form.stroageLabel.standard_ia.toolTip':
    'Suitable for archiving data that is rarely-accessed.',
  'object.storagePolicy.storagePool.diskType': 'Data disk:{diskType}',
  'object.storagePolicy.storagePool.safePolicy': 'Security Policy:{size}',
  'object.storagePolicy.storagePool.capacity': 'Available Capacity:{capacity}',
  'object.storagePolicy.clusterStorage.addBtn': 'Add Cluster Storage',
  'object.storagePolicy.clusterStorage.ruleErrTip.dataPool': 'Please select a data pool',
  'object.storagePolicy.confirmDialog.compress.title.open': 'Enable Data Compression',
  'object.storagePolicy.confirmDialog.compress.title.close': 'Disable Data Compression',
  'object.storagePolicy.confirmDialog.compress.content.open':
    'After enabling this feature, any object uploaded to the storage bucket with this policy applied will be automatically compressed before being stored. Are you sure you want to enable data compression?',
  'object.storagePolicy.confirmDialog.compress.content.close':
    'Are you sure to disable data compression?',

  // 次级存储
  'object.secondaryStorage.title': 'Secondary Storage',
  'object.secondaryStorage.aciton.add': 'Add Secondary Storage',
  'object.secondaryStorage.aciton.addBtn': 'Add',
  'object.secondaryStorage.aciton.edit': 'Edit Secondary Storage',
  'object.secondaryStorage.title.actionDisable.edit': 'Editing is not permitted during usage',
  'object.secondaryStorage.title.actionDisable.delete': 'Deleting is not permitted during usage.',
  'object.secondaryStorage.title.storage_class': 'Storage Class',
  'object.secondaryStorage.ruleErr.storage_class': 'Please select a storage class',
  'object.secondaryStorage.title.endpoint': 'Endpoint',
  'object.secondaryStorage.ruleErr.endpoint': 'Please enter the endpoint',
  'object.secondaryStorage.ruleErr.domain': 'Please enter the correct domain name',
  'object.secondaryStorage.ruleErr.domainAndIp': 'Please enter the correct domain name or IP',
  'object.secondaryStorage.ruleErr.ipPort': 'Please enter the correct port number',
  'object.secondaryStorage.title.region': 'Region',
  'object.secondaryStorage.ruleErr.region': 'Up to 128 characters',
  'object.secondaryStorage.editTip.region': 'Automatically match based on input access points',
  'object.secondaryStorage.title.endpoint_style': 'Mode',
  'object.secondaryStorage.title.target_bucket': 'Target Bucket',
  'object.secondaryStorage.form.target_bucket': 'Target Bucket',
  'object.secondaryStorage.ruleErr.target_bucket': 'Character length is 3~63',
  'object.secondaryStorage.ruleErr.target_bucket.host':
    'The bucket name verification failed in the current access mode. Please enter an access entry without a bucket name, and use the "Path Style" mode to re-enter the bucket name',
  'object.secondaryStorage.editTip.target_bucket':
    'Automatically matched based on the input access entry',
  'object.secondaryStorage.title.connect_status': 'Connection',
  'object.secondaryStorage.status.default': 'Not tested',
  'object.secondaryStorage.status.connected': 'Connected',
  'object.secondaryStorage.status.disconnected': 'Disconnected',
  'object.secondaryStorage.status.connectionBusy': 'Busy',
  'object.secondaryStorage.status': 'Status',
  'object.secondaryStorage.status.on': 'On',
  'object.secondaryStorage.status.off': 'Off',
  'object.secondaryStorage.confirmMsg.on': 'Are you sure to enable this secondary storage policy?',
  'object.secondaryStorage.confirmMsg.off':
    'Are you sure to disable this secondary storage policy?',
  'object.secondaryStorage.confirmMsg.delete':
    'Are you sure to delete the secondary storage policy?',
  'object.secondaryStorage.table.domain.ruleErr.': 'Please enter the correct domain name',
  'object.secondaryStorage.title.accessKey': 'Access Key',
  'object.secondaryStorage.title.securitykey': 'Secret Access Key',
  'object.secondaryStorage.title.description': 'Description',
  'object.secondaryStorage.title.connectTest': 'Test',
  'object.secondaryStorage.ruleErr.connectTest': 'Failed to test.',
  'object.secondaryStorage.ruleErr.key':
    'Required,up to 128 characters, Chinese characters not allowed',

  // 操作引导
  'object.guide.name.init.default': 'Initialize',
  'object.guide.name.init.onGoing': 'Initializing',
  'object.guide.name.init.success': 'Initialized',
  'object.guide.name.init.failure': 'Initialization failed',
  'object.guide.name.init': 'Initialize',
  'object.guide.name.route': 'Create Route',
  'object.guide.name.gateway': 'Create Gateway',
  'object.guide.name.policy': 'Create Storage Policy',
  'object.guide.name.user': 'Create Object User',
  'object.guide.name.tenant': 'Create Tenant',
  'object.guide.name.bucket': 'Create Bucket',
  'object.guide.route': 'Route',
  'object.guide.gateway': 'Gateway',
  'object.guide.policy': 'Storage Policy',
  'object.guide.user': 'Object User',
  'object.guide.tooltip.whenUninitialized': 'No {name} available, please {operation} first',
  'object.guide.tooltip.notYetCreate': 'No {name} available, {operation}',
  'object.guide.tooltip.needMore': '{name} is available, you can {operation} more',
  'object.guide.tooltip.stepOnGoing': 'Initializing, cannot be created',
  'object.guide.create': 'Create {nextStepName}',
  'object.guide.clickCreate': 'Click to create',
  'object.guide.startInitialize': 'Click to initialize',
  'object.guide.expand.true': 'Hide',
  'object.guide.expand.false': 'Wizard',
  'object.guide.page.createBtn.limitTip':
    'The relevant configuration was not completed before {pageName}, please {nextStepName} first',
};
