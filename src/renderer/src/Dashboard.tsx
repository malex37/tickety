import { useEffect, useState } from "react";
import { StatusCodes } from "@models/api/StatusCodes";
import { TaskData } from "@models/TaskData";
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import Tag from "./components/molecules/Tag";
import { v4 as uuid } from 'uuid';
import { BoardData } from "@models/BoardData";

function App(): JSX.Element {

  const [ assignedTasks, setAssignedTasks ] = useState([] as TaskData[]);
  const [ boards, setBoards ] = useState({} as {[name: string]: BoardData});
  const location = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      const getTasksOutput = await window.api['GetAssignedTasks']('jdoe');
      if (getTasksOutput.status !== StatusCodes.SUCCESS) {
        return;
      };
      setAssignedTasks(getTasksOutput.tasks);
      const getBoards = await window.api['GetBoards']();
      if (getBoards.status === 'SUCCESS' && getBoards.boards) {
        setBoards(getBoards.boards);
      }
    };
    fetchTasks();
  },[location.key]);

  const getShortDateString = (date: Date): string => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  return (
    <div className="w-full h-full p-0">
      <div className="flex justify-center text-2xl m-3">
        Welcome to your dashboard! 🏡
      </div>
      <div>
        { assignedTasks.length > 0 ?
        <table className="table-md w-full table-fixed">
          <thead>
            <tr>
              <th className="w-1/3 m-2">Title</th>
              <th>Status</th>
              <th>Create date</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody key={uuid()}>
          {
            assignedTasks.map(task => {
                if(task) {
                  return (
                    <tr key={task.id} className="hover hover:bg-gray-100 m-2">
                      <td key={uuid()} className="overflow-ellipsis max-w-prose">
                        <Link
                          className="hover:font-semibold hover:text-cyan-600"
                          to={`/task?id=${task.id}`}
                          state={{ task: task }}
                          key={task.id}
                        >
                            {task.title}
                        </Link>
                      </td>
                      <td key={uuid()} className="text-center">{task.status}</td>
                      <td key={uuid()} className="text-center">{getShortDateString(new Date(task.createDate))}</td>
                      <td key={uuid()}>
                        {
                          task.tags ?
                            <div className="flex">
                              {
                                task.tags.map((tag, index) => {
                                  return (
                                    <Tag key={index} color={tag.color}>
                                      {tag.value}
                                    </Tag>
                                  );
                                })
                              }
                            </div>
                          : <div></div>
                        }
                      </td>
                    </tr>
                  );
                }
                return <tr key={uuid()}></tr>
            })
          }
          </tbody>
        </table> : <div className="flex w-full justify-center"><p>Yay no tasks! 🥸 </p></div>
        }
      </div>
      <div>
        <table className="table-md">
          <thead>
            <tr>
              <th> Board name </th>
              <th> Board id </th>
              <th> Task count </th>
            </tr>
          </thead>
          <tbody>
            {
              boards ?
              Object.values(boards).map((board: BoardData) => {
                if (board) {
                  return (
                  <tr key={board.id+uuid()} className="hover:bg-gray-200">
                    <td key={uuid()}>
                          <Link
                            className="hover:text-cyan-600 hover:font-semibold"
                            to={`${board.id}`}
                            state={{boardId: board.id }}
                          >
                            {board.config.name}
                          </Link>
                    </td>
                    <td key={uuid()}>{board.id}</td>
                    {
                          board.tasks ?
                          <td key={uuid()}>{board.tasks.length}</td> : <td key={uuid()}></td>
                    }
                  </tr>);
                }
                return <></>
              })
              : <></>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

