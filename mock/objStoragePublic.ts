import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';
import { postResonse, asyncPostResonse, postResonseFailure } from './utils';

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

function wizardDefaultInfo(req, res) {
  sleep(2, () =>
    res.send({
      data: {
        default_pool: null,
        default_group: 'usergroup',
        default_user: 'user',
        default_right: 'read-write',
        cache_enable: false,
        tfs_group: {
          id: -5,
          name: 'tfs',
        },
        default_resGroup: {
          leaf_firstn: 'host',
          vhost_split_num: 2,
          v_leaf_firstn_num: 6,
          node_count: 3,
          osd_number: 3,
          id: -5,
        },
        toscache_group: {},
        nodes: ['node72', 'node73', 'node74'],
      },
      code: '0',
      msg: 'success',
    }),
  );
}
function objTaskStatus(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      data: mock({
        object_initialize: 2,
        res_group: 2,
        pool: 2,
        object_gateway: 2,
        object_router: 2,
        storage_policy: 2,
        object_user: 2,
      }),
      msg: 'success',
    }),
  );
}
function objguidanceTaskStatus(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      data: mock({
        initialize: 1,
        gateway: 1,
        router: 2,
        storage_policy: 2,
        object_user: 2,
      }),
      msg: 'success',
    }),
  );
}
function objRoutersNodeCandidates(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'Get node candidates for object router successful',
      data: {
        items: [
          {
            node_name: 'preload-2',
            ipv4: [
              {
                interface_name: 'enp3s0',
                ip: '10.20.3.0/24',
              },
            ],
            ipv6: [
              {
                interface_name: 'enp3s0',
                ip: '2001:db8:abcd:12::1/24',
              },
            ],
            role_public: {
              http_port: 8184,
              https_port: 8182,
            },
          },
          {
            node_name: 'preload-1',
            ipv4: [
              {
                interface_name: 'enp3s0',
                ip: '10.20.3.0/24',
              },
            ],
            ipv6: [
              {
                interface_name: 'enp3s0',
                ip: '2001:db8:abcd:12::1/24',
              },
            ],
            role_public: {
              http_port: 8184,
              https_port: 8182,
            },
          },
          {
            node_name: 'preload-3',
            ipv4: [
              {
                interface_name: 'enp3s0',
                ip: '10.20.3.0/24',
              },
            ],
            ipv6: [
              {
                interface_name: 'enp3s0',
                ip: '2001:db8:abcd:12::1/24',
              },
            ],
            role_public: {
              http_port: 8184,
              https_port: 8182,
            },
          },
        ],
      },
    }),
  );
}
function wizardObjNodeInfo(req, res) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'Get node candidates for object router successful',
      data: {
        items: [
          {
            ipv4: {
              // interface_name: 'enp3s0',
              // static_ip: '10.20.3.0/24',
            },
            ipv6: {
              interface_name: 'ens256',
              static_ip: '2001:db8:abcd:12::1/24',
            },
            node_name: 'node1',
          },
          {
            ipv4: {
              // interface_name: 'enp3s0',
              // static_ip: '10.20.3.0/24',
            },
            ipv6: {
              interface_name: 'ens256',
              static_ip: '2001:db8:abcd:12::1/24',
            },
            node_name: 'node2',
          },
          {
            ipv4: {
              // interface_name: 'enp3s0',
              // static_ip: '10.20.3.0/24',
            },
            ipv6: {
              interface_name: 'ens256',
              static_ip: '2001:db8:abcd:12::1/24',
            },
            node_name: 'node3',
          },
          {
            ipv4: {
              // interface_name: 'enp3s0',
              // static_ip: '10.20.3.0/24',
            },
            ipv6: {
              interface_name: 'ens256',
              static_ip: '2001:db8:abcd:12::1/24',
            },
            node_name: 'node3',
          },
        ],
      },
    }),
  );
}

function objRouters(req, res) {
  res.send({
    code: '0',
    msg: 'Query object routers successed',
    data: {
      items: [
        {
          id: 1,
          name: 'router1',
          domain_name: 'magnascal.obj',
          nodes_count: 3,
          load_balance_policy: 1,
          tos_primary_access_floating_ip: '10.129.100.100',
          create_at: '2023-08-24 12:00:00',
        },
      ],
      total: 1,
      preindex: 1,
      sufindex: 1,
    },
  });
}

function objRouterNodes(req, res) {
  res.send({
    code: '0',
    msg: 'Query object routers successed',
    data: {
      items: [
        {
          node_name: 'node-1',
          floating_ip: '10.128.100.239/24',
          interface_name: 'ens19',
        },
      ],
    },
  });
}

function objRouterDetail(req, res) {
  res.send({
    code: 0,
    msg: 'Query object routers successed',
    data: {
      name: 'router1',
      create_at: '2023-09-11 12:00:00',
      roles_info: {
        role_public: {
          http_port: 9999,
          https_port: 9998,
          domain_http_port: 9996,
          domain_https_port: 9995,
          primary_access_floating_ip: '10.129.10.100',
          backup_access_floating_ip: '10.129.10.100',
        },
      },
      domain_name: 'test.com',
      mode: 'DR',
      load_balance_policy: 'RR',
      ip_version: 4,
    },
  });
}

export default {
  'GET /dsm/clusters/get_defaultInfo/': wizardDefaultInfo,
  'POST /dsm/wizard/obj_quick_config/': postResonse,
  'POST /dsm/wizard/obj_quick_config_retry/': postResonseFailure,
  'POST /dsm/wizard/obj_quick_config_quit/': postResonse,
  'GET /dsm/wizard/obj_task_status/': objTaskStatus,
  'GET /dsm/obj/operation_guidance/': objguidanceTaskStatus,
  'GET /dsm/obj/routers/node-candidates/': objRoutersNodeCandidates,
  'GET /dsm/wizard/get_object_info/': wizardObjNodeInfo,
  'GET /dsm/wizard/get_node_info/': wizardObjNodeInfo,
  'GET /dsm/obj/routers/': objRouters,
  'GET /dsm/obj/routers/nodes/': objRouterNodes,
  'GET /dsm/obj/routers/detail_info/': objRouterDetail,
};
