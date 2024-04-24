import React, {useEffect, useState} from 'react';
import ProCard from "@ant-design/pro-card";
import {Button, Form, Input, message, Radio, Steps, Tooltip} from "antd";
import {CheckCircleFilled, CloseCircleFilled, LoadingOutlined} from "@ant-design/icons/lib";
import { Access } from '@/.umi/plugin-access/access';
import {dsmObjectInitialize, dsmObjectResetEs, dsmObjectStep} from '@/services/dsm/objSearch';
import {history} from "@@/core/history";
import styles from './index.less';
import logo from '@/assets/svg/检索.svg'
import logo1 from '@/assets/svg/检索1.svg'

type initProps = {
};

const { Step } = Steps;
const Searchs: React.FC<initProps> = ({
                                      }) => {
  let timerId;
  const [stepsData, setStepsData] = useState<any>([]);
  const [init, setInit] = useState<any>();
  const [needInit, setNeedInit] = useState(true)
  const onFinish = async (values) => {
    await dsmObjectInitialize(values, {});
    const _stepsData = JSON.parse(JSON.stringify(stepsData)); 
    _stepsData[0].result = 1;
    setStepsData(_stepsData)
  }

  const toInit = () => {
    setInit(true)
  }
  
  const resetEs = async () => {
    await dsmObjectResetEs({}, {});
  }

  const getStep = async () => {
    const res: any = await dsmObjectStep({}, {});
    if(res.code === '2'){
      message.error(
        res.msg,
      );
      setStepsData([])
      clearInterval(timerId);
      return
    }
    setStepsData(res.data)
    for(let i=0;i<res.data.length;i++){
      if(res.data[i].result==2){
        clearInterval(timerId);
      }
    }
    if(res.data[res.data.length-1].result==1){
      clearInterval(timerId);
    }
  }

  /*useEffect(() => {
    timerId = setInterval(()=>{
      getStep()
    }, 10000000000000000000000000000)

    return () => {
      timerId && clearInterval(timerId);
    };
  }, [])*/

  const statusMap: any = [
    'wait',
    'finish',
    'error',
    'process',
  ]

  const toSearch = () => {
    history.push({
      pathname: '/search',
      state: {},
    });
  }
  const [form] = Form.useForm();
  return (
    <div className={styles.searchInitOutContainer}>
      <Access accessible={!init}>
        <ProCard title={''}>
          <div className={styles.searchInitDiv}>
            <div className={styles.searchInitDivLeft}>
              {
                needInit ?
                  <div className={styles.logo}>
                    <img src={logo}/>
                  </div>
                  :
                  <div className={[styles.logo, styles.logo1].join(' ')}>
                    <img src={logo1}/>
                  </div>
              }
              <div className={styles.titleDiv}>
                <div className={styles.searchInitTitle}>检索服务</div>
                <div>帮助用户快速地存储、搜索和分析海量数据</div>
              </div>
            </div>
            {
              needInit ? 
                <Button className={styles.initBtn} onClick={toInit}>安装</Button>
                :
                <Button className={styles.initBtn} onClick={toSearch}>打开</Button>
            }
          </div>
        </ProCard>
      </Access>
    
      <Access accessible={init}>
        <ProCard title={''}>
          <Access accessible={stepsData[0]?.result==0}>
            <div className={styles.searchInitStepDiv}>
              <div className={styles.title}>
                安装检索服务
              </div>
              <Form
                form={form}
                layout={'vertical'}
                className={styles.form}
                onFinish={onFinish}
              >
                <Form.Item
                  name={'management_type'}
                  label={'部署方式'}
                >
                  <Radio.Group>
                    <Radio value="纳管"> 纳管 </Radio>
                    <Radio value="创建"> 创建 </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item noStyle dependencies={['management_type']}>
                  {() => (
                    <>
                      <Access accessible={form.getFieldValue('management_type')==='纳管'}>
                        <Form.Item
                        name={'cluster_ip'}
                        label={'检索集群IP *'}
                        >
                        <Input/>
                        </Form.Item>
                      </Access>

                      <Access accessible={form.getFieldValue('management_type')==='创建'}>
                        <Form.Item
                        name={'management_ip'}
                        label={'节点IP'}
                        >
                        <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                        name={'username'}
                        label={'用户名'}
                        >
                        <Input/>
                        </Form.Item>
                        <Form.Item
                        name={'password'}
                        label={'密码'}
                        >
                        <Input.Password/>
                        </Form.Item>
                      </Access>
                    </>
                  )}
                </Form.Item>
                
                <Form.Item
                  // wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Access>
          <Access accessible={stepsData[0]?.result!=0}>
            <div className={styles.searchInitStepDiv}>
              <div className={styles.title}>
                正在配置检索服务 ...
              </div>
              <div className={styles.list}>
              {stepsData.map((o: any) => {
                return (
                  <div className={styles.item}>
                    <div>
                      {o.name}
                    </div>
                    {o.result===0?<div className={styles.statusWaiting}>未开始</div>:null}
                    {o.result===1?< CheckCircleFilled style={{color: 'green'}} />:null}
                    {o.result===2?<CloseCircleFilled style={{color: 'red'}} />:null}
                    {o.result===3?<LoadingOutlined style={{color: 'blue'}} />:null}
                  </div>
                  )
              })}
              </div>
              <Access accessible={stepsData[stepsData.length-1]?.result==1}>
                <div className={styles.title}>
                  <Button type={'primary'} onClick={toSearch}>对象检索</Button>
                </div>
              </Access>
            </div>
            {/*<Button type={'primary'} onClick={resetEs}>重置</Button>*/}
          </Access>
        </ProCard>
      </Access>
    </div>
  );
};
export default Searchs;
