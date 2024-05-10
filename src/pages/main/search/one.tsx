import type { ActionType } from '@ant-design/pro-table';
import {
  Button,
  Form,
  Input,
  message,
  Space,
  DatePicker,
  Select,
  Modal,
  Tooltip,
  Radio
} from 'antd';
import { FormattedMessage } from 'umi';
import React, { useRef, useState, useEffect } from 'react';
import styles from '../index.less';
import moment from 'moment';
import {appSetupApiAddNodeGet} from '@/services/dsm/esDeploy';
import ProCard from "@ant-design/pro-card";
import { saveAs } from 'file-saver';

const { RangePicker } = DatePicker;
const { Option } = Select;

let paramsObject: any = {
  page: 1,
  page_size: 10,
}

const SearchList = (props) => {
  const [form] = Form.useForm();


  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const [downloadArr, setDownloadArr] = useState<any>();

  const [objParams, setObjParams] = useState()

  const onFinish = (values) => {
    paramsObject.page = 1
    setCurrent(1)
    paramsObject = {
      ...paramsObject,
      ...values,
      buckets: values?.bucket?.map(o=>{
        const oArr = o.split('-')
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

  const getBucket = async () => {
    const bucketListTemp: any = []
    const bucketRes: any = await dsmObjBucket({}, {});
    for (let i = 0; i < bucketRes.data.length; i++) {
      bucketListTemp.push({
        label: `${bucketRes.data[i].name}${bucketRes.data[i].owner?`（租户：${bucketRes.data[i].owner}）`:''}`,
        value: `${bucketRes.data[i].owner}-${bucketRes.data[i].name}`,
      })
    }
    setBucketList(bucketListTemp)
  }

  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDownloadArr(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const objDownLoad = async (e) => {
    const _downloadArr = e.record || downloadArr
    for(const record of _downloadArr){
      const result: any = await dsmDownload(
        {
          name: record.name,
          bucket: record.bucket,
          owner: record.owner,
        },
        { parseResponse: false }
      );

      const blob = await result.blob();
      const fileName = `${record.name}`;
      saveAs(blob, fileName);
    }
  }

  return (
    <>
      <ProCard
        className={styles.searchListTop}
        title={
          <div className={styles.demoTitleDiv}>
            首先，添加检索服务节点
          </div>
        }
      >
        <div>
          <Space className={styles.searchForm}>
            <Form
              layout={"vertical"}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label={'部署配置'} name={'bucket'}>
                <Radio.Group
                  size={'middle'}
                  style={{ width: '100%' }}
                  defaultValue={1}
                  options={[
                    {value: 1, label: `推荐`},
                    {value: 2, label: `简单`},
                  ]}
                />
              </Form.Item>

              <Form.Item label={'节点IP'} name={'节点IP'}>
                <Input.TextArea rows={4}/>
              </Form.Item>

              <Form.Item label={'用户名'} name={'用户名'}>
                <Input/>
              </Form.Item>

              <Form.Item label={'密码'} name={'密码'}>
                <Input/>
              </Form.Item>

              <Space className={styles.btnGroup}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    下一步
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Space>
        </div>
      </ProCard>
    </>
  );
};
export default SearchList;
