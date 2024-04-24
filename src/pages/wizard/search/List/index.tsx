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
  Tooltip
} from 'antd';
import { FormattedMessage } from 'umi';
import React, { useRef, useState, useEffect } from 'react';
import styles from '../index.less';
import moment from 'moment';
import {dsmObjectDelete, dsmObjectGet, dsmObjBucket, dsmDownload} from '@/services/dsm/objSearch';
import {formatUnit} from "@/utils";
import Share from "../component/share";
import ProCard from "@ant-design/pro-card";
import { saveAs } from 'file-saver';
import { InfoCircleOutlined } from '@ant-design/icons';

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

  const getDataSource = async () => {
    const res: any = await dsmObjectGet(paramsObject, {});
    if(res.code === '2'){
      message.error(
        res.msg,
      );
    }
    setDataSource(res.data.list)
    setTotal(res.data.total)
  }

  const onReset = () => {
    form.resetFields();
  }
  
  // 删除
  async function handleDelete() {
    const hideMsg = message.loading(
      <FormattedMessage id="component.router" defaultMessage="正在删除" />,
      0,
    );
    const res = await dsmObjectDelete(deleteParams);
    hideMsg();
    if(res.code === "0"){
      res?.message?.success(res.msg);
      setTimeout(()=>{
        getDataSource()
      },500);
    }else{
      res?.message?.error(res.msg);
    }
    setConfirmVisible(false)
  }

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
    getDataSource()
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

  useEffect(() => {
    getBucket()
    getDataSource()
  }, [])

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
    getDataSource()
  }

  const unitOptions = [
    {
      label: 'B',
      value: 1,
    },
    {
      label: 'KB',
      value: 1*1024,
    },
    {
      label: 'MB',
      value: 1*1024*1024,
    },
    {
      label: 'GB',
      value: 1*1024*1024*1024,
    },
    {
      label: 'TB',
      value: 1*1024*1024*1024*1024,
    },
  ]

  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

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
            对象检索
            <Tooltip title={
              <div className={styles.searchTooltip}>
                <div>查询模式</div>
                <div className={styles.content}><div>■</div> 完全匹配：文本关键词和搜索关键字一致</div>
                <div className={styles.content}><div>■</div> 分词匹配：对文本进行分词处理并基于分词结果进行查询</div>
                <div className={styles.content}><div>■</div> 前缀匹配：支持前缀模糊搜索</div>
                <div className={styles.content}><div>■</div> 后缀匹配：支持后缀模糊搜索</div>
              </div>
            } placement="rightBottom">
              <InfoCircleOutlined className="term-explan-icon" />
            </Tooltip>
          </div>
        }
      >
        <div>
          <Space className={styles.searchForm}>
            <Form
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label={'所属桶'} name={'bucket'}>
                <Select
                  size={'middle'}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择所属桶"
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChange}
                  options={bucketList}
                />
              </Form.Item>
  
              <Space>
                <Form.Item label={'对象名称'} name={'name'}>
                  <Input/>
                </Form.Item>
                <Form.Item label={'对象大小'}>
                  <Input.Group compact>
                    <Form.Item name={'size_operator'} style={{marginBottom: 0}}>
                      <Select placeholder={'请选择'}>
                        <Option value="gt">大于</Option>
                        <Option value="lte">小于等于</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={'size'} style={{marginBottom: 0}}>
                      <Input />
                    </Form.Item>
                    <Form.Item name={'unit'} initialValue={1} style={{marginBottom: 0}}>
                      <Select options={unitOptions}/>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item label={'创建时间'} name={'time'}>
                  <RangePicker showTime={true}/>
                </Form.Item>
              </Space>

              <Form.Item label="标签" name="tags">
                <Form.List name="tags">
                  {(tagsFields, tagsOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {tagsFields.map((tagsField) => (
                        <Space key={tagsField.key}>
                          <Form.Item noStyle name={[tagsField.name, 'key']}>
                            <Input placeholder="键" />
                          </Form.Item>
                          <Form.Item noStyle name={[tagsField.name, 'value']}>
                            <Input placeholder="值" />
                          </Form.Item>
                          <Button onClick={() => {
                            tagsOpt.remove(tagsField.name);
                          }}>删除</Button>
                        </Space>
                      ))}
                      <Space>
                        <Button style={{width: '100px'}} onClick={() => tagsOpt.add()} block>
                          添加
                        </Button>
                        <Select
                          defaultValue={'jack'}  
                          options={[
                          { value: 'jack', label: '分词匹配' },
                          { value: 'lucy', label: 'Lucy' },
                          { value: 'Yiminghe', label: 'yiminghe' },
                          { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}/>
                        <Select
                          defaultValue={'jack'}
                          options={[
                          { value: 'jack', label: '或' },
                          { value: 'lucy', label: 'Lucy' },
                          { value: 'Yiminghe', label: 'yiminghe' },
                          { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}/>
                      </Space>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
              
              <Space className={styles.btnGroup}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    检索
                  </Button>
                </Form.Item>
  
                <Form.Item>
                  <Button onClick={onReset}>
                    重置
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Space>
        </div>
      </ProCard>

      <ProCard title={''} className={styles.table}>
        <Space className={styles.searchForm}>
        <Button htmlType="submit" onClick={objDownLoad}>
          批量下载
        </Button>
      </Space>
        <Table
          showSorterTooltip={false}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={[
            {
              title: '对象名称',
              dataIndex: 'name',
              key: 'name',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => (
                <div className={styles.tableNameTitle}>
                  <span title={record.name} className={styles.gatewaysNameSpan}>
                    {record.name}
                  </span>
                </div>
              ),
            },
            {
              title: <FormattedMessage id="component.tableTitle.operation" defaultMessage="操作" />,
              key: 'operation',
              render: (text, record) => (
                <Space size="middle">
                  <a
                    // href={`/dsm/object/download/?name=${record.name}&bucket=${record.bucket}&owner=${record.owner}`}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      e.record = [record]
                      objDownLoad(e);
                    }}
                  >
                    下载
                  </a>
                  <a
                    onClick={() => {
                      shareObj(record);
                    }}
                  >
                    分享
                  </a>
                </Space>
              ),
            },
            {
              title: '大小',
              dataIndex: 'size',
              key: 'size',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => (
                <div className={styles.tableNameTitle}>
                  {formatUnit(record.size)}
                </div>
              ),
            },
            {
              title: '租户名',
              dataIndex: 'owner',
              key: 'owner',
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => {
                const ownerName = text.split('$').length == 2 ? text.split('$')[0] : 'N/A'
                return (<div className={styles.tableNameTitle}>
                  <span title={ownerName} className={styles.gatewaysNameSpan}>
                    {ownerName}
                  </span>
                </div>)
              },
            },
            {
              title: '用户名',
              dataIndex: 'owner',
              key: 'owner',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => {
                const ownerName = text.split('$').length == 2 ? text.split('$')[1] : text
                return (<div className={styles.tableNameTitle}>
                  <span title={ownerName} className={styles.gatewaysNameSpan}>
                    {ownerName}
                  </span>
                </div>)
              },
            },
            {
              title: '所属桶',
              dataIndex: 'bucket',
              key: 'bucket',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: <FormattedMessage id="storage.gateways.createTime" defaultMessage="创建时间" />,
              dataIndex: 'create_time',
              key: 'create_time',
              sorter: true,
              renderText: (val: number) => `${moment(val).format('YYYY-MM-DD HH:mm:ss')}`,
            },
          ]}
          pagination={{
            pageSize: 10,
            total: total,
            current: current,
          }}
          scroll={{ x: 1500 }}
          actionRef={ref}
          dataSource={dataSource}
          rowKey="id"
          onChange={onChange}
        />
      </ProCard>
      <Modal
        centered
        title={'分享'}
        visible={confirmVisible}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setConfirmVisible(false)}
      >
        <Share objParams={objParams}/>
      </Modal>
    </>
  );
};
export default SearchList;
