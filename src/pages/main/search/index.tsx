import React, { useState } from 'react';
import Two from './two';

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
    
      <Two
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
