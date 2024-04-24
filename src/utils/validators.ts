import { getIntl } from 'umi';
import { getStringLength } from '.';
import { utilsReg } from './regex';

const validateCifsShareName = (_, value) => {
  const rule = new RegExp(utilsReg?.cifsShareName);
  if (value?.trim()) {
    if (!rule.test(value)) {
      return Promise.reject(getIntl().formatMessage({ id: 'validate.cifsName.pattern' }));
    }
    if (getStringLength(value) > 240) {
      return Promise.reject(getIntl().formatMessage({ id: 'validate.cifsName.overLength' }));
    }
  }
  return Promise.resolve();
};

// 验证本地文件用户
const validateLocalFileUserName = (_, value) => {
  const rule = new RegExp(utilsReg?.nameReg);
  if (value?.trim()) {
    if (!rule.test(value)) {
      return Promise.reject(getIntl().formatMessage({ id: 'storage.fileService.user.newNameTip' }));
    }
    if (getStringLength(value) > 32) {
      return Promise.reject(getIntl().formatMessage({ id: 'validate.cer_user_name.overLength' }));
    }
  }
  return Promise.resolve();
};

// 中文按照单字符计算。regex可以涵盖本用户规则
const validateDomainUserName = (_, value) => {
  const rule = new RegExp(utilsReg?.domainUserName);
  if (value?.trim()) {
    if (!rule.test(value)) {
      return Promise.reject(getIntl().formatMessage({ id: 'validate.cer_user_name.pattern' }));
    }
    if (value?.length > 32) {
      return Promise.reject(getIntl().formatMessage({ id: 'validate.cer_user_name.overLength' }));
    }
  }
  return Promise.resolve();
};

export default {
  validateCifsShareName,
  validateLocalFileUserName,
  validateDomainUserName,
};
