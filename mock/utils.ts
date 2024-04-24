import { Request, Response } from 'express';
import _ from 'lodash';

// Compromise: Once DeployMode is a const it will throw error: DeployMode should be a function or an object, but got a string
function DeployMode() {
  return 'tfs_tos'; // tos  tfs_tos  tfs
}

function sleep(seconds, callback) {
  setTimeout(() => {
    callback();
  }, seconds * 1000);
}

function getDataByPager(data, preindex, sufindex) {
  const { total, items } = data || {};
  const newItems = [...items];
  if (preindex && sufindex) {
    return {
      total,
      items: newItems.slice(Number(preindex) - 1, Number(sufindex)),
    };
  }
  return data;
}

function postResonse(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'success',
      data: {},
    }),
  );
}
function postResonseFailure(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '2',
      msg: 'Failure',
      data: {},
    }),
  );
}
function asyncPostResonse(req: Request, res: Response) {
  sleep(2, () =>
    res.send({
      code: '0',
      msg: 'success',
      data: {
        job_id: 2,
      },
    }),
  );
}

export { sleep, DeployMode, getDataByPager, postResonse, postResonseFailure, asyncPostResonse };
