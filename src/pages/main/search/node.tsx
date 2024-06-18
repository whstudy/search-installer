import {
  Button,
  Form,
  Input,
  Space,
  Radio,
  Spin, message
} from 'antd';
import {history } from "umi";
import { useState, useEffect } from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {apiDeployTerraSearchClusterConfigGet, apiDeployTerraSearchClusterConfig} from "@/services/dsm/Nodes";

const Node = (props) => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getInitData = async () => {
    setIsLoading(true)
    const res = await apiDeployTerraSearchClusterConfigGet({});
    setIsLoading(false)
    form?.setFieldsValue({
      ...res.data,
    });
  };

  useEffect(()=>{
    getInitData()
  }, [])

  const onFinish = async (values) => {
    const res = await apiDeployTerraSearchClusterConfig(values);
    if ((res as any).success) {
      message.success(res?.msg);
      history.push('disk')
      return true;
    }
    message.error(res?.msg);
    return false
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
        <div>
          <Space className={styles.searchForm}>
            <Form
              layout={"vertical"}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item label={'部署配置'} name={'deploy_mode'}>
                <Radio.Group
                  size={'middle'}
                  style={{ width: '100%' }}
                  // defaultValue={1}
                  options={[
                    {value: `fast`, label: `快速`},
                    {value: `standard`, label: `标准`},
                  ]}
                />
              </Form.Item>
              
              <Form.Item noStyle dependencies={['deploy_mode']}>
                {() => (
                  <>
                      <Form.Item
                        className={styles.deployModeDesc}
                      >
                        {form.getFieldValue('deploy_mode') === `standard` ? `标准部署的确可以支持部署在3到10个节点上，这种部署方式通常用于较大规模的检索集群，以提供更高的性能和可靠性` : `快速部署支持单节点部署，这种部署方式通常能够帮助客户在资源有限的情况下快速部署检索服务`}
                      </Form.Item>
                    
                    <Form.Item label={'节点IP'} name={'ip_segments'}>
                      {form.getFieldValue('deploy_mode') === `standard` ? <Input.TextArea rows={4} placeholder={`节点数量≥3`}/> : <Input placeholder={`请输入一个节点IP`}/>}
                    </Form.Item>
                  </>
                )}
              </Form.Item>
                  
              <Form.Item label={'用户名'} name={'username'}>
                <Input/>
              </Form.Item>

              <Form.Item label={'密码'} name={'password'}>
                <Input/>
              </Form.Item>

              <Form.Item noStyle dependencies={['deploy_mode']}>
                {() => (
                  <>
                    {
                      form.getFieldValue('deploy_mode') === `standard` &&
                      <Form.Item label={'检索集群VIP'} name={'vip'}>
                        <Input placeholder={`请输入检索集群访问地址`}/>
                      </Form.Item>
                    }
                  </>
                )}
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
    </Spin>
  );
};
export default Node;
