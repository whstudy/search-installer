import Mock from 'mockjs';
import { isEmpty, random } from 'lodash';
import { sleep } from './utils';

const Sleep = 3;

const hostIds: any[] = [];
for (let i = 1; i < 100; i++) {
  hostIds.push(i);
}

const racks: any[] = [];
for (let i = 1; i < 5; i++) {
  racks.push('rack-' + i);
}

function randomRespone(res) {
  const errorResponse = {
    code: '60001',
    data: null,
    msg: 'internal unknown error',
  };
  const response = [
    () =>
      res.send({
        code: '0',
        data: null,
        msg: 'power on successfully',
      }),
    () => res.send(errorResponse),
  ];
  response[Math.round(Math.random())]();
}

export default {
  'GET /dsm/host/': (req, res) => {
    let hostData = Mock.mock({
      'items|22': [
        {
          'host_id|+1': hostIds,
          node_name: 'host-@string(2, 20)',
          'rack|1': racks,
          // 'status|1': [0, 1, 2],
          role: {
            DSM: 'health',
            CMS: 'error',
            MDS: 'health',
            PROT: 'error',
            RGW: 'headlth',
          },
          // 'option_status|1': [0, 1],
          status_units: 3,
          public_ip: '10.20.2.12',
          dynamic_ip: ['10.20.2.179'],
          manager_ip: '1.1.1.1',
          cluster_ip: '1.2.3.4',
          'ipmi_ip|1': ['NA', '1.1.1.1'],
          cpu: '@integer(1, 99)%',
          mem: '@integer(1, 99)%',
          'operation_status|1': [0, 1, 2, 3, 4, 5, 6, 7, 8],
          'running_status|1': [0, 1, 2, 3, 4, 15, 63, 4294967295, 2147483647],
          'is_bmc_set|1': [true, false],
        },
      ],
    })?.items;
    let { preindex, sufindex } = req.query || {};
    if (!preindex) {
      preindex = 1;
    }
    let items = [];
    if (!sufindex) {
      items = hostData.slice(preindex);
    } else {
      items = hostData.slice(preindex, sufindex);
    }
    res.send({
      code: '0',
      data: {
        items: items,
        preindex: preindex,
        sufindex: sufindex,
        total: hostData?.length,
      },
      msg: 'get resource group success',
    });
  },
  'GET /dsm/host/info/': (req, res) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'host_id|1': hostIds,
        node_name: 'node-@host_id',
        role: {
          DSM: 'health',
          CMS: 'error',
          MDS: 'health',
          PROT: 'error',
          SMD: 'health',
          RGW: 'headlth',
        },
        'rack|1': racks,
        'running_status|1': [0, 1, 2, 3],
        'operation_status|1': [0, 1, 2, 3, 4, 5, 6, 7, 8],
        public_ip: '10.20.2.12',
        manager_ip: '1.1.1.1',
        cluster_ip: '2.2.2.2',
        cpu: '@integer(1, 99)%',
        cpu_usage: '70%',
        mem_size: '@integer(1, 9999999999)',
        mem_usage: 0,
        'os|1': ['linux', 'Window'],
        'storage_units|1': [1, 2, 3],
        'bmc_ip|1': ['NA', '5.5.5.5'],
        bmc_port: 24,
      }),
      msg: 'get resource group success',
    });
  },
  'GET /dsm/host/get_bmc/': (req, res) => {
    res.send({
      code: '0',
      data: {
        'ipmi_ip|1': ['1.1.1.1', null, 'NA', '2.2.2.2'],
        'ipmi_user|1': ['user1', null, 'NA', 'user2'],
        ipmi_pwd: 'password',
        ipmi_port: '23',
      },
      msg: 'get resource group success',
    });
  },
  'POST /dsm/host/modify_bmc/': (req, res) => {
    res.send({
      code: '0',
      data: null,
      msg: 'modify bmc successfully',
    });
  },
  'POST /dsm/host/poweron/': (req, res) => {
    randomRespone(res);
  },
  'POST /dsm/host/shutdown/': (req, res) => {
    res.send({
      code: '0',
      data: { job_id: 43244411323124 },
      msg: 'job of shutdown created successfully',
    });
  },
  'POST /dsm/host/restart/': (req, res) => {
    res.send({
      code: '0',
      data: { job_id: 3213123124343 },
      msg: 'job of restarting host created successfully',
    });
  },
  'GET /dsm/host/nic/': (req, res) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'nics|4': [
          {
            'name|1': hostIds,
            roles: [2],
            ipv4: ['0.0.0.0'],
            ipv6: null,
            MAC: 'ddddddadasdd:Dsadsds',
            dynamic_ip: [''],
            'allow_shutdown|1': [true, false],
          },
        ],
        preindex: 1,
        sufindex: 10,
        total: 4,
      }),
      msg: 'get resource group success',
    });
  },
  'GET /dsm/host/nicperf/': (req, res) => {
    res.send({
      code: '0',
      data: {},
      msg: 'get resource group success',
    });
  },

  'POST /dsm/host/set_static_ip/': (req, res) => {
    const { cluster_id, host_id, ipv4, ipv6, network_card } = req.body;

    if (
      isEmpty(cluster_id) ||
      isEmpty(host_id) ||
      isEmpty(ipv4) ||
      isEmpty(ipv6) ||
      isEmpty(network_card)
    ) {
      sleep(Sleep, () =>
        res.send({
          code: 'e01031165',
          data: null,
          msg: 'invalid params',
        }),
      );
      return;
    }

    if (random(1, 10) > 5) {
      sleep(Sleep, () =>
        res.send({
          code: 'e01031165',
          data: null,
          msg: 'Host set static IP failed: 修改网卡配置失败',
        }),
      );
      return;
    } else {
      sleep(Sleep, () =>
        res.send({
          code: '0',
          data: {
            cluster_id,
            host_id,
            ipv4,
            ipv6,
            network_card,
          },
          msg: 'Host set static IP: . 3003::1/32 successfully',
        }),
      );
      return;
    }
  },
};
