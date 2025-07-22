import DashBoard from "@/components/dashBoard";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />,
  },
]);

export default Router;
