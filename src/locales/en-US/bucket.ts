export default {
  'bucket.action.enable': 'Enable',
  'bucket.action.disable': 'Disable',
  'bucket.action.suspend': 'Suspend',
  'bucket.bucket_name': 'Name',
  'bucket.bucket_version': 'Version',
  'bucket.overview.title': 'Bucket Overview',
  'bucket.storage_policy_name': 'Storage Policy',
  'bucket.policy_name.errTip': 'Please select a storage policy',
  'bucket.size': 'Occupied Capacity',
  'bucket.multi_version': 'Versioning',
  'bucket.multiVersion.default.no': 'Disable',
  'bucket.multiVersion.yes': 'Enable',
  'bucket.multiVersion.label.ACLBucket': 'ACL and Policy',
  'bucket.multiVersion.label.CORS': 'CORS Rules',
  'bucket.multiVersion.inherited.ACL': 'Inherit from Bucket ACL',
  'bucket.multiVersion.not.inherited.ACL': 'Do Not Inherit from Bucket ACL',
  'bucket.multiVersion.inherited.desc': 'Objects in the bucket inherit Bucket ACL',
  'bucket.multiVersion.not.inherited.desc': 'Objects in the bucket do not inherit Bucket ACL',
  'bucket.multiVersion.status.unset': 'Disabled',
  'bucket.multiVersion.status.on': 'Enabled',
  'bucket.multiVersion.status.off': 'Suspended',
  'bucket.multiVersion.tooltip':
    'You can use the versioning feature to preserve, retrieve, and restore every version of every object stored in your buckets. With versioning you can recover more easily from both unintended user actions and application failures. ',
  'bucket.desc': 'Description',
  'bucket.user_name': 'Owner',
  'bucket.tenant_name': 'Tenant',
  'bucket.tenant': 'Tenant',
  'bucket.count': 'Object Count',
  'bucket.qt_cap': 'Quota Capacity',
  'bucket.available': 'Available Capacity',
  'bucket.create_time': 'Date Created',
  'bucket.action.create': 'Create Bucket',
  'bucket.action.edit': 'Edit Bucket',
  'bucket.action.delete': 'Delete Bucket',
  'bucket.action.delete.confirm':
    'The following buckets will be deleted. Once this operation is executed, it cannot be recovered. Are you sure?',
  'bucket.regex.name.invalidMsg':
    'The bucket name must be 3-63 characters long, including at least the following: lowercase letter, number, and special character "-", which can begin with letter and number, end without "-"',
  'bucket.bucketName': 'Bucket Name',
  'bucket.action.quota': 'Set Quota',
  'bucket.action.detail': 'View Details',
  'bucket.create.owner': 'Please select the user',
  'bucket.max_byte': 'Capacity Quota',
  'bucket.max_obj_num': 'Object Quota',
  'bucket.used_cap': 'Capacity Used',
  'bucket.space_usage': 'Space Usage',
  'bucket.space_usage.tooltip':
    'Occupancy refers to the amount of space occupied by objects to store compressed data',
  'bucket.used_obj': 'Object Count',
  'bucket.used_obj.tooltip': 'The number contains incomplete multipart uploads.',
  'bucket.lifecycle.management': 'Bucket Lifecycle',
  'bucket.lifecycle.create': 'Create Bucket Lifecycle',
  'bucket.lifecycle.edit.title': 'Modify New Lifecycle Rule',
  'bucket.lifecycle.status': 'Status',
  'bucket.lifecycle.name': 'Rule Name',
  'bucket.lifecycle.rule_name': 'Rule Name',
  'bucket.lifecycle.rulePrefix': 'Rule Target',
  'bucket.lifecycle.rulePrefix.tip':
    'If no prefix is specified or the filter“*” is specified, the rule will apply to the entire bucket.',
  'bucket.lifecycle.rulePrefix.placeholder': 'Please input name prefix',
  'bucket.lifecycle.day': 'Lifecycle',
  'bucket.lifecycle.day.tip':
    'Note: Objects exceeding the bucket lifecycle will be automatically deleted.',
  'bucket.lifecycle.ruleName.required': 'Please input rule name',
  'bucket.lifecycle.rulePrefix.required': 'Please enter the object name prefix',
  'bucket.lifecycle.day.required': 'Please input a day number as lifecycle period',
  'bucket.progress.capacityMsg': 'Bucket used capacity exceeds threshold',
  'bucket.progress.objectMsg': 'The number of existing objects in the bucket exceeds the threshold',
  'bucket.progress.noObjectMsg': 'None',
  'bucket.objectService.tenThousandNum': '0,000',
  'bucket.objectService.tenMillionNum': '0,000,000',
  'bucket.acl_status': 'Bucket ACL',
  'bucket.inherit_acl_status': 'Object ACL',
  'bucket.inherit_acl.tooltip':
    'If you choose Inherit From Bucket，the ACL of an object is the same as the ACL of the bucket in which the object is stored.',
  'bucket.acl.private.title': 'Private',
  'bucket.acl.private.desc':
    'Owner gets full control permissions. No one else has access rights (default).',
  'bucket.acl.PublicReading.title': 'Public-read',
  'bucket.acl.PublicReading.desc':
    'All users, including anonymous users, have permission to perform anonymous read (list object) operations on the objects. Users with write permissions on the bucket can perform write operations on the objects.',
  'bucket.corsRule.title': 'CORS Rules',
  'bucket.corsRule.title.tip':
    'Cross-origin resource sharing (CORS) rules facilitate cross-domain requests among clients.',
  'bucket.corsRule.AllowedOrigins': 'Allowed Origin',
  'bucket.corsRule.AllowedMethods': 'Allowed Method',
  'bucket.corsRule.AllowedHeaders': 'Allowed Header',
  'bucket.corsRule.ExposeHeaders': 'Exposed Header',
  'bucket.corsRule.MaxAgeSeconds': 'Cache Duration(s)',
  'bucket.corsRule.action.create': 'Create',
  'bucket.corsRule.action.create.title': 'Create CORS Rule',
  'bucket.corsRule.action.delete': 'Delete',
  'bucket.corsRule.action.edit.title': 'Edit CORS Rule',
  'bucket.corsRule.moadl.deleteCorsTips': 'Are you sure to delete the CORS rule?',
  'bucket.acl.PublicReadingW.title': 'Public-read-write',
  'bucket.corsRule.allowedOrigins.rule.error1': 'Please enter the Allowed Origin',
  'bucket.corsRule.allowedOrigins.rule.error2':
    'You can enter multiple allowed headers and use a commar(,) to separate one from another. Each header can contain only one asterisk (*). This field contains 1~1024 characters.',
  'bucket.corsRule.AllowedMethods.rule.required': 'Please choose the Allowed Method',
  'bucket.corsRule.allowedHeader.rule.error':
    'You can enter multiple allowed headers and use a commar(,) to separate one from another. Each header can contain only one asterisk (*). This field contains 1~1024 characters.',
  'bucket.corsRule.exposeHeader.rule.error':
    'You can enter multiple allowed headers and use a commar(,) to separate one from another.  This field contains 1~1024 characters.',
  'bucket.corsRule.message.create': 'Create',
  'bucket.corsRule.message.delete': 'Delete',
  'bucket.corsRule.message.edit': 'Modify',
  'bucket.acl.PublicReadingW.desc':
    'Everyone including anonymous users can read and write objects.',
  'bucket.info.capacityUsage': 'Capacity Usage',
  'bucket.info.objNumUsed': 'Object Usage',
  'bucket.ruleTarget.all': 'Applied into entire bucket',
  'bucket.lifecycle.day.unit': 'Day',
  'bucket.action.expandTable': 'Expand',
  'bucket.action.collapseTable': 'Collapse',
  'bucket.worm.title': 'Bucket WORM',
  'bucket.worm.ProtectionPeriod': 'Retention Period',
  'bucket.worm.label.ProtectionPeriod': 'Retention Period',
  'bucket.worm.label.mode': 'Mode',
  'bucket.worm.seriesTooltip':
    'The retention period of data can be set through WORM so that data can only be be read. Modifications and deletion must be prevented.',
  'bucket.worm.set.unable': 'Disable',
  'bucket.worm.set.enable': 'Enable',
  'bucket.worm.tooltip.enableMultiVersion':
    'Multiple versions cannot be enabled after worm is enabled',
  'bucket.worm.tooltip.enableWorm': 'Worm cannot be enabled when multiple versions are enabled',
  'bucket.worm.tooltip.creatWorm':
    'Note: You need to set retention period once the bucket is created.',
  'bucket.worm.tooltip.ruleRequire': 'Please enter the protection period',
  'bucket.worm.tooltip.rule': 'Please enter a positive integer',
  'bucket.worm.tooltip.changeWorm': 'Bucket WORM can only be set enabled when creating a bucket.',
  'bucket.worm.tooltip.changeWormTip':
    "Changing retention period doesn't change the existing retention period for any objects in this bucket.",
  'bucket.worm.status.unable': 'Disable',
  'bucket.worm.status.enabled': 'Enabled',
  'bucket.worm.status.disabled': 'Disabled',
  'bucket.worm.status.dayMsg': 'Unset',
  'bucket.worm.status.dayNum': '{wormNum} days',
  'bucket.worm.status.yearNum': '{wormNum} years',
  'bucket.worm.radioLabel.mode1': 'Governance',
  'bucket.worm.radioLabel.mode1.tooltip':
    "users can't overwrite or delete an object version unless they have special permissions.",
  'bucket.worm.radioLabel.mode2': 'Compliance',
  'bucket.worm.radioLabel.mode2.tooltip':
    "a protected object version can't be overwritten or deleted by any user.",
  'bucket.worm.protectionPeriod.unitDay': 'Day(s)',
  'bucket.worm.protectionPeriod.unitYear': 'Year(s)',
  'bucket.detailInfo.tab.permissions': 'Permissions',
  'bucket.detailInfo.storagePolicy.switch.cover': 'Secondary Storage Overwrite Sync',
  'bucket.detailInfo.storagePolicy.switch.delete': 'Secondary Storage Delete Sync',
  'bucket.detailInfo.storagePolicy.cover.enable':
    'Are you sure to enable secondary storage overwrite sync?',
  'bucket.detailInfo.storagePolicy.delete.enable':
    'Are you sure to enable secondary storage delete sync?',
  'bucket.detailInfo.storagePolicy.cover.close':
    'Are you sure to disable secondary storage overwrite sync?',
  'bucket.detailInfo.storagePolicy.delete.close':
    'Are you sure to disable secondary storage delete sync?',

  // 桶策略
  'bucket.strategy.title': 'Bucket Policy',
  'bucket.strategy.title.tip':
    'Bucket Policy is one of the resource-based policy that you can use to grant access permissions to your bucket and the objects in it.',
  'bucket.strategy.table.policy_name': 'Policy Name',
  'bucket.strategy.table.effect': 'Effect',
  'bucket.strategy.table.effectAllow': 'Allow',
  'bucket.strategy.table.effectRefuse': 'Deny',
  'bucket.strategy.table.user_names': 'Principal',
  'bucket.strategy.table.user_names.tooltip':
    'The principal specifies the user on the same tenant.',
  'bucket.strategy.table.resource': 'Resource',
  'bucket.strategy.table.resourceScope': 'Resource',
  'bucket.strategy.table.action_names': 'Action',
  'bucket.strategy.table.condition': 'Condition',
  'bucket.strategy.table.include': 'Include',
  'bucket.strategy.table.exclude': 'Exclude',
  'bucket.strategy.table.include.user': '{includeStatus} {userLength} principal(s)',
  'bucket.strategy.table.include.resource.bucket': '{includeStatus} Current Bucket',
  'bucket.strategy.table.include.resource.allObj': '{includeStatus} Objects in Bucket',
  'bucket.strategy.table.include.resource.obj': '{includeStatus} Specified Objects',
  'bucket.strategy.table.include.action': '{includeStatus} {actionLength} action(s)',
  'bucket.strategy.table.include.condition': '{conditionLenght} condition(s)',
  'bucket.strategy.table.condition.operator': 'Condition Operator',
  'bucket.strategy.table.condition.key': 'Key',
  'bucket.strategy.table.condition.value': 'Value',
  'bucket.strategy.action.create': 'Create',
  'bucket.strategy.action.create.title': 'Create Bucket Policy',
  'bucket.strategy.action.delete': 'Delete',
  'bucket.strategy.action.edit.title': 'Edit Bucket Policy',
  'bucket.strategy.action.includeLable': 'Include selected actions',
  'bucket.strategy.action.excludeLable': 'Exclude selected actions',
  'bucket.strategy.table.deleteTips': 'Are you sure to delete the following bucket policy?',
  'bucket.strategy.resource.optional': 'Optional',
  'bucket.strategy.resource.selected': 'Selected',
  'bucket.strategy.resource.empty': 'Clear',
  'bucket.strategy.resource.selectAll': 'Select All',
  'bucket.strategy.resource.bucket': 'bucket',
  'bucket.strategy.resource.object': 'object',
  'bucket.strategy.resource.allObj': 'all object',
  'bucket.strategy.resource.specifyObj': 'specify object',
  'bucket.strategy.resource.tooltip':
    'Authorized users can only select users belonging to the same tenant as the bucket',
  'bucket.strategy.resource.specifyObj.tooltip':
    'Note: enter the object prefix. The entered resource path needs to be followed by*',
  'bucket.strategy.resource.inputError.tooltip': 'The specified object already exists',
  'bucket.strategy.resource.specifyObj.add': '+ add',
  'bucket.strategy.resource.input.tooltip': 'Object prefix or name',
  'bucket.strategy.resource.inputError.length': 'Up to 1023 bytes can be input',
  'bucket.strategy.resource.inputError.specifyObj': 'The specified object does not support "*"',
  'bucket.strategy.resource.inputError.required': 'Please enter the specified object',
  'bucket.strategy.resource.includeLable': 'Include selected resources',
  'bucket.strategy.resource.excludeLable': 'Exclude selected resources',
  'bucket.strategy.policyName.ruleErr':
    'The length is 1~128 characters, and it is allowed to enter English letters and numbers, "-" or "_"',
  'bucket.strategy.principal.ruleErr': 'Please select a principal',
  'bucket.strategy.principal.extraTip.ruleErr':
    'The authorized user includes the bucket owner, please choose the permission carefully',
  'bucket.strategy.principal.allUserTag': 'All users (include anonymous user)',
  'bucket.strategy.principal.specifyUser': 'Specified Users',
  'bucket.strategy.principal.includeLable': 'Include selected principals',
  'bucket.strategy.principal.excludeLable': 'Exclude selected principals',
  'bucket.strategy.resource.ruleErr': 'Please select a resource',
  'bucket.strategy.action.ruleErr': 'Please select a action',
  'bucket.info.capacityProgress.tooltip':
    'When user does not set capacity quota, capacity usage shows the storage pool usage.',
  'bucket.tableSearch.placeholder': 'Please input bucket name',
  'bucket.strategy.condition.tooltip':
    'Specify conditions for effective policy. Only the condition keys and values in the policy are matched, the bucket policy is in effect.',
  'bucket.strategy.condition.add': 'Add Conditions',
  'bucket.strategy.condition.valueTip.aws:CurrentTime':
    'The time when the request is received by the server. The date format must comply with ISO 8601.Such as<br />1、YYYYMMDDTHHmmssZ（20220112T023054Z）<br />2、YYYY-MM-DDTHH:mm:ssZ（2022-07-19T10:41:34Z）<br />3、YYYY-MM-DDTHH:mm:ss±hh:mm（2022-07-19T10:41:34+08:00）<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.aws:EpochTime':
    'The time when the request is received by the server, which is expressed as seconds since 1970.01.01 00:00:00 UTC, regardless of the leap seconds. <br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.aws:SecureTransport':
    'Indicates whether requests are encrypted using SSL.<br />Please enter "true" or "false"',
  'bucket.strategy.condition.valueTip.aws:SourceIp':
    "Use this key to compare the requester's IP address with the IP address that you specify in the policy.<br />Specified IP addresses. Please use comma to separate multiple IPs, for example, “192.168.1.1” or “192.168.1.1, 192.168.1.2” or “192.168.0.0/24",
  'bucket.strategy.condition.valueTip.aws:username':
    "Use this key to compare the requester's username with the username you specified in the policy.<br />Please use comma to separate multiple values.",
  'bucket.strategy.condition.valueTip.s3:RequestObjectTag/<key>':
    'Use this key to compare the tag keys in a request with the keys that you specify in the policy. <br />Please enter the format of "key=value" and use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:prefix':
    'Filters access by key name prefix.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:max-keys':
    'Filters access by maximum number of keys returned in a ListBucket request.<br />Please enter positive integer and use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:object-lock-legal-hold':
    'Filters access by object legal hold status.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:object-lock-mode':
    'Filters access by object retention mode (COMPLIANCE or GOVERNANCE).<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:object-lock-retain-until-date':
    'Filters access by object retain-until date.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:versionid':
    'Filters access by a specific object version.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-acl':
    "Filters access by canned ACL in the request's x-amz-acl header.<br />Please use comma to separate multiple values.",
  'bucket.strategy.condition.valueTip.s3:x-amz-content-sha256':
    'Filters access by unsigned content in your bucket.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-copy-source':
    'Filters access by copy source bucket, prefix, or object in the copy object requests.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-grant-full-control':
    'Filters access by x-amz-grant-full-control (full control) header.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-grant-read':
    'Filters access by x-amz-grant-read (read access) header.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-grant-read-acp':
    'Filters access by the x-amz-grant-read-acp (read permissions for the ACL) header.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-grant-write':
    'Filters access by the x-amz-grant-write (write access) header.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.valueTip.s3:x-amz-grant-write-acp':
    'Filters access by the x-amz-grant-write-acp (write permissions for the ACL) header.<br />Please use comma to separate multiple values.',
  'bucket.strategy.condition.aws:CurrentTime.errTip':
    'The date format must comply with the ISO 8601 standard.',
  'bucket.strategy.condition.aws:EpochTime.errTip': 'Please enter a positive integer.',
  'bucket.strategy.condition.s3:max-keys.errTip': 'Please enter a positive integer.',
  'bucket.strategy.condition.aws:SecureTransport.errTip': 'True or False',
  'bucket.strategy.condition.dupErr': 'Input duplicate, please check',
  'bucket.strategy.condition.aws:SourceIp.errTip': 'The IP is incorrect',
  'bucket.strategy.condition.objectTag.errTip': 'Key = Value',

  // 生命周期
  'bucket.lifecycle.delete.body': 'Are you sure to delete this lifecycle rule?',
  'bucket.lifecycle.enable.body': 'Are you sure to enable this lifecycle rule?',
  'bucket.lifecycle.disable.body': 'Are you sure to disable this lifecycle rule?',
  'bucket.lifecycle.create.pre': 'Creating new lifecycle rule for bucket {bucketName}',
  'bucket.lifecycle.modify.pre': 'Modifying lifecycle rule',
  'bucket.lifecycle.enable.pre': 'Lifecycle rule is being enabled',
  'bucket.lifecycle.disable.pre': 'Lifecycle rule is being disabled',
  'bucket.lifecycle.delete.pre': 'Deleting lifecycle rule ',
  'bucket.lifecycle.rulePrefix.pattern':
    'The rule prefix is up to 1024 characters length and will exclude special characters including backslash, colon, question mask, quotation mark, angle brackets, pipe symbol, start with no forward slash which is also prohibited if it repeates closely anywhere.',
  'tooltip.bucket.rule_prefix':
    'Every rule applies to specified objects except for the entire bucket.',
  'bucket.lifecycle.current_version': 'Current Version',
  'bucket.lifecycle.history_version': 'Historical Version',
  'bucket.lifecycle.Table.switch': ' ',
  'bucket.lifecycle.Table.status.suspended': 'Suspended',
  'bucket.lifecycle.Table.status.enabled': 'Enabled',
  'bucket.lifecycle.Table.ruleTarget.prefixInfo': 'Prefix: {prefixValue}',
  'bucket.lifecycle.Table.ruleTarget.tagInfo': 'Tag: {tagListValue}',
  'bucket.lifecycle.dateFormat.unit.day': 'day(s)',
  'bucket.lifecycle.dateFormat.unit.year': 'year(s)',
  'bucket.lifecycle.dateFormat.deleteTip': ' After {lifecycleDate}',
  'bucket.lifecycle.dateFormat.deleteTip.obj': 'Objects Delete:',
  'bucket.lifecycle.dateFormat.deleteTip.fragment': 'Fragments Delete:',
  'bucket.lifecycle.dateFormat.deleteTip.glacier': 'Transition to Standard-IA:',
  'bucket.lifecycle.dateFormat.deleteTip.secondaryClass': 'Secondary Storage:',
  'bucket.lifecycle.rulePrefix.formItem.toolTip':
    'Prefix or tags are supported. If configured simultaneously, objects that confer to tags and prefix are in effect.',
  'bucket.lifecycle.form.errTip.targetCheck': 'Please select at least one rule target',
  'bucket.lifecycle.form.errTip.lifeCycleCheck': 'Please select at least one lifecycle',
  'bucket.lifecycle.form.errTip.currentCheck':
    'Selected to apply to the current version, please select at least one of them',
  'bucket.lifecycle.form.ruleTarget.tagKey': 'key',
  'bucket.lifecycle.form.ruleTarget.tagValue': 'Value',
  'bucket.lifecycle.form.ruleTarget.tagErrTip':
    'The name must be 1-256 characters long, including the following: uppercase letters, lowercase letters, digits, spaces, and special letters "+", "-", "=", ".", "_", ":", "/". "@"',
  'bucket.lifecycle.form.checkBoxLabel.targetPrefix': 'Prefix',
  'bucket.lifecycle.form.checkBoxLabel.tag': 'Tag',
  'bucket.lifecycle.form.checkBoxLabel.currentVersion': 'Current Version',
  'bucket.lifecycle.form.checkBoxLabel.lifeCycleObj': 'Objects Delete After',
  'bucket.lifecycle.form.checkBoxLabel.fragment': 'Fragments Delete After',
  'bucket.lifecycle.form.checkBoxLabel.history': 'Historical Version',
  'bucket.lifecycle.form.checkBoxLabel.glacier': 'Transfer to Standard-IA After',
  'bucket.lifecycle.form.checkBoxLabel.glacier.limit':
    'The configuration for Standard-IA is not specified in the policy {policy_name}',
  'bucket.lifecycle.form.checkBoxLabel.secondaryClass': 'Secondary Storage',
  'bucket.lifecycle.form.checkBoxLabel.secondaryClass.limit':
    'Once versioning is enabled, it cannot be configured to transition to secondary storage.',
  'bucket.lifecycle.form.checkBoxLabel.secondaryClass.limitChoose':
    'There is no optional secondary storage class in the storage policy',
  'bucket.lifecycle.form.checkBoxLabel.secondaryClass.class': 'Class',
  'bucket.lifecycle.form.checkBoxLabel.secondaryClass.day': 'Days',
  // 性能
  'bucket.performance.qos.bandwidth_info':
    'Bucket QoS controls the data traffic for the specific bucket within 1 second.',
  'bucket.performance.qos.iops_info':
    'Bucket QoS controls the input and output for the specific bucket within 1 second.',
  'bucket.performance.qos.bw': 'Bandwidth',
  'bucket.performance.qos.iops': 'IOPS',

  // 桶回源
  'bucket.remote.title.tabTitle': 'Back-to-Origin',
  'bucket.remote.title.card': 'Rule Management',
  'bucket.remote.aciton.add': 'Add Back-to-Origin Rule',
  'bucket.remote.aciton.edit': 'Edit Back-to-Origin Rule',
  'bucket.remote.table.index': 'Index',
  'bucket.remote.table.index.tip':
    'The rules are sequentially matched with requests based on the values of Rule Number. If a request matches a rule, the subsequent rules are not matched.',
  'bucket.remote.table.object_prefix': 'Back-to-Origin Rule',
  'bucket.remote.prefix.all': 'All objects in the bucket',
  'bucket.remote.form.object_prefix': 'Prefix',
  'bucket.remote.form.prefix.extra': "Note: Entering '*' indicates all objects in the bucket",
  'bucket.remote.form.object_prefix.errTip': 'Please input Prefix',
  'bucket.remote.title.originInfo': 'Origin Information',
  'bucket.remote.table.connect_status': 'Connection Status',
  'bucket.remote.table.origin_mode': 'Back to Source Mode',
  'bucket.remote.form.originMode1': 'Mirroring',
  'bucket.remote.form.originMode2': 'Agent',
  'bucket.remote.form.originMode3': 'CDN',
  'bucket.remote.form.originMode.tooltip1':
    'When you select Mirroring and a requested file cannot be found in the system, system automatically retrieves the file from the origin, saves it locally, and returns the content to the requester.',
  'bucket.remote.form.originMode.tooltip2':
    'When you select Agent and a requested file cannot be found in the system, system automatically retrieves the file from the origin and returns the content to the requester.',
  'bucket.remote.form.originMode.tooltip3':
    'When you select CDN and a requested file cannot be found in the system, system automatically retrieves the file from the origin, saves it locally withinin cache time, and returns the content to the requester.',
  'bucket.remote.table.platform_type': 'Platform Type',
  'bucket.remote.table.access_mode': 'Access Mode',
  'bucket.remote.table.access_mode.toolTip':
    'The system provides two modes for accessing objects - Path-Style and Virtual-Host. In Path-Style, the access URL includes the bucket name as part of the path. In Virtual-Host, the access URL includes the bucket name as part of the hostname.',
  'bucket.remote.table.access_mode.tip':
    'Automatically match based on the input back-to-origin path',
  'bucket.remote.table.access_url': 'Back-to-Origin path',
  'bucket.remote.table.access_url.errTip': 'Please input the back-to-origin path',
  'bucket.remote.placeholder.accessUrl.domain': 'Please enter the domain name',
  'bucket.remote.placeholder.accessUrl.domainAndIp': 'Please enter a domain name or IP address',
  'bucket.remote.action.add': 'Add',
  'bucket.remote.form.target_bucket': 'Bucket Name',
  'bucket.remote.placeholder.target_bucket': 'Please input the bucket name',
  'bucket.remote.placeholder.secret_key': 'Please input the secret key',
  'bucket.remote.placeholder.access_key': 'Please input the access key',
  'bucket.remote.placeholder.cache_days': 'Input range 1-70 years (25550 days)',
  'bucket.remote.form.cache_days': 'Cache Time',
  'bucket.remote.form.connectTest': 'Test',
  'bucket.remote.aciton.delete.tisMsg': 'Are you sure to delete the back-to-origin rule?',
  'bucket.remote.aciton.add.btnLimitTip.multiVersion':
    'Multiple versions have been enabled and cannot be added back-to-origin rule',
  'bucket.remote.aciton.add.btnLimitTip.lengthLimit':
    '	You can configure up to 20 back-to-origin rules for a bucket.',
  'bucket.info.multiVersionLimitMsg.remote':
    'The back-to-origin rule has been configured and cannot enable multiple versions',
  'bucket.info.multiVersionLimitMsg.upToCloud':
    'The bucket configuration has been converted to secondary storage and cannot enable multiple versions',
  'bucket.info.multiVersionLimitMsg.both':
    'The bucket configuration has been converted to secondary storage and the back-to-origin rule has been configured, making it impossible to enable multiple versions',
  'bucket.info.remoteStatistics.capacity': 'Back-to-Origin Capacity Usage',
  'bucket.info.remoteStatistics.objNum': 'Back-to-Origin Object Number',
  'bucket.info.secondaryStatistics.capacity': 'Secondary Storage Capacity Usage',
  'bucket.info.secondaryStatistics.objNum': 'Secondary Storage Object Number',
  'bucket.remote.ruleErr.target_bucket.host':
    'The bucket name verification failed in the current access mode. Please enter a return path without a bucket name, and use the "Path Style" mode to re-enter the bucket name',
};
