import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) return null;

  // If logged in → redirect based on role
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  return <Outlet />;
};

export default PublicRoute;
