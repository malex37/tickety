import NavMenu from "@renderer/components/NavMenu"
import CreateTeam from "@renderer/components/modals/CreateTeam";
import Avatar from "@renderer/components/molecules/Avatar";
import { useEffect, useState } from "react";

const Settings = (): JSX.Element => {
  const [state, setState] = useState({} as { [key: string]: any });

  useEffect(() => {
    const getUser = async () => {
      const userData = await window.api['GetUser']();
      setState({
        ...state,
        user: userData.data,
      });
      console.log(`Set state to ${JSON.stringify(state)}`);
    }
    getUser();
    console.log(`State: ${JSON.stringify(state)}`);
  }, []);

  return (
    <div>
      <NavMenu />
      <div className="flex flex-col justify-center w-full gap-7">
        { state.user ?
          <>
           <Avatar first={state.user.name.first[0]} second={state.user.name.last[0]}/>
            <div className="flex flex-col justify-center items-center">
              <div>{state.user.username}</div>
              <div>{state.user.email}</div>
              <div>{state.user.name.first} {state.user.name.last}</div>
            </div>
          </> : <div>WHO ARE YOU?!</div>
        }
        {
          // TODO: Move to component
        }
        <div>
          <CreateTeam />
        </div>
      </div>
    </div>
  );
}

export default Settings
