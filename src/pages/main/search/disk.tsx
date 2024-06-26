import { history } from 'umi';
import {useState, useEffect, useCallback} from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import {Button, message, Modal, Space, Spin} from "antd";
import {apiTerraSearchDeployNodeGet, apiTerraSearchDeployNode} from '@/services/dsm/Node';
import { formatUnit } from '@/utils/format'

const { confirm } = Modal;

const Disk = (props) => {
  // const intl = useIntl();
  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  
  const [hosts, setHosts] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getInitData = async () => {
    setIsLoading(true)
    const res = await apiTerraSearchDeployNodeGet({});
    setHosts(res?.data||[])
    setIsLoading(false)
    console.log(res)
  };

  useEffect(()=>{
    getInitData()
  }, [])
  
  const checkDisk = useCallback(
    (node) => 
      setHosts(prev =>
        prev.map(
          _node => node.ip_address === _node.ip_address ? {..._node, disks: _node.disks.map(
            _disk => _disk.serial_number === node.disk.serial_number ? { ..._disk, is_selected: true } : { ..._disk, is_selected: false }
          )} : _node
        )
      )
  , [])
  
  const submitDisk = async () => {
    const res = await apiTerraSearchDeployNode(hosts);
    if ((res as any).success) {
      message.success(`提交成功`);
      history.push('cluster')
      return true;
    }
    message.error(res?.msg);
    return false
  }
  
  const next = () => {
    const disksChecked = hosts.map(
      host => host.disks.filter(disk => disk.is_selected)
    ).flat()
    const disksTypeSet =
      new Set(
        disksChecked
          .map(disk => disk.disk_type)
      );
    console.log(disksTypeSet)
    if (hosts.length !== disksChecked.length) {
      message.error(`请选择数据盘`)
      return
    }
    if (disksTypeSet.size > 1) {
      message.error(`请选择类型相同的数据盘`)
      return
    }
    const disksSizeSet = 
      new Set(
        disksChecked
          .map(disk => formatUnit(disk.size))
      );
    console.log(disksSizeSet)
    if (disksSizeSet.size > 1) {
      confirm({
        title: '提示',
        content: '容量不一致会导致数据不均衡',
        okText: '下一步',
        onOk() {
          submitDisk()
        },
        onCancel() {},
      });
    } else {
      submitDisk()
    }
  }

  const up = () => {
    history.push('node')
  }
  
  return (
    <Spin spinning={isLoading}>
      <ProCard
        className={styles.searcprohListTop}
        title={
          <>
            <div className={styles.demoTitleDiv}>
              选择数据盘
            </div>
            <div className={styles.tooltip}>
              <ExclamationCircleOutlined className={styles.tooltipIcon} />
              为保证性能稳定和数据均衡，请选择类型相同、容量相同的数据盘
            </div>
          </>
        }
      >
        <div className={styles.nodeContainer}>
          {hosts.map((node)=><div key={node.ip_address} className={styles.formItemContainer}>
            <div className={styles.formItemTitle}>
              {node.ip_address}
            </div>
            <div className={styles.diskContainer}>
              {node.disks.map((disk)=><div 
                key={disk.serial_number} 
                className={`${styles.disk} ${disk.is_selected&&styles.checked}`} 
                onClick={()=>checkDisk({ip_address: node.ip_address, disk: disk})}>
                {disk.is_selected && <CheckCircleFilled className={styles.check}/>}
                <div className={styles.diskIcon}>
                  <img src={require(`@/assets/${disk.disk_type}.svg`)} />
                </div>
                <div className={styles.diskName}>{disk.disk_type}-{formatUnit(disk.size)}</div>
              </div>)}  
            </div>
          </div>)}
        </div>
        <Space>
          <Button type="primary" onClick={up}>
            上一步
          </Button>
          <Button type="primary" onClick={next}>
            下一步
          </Button>
        </Space>
      </ProCard>
    </Spin>
  );
};
export default Disk;
