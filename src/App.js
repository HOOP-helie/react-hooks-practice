import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useAPI from './components/hooks/use-api';

function App() {
  const [data, setData] = useState([]);

  const { isLoading, error, fetchData } = useAPI()

  function applyData(data) {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setData(loadedTasks)
  }


  useEffect(() => {
    fetchData({ method: "GET" }, applyData);
  }, [fetchData]);

  const taskAddHandler = (task) => {
    setData((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={data}
        loading={isLoading}
        error={error}
        onFetch={fetchData}
      />
    </React.Fragment>
  );
}

export default App;
