import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("firebaseUID"); // Check if the user is authenticated
  const userRole = localStorage.getItem("userRole"); // Check the user's role

  if (!isAuthenticated || userRole !== "Admin") {
    return <Navigate to="/" />; // Redirect unauthenticated or non-admin users to the login page
  }

  return children;
};

export default AdminRoute;