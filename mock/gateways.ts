import { Request, Response } from 'express';
import moment from 'moment';
import Mock from 'mockjs';
import { DeployMode } from './utils';

function generateGatewaysName(groupId: number) {
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

function generateGatewayss(n: number) {
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
      name: generateGatewaysName(n),
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

function gatewayList(req: Request, res: Response) {
  const gateways = Mock.mock({
    'array|1-2': [
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
        purpose: 0,
        created_at: '2022-08-10T10:53:59',
        used_capacity: 154404443,
        total_capacity: 194818801664,
        group_name: 'default',
        status: 1,
        concurrent_connections: '@integer(0, 100)',
        https_port: 9090,
        http_port: 9091,
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
        purpose: 0,
        created_at: '2022-08-10T10:53:59',
        used_capacity: 154404443,
        total_capacity: 194818801664,
        group_name: 'default',
        status: 2,
        concurrent_connections: '@integer(0, 100)',
        https_port: 9090,
        http_port: 9091,
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
        purpose: 0,
        created_at: '2022-08-10T10:53:59',
        used_capacity: 154404443,
        total_capacity: 194818801664,
        group_name: 'default',
        status: 3,
        concurrent_connections: '@integer(0, 100)',
        https_port: 9090,
        http_port: 9091,
        b: 0,
        severity: 0,
      },
    ],
  }).array;
  let result: any = [];
  result = gateways;
  // const temp = generateGatewayss(7);
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
  res.send({
    code: '0',
    data: {
      items: result,
      total: result.length,
      preindex: 1,
      sufindex: 10,
    },
    msg: 'success',
  });
}

function getResData(queryParams) {
  const timeGap = 10; // 10s一条
  const { time_from, time_till, monitor_item, monitor_db, is_dashboard } = queryParams || {};
  const neededLength1 = (time_till - time_from) / timeGap; // 实际返回条数
  // 后端以某种方式拿到的条数
  const neededLength = neededLength1 + Math.random() * 100;
  const mockBody = {};
  const allowedItems = {
    cluster:
      'rbw/wbw/recover_bw/riops/wiops/recover_iops/rio_delay/wio_delay/total_capacity/used_capacity/avail_capacity/recovering_rate/cluster_recovering_objects',
    resource_group: 'recovering_rate/recovering_objects',
    gateways:
      'total_capacity/used_capacity/avail_capacity/recovering_rate/recovering_bytes/rbw/wbw/riops/wiops/io_delay',
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
  if (!monitor_item.includes(',')) {
    items = [monitor_item];
  } else {
    items = monitor_item.split(',');
  }
  if (is_dashboard === 'false') {
    const mockItem = {};
    mockItem[`time|+${timeGap * 1000}`] = new Date().getTime() - neededLength1 * 10 * 1000;
    items?.map((ele) => {
      if (allowedItems?.[monitor_db] && allowedItems[monitor_db].includes(ele)) {
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
      if (allowedItems?.[monitor_db] && allowedItems[monitor_db].includes(ele)) {
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
function newGateways(req: Request, res: Response) {
  res.send({
    code: '0',
    data: {},
    msg: 'success',
  });
}

function recommend(req: Request, res: Response) {
  res.send({
    code: '0',
    msg: 'Get recommend conf for gateways succeeded',
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

function gatewayssummary(req: Request, res: Response) {
  res.send({
    code: '0',
    data: Mock.mock({
      total: '@integer(0, 10)',
      warn: 3,
      err: 2,
      health: 1,
    }),
    msg: 'success',
  });
}

function node_candidates(req: Request, res: Response) {
  res.send({
    code: '0',
    data: {
      items: [
        {
          node_name: 'node1',
          public_ip: '1.1.1.1',
        },
        {
          node_name: 'node2',
          public_ip: '1.1.1.2',
        },
        {
          node_name: 'node3',
          public_ip: '1.1.1.3',
        },
      ],
      http_port: '',
      https_port: '',
    },
    msg: 'success',
  });
}

export default {
  'GET /dsm/perf/': getLine,
  'GET /dsm/obj/gateway/': gatewayList,
  'POST /dsm/obj/gateway/': newGateways,
  'GET /dsm/storage/gateways/recommend/': recommend,
  'GET /ui/summary/obj_gateway_summary/': gatewayssummary,
  'GET /dsm/obj/gateway/node_candidates/': node_candidates,
};
