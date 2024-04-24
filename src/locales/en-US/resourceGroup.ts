export default {
  'storage.resourceGroup': 'Resource Groups',
  'storage.resourceGroup.explain':
    'A resource group is a collection of data disks on all nodes in a cluster. By setting resource groups, you can divide data disks into logical groups to isolate resources.  All data disks in the resource group must be of the same type. A data disk belongs to only one resource group.',
  'storage.resourceGroup.tips.drag.node': 'Drag node to leftside resource group',
  'storage.resourceGroup.tips.drag.storageUnit': 'Drag data disk to leftside resource group',
  'storage.resourceGroup.tips.drag.node.cannotmove.enabledEC':
    'The current resource group supports EC folding. Do not move these nodes from default resource group to another.',
  'storage.resourceGroup.tips.drag.storageUnit.cannotmove.enabledEC':
    'The current resource group supports EC folding. Do not move these data disks from default resource group to another.',
  'storage.resourceGroup.tips.drag.node.cannotmove.tfs':
    'Do not move these nodes from tfs resource group to another.',
  'storage.resourceGroup.tips.drag.storageUnit.cannotmove.tfs':
    'Do not move these data disks from resource group to another.',
  'storage.resourceGroup.view.node': 'Node View',
  'storage.resourceGroup.view.storageUnit': 'Data Disk View',
  'storage.resourceGroup.node': 'Node',
  'storage.resourceGroup.disk': 'Data Disk',
  'storage.resourceGroup.name': 'Name',
  'storage.resourceGroup.disk_type': 'Data Disk Type',
  'storage.resourceGroup.leaf_firstn': 'Fault Domain',
  'storage.resourceGroup.leaf_firstn.host': 'Node',
  'storage.resourceGroup.leaf_firstn.osd': 'Disk',
  'storage.resourceGroup.leaf_firstn.rack': 'Rack',
  'storage.resourceGroup.disk_type.hdd': 'Hybrid Disk',
  'storage.resourceGroup.disk_type.ssd': 'SSD',
  'storage.resourceGroup.disk_type.sas_ssd': 'SAS_SSD',
  'storage.resourceGroup.disk_type.sata_ssd': 'SATA_SSD',
  'storage.resourceGroup.disk_type.nvme': 'NVME',
  'storage.resourceGroup.action.create': 'Create Resource Group',
  'storage.resourceGroup.action.delete': 'Delete Resource Group',
  'storage.resourceGroup.action.delete.confirm': 'Are you sure to delete following resource group?',
  'storage.resourceGroup.action.move': 'Move Resource',
  'storage.resourceGroup.action.move.confirm':
    'Are you sure to move {length} resource from {source} to {target}  resource group?',
  'storage.resourceGroup.tooltip.leaf_firstn': 'Fault Domain',
  'storage.resourceGroup.invalidMsg.name':
    'name can only contain case-sensitive letter, number, - and _ within 1 to 64, which can not be started with - and _',
  'storage.resourceGroup.action.state.operating': 'Resource is on operating, please wait...',
  'storage.resourceGroup.action.state.operating.description':
    'Please link to Task List to see task details',
  'storage.resourceGroup.idle': 'Idle Resource',
  'storage.resourceGroup.tooltip.nodeError': 'Can not move this node due to node error',
  'storage.resourceGroup.tooltip.storageUnitError': 'Can not only move disk in busy status',
  'storage.resourceGroup.disk.operationStatus.busy': 'Busy',
  'storage.resourceGroup.drophere': 'Can drag node or disk here',
  'storage.resourceGroup.search.placeholder': 'Please input node name',
  'storage.resourceGroup.action.delete.notValid': 'Resource group has nodes, not deletable',
  'resourceGroup.moveDisk.confirm.content':
    'Migrating data disk may trigger off refactoring storage constructure, are you sure to migrate this data disk? ',
  'resourceGroup.moveNode.confirm.content':
    'Migrating node may trigger off refactoring storage constructure, are you sure to migrate this node?',
  'resourceGroup.empty.title1': 'Current resource group is empty',
  'resourceGroup.empty.title2': 'Drag host or data disk from other resource groups',
  'tooltip.resource.outside': 'Host and disk resource not added to any resource groups',
  'resourceGroup.qos.bandwidth': 'Bandwidth Limit',
  'resourceGroup.qos.iops': 'IOPS Limit',
  'resourceGroup.restoreQos': 'Restore QoS',
  'resourceGroup.restoreQos.business': 'Business First',
  'resourceGroup.restoreQos.restore': 'Restore First',
  'resourceGroup.restoreQos.selfDefine': 'User-defined',
  'resourceGroup.restoreQos.iops.overLimit':
    'Input beyond upper limit,  should be smaller than {limitation}',
};
