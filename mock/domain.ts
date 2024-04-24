import { Request, Response } from 'express';
import { mock } from 'mockjs';
import _ from 'lodash';

function showNISDomain(req: Request, res: Response) {
  let { cluster_id } = req.query;

  if (_.isEmpty(cluster_id)) {
    setTimeout(() => {
      res.sendStatus(500);
    }, 2000);
  }

  res.send({
    code: '0',
    msg: 'Get NIS domain info successfully!',
    data: {
      NIS_domain_name: 'nisdomain',
      NIS_domain_ip: '10.128.132.59',
      NIS_domain_status: 'not_join',
      other_domain: '0',
    },
  });
}
// ['joining', 'quiting', 'ready', 'not_join'];
function testDomain(req: Request, res: Response) {
  let { cluster_id } = req.body;
  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  setTimeout(() => {
    res.send({
      code: '0',
      msg: 'Test NIS domain successfully!',
      data: true,
    });
  }, 2000);
}

function quitDomain(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  setTimeout(() => {
    res.send(
      mock({
        code: '0',
        msg: 'Quitting NIS domain, please wait!',
        data: {
          // job_id: '@natural',
        },
      }),
    );
  }, 2000);
}

function addDomain(req: Request, res: Response) {
  let { cluster_id } = req.body;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }

  setTimeout(() => {
    res.send(
      mock({
        code: '0',
        msg: 'Joining NIS domain, please wait!',
        data: {
          // job_id: '@natural',
        },
      }),
    );
  }, 5000);
}

function getADDomain(req: Request, res: Response) {
  let { cluster_id } = req.query;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }
  setTimeout(() => {
    res.send({
      code: '0',
      data: {
        // 加域信息
        AD_domain_name: '3123',
        AD_domain_server_ip: '10.128.138.55',
        AD_domain_user_name: 'Amdinistrator',
        AD_domain_user_pass: 'Passw0rd',
        AD_domain_status: 'not_join',
        other_domain: '0',
      },
      msg: 'Get AD domain info successful!',
    });
  }, 2000);
}
function getLDAPDomain(req: Request, res: Response) {
  let { cluster_id } = req.query;

  if (_.isEmpty(cluster_id)) {
    res.sendStatus(400);
  }
  res.send({
    code: '0',
    data: {
      LDAP_domain_status: 'not_join',
      other_domain: '0',
    },
    msg: 'Get AD domain info successful!',
  });
}
// ['joining', 'quiting', 'ready', 'not_join'];
export default {
  // 'GET /dsm/domain/show_AD_domain/': getADDomain,
  'POST /dsm/domain/test_AD_domain/': testDomain,
  'POST /dsm/domain/add_AD_domain/': addDomain,
  'POST /dsm/domain/quit_AD_domain': quitDomain,

  // 'GET /dsm/domain/show_LDAP_domain': getLDAPDomain,
  'POST /dsm/domain/test_LDAP_domain/': testDomain,
  'POST /dsm/domain/add_LDAP_domain/': addDomain,
  'POST /dsm/domain/quit_LDAP_domain/': quitDomain,

  'GET /dsm/domain/show_NIS_domain': showNISDomain,
  'POST /dsm/domain/add_NIS_domain': addDomain,
  'POST /dsm/domain/test_NIS_domain': testDomain,
  'POST /dsm/domain/quit_NIS_domain': quitDomain,
};
