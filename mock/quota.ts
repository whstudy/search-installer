import { Request, Response } from 'express';
import _ from 'lodash';
import { mock } from 'mockjs';

function isEmpty(val) {
  let result = false;
  if (typeof val !== 'number') {
    result = _.isEmpty(val);
  } else {
    result = false;
  }
  return result;
}

const FileServiceUserGroupQuotas = mock({
  'items|10': [
    {
      'id|+1': 1,
      'domain_type|1': ['local', 'NIS', 'LDAP', 'AD'],
      name: 'user-@id',
      'group_name|1': ['group-1', 'group-2', 'group-3'],
      'capacity|1': ['@natural(10005000)', null, undefined, ''],
      'file_number|1': ['@natural(200000)', null, undefined, '', '0'],
      'used_capacity|1': ['@natural(1000500, 10000000)', null, undefined, ''],
      'used_file_number|1': ['@natural(10500, 200000)', null, undefined, ''],
      create_at: '@datetime',
      'update_at|1': ['@datetime', null, undefined],
      cluster_id: 'e93e7f86-1506-11ec-8b54-82e39a428af3',
    },
  ],
});

function listUserGroupQuotas(req: Request, res: Response) {
  let { cluster_id, user_group_type } = req.query;
  let result = FileServiceUserGroupQuotas.items;

  if (isEmpty(cluster_id) || isEmpty(user_group_type)) {
    res.sendStatus(400);
  }

  res.send({
    data: {
      items: result,
      total: result.length,
      preindex: 1,
      sufindex: 1,
    },
    code: '0',
    msg: 'success',
  });
}

function createUserGroupQuota(req: Request, res: Response) {
  const keys = ['cluster_id', 'user_group_type', 'name', 'domain_type'];
  let reqData = req.body;

  _.forEach(keys, (k) => {
    if (
      isEmpty(reqData?.[k]) &&
      isEmpty(reqData?.['capacity'] && isEmpty(reqData?.['file_number']))
    ) {
      res.sendStatus(400);
    }
  });

  res.send(
    mock({
      data: {
        'job_id|1': 1,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

function editUserGroupQuota(req: Request, res: Response) {
  const keys = ['cluster_id', 'id'];
  let reqData = req.body;

  _.forEach(keys, (k) => {
    if (isEmpty(reqData?.[k])) {
      res.sendStatus(400);
    }
  });

  res.send(
    mock({
      data: {
        'job_id|1': 209,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

function deleteUserGroupQuota(req: Request, res: Response) {
  const keys = ['cluster_id', 'ids'];
  let reqData = req.body;

  _.forEach(keys, (k) => {
    if (isEmpty(reqData?.[k])) {
      res.sendStatus(400);
    }
  });

  res.send(
    mock({
      data: {
        'job_id|1': 32,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

export default {
  'GET /dsm/dir/get_user_group_quota/': listUserGroupQuotas,
  'POST /dsm/dir/set_user_group_quota/': createUserGroupQuota,
  'POST /dsm/dir/modify_user_group_quota/': editUserGroupQuota,
  'POST /dsm/dir/delete_user_group_quota/': deleteUserGroupQuota,
};
