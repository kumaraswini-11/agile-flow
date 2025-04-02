import {createBrowserRouter, RouteObject} from "react-router";

import {ROUTES} from "./routes-paths";
import RouteGuard from "./route-guard";
import AuthLayout from "@/layouts/auth-layout";
import {SignInForm} from "@/components/auth/sign-in";
import {SignUpForm} from "@/components/auth/sign-up";
// import {ForgotPassword} from "@/components/auth/forgot-password";
import AppLayout from "@/layouts/app-layout";
import {WorkspaceDashboard} from "@/components/workspace/workspace-dashboard";
// import {Tasks} from "@/components/workspace/tasks";
// import {Members} from "@/components/workspace/members";
// import {Settings} from "@/components/workspace/settings";
// import {ProjectDetails} from "@/components/workspace/project-details";
import {NotFound} from "@/components/not-found";

const authRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <RouteGuard requiresAuth={false}>
        <AuthLayout />
      </RouteGuard>
    ),
    children: [
      {index: true, element: <SignInForm />},
      {path: ROUTES.SIGN_IN, element: <SignInForm />},
      {path: ROUTES.SIGN_UP, element: <SignUpForm />},
      // {path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword />},
    ],
  },
];

const workspaceRoutes: RouteObject[] = [
  {
    path: "workspace",
    element: (
      <RouteGuard requiresAuth={true}>
        <AppLayout />
      </RouteGuard>
    ),
    children: [
      {path: ROUTES.WORKSPACE_DASHBOARD, element: <WorkspaceDashboard />},
      // {path: ROUTES.TASKS, element: <Tasks />},
      // {path: ROUTES.MEMBERS, element: <Members />},
      // {path: ROUTES.SETTINGS, element: <Settings />},
      // {path: ROUTES.PROJECT_DETAILS, element: <ProjectDetails />},
    ],
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      ...authRoutes, // Auth routes - No authentication required
      ...workspaceRoutes, // Workspace routes - Requires authentication

      // Catch-all route for undefined paths
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
