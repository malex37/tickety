import { TaskData } from '@models/TaskData';
import { ApiTypes } from '@models/api/Definitions';
import { AppState } from '../storage';

export const UpdateTask: ApiTypes['UpdateTask'] = (taskId: string, updatedFields: Partial<TaskData>) => {
  console.log(`Updating task with ${JSON.stringify(updatedFields)}`);
  const tasks = AppState.getFieldValue('Tasks');
  tasks[taskId] = {
    ...tasks[taskId],
    ...updatedFields,
  };
  console.log(`Resulting task ${JSON.stringify(tasks[taskId])}`);
};

export default UpdateTask;

