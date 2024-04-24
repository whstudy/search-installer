import { Request, Response } from 'express';
import Mock from 'mockjs';
import { getDataByPager } from './utils';
import _ from 'lodash';

const placementPolicys = Mock.mock({
  'items|3': [
    {
      name: '@string(200, 220)',
      files: 'file1, file2, file3.txt',
      file_types: 'txt, png, jpg',
      local_users: '@string(20,4069)',
      domain_users: '@string(20,4069)',
      local_groups: '',
      domain_groups: '',
      is_white_list: true,
      default_target_type: 'placment',
      associated_dir_count: 0,
      is_default: false,
      invalid_local_groups: 'user1',
    },
  ],
  total: 3,
  preindex: 1,
  sufindex: 10,
});

const migrationPolicys = Mock.mock({
  'items|3': [
    {
      name: '@string(200,269)',
      creation_time: ',',
      modification_time: '',
      migration_target: 'data_pool',
      local_users: '@string(20,4069)',
      domain_users: '@string(20,4069)',
      local_groups: '',
      domain_groups: '',
      is_white_list: true,
      default_target_type: 'migration',
      associated_dir_count: 0,
      is_default: false,
      invalid_local_groups: 'user1',
    },
  ],
  total: 3,
  preindex: 1,
  sufindex: 10,
});

export default {
  'POST /dsm/dir/terra_tier/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  },
  'GET /dsm/terra_tier/placement_policy/': (req, res) => {
    const { preindex, sufindex } = req.query || {};
    const data = getDataByPager(placementPolicys, preindex, sufindex);
    data.items.unshift({
      name: '智能放置',
      files: '*',
      file_types: '*',
      local_users: '*',
      domain_users: '*',
      local_groups: '*',
      domain_groups: '*',
      creation_time: '*',
      modification_time: '',
      is_white_list: true,
      default_target_type: 'placement',
      associated_dir_count: 2,
      is_default: true,
    });
    res.send({
      code: '0',
      msg: 'success',
      data,
    });
  },
  'POST /dsm/terra_tier/placement_policy/': (req, res) => {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'success',
        data: null,
      });
    }, 1000);
  },
  'GET /dsm/terra_tier/migration_policy/': (req: Request, res: Response) => {
    const { preindex, sufindex } = req.query || {};

    const data = getDataByPager(migrationPolicys, preindex, sufindex);

    data.items.unshift({
      name: '永不迁移',
      creation_time: 0,
      modification_time: 0,
      local_users: null,
      domain_users: null,
      local_groups: null,
      domain_groups: null,
      is_white_list: true,
      default_target_type: 'migration',
      associated_dir_count: 2,
      is_default: true,
    });

    data.items.unshift({
      name: '智能迁移',
      creation_time: -1,
      modification_time: -1,
      local_users: '*',
      domain_users: '*',
      local_groups: '*',
      domain_groups: '*',
      is_white_list: true,
      default_target_type: 'migration',
      associated_dir_count: 2,
      is_default: true,
    });

    res.send({
      code: '0',
      msg: 'success',
      data,
    });
  },
  'POST /dsm/terra_tier/migration_policy/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  },
};
