import { Outlet } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Debug from "./components/modals/Debug";
import { useEffect } from "react";
// import { v4 as uuid } from 'uuid';

const Root = () => {

  const debugId = 'debugwindow';

  useEffect(() => {
    // document.addEventListener('keydown', (event) => {
    //   handleKeyPress(event);
    // });
  }, []);

  // const handleKeyPress = (event: KeyboardEvent) => {
  //   if (event.repeat) {
  //     console.log(`Repeat event for key ${event.key}, ignoring`);
  //     return;
  //   }
  //   console.log(`[${uuid()}][${new Date(Date.now()).toString()}] Key pressed: ${event.key}`);
  //   if (event.key === 'F1') {
  //     const debugModal = document.getElementById(debugId);
  //     // @ts-ignore next-line
  //     if (debugModal && !debugModal.open) {
  //       // @ts-ignore next-line
  //       debugModal.showModal();
  //     }
  //   }
  // }
  return(
  <div>
    <Debug id={debugId}/>
    <NavMenu />
    <Outlet />
  </div>);
}

export default Root;
