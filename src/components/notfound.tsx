import { useRouteError } from "react-router-dom";

function NotFound() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="relative flex-col">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default NotFound;