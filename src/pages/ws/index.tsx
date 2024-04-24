import React, { useRef, useMemo } from 'react';
import { Card, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useWebSocket } from 'ahooks';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export default (): React.ReactNode => {
  const messageHistory = useRef<MessageEvent<any>[]>([]);
  const { host } = window.location;
  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    `ws://${host}/ws`,
  );

  messageHistory.current = useMemo<MessageEvent<any>[]>(
    () => messageHistory.current.concat(latestMessage!),
    [latestMessage],
  );

  return (
    <PageContainer>
      <Card>
        {/* send message */}
        <Button
          onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
          disabled={readyState !== ReadyState.Open}
          style={{ marginRight: 8 }}
        >
          ✉️ send
        </Button>
        {/* disconnect */}
        <Button
          onClick={() => disconnect && disconnect()}
          disabled={readyState !== ReadyState.Open}
          style={{ marginRight: 8 }}
        >
          disconnect
        </Button>
        {/* connect */}
        <Button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
          connect
        </Button>
        <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
        <div style={{ marginTop: 8 }}>
          <p>received message: </p>
          {messageHistory.current.map((message, index) => (
            <p>{message?.data}</p>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
};
