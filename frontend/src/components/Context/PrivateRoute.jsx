import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BlogContext } from "./Context";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(BlogContext);

  if (!user || !user.username) {
    toast.warning("Please login first");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
