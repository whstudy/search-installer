import Mock from 'mockjs';
import { Request, Response } from 'express';
import _ from 'lodash';
import moment from 'moment';

export default {
  'GET /dsm/license/info/': {
    code: '0',
    data: Mock.mock({
      cluster_id: 'cbc4043c-11d5-11ec-8d54-82e39a428af3',
      cluster_name: 'cluster1',
      licensed_user: null,
      license_state: 1,
      authorized_node_count: 2,
      activation_node_count: 0,
      probation_node_count: 0,
      free_key_count: 3,
      to_be_activated_key: 0,
      key_num: 0,
      left_time: 57,
      waiting_recycling_key: 0,
    }),
    msg: 'Query current alerts successed',
  },
  'GET /dsm/license/authorized/': {
    code: '0',
    data: Mock.mock({
      'items|5': [
        {
          uuid: '@id',
          'name|2-4': '@string',
          key: '@id',
          'status|1': [0, 1, 2, 3, 4, 15, 63, 4294967295, 2147483647],
          'type|6': '@string', //节点类型
          time: '@date', //激活日期
          license_status: 1, //“license状态”——1已授权  4授权不足
          additional_button: 0,
          // 附加标识”——
          // “总条数”——用于判断输入key的数量
          alertInfo: [
            {
              //“授权不足的提示信息”——‘…最多允许使用XX个磁盘，已使用XX，请尽快升级…..’
              alerttype_id: 95,
              entity_attr: {
                node_name: 'node_1', //"节点名称"
                threshold: 3, //"可使用值"
                actual_value: 2, //"已使用值"
              },
            },
            {
              //“授权不足的提示信息”——‘…最多允许使用XX个磁盘，已使用XX，请尽快升级…..’
              alerttype_id: 96,
              entity_attr: {
                node_name: 'node_1', //"节点名称"
                threshold: 3, //"可使用值"
                actual_value: 2, //"已使用值"
              },
            },
          ],
        },
      ],
      preindex: 1,
      sufindex: 2,
      total: 2,
      upgrade: 2, // "0:节点全部在线，1:存在离线节点，2:是否允许升级"
      revoke: 0, // "0:存在离线节点，1:节点全部在线"
    }),
    msg: 'Query current alerts successed',
  },

  'GET /dsm/license/additionkey/': {
    code: '0',
    data: Mock.mock({
      'items|3': [
        {
          id: '@id',
          key: '@id',
          'state|1': [1, 3],
          type: 'fdsf',
        },
      ],
      upgrade_key: true,
    }),
  },

  'POST /dsm/license/enable/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: 'string',
      data: {
        license_id: 'string',
        activation_info: [
          {
            node_name: 'string',
            key: 'string',
            key_type: 'string',
            activation_time: 'string',
            node_uuid: 'string',
          },
        ],
        recycle_info: [
          // {
          //   "key_type": "string",
          //   "key": "string"
          // }
        ],
        acertification_failed: [
          // {
          //   "node_name": "string",
          //   "key": "string",
          //   "key_type": "string"
          // }
        ],
      },
    });
  },

  'POST /dsm/license/authorize/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: 'string',
      data: {},
    });
  },

  'POST /dsm/license/add_additionkey/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: 'string',
      data: {},
    });
  },

  'POST /dsm/license/dorecycle/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: '回收',
      data: {},
    });
  },

  'POST /dsm/license/docancel/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: '解除授权',
      data: { body },
    });
  },

  'POST /dsm/license/remove_additionkey/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: '附属key解除授权',
      data: { body },
    });
  },

  'POST /dsm/license/delete_additionkey/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: '附属key删除',
      data: { body },
    });
  },

  'GET /portal/user/logout/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: 'string',
      data: {},
    });
  },
  // 'POST /dsm/license/enable/': (req: Request, res: Response) => {
  //   const body = req.body;
  //   res.send(
  //     {

  //       "code": "0",
  //       "msg": "string",
  //       "data": {
  //         "result": [
  //           {
  //             "node_name": "string",
  //             "key": "string",
  //             "type": "string"
  //           }
  //         ]
  //       }

  //     }
  //   );
  // },
  'POST /dsm/license/exlicense/': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      code: '0',
      msg: 'string',
      data: {
        license_data: 'string',
        file_name: 'string',
      },
    });
  },
  'GET /dsm/license/recycle/': {
    code: '0',
    data: Mock.mock({
      items: [
        {
          key: 'L11D17Z0PB5BQOSCSWK0OGW8K4CA',
          type: 'SR650',
          status: 0,
        },
        {
          key: 'L114ZYJXU1DE9KWK0KKOGKC0000H',
          type: 'SR650',
          status: 0,
        },
      ],
    }),
    msg: 'Query operation record successed',
  },
  'GET /dsm/license/cancel/': {
    code: '0',
    data: Mock.mock({
      items: [
        {
          key: 'L11D17Z0PB5BQOSCSWK0OGW8K4CA',
          type: 'SR650',
          status: 0,
          id: 0,
          name: 'node-1',
          time: '2021-04-19 09:11:48',
        },
        {
          key: 'L11D17Z0PB5BQOSCSWK0OGW8K4CA2',
          type: 'SR650',
          status: 0,
          id: 0,
          name: 'node-1',
          time: '2021-04-19 09:11:48',
        },
      ],
    }),
    msg: 'Query operation record successed',
  },
  'GET /dsm/license/unusedkey/': {
    code: '0',
    data: Mock.mock({
      items: [
        {
          key: 'D215GTOAR2A7EO00S8O40W4C0OCA',
          type: '',
          state: 0,
        },
      ],
    }),
    msg: 'Query operation record successed',
  },
  'GET /dsm/license/activation/': {
    code: '0',
    data: {},
    msg: 'success',
  },
  'GET /dsm/license/trial/': {
    code: '0',
    data: {},
    msg: 'success',
  },
};
