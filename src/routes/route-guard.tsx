import {Navigate, Outlet, useLocation} from "react-router";

import {ROUTES} from "./routes-paths";
import useAuthStore from "@/store";

interface RouteGuardProps {
  requiresAuth?: boolean; // If true, only authenticated users can access
  children?: React.ReactNode; // Make children optional to allow use of Outlet
}

const RouteGuard: React.FC<RouteGuardProps> = ({requiresAuth = false, children}) => {
  const location = useLocation();
  const {user, isAuthenticated} = useAuthStore();

  // If authentication is required but the user is NOT authenticated, redirect to the sign-in page
  if (requiresAuth && !isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.SIGN_IN}
        state={{from: location}}
        replace
      />
    );
  }

  // If authentication is NOT required, and the user is authenticated, redirect to their workspace dashboard
  if (!requiresAuth && isAuthenticated) {
    return (
      <Navigate
        to={`workspace/${user?.currentWorkspace?._id}`}
        replace
      />
    );
  }

  return children ?? <Outlet />;
};

export default RouteGuard;
