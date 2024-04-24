import { useCallback, useState } from 'react';

export default function useTable<T extends { data?: any }>(
  request: (payload: any) => Promise<T & API.RequestExtend>,
  extend: any,
) {
  const [tableTotal, setTableTotal] = useState();
  const tableRequest = useCallback(
    async (params) => {
      const { current, pageSize } = params;
      const payload = {
        preindex: (current - 1) * pageSize + 1,
        sufindex: current * pageSize,
        ...extend,
      };
      const res = await request(payload);
      if (res.success) {
        const { items, preindex, sufindex, total } = res.data;
        setTableTotal(total);
        return { data: items, preindex, sufindex, total };
      }
      setTableTotal(undefined);
      return {};
    },
    [extend, request],
  );

  return [tableRequest, tableTotal];
}
