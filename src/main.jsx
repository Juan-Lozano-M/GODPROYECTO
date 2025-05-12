import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoginMain from "./LoginMain.jsx";
import Home from "./pages/Admin/Home";
import NewsCreate from "./pages/Admin/NewsCreate.jsx";
import Notices from "./pages/Admin/Notices";
import Statics from "./pages/Admin/Statics";
import Testimonial from "./pages/Admin/Testimonial";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewDetails from "./pages/Noticias/NewDetail";
import Noticiasv2 from "./pages/Noticias/Noticiasv2";
import RecoverPassword from "./pages/RecoverPassword.jsx";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/testimonials",
    element: <Testimonial />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/notices",
    element: <Notices />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/statics",
    element: <Statics />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/login",
    element: <LoginMain />,
    children: [
      { path: "", element: <Login /> },
    ],
  },
  {
    path: "/login/recoverpassword",
    element: <RecoverPassword />,
  },
  {
    path: "/register",
    element: <Register />,
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
  },
  {
    path: "/home/newscreate",
    element: <NewsCreate />,
    errorElement: <Navigate to="/" />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
