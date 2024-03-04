import { RouteObject, createBrowserRouter } from "react-router-dom";
import Board from "./views/Board";
import TaskDetails from "./views/TaskDetails";
import Settings from "./views/Settings";
import BoardConfiguration from "./views/BoardConfiguration";
import Root from "./Root";
import Dashboard from "./Dashboard";

export const RoutePaths = {
  root: '/',
  board: {
    path: ':boardId',
    childPath: {
      boardId: ':boardId',
      config: 'config'
    }
  },
  boardConfig: ':boardId/config',
  task: 'task',
  settings: 'settings',
} as const;

export interface RouterConfigFace {
  friendlyName: string
  exposed?: boolean,
}

export type RouterConfig = RouterConfigFace & RouteObject;

export const Routes: Record<string, Partial<RouterConfig>> = {
  home: {
    path: RoutePaths.root,
    element: <Root />,
    children: [
      {
        path: RoutePaths.root,
        element: <Dashboard />
      },
      {
        path: RoutePaths.board.path,
        element: <Board />,
      },
      // Since we can get to details from root OR from a board we need to declare the possible two routes
      {
        path: RoutePaths.task,
        element: <TaskDetails />
      },
      {
        path: RoutePaths.board.path+'/'+RoutePaths.task,
        element: <TaskDetails />
      }
    ],
    friendlyName: 'Home',
    exposed: true,
  },
  // taskView: {
  //   path: RoutePaths.task,
  //   element: <TaskDetails />,
  //   friendlyName: 'Task info',
  //   exposed: false,
  // },
  settings: {
    path: RoutePaths.settings,
    element: <Settings />,
    friendlyName: 'Settings',
    exposed: true,
  },
  boardConfig: {
    path: RoutePaths.boardConfig,
    element: <BoardConfiguration />,
    friendlyName: "Board Settings",
    exposed: false,
  }
};

const Router = createBrowserRouter(Object.values(Routes) as RouteObject[])

export default Router;
