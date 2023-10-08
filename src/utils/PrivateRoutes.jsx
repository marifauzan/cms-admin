import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: sessionStorage.getItem("tokenCMSAdmin") };

  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
