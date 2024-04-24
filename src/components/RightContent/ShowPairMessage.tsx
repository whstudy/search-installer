import { useCallback, useRef, useState } from 'react';
import { dsmRelationshipMessagesGet } from '@/services/dsm/replication';
import { useModel, history, useIntl, useLocation } from 'umi';
import { useEffect } from 'react';
import { Space, message, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { StorageEmitter } from '../../../config/storageEmitter';

// 获取授权的一个全局消息
export default () => {
  const { initialState } = useModel('@@initialState');
  const cluster_id = initialState?.currentCluster?.id as string;
  const [unauthorizedPairCount, setCount] = useState<number>(0);
  const intl = useIntl();
  const popRef = useRef(); // 显隐
  const [createCapacity, setCreateCapacity] = useState(
    localStorage.getItem('hasRepCapability') === 'true',
  ); // 是否具备创建能力
  const timerRef = useRef();

  // 查询未授权个数
  const fetchUnauthorizedPair = useCallback(async () => {
    const res = await dsmRelationshipMessagesGet({ cluster_id });
    if (res?.success) {
      if (res?.data?.total && res?.data?.items instanceof Array) {
        const unauthorizedCount = res?.data?.items?.filter(
          (v) => v?.type === 'relationship_unauthorized',
        )?.length;
        setCount(unauthorizedCount);
      } else {
        setCount(0);
      }
    }
  }, [cluster_id]);

  const goFetchMessages = useCallback(() => {
    const isClosed = localStorage.getItem('isCloseUnauthorizedPairTip') === 'true';
    if (!isClosed) {
      fetchUnauthorizedPair();
    }
  }, []);

  useEffect(() => {
    StorageEmitter.on('changeRepCapability', ({ create }) => {
      localStorage.setItem('hasRepCapability', String(create)); // 为了之后刷新时更新信息
      setCreateCapacity(create);
    });
  }, []);

  // 获取未授权弹框内容
  useEffect(() => {
    clearInterval(timerRef.current);
    if (createCapacity) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        goFetchMessages();
      }, 5 * 1000000000000);
    } else {
      setCount(0);
    }
  }, [createCapacity]);

  // 关闭弹框
  const closePopup = useCallback(() => {
    popRef.current?.(0);
    popRef.current = undefined;
  }, [popRef.current]);

  // 移除定时器
  useEffect(() => {
    return () => {
      closePopup();
      clearInterval(timerRef.current);
    };
  }, []);

  // 显示弹框
  useEffect(() => {
    const isClosed = localStorage.getItem('isCloseUnauthorizedPairTip') === 'true';
    const isCreateCapable = localStorage.getItem('hasRepCapability') === 'true';
    if (!isClosed && unauthorizedPairCount && isCreateCapable) {
      showPopup();
    } else {
      // 预防clear之前发出的message api结果影响UI
      closePopup();
    }
  }, [unauthorizedPairCount]);

  useEffect(() => {
    return () => {
      closePopup();
    };
  }, []);

  // 弹出
  function showPopup() {
    closePopup();
    popRef.current = message.info({
      className: 'pairMessage',
      duration: 0,
      rtl: false,
      content: (
        <Space>
          {intl.formatMessage(
            {
              id: 'replication.pair.message.unauthorized',
              defaultMessage: `${unauthorizedPairCount}个远程复制关系对需要授权`,
            },
            {
              unauthorizedCount: unauthorizedPairCount,
            },
          )}
          <Button onClick={onCheckUnauthorizedPairs}>
            {intl.formatMessage({
              id: 'replication.pair.checknow',
              defaultMessage: '立即查看',
            })}
          </Button>
          <CloseOutlined onClick={onClose} />
        </Space>
      ),
    });
  }

  // 当前登录状态下不再展示
  function onClose() {
    closePopup();
    localStorage.setItem('isCloseUnauthorizedPairTip', 'true');
  }

  // 查看未授权复制对
  function onCheckUnauthorizedPairs() {
    history.push({
      pathname: `/protection/replication/`,
      search: `?pairStatus=unauthorized`,
    });
  }

  return <></>;
};
