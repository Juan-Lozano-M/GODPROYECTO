import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import AdminRoute from "./guards/AdminRoute.jsx"; // Import the AdminRoute
import ProtectedResetRoute from "./guards/ProtectedResetRoute.jsx";
import "./index.css";
import LoginMain from "./LoginMain.jsx";
import Home from "./pages/Admin/Home";
import NewsCreate from "./pages/Admin/NewsCreate.jsx";
import Notices from "./pages/Admin/Notices";
import Statics from "./pages/Admin/Statics";
import Testimonial from "./pages/Admin/Testimonial";
import ActionRedirector from "./pages/Auth/ActionRedirector.jsx";
import RecoverPassword from "./pages/Auth/RecoverPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import VerifyEmail from "./pages/Auth/VerifyEmail.jsx";
import Contacto from "./pages/Contactos.jsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewDetails from "./pages/Noticias/NewDetail";
import Noticiasv2 from "./pages/Noticias/Noticiasv2";
import ProyectosView from "./pages/proyectosview.jsx";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/home",
    element: (
      <AdminRoute>
        <Home />
      </AdminRoute>
    ),
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/testimonials",
    element: <Testimonial />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/proyectosview",
    element: <ProyectosView />,
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
    path: "/login/resetpassword",
    element: (
      <ProtectedResetRoute>
        <ResetPassword />
      </ProtectedResetRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: (
      <ProtectedResetRoute>
        <VerifyEmail />
      </ProtectedResetRoute>
  ),
  },
  {
    path: "/action",
    element: <ActionRedirector />,
    errorElement: <Navigate to="/" />,
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
