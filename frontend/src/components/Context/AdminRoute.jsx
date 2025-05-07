import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BlogContext } from "./Context";

const AdminRoute = ({ children }) => {
  const { user } = useContext(BlogContext);

  if (user && user.role === "admin") {
    return children;
  }

  alert("Please login as an admin first");
  return <Navigate to="/login" />;

};

export default AdminRoute;
