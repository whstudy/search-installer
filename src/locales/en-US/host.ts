export default {
  'host.title': 'Nodes',
  'host.action.disk': 'Disks',
  'host.action.poweroff': 'Shut Down',
  'host.action.poweron': 'Power On',
  'host.action.restart': 'Reboot',
  'host.action.bmcLogin': 'Login BMC',
  'host.action.bmcEdit': 'Edit BMC',
  'host.action.setBmc': 'Set BMC',
  'host.action.keepPoweroff': 'Continue',
  // 状态
  'host.status.running': 'Running',
  'host.status.offline': 'Offline',
  'host.status.restarting': 'Restarting',
  'host.status.poweroff': 'Power Off',
  'host.status.normal': 'Normal',
  'host.status.demotion': 'Demotion',
  'host.status.extending': 'Extending',
  'host.status.extendFailed': 'Extend Failed',
  'host.status.shrinking': 'Shrinking',
  'host.status.shrinkFailed': 'Shrink Failed',
  'host.status.maitainning': 'Maitainning',
  'host.status.upgrading': 'Upgrading',
  'host.status.upgradingFailed': 'Upgrading Failed',
  'host.status.abnormal': 'Abnormal',
  'host.status.health': 'Healthy',
  'host.network.management_IPv4.error': 'Management IPv4 Error',
  'host.network.management_IPv6.error': 'Management IPv6 Error',
  'host.network.cluster_IPv4.error': 'Cluster IPv4 Error',
  'host.network.cluster_IPv6.error': 'Cluster IPv6 Error',
  'host.network.service_IPv4.error': 'Service IPv4 Error',
  'host.network.service_IPv6.error': 'Service IPv6 Error',
  // 表格头部
  'host.title.node_name': 'Name',
  'host.title.role': 'Role',
  'host.title.rack': 'Rack',
  'host.title.operation_status': 'Operation Status',
  'host.title.running_status': 'Running Status',
  'host.title.dynamic_ip': 'Virtual IPs',
  'host.title.public_ip': 'Service IP',
  'host.title.cpu': 'CPU Usage',
  'host.title.mem': 'Memory Usage',
  'host.performance.cpu': 'CPU Usage',
  'host.performance.mem': 'Memory Usage',
  // 详情
  'host.detail.node_name': 'Name',
  'host.detail.role': 'Role',
  'host.detail.rack': 'Rack',
  'host.detail.operation_status': 'Operation Status',
  'host.detail.running_status': 'Running Status',
  'host.detail.dynamic_ip': 'Dynamic IP',
  'host.detail.public_ip': 'Service IP',
  'host.detail.cpu': 'CPU',
  'host.detail.mem': 'Memory',
  'host.detail.cluster_ip': 'Cluster IP',
  'host.detail.bmc_ip': 'BMC IP',
  'host.detail.bmc_port': 'BMC Port',
  'host.detail.mem_size': 'Memory',
  'host.detail.os': 'OS',
  'host.detail.storage_units': 'Data Disks',
  'host.detail.manager_ip': 'Management IP',
  'host.detail.su_used': 'Used Capacity of Data Disks',
  'host.detail.sys_disk_used': 'Used Capacity of System Disks',
  // host字段
  'host.status': 'status',
  'host.role.MDS': 'MDS',
  'host.role.CMS': 'CMS',
  'host.role.DSM': 'DSM',
  'host.role.PROT': 'PROT',
  'host.role.RGW': 'RGW',
  'host.role.REP': 'REPLICATION',
  'host.role.error.MDS': 'MDS service error',
  'host.role.error.CMS': 'CMS service error',
  'host.role.error.DSM': 'DSM service error',
  'host.role.error.PROT': 'PORT service error',
  'host.role.error.RGW': 'RGW service error',
  'host.role.error.REP': 'REP service error',
  'host.storage_units': 'Data Disk',
  'host.ipmi_ip': 'IPMI IP',
  'host.cpu': 'CPU',
  'host.cpu_usage': 'CPU',
  'host.mem_usage': 'Memory',
  'host.mem': 'Memory',
  'host.bmc.ip': 'BMC IP',
  'host.bmc.port': 'BMC Port',
  'host.bmc.userName': 'BMC User Name',
  'host.bmc.password': 'BMC password',
  'host.network.info': 'Network Infomation',
  'host.network.role.cluster': 'Cluster',
  'host.network.role.public': 'Data',
  'host.network.role.manager': 'Management',
  'host.manager_ip': 'Management IP',
  'host.cluster_ip': 'Cluster IP',
  'host.bmc_ip': 'BMC IP',
  'host.bmc_port': 'BMC Port',
  'host.mem_size': 'memory',
  'host.storage_unit': 'Storage Unit',
  'host.health.status': 'Health Status',
  'host.health.status.health': 'Healthy',
  'host.health.status.error': 'Error',
  'host.health.green': 'The node is healthy',
  'host.health.status.cpu': 'CPU Usage > {threshold}%',
  'host.health.status.mem': 'Memory Usage > {threshold}%',
  'host.health.status.average': 'Average {average}%',
  'host.filter.name': 'Node Name',
  // chart 时间选择
  'host.chart.realTime': 'Hour',
  'host.chart.month': 'Month',
  'host.chart.week': 'Week',
  'host.chart.day': 'Day',
  'host.network.noNic': 'No Nic Exists',
  'host.networkd.bw': 'Bandwidth',
  'host.networkd.packageLoss': 'Packet Loss Rate',
  'host.networkd.latency': 'Latency',
  // 操作描述
  'host.restart.text': 'Are you sure to reboot this host?',
  'host.poweroff.text': 'Are you sure to shutdown this host?',
  'host.poweron.text': 'Are you sure to start this host?',
  // 提示、验证
  'validate.bmcIp.required': 'Please input BMC IP',
  'validate.bmcIp.pattern': 'Please input a correct IP address',
  'validate.bmcPort.required': 'Please input BMC port',
  'validate.bmcPort.pattern': 'Please input a valid port',
  'validate.bmcUser.required': 'Please input BMC user name',
  'validate.bmcPassword.required': 'Please input BMC password',
  'bmc.title.restart': 'Please input user name and password before you reboot a node',
  'bmc.title.login': 'Please input user name and password before loging in',
  'bmc.title.poweroff': 'Please input user name and password before shutting down',
  'bmc.ip.required': 'Please input BCM IP',
  'network.ipv4.required': 'Please input a IPv4 address with or without mask',
  'network.ipv6.required': 'Please input a IPv6 address with or without mask',
  'network.ipv4.pattern': 'Please input correct IPv4 address with or without mask',
  'network.ipv6.pattern': 'Please input correct IPv6 address with or without mask',
  // 长提示
  'host.powerOff.confirm':
    "Please set BMC before you shut down the node, or the node won't boot remotely after closing",
  'host.poweroff.confirm.content':
    'Shutting down will stop all the data disk services on this node, which may trigger off data resonstructure. Are you sure to shuw down node {nodeName}?',
  'host.restart.confirm.content':
    'Restarting the node may trigger off data resonstructure, Are you sure to reboot it?',
  'host.poweron.confirm.content': 'Are you sure to start node {nodeName} 吗？',
  'host.cpu.rate': 'CPU',
  'host.mem.rate': 'Memory',
  'host.network.ipInfo': 'IP Infomation',
  'host.active.time': 'Activated at {activateTime}',
  'host.inactive': 'Node is inactivated. Please authorize and activate it as soon as possible.',
  'bmc.setting': 'Setting BMC, please wait a momemnt...',
  'host.network.dynamicIp': 'Virtual IPs',
  'host.network.ipv4': 'IPv4',
  'host.network.ipv6': 'IPv6',
  'host.network.noipv6': 'No IPv6',
};
