import { useReducer, useState } from 'react';
import type { Graph } from '@antv/x6';
import type { IApplication } from '@antv/xflow';

export enum LayerEnum {
  Capacity,
  CPU,
  Mem,
  UNSET,
}

export default () => {
  const [keyword, setKeyword] = useState<string>();
  const [layer, setLayer] = useState<LayerEnum>();
  const [graph, setGraph] = useState<Graph>();
  const [app, setApp] = useState<IApplication>();
  const [loading, setLoading] = useState(false);
  const [refreshFlag, triggerRefresh] = useReducer((flag) => flag + 1, 0);
  return {
    keyword,
    layer,
    graph,
    app,
    loading,
    refreshFlag,
    setKeyword,
    setLayer,
    setGraph,
    setApp,
    setLoading,
    triggerRefresh,
  };
};
