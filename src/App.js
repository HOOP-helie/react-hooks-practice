import React from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useAPI from './components/hooks/use-api';

function App() {
  const { data: tasks, isLoading, error } = useAPI()


  // useEffect(() => {
  //   fetchTasks();
  // }, []);


  return (
    <React.Fragment>
      <NewTask />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
      // onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
