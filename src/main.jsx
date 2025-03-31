import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginMain from "./LoginMain.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; 
import Noticiasv2 from "./pages/Noticias/Noticiasv2";
import NewDetails from "./pages/Noticias/NewDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
  },

  {
    path: "/login",
    element: <LoginMain />,
    children: [
      { path: "", element: <Login /> }, // "/login"
      { path: "register", element: <Register /> }, // "/login/register"
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Navigate to="/" />,
  },

  {
    path: "/noticiasv",
    element: <Noticiasv2 />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/noticiasv/:slug",
    element: <NewDetails />,
    errorElement: <Navigate to="/" />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
