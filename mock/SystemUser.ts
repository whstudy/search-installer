import { Request, Response } from 'express';
import Mock, { mock } from 'mockjs';
import _ from 'lodash';


function addUser(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'addUser success',
      data: {

      },
    }),
  );
}

function updateInfo(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'updateInfo success',
      data: {
       
      },
    }),
  );
}
function changePassword(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'changePassword success',
      data: {
       
      },
    }),
  );
}
function deleteUser(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'deleteUser success',
      data: {
       
      },
    }),
  );
}
function enableUser(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'enableUser success',
      data: {
       
      },
    }),
  );
}
function disableUser(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  res.send(
    mock({
      code: '0',
      msg: 'disableUser success',
      data: {
       
      },
    }),
  );
}
function getConfig(req: Request, res: Response) {
  // let { cluster_id } = req.body;

  // if (_.isEmpty(cluster_id)) {
  //   res.sendStatus(400);
  // }

  res.send(
    mock({
      code: '0',
      msg: 'deleteUser success',
      "data": {
        "first_login": 0,
        "LOGIN_LOCK_TIME": 60,
        "LOGIN_LOCK_COUNT": 5,
        "LOGIN_OBSERVATION_TIME": 7200
      },
    }),
  );
}



export default {
  'GET /portal/user/': (req: Request, res: Response) => {
    res.send({
      data: Mock.mock({
        'result|20': [
            {
              'id|+1': 1,
              username: 'viewUser-@id',
              email: '@email',
              'role|1': ['user','admin','superadmin'],
              // 'role|1': ['admin', 'bussiness', 'guest'],
              'is_active|1': [true, false],
            },
          ],
        total: 20,
        preindex: 1,
        sufindex: 1,
      }),
      code: '0',
      msg: 'success',
    });
  },
  'GET /portal/login/config/get_configure/': getConfig,
  'POST /portal/user/': addUser,
  'POST /portal/user/enable/': enableUser,
  'POST /portal/user/disable/': disableUser,
  'POST /portal/user/update_info/': updateInfo,
  'POST /portal/user/change_password/': changePassword,
  'POST /portal/user/delete/': deleteUser,
};
