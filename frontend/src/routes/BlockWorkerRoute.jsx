import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const BlockWorkerRoute = () => {
  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // Wait for auth rehydration
  if (loading) return null;

  // If logged in AND worker → block
  if (isAuthenticated && user?.role === "worker") {
    return <Navigate to="/profile" replace />;
  }

  // Guests + customers allowed
  return <Outlet />;
};

export default BlockWorkerRoute;
