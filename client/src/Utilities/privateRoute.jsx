import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role, redirectTo }) => {
  
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole=user.role

  if (userRole !== role) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default PrivateRoute;
