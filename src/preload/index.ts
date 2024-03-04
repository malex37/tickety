import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { APINames, ApiTypes } from '@models/api/Definitions';
import {
  CreateTaskResponse,
  GetTaskResponse,
  GetAssignedTasksResponse,
  GetBoardByIdResponse,
  GetUserResponse,
  GetBoardConfigResponse,
  SaveBoardConfigResponse,
  GetAppStateResponse,
  BasicResponse,
  GetTeamResponse,
  LinkTasksResponse
} from '@models/api/Responses';
import { EventNames } from '@models/events/Events';
import { Filter } from '@models/api';
import { BoardConfig } from '@models/BoardConfig';
import { StorageStateField } from '@models/app';
import { Team } from '@models/Team';
import { UpdateTaskInput } from '@models/api/inputs/UpdateTaskInput';
import { CreateTaskInput } from '@models/api/inputs/CreateTaskInput';
import { LinkTasksInput } from '@models/api/inputs/LinkTasksInput';

const eApi: ApiTypes = {
  SetTaskStatus: (value: any) => {
    return ipcRenderer.invoke(APINames.SetTaskStatus, value);
  },
  GetAllTasks: () => {
    return ipcRenderer.invoke(APINames.GetAllTasks);
  },
  UpdateTask: (input: UpdateTaskInput) => {
    return ipcRenderer.invoke(APINames.UpdateTask, input.taskId, input.updatedFields);
  },
  CreateTask: (input: CreateTaskInput): Promise<CreateTaskResponse> => {
    return ipcRenderer.invoke(APINames.CreateTask, input.task, input.autoAddBoardId);
  },
  GetTasks: (taskId: string[] | string, filters: Filter[]): Promise<GetTaskResponse> => {
    return ipcRenderer.invoke(APINames.GetTasks, taskId, filters);
  },
  GetAssignedTasks: (user: string): Promise<GetAssignedTasksResponse> => {
    return ipcRenderer.invoke(APINames.GetAssignedTasks, user);
  },
  DeleteTask: (taskId: string) => {
    return ipcRenderer.invoke(APINames.DeleteTask, taskId);
  },
  GetBoards: () => {
    return ipcRenderer.invoke(APINames.GetBoards);
  },
  GetBoardById: (boardId: string): Promise<GetBoardByIdResponse> => {
    return ipcRenderer.invoke(APINames.GetBoardById, boardId);
  },
  GetUser: (): Promise<GetUserResponse> => {
    return ipcRenderer.invoke(APINames.GetUser);
  },
  GetBoardConfig: (boardId: string): Promise<GetBoardConfigResponse> => {
    return ipcRenderer.invoke(APINames.GetBoardConfig, boardId);
  },
  SaveBoardConfig: (newConfig: BoardConfig): Promise<SaveBoardConfigResponse> => {
    return ipcRenderer.invoke(APINames.SaveBoardConfig, newConfig);
  },
  GetAppState: (stateKey: StorageStateField): Promise<GetAppStateResponse> => {
    return ipcRenderer.invoke(APINames.GetAppState, stateKey);
  },
  CreateTeam: (team: Team): Promise<BasicResponse> => {
    return ipcRenderer.invoke(APINames.CreateTeam, team);
  },
  GetTeam: (): Promise<GetTeamResponse> => {
    return ipcRenderer.invoke(APINames.GetTeam);
  },
  LinkTasks: (input: LinkTasksInput): Promise<LinkTasksResponse> => {
    return ipcRenderer.invoke(APINames.LinkTasks, input);
  }
};

const events = {
  TaskUpdated: (listener: any) => {
    ipcRenderer.on(EventNames.TaskUpdated, listener);
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', eApi);
    contextBridge.exposeInMainWorld('events', events);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = eApi;
  // @ts-ignore
  window.events = events
}
