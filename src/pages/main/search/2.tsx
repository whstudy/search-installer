import { FormattedMessage, history } from 'umi';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import {Button, message, Modal, Space, Spin} from "antd";
import {appSetupTerraSearchDisk, appSetupTerraSearchDiskGet} from '@/services/dsm/terraSearchDeploy';
import { formatUnit } from '@/utils/format'

const { confirm } = Modal;

const Two = (props) => {
  // const intl = useIntl();
  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  
  const [hosts, setHosts] = useState<any[]>([])
  
  /*useEffect(()=>{
    const _hosts: any = []
    for(let i=0; i < 12; i++){
      const _disks: any = []
      let _j = 200
      if(i === 0)
        _j = 3
      for(let j=0; j < _j; j++){
        _disks.push({
          id: j,
        })
      }
      _hosts.push({
        id: `${i}.${i}.${i}.${i}`,
        disks: _disks,
      })
    }
    console.log(_hosts)
    setHosts(_hosts)
  }, [])*/

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getInitData = async () => {
    setIsLoading(true)
    const res = await appSetupTerraSearchDiskGet({});
    setHosts(res.data)
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
            _disk => _disk.path === node.disk.path ? { ..._disk, checked: true } : { ..._disk, checked: false }
          )} : _node
        )
      )
  , [])
  
  const submitDisk = async () => {
    const res = await appSetupTerraSearchDisk(hosts);
    console.log(res)
    history.push('3')
  }
  
  const next = () => {
    const disksChecked = hosts.map(
      host => host.disks.filter(disk => disk.checked)
    ).flat()
    const disksTypeSet =
      new Set(
        disksChecked
          .map(disk => disk.disk_type)
      );
    console.log(disksTypeSet)
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
    history.push('1')
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
                key={disk.path} 
                className={`${styles.disk} ${disk.checked&&styles.checked}`} 
                onClick={()=>checkDisk({ip_address: node.ip_address, disk: disk})}>
                {disk.checked && <CheckCircleFilled className={styles.check}/>}
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
export default Two;
