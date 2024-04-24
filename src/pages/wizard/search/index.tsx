import React, { useState } from 'react';
import SearchList from './List';
import styles from './index.less';
import ProCard from "@ant-design/pro-card";
import {Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons/lib";

type routeProps = {
  taskStatus: any;
  setTaskStatus: any;
  rStatePage: boolean;
  afterOperation: (val: any) => void;
};

const Searchs: React.FC<routeProps> = ({
                                         afterOperation,
                                         taskStatus,
                                         setTaskStatus,
                                         rStatePage,
                                       }) => {
  const [statusTitleVal, setStatusTitleVal] = useState({});
  return (
    
      <SearchList
        statusStatisticChange={(items) => {
        }}
        statusTitleVal={statusTitleVal}
        afterOperation={afterOperation}
        taskStatus={taskStatus}
        setTaskStatus={setTaskStatus}
        rStatePage={rStatePage}
      />
  );
};
export default Searchs;
