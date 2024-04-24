import ProCard from '@ant-design/pro-card';
import { Col, Row, Space, Statistic } from 'antd';
import { Fragment } from 'react';
import styles from './index.less';

type ValuesType =
  | {
      [key: string]: number | undefined;
    }
  | undefined;

type ConfigsType = {
  key: string;
  title: JSX.Element;
  icon?: JSX.Element | undefined;
  status?: string; //'warning' | 'healthy' | 'error' | 'important' | 'normal';  颜色->状态->告警
  valueStyle?: string | undefined; // 与status二选一
}[];

const ContentHeaderStatistic: React.FC<{
  configs: ConfigsType;
  values: ValuesType;
  clickEvent: (data, e?: any) => void;
}> = ({ configs, values, clickEvent }) => {
  return (
    <ProCard.Group title={null} direction="row" className={styles.commonPageHeaderStatistic}>
      {configs?.map((item) => {
        return (
          <Fragment key={item.key}>
            {/* <Divider type="vertical" /> */}
            <ProCard size="small">
              <Statistic
                title={
                  <span onClick={(e) => clickEvent(item, e)} style={{ cursor: 'pointer' }}>
                    {!item.icon ? (
                      item?.title
                    ) : (
                      <Row align="middle">
                        <Space size={4}>
                          <Col>{item.icon}</Col>
                          <Col>{item?.title}</Col>
                        </Space>
                      </Row>
                    )}
                  </span>
                }
                value={values?.[item.key] || 0}
                className={styles?.[item?.status || 'healthy']}
                valueStyle={item?.valueStyle ? { color: item?.valueStyle } : undefined}
                formatter={(value) => (
                  <span className="d-inline-block py-2 pe-4" onClick={(e) => clickEvent(item, e)}>
                    {value}
                  </span>
                )}
              />
            </ProCard>
          </Fragment>
        );
      })}
      <ProCard size="small" />
    </ProCard.Group>
  );
};

export default ContentHeaderStatistic;
