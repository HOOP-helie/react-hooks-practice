
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useAPI from './../../components/hooks/use-api';

const NewTask = (props) => {

  const { isLoading, error, fetchData } = useAPI();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask)
  }

  const onEnterTaskHandler = async (taskText) => {
    const reqConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: taskText }),
    }

    fetchData(reqConfig, createTask.bind(null, taskText))
  }

  return (
    <Section>
      <TaskForm onEnterTask={onEnterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
