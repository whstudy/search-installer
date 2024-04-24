import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';

const policyList = mock({
  'items|20': [
    {
      'id|+1': 1,
      name: 'policy-@id',
      'relationship_num|0-5': 0,
      'dir_num|0-5': 0,
      rules: [
        {
          'mode|1': ['cron', 'interval'],
          rule: {
            week: [1, 2, 3, 4, 5], // (指定时间: week每周/天)
            day: -1, // (指定时间: day每月 第一天:1 ,最后一天：-1, 其他（2-27)
            hour: 10,
            minute: 20,
            second: 183720, // (指定时间: 时间点)
          },
        },
      ],
    },
  ],
});

policyList.items.unshift({
  id: 100,
  name: 'policy-每月',
  relationship_num: 0,
  dir_num: 0,
  rules: [
    {
      mode: 'cron',
      rule: {
        week: [], // (指定时间: week每周/天)
        day: 4, // (指定时间: day每月 第一天: 1 ,最后一天：-1, 其他（2-27)
        hour: '00',
        minute: '03',
      },
    },
  ],
});

function getSnapPolicyList(req, res) {
  // const { preindex, sufindex } = req.query;
  res.send({
    data: {
      items: [],
      // items: policyList.items.slice(preindex - 1, sufindex),
      total: 20,
      preindex: 1,
      sufindex: 1,
    },
    code: '0',
    msg: 'success',
  });
}

function createSnapPolicyList(req: Request, res: Response) {
  let { name } = req.body;
  if (!_.isEmpty(name)) {
    setTimeout(() => {
      res.send({
        code: '0',
        msg: 'success',
        data: {
          name,
        },
      });
    }, 4000);
  } else {
    res.sendStatus(400);
  }
}

export default {
  'GET /dsm/snappolicy/': getSnapPolicyList,
  'POST /dsm/snappolicy/': createSnapPolicyList,
  'POST /dsm/snappolicy/modify/': createSnapPolicyList,
};
