export default {
  'host.title': '节点',
  'host.action.disk': '磁盘',
  'host.action.poweroff': '关机',
  'host.action.poweron': '开机',
  'host.action.restart': '重启',
  'host.action.bmcLogin': '登录 BMC',
  'host.action.bmcEdit': '编辑 BMC',
  'host.action.setBmc': '配置 BMC',
  'host.action.keepPoweroff': '继续关机',
  // 状态
  'host.status.running': '运行中',
  'host.status.offline': '离线',
  'host.status.restarting': '重启中',
  'host.status.poweroff': '关机',
  'host.status.normal': '正常',
  'host.status.demotion': '降级',
  'host.status.extending': '扩容中',
  'host.status.extendFailed': '扩容失败',
  'host.status.shrinking': '缩容中',
  'host.status.shrinkFailed': '缩容失败',
  'host.status.maitainning': '维护中',
  'host.status.upgrading': '升级中',
  'host.status.upgradingFailed': '升级失败',
  'host.status.abnormal': '异常',
  'host.status.health': '健康',
  // 网络异常
  'host.network.management_IPv4.error': '管理网IPv4异常',
  'host.network.management_IPv6.error': '管理网IPv6异常',
  'host.network.cluster_IPv4.error': '集群网IPv4异常',
  'host.network.cluster_IPv6.error': '集群网IPv6异常',
  'host.network.service_IPv4.error': '业务网IPv4异常',
  'host.network.service_IPv6.error': '业务网IPv6异常',
  // 表格头
  'host.title.node_name': '名称',
  'host.title.rack': '机架',
  'host.title.public_ip': '业务 IP',
  'host.title.dynamic_ip': '业务动态 IP',
  'host.title.operation_status': '操作状态',
  'host.title.running_status': '运行状态',
  'host.title.cpu': '处理器使用率%',
  'host.title.mem': '内存使用率%',
  'host.performance.cpu': '处理器使用率',
  'host.performance.mem': '内存使用率',
  // 详情
  'host.detail.node_name': '名称',
  'host.detail.role': '角色',
  'host.detail.rack': '机架',
  'host.detail.operation_status': '操作状态',
  'host.detail.running_status': '运行状态',
  'host.detail.public_ip': '业务 IP',
  'host.detail.manager_ip': '管理 IP',
  'host.detail.cpu': '处理器',
  'host.detail.mem': '内存',
  'host.detail.cluster_ip': '集群 IP',
  'host.detail.bmc_ip': 'BMC IP',
  'host.detail.bmc_port': 'BMC 端口',
  'host.detail.mem_size': '内存',
  'host.detail.os': '操作系统',
  'host.detail.storage_units': '数据盘数量',
  'host.detail.su_used': '数据盘已用空间',
  'host.detail.sys_disk_used': '系统盘已用空间',
  // host 字段
  'host.status': '状态',
  'host.title.role': '角色',
  'host.role.MDS': '元数据服务',
  'host.role.error.MDS': '元数据服务异常',
  'host.role.CMS': '集群服务',
  'host.role.error.CMS': '集群服务异常',
  'host.role.DSM': '管理服务',
  'host.role.error.DSM': '管理服务异常',
  'host.role.PROT': 'NAS 服务',
  'host.role.error.PROT': 'NAS 服务异常',
  'host.role.RGW': '对象服务',
  'host.role.error.RGW': '对象服务异常',
  'host.role.REP': '远程复制服务',
  'host.role.error.REP': '远程复制服务异常',
  'host.storage_units': '数据盘',
  'host.ipmi_ip': '业务静态 IP',
  'host.cpu': '处理器',
  'host.mem': '内存',
  'host.cpu_usage': '处理器',
  'host.mem_usage': '内存',
  'host.bmc.ip': 'BMC IP',
  'host.bmc.port': 'BMC 端口',
  'host.bmc.userName': 'BMC 用户名',
  'host.bmc.password': 'BMC 密码',
  'host.network.info': '网卡信息',
  'host.network.role.cluster': '集群',
  'host.network.role.public': '业务',
  'host.network.role.manager': '管理',
  'host.manager_ip': '管理 IP',
  'host.cluster_ip': '集群 IP',
  'host.bmc_ip': 'BMC IP',
  'host.bmc_port': 'BMC 端口',
  'host.mem_size': '内存',
  'host.os': '操作系统',
  'host.storage_unit': '存储单元',
  'host.health.status': '健康状态',
  'host.health.status.health': '健康',
  'host.health.status.error': '故障',
  'host.health.green': '该节点健康',
  'host.health.status.cpu': '处理器使用 > {threshold}%',
  'host.health.status.mem': '内存使用 > {threshold}%',
  'host.health.status.average': '系统平均使用率 {average}%',
  'host.filter.name': '节点名',
  // chart 时间选择
  'host.chart.realTime': '实时',
  'host.chart.month': '一月',
  'host.chart.week': '一周',
  'host.chart.day': '一天',
  'host.network.noNic': '暂未配置网卡',
  'host.networkd.bw': '带宽',
  'host.networkd.packageLoss': '丢包率',
  'host.networkd.latency': '时延',
  // 操作描述
  'host.restart.text': '确定重启节点吗？',
  'host.poweroff.text': '确定关闭节点吗？',
  'host.poweron.text': '确定开启节点吗？',
  // 验证提示
  'validate.bmcIp.required': '请输入 BMC IP',
  'validate.bmcIp.pattern': '请输入正确的 BMC IP地址',
  'validate.bmcPort.required': '请输入 BMC 端口',
  'validate.bmcPort.pattern': '请输入正确的端口号',
  'validate.bmcUser.required': '请输入 BMC 用户名',
  'validate.bmcPassword.required': '请输入BMC 密码',
  'bmc.title.restart': '重启前前请先输入 BMC 用户名和密码',
  'bmc.title.login': '登录前请先输入 BMC 用户名和密码',
  'bmc.title.poweroff': '关机前请先输入 BMC 用户名和密码',
  'bmc.ip.required': '请输入 BCM IP',
  'network.ipv4.required': '请输入 IPv4 地址/掩碼',
  'network.ipv6.required': '请输入 IPv6 地址/掩码',
  'network.ipv4.pattern': '请输入正确的 IPv4 地址/掩码',
  'network.ipv6.pattern': '请输入正确的 IPv6 地址/掩码',
  // 长提示
  'host.powerOff.confirm': '关闭节点之前请先配置 BMC， 否则关机之后无法远程开机',
  'host.poweroff.confirm.content':
    '关闭该节点会停止该节点上所有的数据盘服务，可能会触发数据重构，确定关闭节点 {nodeName} 吗？',
  'host.restart.confirm.content': '重启节点可能会触发数据重构，您确定要重启该节点吗？',
  'host.poweron.confirm.content': '确定启动节点 {nodeName} 吗？',
  'host.cpu.rate': 'CPU 使用率',
  'host.mem.rate': '内存使用率',
  'host.network.ipInfo': 'IP 信息',
  'host.active.time': '激活于 {activateTime}',
  'host.inactive': '该节点未激活，请尽快授权并激活',
  'bmc.setting': '正在配置 BMC，请稍等……',
  'host.network.dynamicIp': '浮动 IP',
  'host.network.ipv4': 'IPv4',
  'host.network.ipv6': 'IPv6',
  'host.network.noipv6': '无 IPv6',
};