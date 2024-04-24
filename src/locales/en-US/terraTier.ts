const terraTier = {
  'terraTier.title': 'TerraTier',
  'terraTier.placementPolicy': 'Placement Policy',
  'terraTier.placement.name': 'Polic Name',
  'terraTier.placement.files': 'File Names',
  'terraTier.placement.fileTypes': 'File Types',
  'terraTier.placement.users': 'User/User Group',
  'terraTier.placement.userGroups': 'User Group',
  'terraTier.placement.target': 'Place Target',
  'terraTier.target.data_pool': 'Capacity Pool',
  'terraTier.target.performance_pool': 'Performance Pool',
  'terraTier.placement.appliedDirs': 'Applied Directory',
  'terraTier.placement.defaultPolicyTip':
    'By default, all files will be placed in performance pool',
  'terraTier.terratier_migration.tip':
    'All files will be migrated from performance pool to capacity pool according to the heat',
  'terraTier.never_migration.tip': 'No files will be migrated',
  'terraTier.placementPolicy.add': 'Create Placement Policy',
  'terraTier.placementPolicy.edit': 'Edit Placement Policy',
  'terraTier.placementPolicy.delete': 'Delete Placement Policy',
  'terraTier.placementAdd.name': 'Name',
  'terraTier.placementAdd.rule': 'Placement Rule',
  'terraTier.placementAdd.ruleTtp':
    'You can config at least one of file name, file type and user/user group. Thses rules take effect in the meantime',
  'terraTier.placementAdd.rule.tip': 'Define you files to be placed in performance pool',
  'terraTier.placementAdd.usersType': 'User Type',
  'terraTier.usersType.user': 'Users',
  'terraTier.usersType.localUser': 'Local Users',
  'terraTier.usersType.domainUser': 'Domain Users',
  'terraTier.usersType.group': 'User Groups',
  'terraTier.usersType.localGroup': 'Local User Groups',
  'terraTier.usersType.domainGroup': 'Domain User Groups',
  'terraTier.usersType.include': 'include',
  'terraTier.usersType.exclude': 'exclude',
  'terraTier.validate.placementName.required': 'Please input placement policy name',
  'terraTier.validate.placementName.pattern':
    '1-256 characters long, including letter, chinese, number, blank and special characters(-.) like _, -, . and so on',
  'terraTier.validate.illegalInput': 'Illegal input',
  'terraTier.validate.domainUsers.required': 'Please input at least one valid domain user',
  'terraTier.validate.domainGroup.required': 'Please input at least one valid domain user group',
  'terraTier.validate.filedAndTypes.forbideChars':
    'Charatcers like ^  +  \'  "  < > ?  & * ; % ( ) = # | are forbidden',
  'terraTier.validate.files.overLength': 'Overlength input, should be less than 65535',
  'terraTier.validate.fileTypes.overLength': 'Overlength input, should be less than 4096',
  'terraTier.confirm.deletePlacement': 'Are you sure to delete the following placement policy?',
  'terraTier.validate.placementRule.required': 'Please finish typing at least one rule',
  'terraTier.placeholder.files': 'Multi files name should be seperated with ", "',
  'terraTier.placeholder.fileTypes': 'Multi files type should be seperated with ", "',
  'terraTier.placeholder.domainUser': 'Multi domain users should be seperated with ", "',
  'terraTier.placeholder.domainGroup': 'Multi domain user groups should be seperated with ", "',
  'terraTier.placeholder.search': 'Search a policy name',
  'terraTier.placement.defaultPolicyEditDisabled': 'Default placement policy is forbidden editing',
  'terraTier.placement.defaultPolicyDeleteDisabled':
    'Default placement policy is forbidden deleting',
  'terraTier.migration.defaultPolicyEditDisabled': 'Default migraiton policy is forbidden editing',
  'terraTier.migration.defaultPolicyDeleteDisabled':
    'Default migraiton policy is forbidden deleting',
  'terraTier.placement.editDisableTip': 'Unabled to edit for already being applied to directory',
  'terraTier.placement.deleteDisableTip':
    'Unabled to delete for already being applied to directory',
  'terraTier.migration.editDisableTip': 'Unabled to edit for already being applied to directory',
  'terraTier.migration.deleteDisableTip':
    'Unabled to delete for already being applied to directory',
  'terraTier.all': 'All',
  'terraTier.allUsers': 'All users',
  'terraTier.allGroups': 'All User Groups',
  'terraTier.localUsers': 'Local users: {localUsers}',
  'terraTier.localGroups': 'Local user groups: {localGroups}',
  'terraTier.domainUsers': 'Domain users: {domainUsers}',
  'terraTier.domainGroups': 'Domain user groups: {domainGroups}',

  'terraTier.migration.name': 'Policy Name',
  'terraTier.migration.createTime': 'Create Time',
  'terraTier.migration.modifyTime': 'Change Time',
  'terraTier.migration.users': 'User/User Group',
  'terraTier.migration.userGroups': 'User Group',
  'terraTier.migration.target': 'Migration Target',
  'terraTier.migration.appliedDirs': 'Applied Directory',
  'terraTier.migrationPolicy': 'Migration Policy',
  'terraTier.migrationAdd.rule': 'Migration Rule',
  'terraTier.migrationAdd.ruleTtp':
    'You can config at least one of action time and user/user group. Rules take effect in the meantime',
  'terraTier.migrationAdd.rule.tip':
    'Define you files to be migrated to capacity pool by temperature',
  'terraTier.migrationAdd.time': 'Time',
  'terraTier.migrationAdd.actionTypeText': 'ago user {actionType} files',
  'terraTier.migrationAdd.create': 'Create',
  'terraTier.migrationAdd.modify': 'Edit',
  'terraTier.migrationAdd.status.create': 'created',
  'terraTier.migrationAdd.status.modify': 'modified',
  'terraTier.migrationAdd.usersType': 'Users Type',
  'terraTier.validate.migrationRule.required': 'Please finish typing at least one rule',
  'terraTier.validate.migrationName.required': 'Please input migration policy name',
  'terraTier.validate.time.pattern': 'Overlimit time input, should be less than 70 years',
  'terraTier.migrationPolicy.add': 'Create Migration Policy',
  'terraTier.migrationPolicy.edit': 'Edit Migration Policy',
  'terraTier.migrationPolicy.delete': 'Delete Migration Policy',
  'terraTier.confirm.deleteMigration': 'Are you sure to delete the following migration policy?',
  'terraTier.unit.year': 'Year',
  'terraTier.unit.month': 'Month',
  'terraTier.unit.week': 'Week',
  'terraTier.unit.day': 'Day',
  'terraTier.unit.hour': 'Hour',
  'terraTier.unit.minute': 'Minute',
  'terraTier.migrationPolicy.alltime': 'All',
  'terraTier.migrationPolicy.certainTime': 'Before {number}{unit}',
  'terraTier.placement.invalidTip': 'Some local users or groups are invalid.',
  'terraTier.validate.userRule.userOverlength':
    'Local users and domain users are totally limited to 4096 characters',
  'terraTier.validate.userRule.groupOverlength':
    'Local groups and domain user groups are totally limited to 4096 characters',
  'terraTier.setError.poolEmpty': 'Please select a performance pool',
  'terraTier.setError.placementEmpty': 'Please select a placement policy',
  'terraTier.setError.migrationEmpty': 'Please select a migration policy',
};

export default terraTier;