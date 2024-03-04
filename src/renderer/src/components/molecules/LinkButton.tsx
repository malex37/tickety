import { Link } from "react-router-dom";

function LinkButton (props: { path: string, text: string, id?: string, state?: any }) {
  return(
    <div
      id={
        props.id ?
          props.id :
          `link-button-${props.path.replace('/','-')}-${props.text}`}
    >
      <Link to={props.path} state={props.state} >{props.text}</Link>
    </div>
  );
}

export default LinkButton;
