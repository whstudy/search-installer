import { FormattedMessage, history } from 'umi';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {CheckCircleFilled } from '@ant-design/icons';
import {Button} from "antd";

const SearchList = (props) => {
  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const [hosts, setHosts] = useState<any[]>([])
  
  useEffect(()=>{
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
  }, [])
  
  const checkDisk = useCallback(
    (node) => 
      setHosts(prev =>
        prev.map(
          _node => node.id === _node.id ? {..._node, disks: _node.disks.map(
            _disk => _disk.id === node.disk.id ? { ..._disk, checked: true } : { ..._disk, checked: false }
          )} : _node
        )
      )
  , [])
  
  const next = () => {
    history.push('3')
  }
  
  return (
    <>
      <ProCard
        className={styles.searchListTop}
        title={
          <div className={styles.demoTitleDiv}>
            <FormattedMessage id="monitor.historyAlarm.severity.major" />首先，添加检索服务节点
          </div>
        }
      >
        <div className={styles.nodeContainer}>
          {hosts.map((node)=><div key={node.id} className={styles.formItemContainer}>
            <div className={styles.formItemTitle}>
              {node.id}
            </div>
            <div className={styles.diskContainer}>
              {node.disks.map((disk)=><div 
                key={disk.id} 
                className={`${styles.disk} ${disk.checked&&styles.checked}`} 
                onClick={()=>checkDisk({id: node.id, disk: disk})}>
                {disk.checked && <CheckCircleFilled className={styles.check}/>}
                <div className={styles.diskIcon}></div>
                <div className={styles.diskName}>{disk.id}sda-480GB</div>
              </div>)}  
            </div>
          </div>)}
        </div>
        <Button type="primary" onClick={next}>
          下一步
        </Button>
      </ProCard>
    </>
  );
};
export default SearchList;
