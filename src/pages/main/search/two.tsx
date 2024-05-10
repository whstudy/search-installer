import type { ActionType } from '@ant-design/pro-table';
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Table,
  DatePicker,
  Select,
  Modal,
  Tooltip,
  Radio
} from 'antd';
import { FormattedMessage } from 'umi';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import styles from './index.less';
import moment from 'moment';
import {appSetupApiDiskGet} from '@/services/dsm/esDeploy';
import ProCard from "@ant-design/pro-card";
import {CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

let paramsObject: any = {
  page: 1,
  page_size: 10,
}

const SearchList = (props) => {
  const ref = useRef<ActionType>();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<any>();
  const [bucketList, setBucketList] = useState<any>();
  const [total, setTotal] = useState();
  const [current, setCurrent] = useState(1);

  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [deleteParams,setDeleteParams] = useState<any>()

  const [downloadArr, setDownloadArr] = useState<any>();

  const [objParams, setObjParams] = useState()


  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values) => {
    paramsObject.page = 1
    setCurrent(1)
    paramsObject = {
      ...paramsObject,
      ...values,
      buckets: values?.bucket?.map(node=>{
        const oArr = node.split('-')
        return {owner: oArr[0] == 'null' ? null : oArr[0], name: oArr[1]}
      }),
      name: values.name,
      size_operator: values.size_operator,
      unit: undefined,
      size: values.size * values.unit || undefined
    }
    paramsObject.time = undefined
    if(values.time){
      paramsObject.start_time = moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss')
      paramsObject.end_time = moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
  }


  const shareObj = (record) => {
    setObjParams({
      name: record.name,
      bucket: record.bucket,
      owner: record.owner,
    })
    setConfirmVisible(true);
  };

  const onChange = (pagination, filter, sorter, extra) => {
    const orderMap = {
      ascend: 'asc',
      descend: 'desc',
    }
    if(extra.action!=="paginate"){
      paramsObject.sort_field = sorter.order&&sorter.field
      paramsObject.order = orderMap[sorter.order]
      paramsObject.page = 1
      setCurrent(1)
    }else{
      paramsObject.page = pagination.current
      setCurrent(pagination.current)
    }
  }

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
      </ProCard>
    </>
  );
};
export default SearchList;