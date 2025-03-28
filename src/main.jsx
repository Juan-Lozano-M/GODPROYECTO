import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContactForm from "./pages/contact-form.jsx";
import LoginMain from "./LoginMain.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; 
import Noticia from "./pages/Noticias/Noticia";
import Noticiasv2 from "./pages/Noticias/Noticiasv2";
import NewDetails from "./pages/Noticias/NewDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/contact-form",
    element: <ContactForm />,
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
    path: "/noticias",
    element: <Noticia />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/noticiasv",
    element: <Noticiasv2 />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/newdetails/:slug",
    element: <NewDetails />,
    errorElement: <Navigate to="/" />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
