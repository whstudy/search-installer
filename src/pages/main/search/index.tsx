import React, { useState } from 'react';
import Disk from './disk';

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
    
      <Disk
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
