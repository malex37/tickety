import { APINames, ApiTypes } from '@models/api/Definitions';
import { v4 as uuid } from 'uuid';
import { AppState } from '../storage';
import { CreateTaskResponse } from '@models/api/Responses';
import { TaskData, TaskStatus } from '@models/TaskData';
import { StorageStateFields } from '@models/app';
import { BoardData } from '@models/BoardData';


/**
 * Creates a task within the application state
 * @group API
 * @param task - Task to 'create' passed in by client omitting id, as it's a required field but will be provided by backend/main process
 * @param autoAddBoardId - ID of board to link to automatically. For now optional
 */
export const CreateTask: ApiTypes['CreateTask'] =
  async (task: Omit<TaskData, 'id'>, autoAddBoardId?: string): Promise<CreateTaskResponse> => {
    console.log(`Executing ${APINames.CreateTask} with parameters (${JSON.stringify(task)},${autoAddBoardId})`);
    try {
      // Override client provided UUID in case uuid is compromised??
      const newTaskId = uuid();
      (task as TaskData).id = newTaskId;
      const stateTasks = AppState.getFieldValue(StorageStateFields.Tasks);
      const newTask = {
        ...task,
        id: newTaskId,
        status: TaskStatus.Queue,
      };
      stateTasks[newTaskId] = newTask;
      AppState.setStateField({ Tasks: stateTasks });
      const userTasks = AppState.getFieldValue('AssignedTasks');
      AppState.setStateField({
        AssignedTasks: {
          ...userTasks,
          [task.assignee]: [
            userTasks[task.assignee] ? userTasks[task.assignee] : undefined,
            newTaskId,
          ],
        }
      });
      if (autoAddBoardId) {
        console.log(`Auto add requested`);
        const board: BoardData = AppState.getFieldValue('Boards')[autoAddBoardId];
        console.log(`Adding task ${newTaskId} to board ${board.id} titled ${board.config.name}`);
        board.tasks.push(newTaskId);
      }
      return {
        task: task as TaskData,
        status: 'SUCCESS',
      };
    } catch (error) {
      console.error(`Error occurred creating task`, error);
      return { status: 'ERROR' };
    }
};

export default CreateTask;
