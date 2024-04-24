import { Request, Response } from 'express';
import moment from 'moment';
import Mock from 'mockjs';
import { DeployMode } from './utils';

function generatePoolName(groupId: number) {
  switch (groupId) {
    case 5:
      return 'magnascale.tos.cache';
    case 4:
      return 'magnascale.tos.index';
    case 3:
      return 'magnascale.tos.data';
    case 2:
      return 'data';
    case 1:
      return 'tfs';
    default:
      return `group-${groupId}`;
  }
}

function generatePools(n: number) {
  const result: any = [];
  while (--n > 0) {
    const temp = {
      b: 0,
      code_block_num: 0,
      created_at: '2022-01-19T21:12:36',
      data_block_num: 0,
      group_name: 'group-2',
      id: n,
      min_size: 1,
      name: generatePoolName(n),
      pg_num: Math.floor(Math.random() * 1000),
      quota_bytes: 0,
      res_group_id: 2,
      safe_type: 0,
      size: 3,
      state: 5,
      status: 1,
      total_capacity: 47206833696,
      used_capacity: 0,
    };
    result.push(temp);
  }
  return result;
}

const TFSSystemPools = [
  {
    name: 'tfs',
    id: 2,
    safe_type: 0,
    pg_num: 1024,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -4,
    quota_bytes: 195190991780,
    state: 1,
    purpose: 1,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 154404443,
    total_capacity: 194818801664,
    group_name: 'tfs',
    status: 1,
    b: 0,
    severity: 0,
    usage: '标准池',
  },
  {
    name: 'data',
    id: 3,
    safe_type: 0,
    pg_num: 256,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -1,
    quota_bytes: 598815342592,
    state: 1,
    purpose: 2,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 0,
    total_capacity: 598768025600,
    group_name: 'default',
    status: 1,
    b: 0,
    severity: 0,
    usage: '标准池',
  },
  {
    name: 'datfdsafsafa',
    id: 6,
    safe_type: 0,
    pg_num: 256,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -1,
    quota_bytes: 598815342592,
    state: 1,
    purpose: 3,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 0,
    total_capacity: 598768025600,
    group_name: 'default',
    status: 1,
    b: 0,
    severity: 0,
    usage: '文件加速池',
  },
];

const TOSSystemPools = [
  {
    name: 'magnascale.tos.index',
    id: -3,
    safe_type: 0,
    pg_num: 1024,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -1,
    quota_bytes: 195190991780,
    state: 1,
    purpose: 4,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 154404443,
    total_capacity: 194818801664,
    group_name: 'default',
    status: 1,
    b: 0,
    severity: 0,
  },
  {
    name: 'magnascale.tos.cache',
    id: -1,
    safe_type: 0,
    pg_num: 1024,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -1,
    quota_bytes: 195190991780,
    state: 1,
    purpose: 5,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 154404443,
    total_capacity: 194818801664,
    group_name: 'default',
    status: 1,
    b: 0,
    severity: 0,
  },
  {
    name: 'magnascale.tos.data',
    id: 1,
    safe_type: 0,
    pg_num: 1024,
    size: 3,
    min_size: 1,
    data_block_num: 0,
    code_block_num: 0,
    res_group_id: -1,
    quota_bytes: 195190991780,
    state: 1,
    purpose: 7,
    created_at: '2022-08-10T10:53:59',
    used_capacity: 154404443,
    total_capacity: 194818801664,
    group_name: 'default',
    status: 1,
    b: 0,
    severity: 0,
  },
];

