import { FormattedMessage, history } from 'umi';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {CheckCircleFilled } from '@ant-design/icons';
import {Button, Space, Spin} from "antd";
import {appSetupTerraSearchDisk, appSetupTerraSearchDiskGet} from '@/services/dsm/terraSearchDeploy';
import { formatUnit } from '@/utils/format'


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
  
  const next = async () => {
    const res = await appSetupTerraSearchDisk(hosts);
    console.log(res)
    history.push('3')
  }

  const up = () => {
    history.push('1')
  }
  
  return (
    <Spin spinning={isLoading}>
      <ProCard
        className={styles.searchListTop}
        title={
          <div className={styles.demoTitleDiv}>
            首先，添加检索服务节点
          </div>
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
