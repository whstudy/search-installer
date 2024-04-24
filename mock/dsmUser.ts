import { Request, Response } from 'express';
import _ from 'lodash';
import { mock } from 'mockjs';
import moment from 'moment';
import { DeployMode } from './utils';

const GroupUserMappings = {
  1: [1, 2, 3, 4],
  2: [5, 6, 7, 8, 9],
  3: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
};

const viewUsers = mock({
  'items|20': [
    {
      'id|+1': 1,
      username: 'viewUser-@id',
      email: '@email',
      'role|1': ['admin', 'guest'],
      'is_active|1': [true, false],
    },
  ],
});

function totalFileServiceGroups() {
  // const groupIds = _.keys(GroupUserMappings);
  const groupIds = mock('@range(100)');
  let result: any = [];
  _.forEach(groupIds, (g) => {
    result.push({
      gid: Number(`400${g}`),
      name: `group-${Number(g)}`,
      type: ['local', 'LD', 'LDAP'][_.floor(_.random(0, 0.9) * 3)],
      status: ['active', 'inActive'][_.floor(_.random(0, 0.9) * 2)],
      capacity_quota: _.random(1024),
      file_quota: _.random(10000),
    });
  });
  return result;
}

function totalFileServiceUsers() {
  const groupIds = _.keys(GroupUserMappings);
  let result: any = [];
  _.forEach(groupIds, (g) => {
    _.forEach(GroupUserMappings[g], (u) => {
      result.push({
        uid: Number(`400${u}`),
        name: `user-${u}`,
        type: ['local', 'LD', 'LDAP'][_.floor(_.random(0, 0.9) * 3)],
        status: ['active', 'inActive'][_.floor(_.random(0, 0.9) * 2)],
        gid: Number(`400${g}`),
        group_name: `group-${Number(g)}`,
        capacity_quota: _.random(1024),
        file_quota: _.random(10000),
      });
    });
  });
  return result;
}

function listUser(req: Request, res: Response) {
  let data = totalFileServiceUsers();
  let total = 0;
  const { preindex, sufindex, fuzzy, keyword, filters } = req.query || {};
  if (fuzzy && keyword) {
    data = data?.filter((ele) => ele?.name.indexOf(keyword?.trim()) !== -1);
  }

  if (!_.isEmpty(filters)) {
    const { gid } = JSON.parse(filters as string);
    data = data?.filter((ele) => ele?.gid === gid);
  }

  total = data?.length;

  if (preindex && sufindex) {
    data = data?.slice(Number(preindex - 1), Number(sufindex));
  }

  res.send({
    data: {
      items: data,
      total: total,
      preindex: preindex || -1,
      sufindex: sufindex || -1,
    },
    code: '0',
    msg: 'success',
  });
}

function listUserGroup(req: Request, res: Response) {
  let result = totalFileServiceGroups();
  let total = 0;
  const { preindex, sufindex, fuzzy, keyword, filters } = req.query || {};

  if (fuzzy && keyword) {
    result = result?.filter((ele) => ele?.name.indexOf(keyword?.trim()) !== -1);
  }

  if (!_.isEmpty(filters)) {
    const gid = JSON.parse(filters as string);
    result = result?.filter((ele) => ele?.gid === gid);
  }

  total = result?.length;

  if (preindex && Number(sufindex) > 0) {
    result = result?.slice(Number(preindex - 1), Number(sufindex));
  }

  res.send({
    data: {
      items: result,
      total: total,
      preindex: 1,
      sufindex: 1,
    },
    code: '0',
    msg: 'success',
  });
}

function createUserGroup(req: Request, res: Response) {
  const cluster_id = req.body?.cluster_id;
  const gname = req.body?.cer_group_name;
  const type = req.body?.type;

  if (_.isEmpty(cluster_id) || _.isEmpty(gname) || _.isEmpty(type)) {
    res.sendStatus(400);
  }

  res.send({
    data: {
      name: gname,
      gid: totalFileServiceGroups()?.length + 1,
      type,
      status: 'active',
    },
    code: '0',
    msg: 'success',
  });
}

function editUserGroup(req: Request, res: Response) {
  const cluster_id = req.body?.cluster_id;
  const gid = req.body?.cer_group_id;
  const name = req.body?.name;
  const type = req.body?.type;

  if (_.isEmpty(cluster_id) || _.isEmpty(gid) || _.isEmpty(name)) {
    res.sendStatus(400);
  }

  res.send({
    data: {
      name,
      gid: gid,
      type,
      status: 'active',
    },
    code: '0',
    msg: 'success',
  });
}

function deleteUserGroups(req: Request, res: Response) {
  /*const cluster_id = req.body?.cluster_id;
  const gids = req.body?.cer_group_ids;
  const names = req.body?.name;

  if (_.isEmpty(cluster_id) || _.isEmpty(gids) || _.isEmpty(names)) {
    res.sendStatus(400);
  }*/

  res.send({
    data: null,
    code: '0',
    msg: 'success',
  });
}

export default {
  'POST /portal/login/': (req: Request, res: Response) => {
    let result = {
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjMyODM3MzE2LCJlbWFpbCI6ImVtYWlsQGRzbS5jb20iLCJvcmlnX2lhdCI6MTYzMjgzMDExNn0.j-p-9QFqQLykhIELel09T1erVQ_g9_CBh2coh6zMbIk',
      deploy_mode: DeployMode(), // tos  tfs_tos  tfs
      state_openwizard: true,
      feature_pacs: false,
      feature_tiering: true,
      state_rgw_ready: false, // 对象配置任务是否已完成
      state_pwd_changed: true,
      user: {
        user_id: 3,
        username: 'admin',
        email: 'email@dsm.com',
        is_active: true,
        role: 'superadmin',
      },
      license_cluster: {},
      license_nodes: [],
    };
    if (req.body.username === 'admin') {
      res.send({
        data: result,
        code: '0',
        msg: 'success',
      });
    } else if (req.body.username === 'user') {
      result.user.username = req.body.username;
      result.user.role = 'user';
      res.send({
        data: result,
        code: '0',
        msg: 'success',
      });
    } else if (req.body.username === 'magnascale_cli') {
      result.user.username = req.body.username;
      result.user.role = 'user';
      res.send({
        data: result,
        code: '0',
        msg: 'success',
      });
    } else {
      res.send({
        status: 'error',
        currentAuthority: 'guest',
      });
    }
  },

  'GET /portal/user/': (req: Request, res: Response) => {
    res.send({
      data: {
        items: viewUsers.items,
        total: 20,
        preindex: 1,
        sufindex: 1,
      },
      code: '0',
      msg: 'success',
    });
  },

  'GET /dsm/user/': listUser,

  'POST /dsm/user/': (req: Request, res: Response) => {
    const body = req.body;

    res.send({
      data: {
        uid: 11,
        name: body.name,
        passwd: body.passwd,
        type: 'LD',
        status: 'active',
        group_id: body.group_id,
        created_at: moment.utc(),
      },
      code: '0',
      msg: 'success',
    });
  },

  'GET /dsm/group/': listUserGroup,
  'POST /dsm/group/': createUserGroup,
  'POST /dsm/group/modify': editUserGroup,
  'POST /dsm/group/delete': deleteUserGroups,
  'POST /dsm/user/delete': deleteUserGroups,
};
