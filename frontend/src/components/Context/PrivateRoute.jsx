import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BlogContext } from "./Context";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(BlogContext);

  if (!user || !user.username) {
    alert("Please login first");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
