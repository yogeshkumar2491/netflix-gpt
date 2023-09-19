import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./browse//Browse";
import PageNotFound from "./Error/PageNotFound";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <PageNotFound />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
