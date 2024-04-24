import { Request, Response } from 'express';
import Mock from 'mockjs';

export default {
  'GET /dsm/system/get_cifs_globals/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: { notify: true, oplock: true, signing: '', guest: true },
      msg: 'Get CIFS global configuration successfully!',
    });
  },
  'POST /dsm/system/set_cifs_globals/': (req: Request, res: Response) => {
    // res.setHeader('showtype', 1);
    // res.setHeader('showtype', 2);
    // res.setHeader('showtype', 4)
    // res.send({ code: '011', msg: 'Set CIFS global configuration successfully', data: {} });
    setTimeout(() => {
      res.send({ code: '09', msg: 'Set CIFS global configuration successfully', data: {} });
    }, 2000);
  },

  'GET /dsm/system/get_dns_settings': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        cluster_dns: '10.8.1.20',
        cluster_dns_domain: 'magnascale.nas.com',
        main_dns: '10.28.13.13',
        standby_dns: '10.28.13.12',
      },
      msg: 'Successfully!',
    });
  },
  'GET /dsm/system/get_tiering_cycle/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        migration_cycle: '3200',
      },
      msg: 'Successfully!',
    });
  },

  'POST /dsm/system/set_outside_dns/': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: '0',
          data: {},
          msg: 'set_outside_dns',
        }),
      2500,
    );
  },

  'POST /dsm/system/set_cluster_dns/': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: '0',
          data: {},
          msg: 'set_cluster_dns',
        }),
      2500,
    );
  },

  'GET /dsm/system/get_cluster_settings/': (req: Request, res: Response) => {
    res.send({
      data: {
        clock_service:
          'ntp.magnascale,ntp.magnascale2,ntp.magnascale3,ntp.magnascale4,ntp.magnascale5,ntp.magnascale6,ntp.magnascale7,ntp.magnascale8',
        show_snapshot: 'true',
      },
      code: '0',
      msg: 'success',
    });
  },

  'POST /dsm/system/set_cluster_settings/': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        data: {},
        code: '0',
        msg: 'success',
      });
    }, 2000);
  },

  'GET /dsm/system/get_floating_ip/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        ipv4_list: [
          '10.128.13.10/24',
          '10.20.2.178/24',
          '10.20.2.179/24',
          '10.128.13.14/24',
          '10.20.2.180/24',
          '10.20.2.181/24',
        ],
        ipv6_list: [
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7112/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7150/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7173/64',
        ],
      },
      msg: 'Get CIFS global configuration successfully!',
    });
  },

  'GET /dsm/system/get_obj_floating_ip/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        ipv4_list: [
          '10.128.13.10/20',
          '10.20.2.178/20',
          '10.20.2.179/24',
          '10.128.13.11/24',
          '10.20.2.180/24',
          '10.20.2.181/24',
          '10.20.2.182/24',
          '10.20.2.183/24',
          '10.20.2.184/24',
          '10.20.2.185/24',
          '10.20.2.186/24',
          '10.20.2.187/24',
          '10.20.2.188/24',
          '10.20.2.189/24',
          '10.20.2.190/24',
          '10.20.2.191/24',
          '10.20.2.192/24',
          '10.20.2.193/24',
        ],
        ipv6_list: [
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7112/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7150/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7173/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7112/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7150/64',
          '4024:8a04:4990:8dc4:fa72:8e3e:72b4:7173/64',
        ],
      },
      msg: 'Get CIFS global configuration successfully!',
    });
  },

  'GET /dsm/system/get_obj_settings/': (req: Request, res: Response) => {
    res.send({
      code: '0',
      data: {
        https_set: '1',
        domain_name: 'www.obj.com',
        obj_https: '8082',
        obj_http: '8084',
        crt_source: '自有证书',
        crt_name: 'magnascale_s3_cacert.crt',
        crt_content: `magnascale_s3_cacert.crtmagnascale_s3_cacert.crtmagn
        ascale_s3_cacert.crtmagnascale_s3_cacert.crtmagnascale_s3_cacert.crt
        magnascale_s3_cacert.crtmagnascale_s3_cacert.crtmagnascale_s3_cacert.crt
        magnascale_s3_cacert.crtmagnascale_s3_cacert.crtmagnascale_s3_cacert.crt`,
      },
      msg: 'Get CIFS global configuration successfully!',
    });
  },
  'GET /dsm/system/get_ftp_globals/': (req, res) => {
    res.send({
      code: '0',
      data: Mock.mock({
        'data|1': [
          {
            anonymous_access: 'YES',
            anonymous_path: '/mnt/tfs/dir1/t',
          },
          {
            anonymous_access: 'NO',
          },
        ],
      })?.data,
      msg: 'Get CIFS global configuration successfully!',
    });
  },

  'GET /dsm/logic/node_info/': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: '0',
          msg: 'Query node info successfully!',
          data: { used_cpa: 13005938688, total_cpa: 55078963200, error: 0, sub_health: 0 },
        }),
      300,
    );
  },
  'POST /dsm/system/set_ftp_globals/': (req, res) => {
    setTimeout(
      () =>
        res.send({
          code: '0',
          data: {},
          msg: 'Get CIFS global configuration successfully!',
        }),
      2500,
    );
  },
  'POST /dsm/system/modify_obj_domain_name/': (req, res) => {
    const { domain_name } = req.body;
    const defaultDomainName = 'magnascale.nas.com';
    if (domain_name === defaultDomainName) {
      res.send({
        code: '1',
        msg: '对象存储域名不能与文件存储域名相同',
      });
    } else {
      res.send({
        code: '0',
        data: {
          job_id: 1,
        },
        msg: '对象存储域名修改成功',
      });
    }
  },
};
