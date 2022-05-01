import { Navigate, Outlet, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

      const user = window.localStorage.getItem('username');
      console.log(user)
      if (!user){
        return <Navigate to="/login"/>
      } else{
        return children
      }
      
  };

export default PrivateRoute;