function poolList(req: Request, res: Response) {
  let result: any = [];
  if (DeployMode() === 'tfs') {
    result = TFSSystemPools;
  } else if (DeployMode() === 'tos') {
    result = TOSSystemPools;
  } else {
    result = [...TFSSystemPools, ...TOSSystemPools];
  }
  // const temp = generatePools(7);
  // res.send({
  //     code: '0',
  //     data: {
  //         items: temp,
  //         total: temp.length,
  //         preindex: 1,
  //         sufindex: 10,
  //     },
  //     msg: 'success',
  // });
  const { status } = req.query || {};
  if (status) {
    result.forEach((v) => {
      v.status = status;
    });
  }
  /*res.send({
    code: '0',
    data: {
      items: result,
      total: result.length,
      preindex: 1,
      sufindex: 10,
    },
    msg: 'success',
  })*/ res.send({
    code: '0',
    msg: 'Query storage pool succeeded',
    data: {
      items: [
        {
          name: 'tfs',
          id: 3,
          safe_type: 0,
          pg_num: 2048,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -4,
          quota_bytes: 129066983424,
          state: 0,
          purpose: 2,
          created_at: '2023-07-19T12:10:28',
          used_capacity: 528768214,
          total_capacity: 129066983424,
          group_name: 'tfs',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'NGDS_Pool',
          id: 3,
          safe_type: 0,
          pg_num: 2048,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: 2,
          quota_bytes: 129066983424,
          state: 0,
          purpose: 2,
          created_at: '2023-07-19T12:10:28',
          used_capacity: 528768214,
          total_capacity: 129066983424,
          group_name: 'tfs',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_ZmRtULcdEPDx',
          id: 56,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2376745,
          state: 0,
          purpose: 3,
          created_at: '2023-07-20T08:58:26',
          used_capacity: 0,
          total_capacity: 2376745,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_XjDbmMoxqpNa',
          id: 57,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4797917,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:58:27',
          used_capacity: 0,
          total_capacity: 4797917,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_wYfNxBezIWVy',
          id: 25,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3259097,
          state: 2,
          purpose: 3,
          created_at: '2023-07-20T08:45:21',
          used_capacity: 0,
          total_capacity: 3259097,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_wXnEWMavyYIQ',
          id: 17,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1272086,
          state: 4,
          purpose: 3,
          created_at: '2023-07-20T08:43:17',
          used_capacity: 0,
          total_capacity: 1272086,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_WSaVZkjYnEhD',
          id: 33,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1874713,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:48:05',
          used_capacity: 0,
          total_capacity: 1874713,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_wmcRkjqxetao',
          id: 19,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 463681,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:43:48',
          used_capacity: 0,
          total_capacity: 463681,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_WjPmzQqGDIVg',
          id: 26,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3058000,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:45:41',
          used_capacity: 0,
          total_capacity: 3058000,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_WbPSeYCTNRjK',
          id: 31,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4996860,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:47:24',
          used_capacity: 0,
          total_capacity: 4996860,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_VerSuJgGqcxo',
          id: 23,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2234944,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:45:00',
          used_capacity: 0,
          total_capacity: 2234944,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_tfuXgbWcYHQi',
          id: 59,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3918472,
          state: 4,
          purpose: 3,
          created_at: '2023-07-20T08:58:27',
          used_capacity: 0,
          total_capacity: 3918472,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_TbgCsDcOwQRP',
          id: 20,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2851235,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:43:59',
          used_capacity: 0,
          total_capacity: 2851235,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_sTSLWbrAOqde',
          id: 16,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2215663,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:42:57',
          used_capacity: 0,
          total_capacity: 2215663,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_RvrHFNsbatSj',
          id: 28,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 600588,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:46:12',
          used_capacity: 0,
          total_capacity: 600588,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_rQwayURBEPgd',
          id: 60,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 927049,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:58:28',
          used_capacity: 0,
          total_capacity: 927049,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_RlpbHmxQVWZK',
          id: 45,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3722547,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:52:41',
          used_capacity: 0,
          total_capacity: 3722547,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_QvxkBOtCJIEl',
          id: 27,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 251622,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:46:02',
          used_capacity: 0,
          total_capacity: 251622,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_QsOWkwluqFNr',
          id: 15,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4456215,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:42:37',
          used_capacity: 0,
          total_capacity: 4456215,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_QNHOUBDYuFKt',
          id: 32,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4467238,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:47:44',
          used_capacity: 0,
          total_capacity: 4467238,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_qeIhXuAobnLC',
          id: 13,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4332536,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:42:06',
          used_capacity: 0,
          total_capacity: 4332536,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_pWnUKPzfRXwI',
          id: 38,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1145439,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:49:37',
          used_capacity: 0,
          total_capacity: 1145439,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_pnQNRXCFoZOm',
          id: 40,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4771182,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:50:08',
          used_capacity: 0,
          total_capacity: 4771182,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_OUJePMYAGnBE',
          id: 53,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3360989,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:54:54',
          used_capacity: 0,
          total_capacity: 3360989,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_ODQseLoMjAgW',
          id: 12,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3452500,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:44:05',
          used_capacity: 0,
          total_capacity: 3452500,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_NltTknuHCdoL',
          id: 34,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4141117,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:48:25',
          used_capacity: 0,
          total_capacity: 4141117,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_mUGqjKfnrIAE',
          id: 14,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 69833,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:42:26',
          used_capacity: 0,
          total_capacity: 69833,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_MlwoFDvpzrTd',
          id: 48,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3845345,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:53:02',
          used_capacity: 0,
          total_capacity: 3845345,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_LjtVslrOenpH',
          id: 41,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3649687,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:50:38',
          used_capacity: 0,
          total_capacity: 3649687,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_jHDftTAFqiuP',
          id: 47,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3242330,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:52:41',
          used_capacity: 0,
          total_capacity: 3242330,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_IYqOedQKwWbT',
          id: 24,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1847953,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:45:10',
          used_capacity: 0,
          total_capacity: 1847953,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_ishEvFpGxDwA',
          id: 37,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2318263,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:49:16',
          used_capacity: 0,
          total_capacity: 2318263,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_ipTePfxYkRrO',
          id: 42,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1214384,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:50:59',
          used_capacity: 0,
          total_capacity: 1214384,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_hWglswArqbpX',
          id: 29,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 19327,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:46:33',
          used_capacity: 0,
          total_capacity: 19327,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_HQlJDSqRysLa',
          id: 36,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3406220,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:49:06',
          used_capacity: 0,
          total_capacity: 3406220,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_HkQioMOIxVyw',
          id: 18,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2584541,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:43:38',
          used_capacity: 0,
          total_capacity: 2584541,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_hEueFyMoldiZ',
          id: 21,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3821434,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:44:19',
          used_capacity: 0,
          total_capacity: 3821434,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_GlRYxvPCKIrf',
          id: 49,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4151333,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:53:33',
          used_capacity: 0,
          total_capacity: 4151333,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_gKSVqFCOmWPp',
          id: 52,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 343835,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:54:34',
          used_capacity: 0,
          total_capacity: 343835,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_GKmVgjPuwkUE',
          id: 55,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3913878,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:55:25',
          used_capacity: 0,
          total_capacity: 3913878,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_FVopdmLJwsRu',
          id: 61,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4711874,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:58:27',
          used_capacity: 0,
          total_capacity: 4711874,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_eWJfLbKIAwnR',
          id: 46,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3426496,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:56:40',
          used_capacity: 0,
          total_capacity: 3426496,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_efuBFgbtRPNv',
          id: 30,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3980473,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:47:03',
          used_capacity: 0,
          total_capacity: 3980473,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_DSlhOcopxYyX',
          id: 44,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3530821,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:51:50',
          used_capacity: 0,
          total_capacity: 3530821,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_DLucWXxQZTNS',
          id: 35,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 189443,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:48:46',
          used_capacity: 0,
          total_capacity: 189443,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_dGsMhmkYqNFp',
          id: 51,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1168710,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:54:13',
          used_capacity: 0,
          total_capacity: 1168710,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_DdQBJfxielOS',
          id: 39,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 4722861,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:49:47',
          used_capacity: 0,
          total_capacity: 4722861,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_cZdXbkUoNnTe',
          id: 22,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 3737762,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:44:40',
          used_capacity: 0,
          total_capacity: 3737762,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_cGHtWVioSdDP',
          id: 58,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 2324668,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:58:27',
          used_capacity: 0,
          total_capacity: 2324668,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_bZHTKWumFlQh',
          id: 54,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1008675,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:55:15',
          used_capacity: 0,
          total_capacity: 1008675,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_BjonmEOhfHzg',
          id: 43,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1714768,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:51:19',
          used_capacity: 0,
          total_capacity: 1714768,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'pool_rep_afCtWZNgnlXI',
          id: 50,
          safe_type: 0,
          pg_num: 512,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 1298317,
          state: 1,
          purpose: 3,
          created_at: '2023-07-20T08:53:53',
          used_capacity: 0,
          total_capacity: 1298317,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'magnascale.tos.index',
          id: 4,
          safe_type: 0,
          pg_num: 2048,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -4,
          quota_bytes: 143276589056,
          state: 1,
          purpose: 4,
          created_at: '2023-07-19T12:10:27',
          used_capacity: 11153687,
          total_capacity: 143276589056,
          group_name: 'tfs',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'magnascale.tos.data',
          id: 2,
          safe_type: 0,
          pg_num: 1024,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 885839626240,
          state: 1,
          purpose: 5,
          created_at: '2023-07-19T12:10:27',
          used_capacity: 0,
          total_capacity: 885839626240,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
        {
          name: 'data',
          id: 5,
          safe_type: 0,
          pg_num: 1024,
          size: 3,
          min_size: 2,
          data_block_num: 0,
          code_block_num: 0,
          res_group_id: -1,
          quota_bytes: 885959688192,
          state: 1,
          purpose: 3,
          created_at: '2023-07-19T12:10:27',
          used_capacity: 0,
          total_capacity: 885959688192,
          group_name: 'default',
          status: 1,
          b: 0,
          severity: 0,
        },
      ],
      total: 54,
      preindex: 1,
      sufindex: 54,
      pool_used_threshold: '70',
      pool_avail_threshold: '10',
    },
  });
}

function getResData(queryParams) {
  const timeGap = 10; // 10s一条
  const { time_from, time_till, monitor_item, monitor_db, is_dashboard } = queryParams || {};
  const neededLength1 = 10 || (time_till - time_from) / timeGap; // 实际返回条数
  // 后端以某种方式拿到的条数
  const neededLength = neededLength1 + Math.random() * 100;
  const mockBody = {};
  const allowedItems = {
    cluster:
      'rbw/wbw/recover_bw/riops/wiops/recover_iops/rio_delay/wio_delay/total_capacity/used_capacity/avail_capacity/recovering_rate/cluster_recovering_objects',
    resource_group: 'recovering_rate/recovering_objects',
    pool: 'total_capacity/used_capacity/avail_capacity/recovering_rate/recovering_bytes/rbw/wbw/riops/wiops/io_delay',
    object_gateway: 'upload_iops/download_iops/upload_bandwidth/download_bandwidth',
    storage_unit: 'total_capacity/used_capacity/avail_capacity',
    host: 'cpu_usage/mem_usage',
    disk: ' rbw/wbw/riops/wiops/r_await/w_await/path/util',
  };
  let resData: any = {};

  // -----is_dashboard 为true,
  // {
  //   data: {
  //     totla_num: '30',
  //     length: '200',                               // type 1 > 100
  //     used_capacity: [{time: 'xxx', mean: ''}]     // type 1
  //     length: '80',                                       // type 2  < 100
  //     used_capacity: [{time: 'xxx', used_capacity: ''}]   // type 2
  //   }
  // }
  // ----is_dashboard 为false
  // {
  //   data: {
  //     items: [{ time: 'xxx', use_capacity: 20 }]
  //   }
  // }

  let items;
  if (!monitor_item?.includes(',')) {
    items = [monitor_item];
  } else {
    items = monitor_item.split(',');
  }
  if (is_dashboard === 'false') {
    const mockItem = {};
    mockItem[`time|+${timeGap * 1000}`] = new Date().getTime() - neededLength1 * 10 * 1000;
    items?.map((ele) => {
      if (allowedItems?.[monitor_db] && allowedItems[monitor_db]?.includes(ele)) {
        mockItem[ele] = '@integer(0, 8000000)';
      } else {
        console.log(`${ele}该item不支持查询`);
      }
    });

    mockBody[`data|${neededLength1}`] = [mockItem];
    const mockDt = Mock.mock(mockBody)?.data;
    mockDt.map((mm) => {
      mm.time = moment(mm?.time).format('YYYY-MM-DD HH:mm:ss');
    });

    resData = { items: mockDt };
  } else {
    // 不传就会按照length长度 返回字段名称 有所不同
    resData = { total_num: neededLength1, length: neededLength };
    const mockItem: any = {};
    items?.map((ele) => {
      if (allowedItems?.[monitor_db] && allowedItems[monitor_db]?.includes(ele)) {
        if (neededLength > 100) {
          mockItem.mean = '@integer(0, 800000)';
        } else {
          mockItem[ele] = '@integer(0, 800000)';
        }
        mockItem[`time|+${timeGap * 1000}`] = new Date().getTime() - neededLength1 * 10 * 1000;
        mockBody[`${ele}|${neededLength1}`] = [mockItem];
      } else {
        console.log(`${ele}该item不支持查询`);
      }
    });
    const mockDt = Mock.mock(mockBody);

    Object.keys(mockDt)?.map((ele) => {
      mockDt?.[ele]?.map((mm) => {
        mm.time = moment(mm?.time).format('YYYY-MM-DD HH:mm:ss');
      });
      resData[ele] = mockDt?.[ele];
    });
  }

  return resData;
}

function calArr(queryParams) {
  const resData = getResData(queryParams);
  return {
    code: '0',
    data: resData,
    msg: 'success',
  };
}

function getLine(req: Request, res: Response) {
  res.json(calArr(req.query));
}
function newPool(req: Request, res: Response) {
  res.send({
    code: '0',
    data: {
      job_id: 199,
    },
    msg: 'success',
  });
}

function recommend(req: Request, res: Response) {
  res.send({
    code: '0',
    msg: 'Get recommend conf for pool succeeded',
    data: {
      items: {
        job_id: 520,
        context: {
          cluster_id: 'bd4b6d56-5194-11ec-80e9-a69a3d4e4102',
          res_group_id: '-1',
          task_num: 1,
        },
        n_m_b: [[4, 2, 1, 66.66666666666666, 3]],
      },
    },
  });
}

function poolsummary(req: Request, res: Response) {
  res.send({
    code: '0',
    data: {
      code: '0',
      msg: 'Query pool summary info successfully!',
      data: { count: 3, replicated: 3, erasure: 0, health: 3, degrade: 0, error: 0 },
    },
    msg: 'success',
  });
}

function poolModify(req: Request, res: Response) {
  res.send({
    code: '0',
    data: {
      code: '0',
      msg: 'Query pool summary info successfully!',
      data: { count: 3, replicated: 3, erasure: 0, health: 3, degrade: 0, error: 0 },
    },
    msg: 'success',
  });
}

export default {
  'GET /dsm/perf/': getLine,
  'GET /dsm/storage/pool/': poolList,
  'POST /dsm/storage/pool/': newPool,
  'GET /dsm/storage/pool/recommend/': recommend,
  'GET /ui/summary/poolsummary/': poolsummary,
  'POST /dsm/storage/pool/modify/': poolModify,
};