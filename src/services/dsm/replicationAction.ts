// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 暂停之后启动复制 http://127.0.0.1/dsm/relationship/start/ POST /dsm/relationship/start/ */
export async function dsmRelationshipStart(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/start/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 暂停复制 http://127.0.0.1/dsm/relationship/pause/ POST /dsm/relationship/pause/ */
export async function dsmRelationshipPause(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/pause/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 放弃本次复制 http://127.0.0.1/dsm/relationship/cancel/ POST /dsm/relationship/abort_replication/ */
export async function dsmRelationshipAbortReplication(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>(
    '/dsm/relationship/abort_replication/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除复制对 http://127.0.0.1/dsm/relationship/delete/ POST /dsm/relationship/delete/ */
export async function dsmRelationshipDelete(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/delete/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 立即复制 http://127.0.0.1/dsm/relationship/start_replication/ POST /dsm/relationship/start_replication/ */
export async function dsmRelationshipStartReplication(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>(
    '/dsm/relationship/start_replication/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 授权复制对 http://127.0.0.1/dsm/relationship/authorize/ POST /dsm/relationship/authorize/ */
export async function dsmRelationshipAuthorize(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/authorize/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 拒绝复制对 http://127.0.0.1/dsm/relationship/reject/ POST /dsm/relationship/reject/ */
export async function dsmRelationshipReject(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/reject/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对-业务接管 http://127.0.0.1/dsm/relationship/failover/ POST /dsm/relationship/failover/ */
export async function dsmRelationshipFailover(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/failover/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对-设置只读 http://127.0.0.1/dsm/relationship/set_permission/ POST /dsm/relationship/set_permission/ */
export async function dsmRelationshipSetPermission(
  body: {
    relationship_uuid: string;
    /** RO 只读,RW 可写 */
    permission?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/set_permission/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对-还原 http://127.0.0.1/dsm/relationship/restore/ POST /dsm/relationship/restore/ */
export async function dsmRelationshipRestore(
  body: {
    relationship_uuid: string;
    copy_on_restored?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/restore/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对-还原 http://127.0.0.1/dsm/relationship/writeback_restore/ POST /dsm/relationship/writeback_restore/ */
export async function dsmRelationshipWritebackRestore(
  body: {
    relationship_uuid: string;
    copy_on_restored?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>(
    '/dsm/relationship/writeback_restore/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 复制对-回写 http://127.0.0.1/dsm/relationship/writeback/ POST /dsm/relationship/writeback/ */
export async function dsmRelationshipWriteback(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.AsyncJobResponses & API.RequestExtend>('/dsm/relationship/writeback/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 复制对-回写 http://127.0.0.1/dsm/relationship/writeback/ POST /dsm/relationship/manual_repair/ */
export async function dsmRelationshipManualRepair(
  body: {
    relationship_uuid: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.syncResponse & API.RequestExtend>('/dsm/relationship/manual_repair/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
