import Mock from 'mockjs';
import moment from 'moment';

const diskIds: any[] = [];
for (let i = 1; i < 101; i++) {
  diskIds.push(i);
}

const racks: any[] = [];
for (let i = 1; i < 5; i++) {
  racks.push('rack-' + i);
}

export default {
  'GET /dsm/disk/data_disk_status/': (req, res) => {
    res.send({
      code: '0',
      data: {
        health: 12,
        sub_health: 4,
        error: 1,
        total: 17,
      },
      msg: 'query disk status success',
    });
  },
  'GET /dsm/storage_unit/': (req, res) => {
    const data = Mock.mock({
      'items|100': [
        {
          SN: '@string(32)',
          bcache: '',
          block: 'b62c5cbe812680f963773fcc22c18701',
          cid: 'N/A',
          db: 'b45985819151a4cd36a8afc36e265116',
          eid: 'N/A',
          enclosure: 'N/A',
          firmware: '',
          group_name: 'default',
          'health_status|1': ['health', 'sub_health', 'error'],
          host_name: 'node1',
          id: 9,
          interface_type: '',
          manufacturer: '',
          mode: 'JBOD',
          name: '@string(8)',
          position_light: false,
          resource_group: 'default',
          rotate_speed: 'N/A',
          size: '107374182400',
          slot: 'N/A',
          specifications: '',
          state: 0,
          'status|1': ['UP', 'DOWN', 'IN', 'OUT', 'ISOLATED'],
          total_capacity: 137778683904,
          'type|1': ['HDD', 'SSD', 'NVMe'],
          usage: '22.86%',
          used_capacity: '@integer(1000000000, 100000000000)',
          volume: 0,
          wal: 'b45985819151a4cd36a8afc36e265116',
        },
      ],
    })?.items;
    let items = data;
    const { preindex, sufindex } = req.query || {};
    if (preindex && sufindex) {
      items = data?.slice(Number(preindex), Number(sufindex));
    }
    res.send({
      code: '0',
      data: {
        items: items,
        preindex: preindex || -1,
        sufindex: sufindex || -1,
        total: data?.length,
      },
      msg: 'get storage unit success',
    });
  },
  'GET /dsm/disk/': (req, res) => {
    const data = Mock.mock({
      'items|100': [
        {
          'id|+1': 1, // 无该字段
          SN: '@string(32)',
          cid: '0',
          eid: '69',
          enclosure: '前面板',
          firmware: '',
          host_name: 'zz6603',
          interface_type: '',
          manufacturer: '',
          mode: 'JBOD',
          path: '/dev/sdg@id',
          position_light: false,
          'purpose|1': [['RGW_metadata', 'system'], ['data'], ['metadata']],
          rotate_speed: '7200 rpm',
          size: 8001563222016,
          slot: '0-69-1',
          specifications: '',
          'status|1': ['health', 'sub_health', 'error'],
          'type|1': ['HDD', 'SSD', 'NVMe'],
          resource_group: 'default',
        },
      ],
    })?.items;
    let items = data;
    const { preindex, sufindex } = req.query || {};
    if (preindex && sufindex) {
      items = data.slice(Number(preindex), Number(sufindex));
    }
    res.send({
      code: '0',
      data: {
        items: items,
        preindex: preindex || -1,
        sufindex: sufindex || -1,
        total: data?.length,
      },
      msg: 'get resource group success',
    });
  },
  'GET /dsm/disk/free_disk': (req, res) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'items|25': [
          {
            key: 'd@id',
            'id|+1': 1,
            node: 'node-@id',
            nodeName: 'node-@id',
            path: '/dev/sda@id',
            server_id: 3,
            size: '107374182400',
            status: 1,
            type: 'HDD',
            purpose: '[1]',
            mode: 'N/A',
            sn: 'd@id',
            slot: 'N/A',
            rotate_speed: 'N/A',
            eid: 'N/A',
            position_light: null,
            cid: 'N/A',
            name: '/dev/sda@id',
          },
        ],
      })?.items,
      msg: 'get resource group success',
    });
  },
  'POST /dsm/disk/delete_disk/': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: '0',
          data: { job_id: 321321321 },
          msg: 'job of removing disk created successfully',
        }),
      1000,
    );
  },
  'POST /dsm/disk/operate_position_light/': (req, res) => {
    res.send({
      code: '0',
      data: null,
      msg: 'light disk successfully',
    });
  },
  'POST /dsm/disk/load_disk/': (req, res) => {
    res.send({
      code: '0',
      data: { job_id: 321321321 },
      msg: 'job of loading disks created successfully',
    });
  },
};
