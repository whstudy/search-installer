import {
  Button,
  Form,
  Input,
  Space,
  Spin,
  message
} from 'antd';
import {FormattedMessage, history} from "umi";
import React, {  useState, useEffect } from 'react';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import { ProFormUploadButton } from '@ant-design/pro-form';
import {
  appSetupApiGetMagnascaleClusterInfoGet,
  appSetupApiGetMagnascaleClusterInfo,
} from "@/services/dsm/terraSearchDeploy";


const Three = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getInitData = async () => {
    setIsLoading(true)
    const res = await appSetupApiGetMagnascaleClusterInfoGet({});
    setIsLoading(false)
    form?.setFieldsValue({
      ...res.data,
      certificate_filename: res?.data?.certificate_filename?[{
        name: res?.data?.certificate_filename,
        originFileObj:  new Blob([res?.data?.certificate_content||``])
      }]:[],
    });
  };

  useEffect(()=>{
    getInitData()
  }, [])

  const onFinish = async (values) => {

    const reader = new FileReader();
    reader.readAsText(values.certificate_filename?.[0].originFileObj);
    reader.onloadend = async (e: any) => {
      try {
        const res: any = await appSetupApiGetMagnascaleClusterInfo({ ...values, certificate_filename: values.certificate_filename?.[0]?.name, certificate_content: e?.target?.result  });
        if ((res as any).success) {
          message.success(res?.msg);
          return true;
        }
        message.error(res?.msg);
        return false;
      } catch (error) {
        return false;
      }
    }
    history.push('4')
  }

  const up = () => {
    history.push('2')
  }
  
  return (
    <Spin spinning={isLoading}>
      <ProCard
        className={styles.searchListTop}
        title={
          <div className={styles.demoTitleDiv}>
            请输入MagnaScale集群信息
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

              <Form.Item label={'MagnaScale集群业务访问域名'} name={'domain_name'}>
                <Input/>
              </Form.Item>

              <Form.Item label={'HTTPS端口'} name={'https_port'}>
                <Input/>
              </Form.Item>

              <Form.Item noStyle name={'certificate_content'}></Form.Item>

              <ProFormUploadButton
                name="certificate_filename"
                label={`导入证书`}
                title={`导入证书`}
                max={1}
                listType="text"
                fieldProps={{
                  name: 'file',
                  beforeUpload: file => {
                    return false;
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="setUp.selectFile" defaultMessage="请选择文件" />,
                  },
                ]}
              />
              
              <Space className={styles.btnGroup}>
                <Form.Item>
                  <Button type="primary" onClick={up}>
                    上一步
                  </Button>
                </Form.Item>
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
export default Three;
