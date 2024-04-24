import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

const TenantUsers = mock({
  'items|50': [
    {
      'id|+1': 2,
      tenant_name: /^(?![\.])[a-zA-Z0-9-\._@]{1,128}$/,
      // desc: /^[\u4e00-\u9fa5a-zA-Z0-9-\._@ ]{1,128}$/,
      'obj_user_count|0-3': 0,
      create_time: '@datetime',
      total_bandwidth: '9223372036854775807',
      read_bandwidth: '52428800',
      write_bandwidth: '52428800',
      total_iops: '800',
      read_iops: '60',
      write_iops: '50',
    },
  ],
});

const CorsList = mock({
  'items|100': [
    {
      allowedOrigins: /^(?![\.])[a-zA-Z0-9-\._@]{1,128}$/,
      allowedMethods: '9223372036854775807',
      allowedHeaders: '52428800',
      exposeHeaders: '800',
      maxAgeSeconds: '50',
    },
  ],
});

function getTenantUser(req, res) {
  res.send({
    data: {
      items: TenantUsers.items,
      total: TenantUsers.length,
      preindex: 1,
      sufindex: 1,
    },
    code: '0',
    msg: 'success',
  });
}

function postTenantUser(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'post Tenant User successful',
      data: '',
    }),
  );
}

function getTenantUserInfo(req, res) {
  let cluster_id = req.query?.cluster_id;
  let tenant_name = req.query?.tenant_name;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(tenant_name)) {
    sleep(2, () =>
      res.send({
        code: '0',
        msg: 'success',
        data: mock({
          cluster_id: '95b40698-d978-11eb-bd92-66f4c6d99e84',
          tenant_name: tenant_name,
          desc: 'this is a new object tenant ',
          quota_capacity: 754245094,
          'quota_object|1': [108, 20000, 400000000],
          'used_quota_capacity|1': [75424509, 8504245094, 454245094],
          'used_quota_object|1': [10, 10900, 200758000],
        }),
      }),
    );
  } else {
    res.sendStatus(400);
  }
}

function editTenantUser(req, res) {
  let { cluster_id, name } = req.body;
  if (!_.isEmpty(cluster_id) && !_.isEmpty(name)) {
    res.send({
      code: '0',
      msg: 'moify tenant user success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function deleteTenantUser(req: Request, res: Response) {
  let names = req.body?.tenant_name;
  if (!_.isEmpty(names)) {
    res.send({
      code: '0',
      msg: 'delete tenant user success',
      data: null,
    });
  } else {
    res.sendStatus(400);
  }
}

function getTenantQos(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'set Tenant QOS successful',
      data: '',
    }),
  );
}
function setTenantQos(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'set Tenant QOS successful',
      data: {
        id: 10,
        total_bandwidth: '0',
        read_bandwidth: '0',
        write_bandwidth: '0',
        total_iops: '0',
        read_iops: '0',
        write_iops: '0',
      },
    }),
  );
}

function tosInit(req: Request, res: Response) {
  sleep(1, () =>
    res.send({
      code: '0',
      msg: 'tos init successful',
      data: {
        job_id: 10,
      },
    }),
  );
}

export default {
  'GET /dsm/obj/tenant/': getTenantUser,
  'POST /dsm/obj/tenant/': postTenantUser,
  'GET /dsm/obj/tenant/info/': getTenantUserInfo,
  'POST /dsm/obj/tenant/modify/': editTenantUser,
  'POST /dsm/obj/tenant/delete/': deleteTenantUser,
  'GET /dsm/obj/tenant/getqos/': getTenantQos,
  'POST /dsm/obj/tenant/setqos/': setTenantQos,
  'POST /dsm/obj/initializer/': tosInit,
};
