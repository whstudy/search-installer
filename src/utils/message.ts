import { notification } from 'antd';

enum MessageType {
  SILENT = 0,
  WARN = 1,
  ERROR = 2,
  SUCCESS = 3,
  NOTIFICATION = 4,
  REDIRECT = 9,
}
export const showMessage = (type: MessageType, msg: string, code: string) => {
  const message = code === '0' ? '' : code;
  const description = msg;
  switch (type) {
    case MessageType.WARN:
      notification.warn({ message, description });
      break;
    case MessageType.ERROR:
      notification.error({ message, description });
      break;
    case MessageType.SUCCESS:
      notification.success({ message, description });
      break;
    case MessageType.NOTIFICATION:
      notification.info({ message, description });
      break;
    case MessageType.REDIRECT:
      window.location.reload();
      break;
    case MessageType.SILENT:
    default:
      break;
  }
};
