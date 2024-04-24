const terraTier = {
  'terraTier.title': '智能分层',
  'terraTier.placementPolicy': '放置策略',
  'terraTier.placement.name': '策略名称',
  'terraTier.placement.files': '文件名称',
  'terraTier.placement.fileTypes': '文件类型',
  'terraTier.placement.users': '用户/用户组',
  'terraTier.placement.userGroups': '用户组',
  'terraTier.placement.target': '放置目标',
  'terraTier.target.data_pool': '容量池',
  'terraTier.target.performance_pool': '性能池',
  'terraTier.placement.appliedDirs': '应用目录',
  'terraTier.placement.defaultPolicyTip': '所有的文件默认写入性能池',
  'terraTier.terratier_migration.tip': '所有的文件按照热度在容量池和性能池之间迁移',
  'terraTier.never_migration.tip': '所有文件不进行',
  'terraTier.placementPolicy.add': '新建放置策略',
  'terraTier.placementPolicy.edit': '编辑放置策略',
  'terraTier.placementPolicy.delete': '删除放置策略',
  'terraTier.placementAdd.name': '名称',
  'terraTier.placementAdd.rule': '放置规则',
  'terraTier.placementAdd.ruleTtp':
    '支持同时配置文件名称、文件类型和用户类型规则，各规则之间是“与”的关系',
  'terraTier.placementAdd.rule.tip': '自定义文件放置到性能池',
  'terraTier.placementAdd.usersType': '用户类型',
  'terraTier.usersType.user': '用户',
  'terraTier.usersType.localUser': '本地用户',
  'terraTier.usersType.domainUser': '域用户',
  'terraTier.usersType.group': '用户组',
  'terraTier.usersType.localGroup': '本地用户组',
  'terraTier.usersType.domainGroup': '域用户组',
  'terraTier.usersType.include': '包含',
  'terraTier.usersType.exclude': '排除',
  'terraTier.validate.placementName.required': '请输入放置策略名称',
  'terraTier.validate.placementName.pattern':
    '名称长度不能超过 256个字符。名称允许使用字母、中文、数字、空格和特殊字符，例如下划线（_）、连字符（-）、句点（.）等',
  'terraTier.validate.illegalInput': '输入不合法',
  'terraTier.validate.domainUsers.required': '请至少输入一个有效的域用户',
  'terraTier.validate.domainGroup.required': '请至少输入一个有效的域用户组',
  'terraTier.validate.files.overLength': '输入超长，最多支持65535个字符',
  'terraTier.validate.fileTypes.overLength': '输入超长，最多支持4096个字符',
  'terraTier.validate.filedAndTypes.forbideChars':
    '字符^ + \' " < > ? \\ & * ; % ( ) = # |被禁止输入',
  'terraTier.confirm.deletePlacement': '确认删除以下放置策略吗？',
  'terraTier.validate.placementRule.required': '请完成至少一项放置规则',
  'terraTier.placeholder.files': '多个文件请使用英文", "隔开',
  'terraTier.placeholder.fileTypes': '多个文件类型请使用英文", "隔开',
  'terraTier.placeholder.domainUser': '多个域用户请使用英文", "隔开',
  'terraTier.placeholder.domainGroup': '多个域用户组请使用英文", "隔开',
  'terraTier.placeholder.search': '请输入策略名称搜索',
  'terraTier.placement.defaultPolicyEditDisabled': '系统默认放置策略不可编辑',
  'terraTier.placement.defaultPolicyDeleteDisabled': '系统默认放置策略不可删除',
  'terraTier.migration.defaultPolicyEditDisabled': '系统默认迁移策略不可编辑',
  'terraTier.migration.defaultPolicyDeleteDisabled': '系统默认迁移策略不可删除',
  'terraTier.placement.editDisableTip': '已应用至目录，放置策略不可编辑',
  'terraTier.migration.editDisableTip': '已应用至目录，迁移策略不可编辑',
  'terraTier.placement.deleteDisableTip': '已应用至目录，放置策略不可删除',
  'terraTier.migration.deleteDisableTip': '已应用至目录，迁移策略不可删除',
  'terraTier.all': '所有',
  'terraTier.allUsers': '所有用户',
  'terraTier.allGroups': '所有用户组',
  'terraTier.localUsers': '本地用户：{localUsers}',
  'terraTier.localGroups': '本地用户组：{localGroups}',
  'terraTier.domainUsers': '域用户：{domainUsers}',
  'terraTier.domainGroups': '域用户组：{domainGroups}',

  'terraTier.migration.name': '策略名称',
  'terraTier.migration.createTime': '创建时间',
  'terraTier.migration.modifyTime': '修改时间',
  'terraTier.migration.users': '用户/用户组',
  'terraTier.migration.userGroups': '用户组',
  'terraTier.migration.target': '迁移目标',
  'terraTier.migration.appliedDirs': '应用目录',
  'terraTier.migrationPolicy': '迁移策略',
  'terraTier.migrationAdd.rule': '迁移规则',
  'terraTier.migrationAdd.ruleTtp': '支持同时配置时间和用户类型，时间与用户类型之间是“与”的关系',
  'terraTier.migrationAdd.rule.tip': '自定义文件按照热度迁移到容量池',
  'terraTier.migrationAdd.time': '时间',
  'terraTier.migrationAdd.actionTypeText': '前用户{actionType}的文件',
  'terraTier.migrationAdd.create': '创建',
  'terraTier.migrationAdd.modify': '修改',
  'terraTier.migrationAdd.status.create': '创建',
  'terraTier.migrationAdd.status.modify': '修过',
  'terraTier.migrationAdd.usersType': '用户类型',
  'terraTier.validate.migrationRule.required': '请完成至少一项迁移规则',
  'terraTier.validate.migrationName.required': '请输入迁移策略名称',
  'terraTier.validate.time.pattern': '时间输入超出限制，最大支持70年',
  'terraTier.migrationPolicy.add': '新建迁移策略',
  'terraTier.migrationPolicy.edit': '编辑迁移策略',
  'terraTier.migrationPolicy.delete': '删除迁移策略',
  'terraTier.confirm.deleteMigration': '确认删除以下迁移策略吗？',
  'terraTier.unit.year': '年',
  'terraTier.unit.month': '月',
  'terraTier.unit.week': '周',
  'terraTier.unit.day': '天',
  'terraTier.unit.hour': '时',
  'terraTier.unit.minute': '分',
  'terraTier.migrationPolicy.alltime': '所有',
  'terraTier.migrationPolicy.certainTime': '{number}{unit} 前',
  'terraTier.placement.invalidTip': '部分本地用户或用户组失效',
  'terraTier.validate.userRule.userOverlength': '本地用户和域用户合计最多支持4096个字符',
  'terraTier.validate.userRule.groupOverlength': '本地用户组和域用户组合计最多支持4096个字符',
  'terraTier.setError.poolEmpty': '请选择一个性能池',
  'terraTier.setError.placementEmpty': '请选择一个放置策略',
  'terraTier.setError.migrationEmpty': '请选择一个迁移策略',
};

export default terraTier;
