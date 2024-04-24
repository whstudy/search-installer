import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

const Users = mock({
  'items|5-20': [
    {
      'id|+1': 2,
      user_name: '@name',
      tenant_name: '@name',
      storage_policy_name: '@name',
      storage_policy_id: 33,
      email: '@email',
      'status|1': [0, 1],
      'suspended|1': [0, 1],
      create_time: '@datetime',
      'userNum|0-3': 0,
      'update_time|1': [null, '@datetime'],
    },
  ],
});

function listUser(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        // items: [],
        items: Users.items,
        total: Users.length,
        preindex: 1,
        sufindex: 1,
      },
      code: '0',
      msg: 'success',
    }),
  );
}

const UserInfo = (id) => {
  return mock({
    id: Number(id),
    user_name: /^(?![\.])[a-zA-Z0-9-\._@]{1,128}$/,
    tenant_name: /^(?![\.])[a-zA-Z0-9-\._@]{1,128}$/,
    storage_policy_name: '@name',
    storage_policy_id: 33,
    email: 'guest@ln.com',
    suspended: 0,
    key: [
      {
        ak: 'KOMK76CA19E2H8AKBBPX',
        sk: '4T8mWEOmGTAu3KmkJC8Cu2BBs9OUVNNDzMOF2xFD',
      },
      // {
      //   ak: 'MOMK76CA19E2H8AKBBPX',
      //   sk: '0T8mWEOmGTAu3KmkJC8Cu2BBs9OUVNNDzMOF2xFD',
      // },
      // {
      //   ak: 'NAKBBPX',
      //   sk: '7T8mWEOmGTAu3KmkJC8Cu2BBs9OUVNNDzMOF2xFD',
      // },
    ],
    'qt_cap|6442450944-754245094400': 75424509440,
    used_cap: 204857600,
    'bucket_count|-1-5': 0,
    'obj_count|-1-3': 0,
    desc: 'ddd',
    kala: {
      kd: '344',
      ke: '9221',
    },
    max_byte: 754245094,
    max_bucket_num: 100000000,
    max_obj_num: 2000,
    'used_obj|0-3': 3,
    'used_bucket|-1-3': 0,
    create_time: '@datetime',
  });
};

const shard = {
  share_with_users: ['Karen Perez', 'Sarah Garcia'],
  share_by_users: ['Matthew Brown', 'Michael Lopez'],
};

function getUserById(req: Request, res: Response) {
  let cluster_id = req.query?.cluster_id;
  let id = req.query?.id;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(id)) {
    res.send({
      code: '0',
      msg: 'success',
      data: UserInfo(req.query?.id),
    });
  } else {
    res.sendStatus(400);
  }
}

function createUser(req: Request, res: Response) {
  let { cluster_id, user_name, email } = req.body;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(user_name)) {
    res.send({
      code: '0',
      msg: 'success',
      data: {
        id: Users.items.length + 1,
        user_name,
        email,
      },
    });
  } else {
    res.sendStatus(400);
  }
}

function editUser(req: Request, res: Response) {
  let { cluster_id, name } = req.body;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(name)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function suspendUser(req: Request, res: Response) {
  let names = req.body?.names;
  let suspended = req.body?.suspended;
  if (!_.isEmpty(names) && [0, 1].includes(suspended)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function deleteUser(req: Request, res: Response) {
  let names = req.body?.names;
  if (!_.isEmpty(names)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function setUserQuota(req: Request, res: Response) {
  let name = req.body?.user_name;
  if (!_.isEmpty(name)) {
    res.send({
      code: '0',
      msg: 'success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}
function getUsertQos(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      data: {
        id: 10,
        total_bandwidth: '0',
        read_bandwidth: '0',
        write_bandwidth: '0',
        total_iops: '0',
        read_iops: '0',
        write_iops: '0',
      },
      code: '0',
      msg: 'success',
    }),
  );
}

function getUserShares(req: Request, res: Response) {
  res.send({
    data: shard,
    code: '0',
    msg: 'success',
  });
}

function setUserShares(req: Request, res: Response) {
  res.send({
    code: '0',
    msg: 'success',
    data: null,
  });
}

export default {
  'GET /dsm/obj/user/': listUser,
  'GET /dsm/obj/user/info/': getUserById,
  'POST /dsm/obj/user/': createUser,
  'POST /dsm/obj/user/modify/': editUser,
  'POST /dsm/obj/user/suspended/': suspendUser,
  'POST /dsm/obj/user/delete/': deleteUser,
  'POST /dsm/obj/user/setquota/': setUserQuota,
  'GET /dsm/obj/user/getqos/': getUsertQos,
  'GET /dsm/obj/user/get_shares': getUserShares,
  'POST /dsm/obj/user/set_shares': setUserShares,
};
