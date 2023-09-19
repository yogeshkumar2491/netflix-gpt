import { useRouteError } from "react-router-dom";

const ErrorBoundry = () => {
  const err = useRouteError();
  return <div>ErrorBoundry</div>;
};

export default ErrorBoundry;
