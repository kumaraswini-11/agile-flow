export const ROUTES = {
  SIGN_IN: "sign-in",
  SIGN_UP: "sign-up",
  FORGOT_PASSWORD: "forgot-password",

  WORKSPACE_DASHBOARD: ":workspaceId",
  TASKS: ":workspaceId/tasks",
  MEMBERS: ":workspaceId/members",
  SETTINGS: ":workspaceId/settings",
  PROJECT_DETAILS: ":workspaceId/project/:projectId",

  TERM_OF_SERVICE: "terms-of-service",
  PRIVACY_POLICY: "privacy-policy",
};

export const AUTH_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.FORGOT_PASSWORD];

// export const ROUTES = {
//   // Auth Routes
//   SIGN_IN: "/", // Default landing page
//   SIGN_UP: "/sign-up",

//   // OAuth Callbacks (Better for monitoring and security)
//   OAUTH_CALLBACK: "/auth/:provider/callback",
//   OAUTH_GOOGLE_CALLBACK: "/auth/google/callback",
//   OAUTH_GITHUB_CALLBACK: "/auth/github/callback",

//   // Password & Security
//   FORGOT_PASSWORD: "/forgot-password",
//   RESET_PASSWORD: "/reset-password/:token",
//   VERIFY_EMAIL: "/verify-email/:token",
//   RESEND_VERIFICATION_EMAIL: "/resend-verification-email",
//   VERIFY_MFA: "/verify-mfa",

//   // Magic Link (Optional, Future-Proofing)
//   MAGIC_LINK_CALLBACK: "/auth/magic-link/callback",

//   // Account Recovery (Optional, but nice to have)
//   ACCOUNT_RECOVERY: "/account-recovery",

//   // Logout
//   LOGOUT: "/logout",
//   LOGOUT_ALL_SESSIONS: "/logout/all",

//   // Protected Routes
//   DASHBOARD: "/dashboard",

//   // Workspace Management
//   WORKSPACE: "/workspace/:workspaceId",
//   CREATE_WORKSPACE: "/workspace/create",
//   WORKSPACE_SETTINGS: "/workspace/:workspaceId/settings",
//   WORKSPACE_MEMBERS: "/workspace/:workspaceId/members",
//   WORKSPACE_ANALYTICS: "/workspace/:workspaceId/analytics",

//   // Project Management
//   PROJECT_DETAILS: "/workspace/:workspaceId/project/:projectId",
//   PROJECT_TASKS: "/workspace/:workspaceId/project/:projectId/tasks",
//   CREATE_PROJECT: "/workspace/:workspaceId/project/create",
//   EDIT_PROJECT: "/workspace/:workspaceId/project/:projectId/edit",

//   // Task Management
//   TASK_DETAILS: "/workspace/:workspaceId/task/:taskId",
//   CREATE_TASK: "/workspace/:workspaceId/task/create",
//   EDIT_TASK: "/workspace/:workspaceId/task/:taskId/edit",

//   // Files/Docs
//   FILES: "/workspace/:workspaceId/files",
//   FILE_DETAILS: "/workspace/:workspaceId/file/:fileId",

//   // Notifications
//   NOTIFICATIONS: "/notifications",

//   // Profile & User Settings
//   PROFILE: "/profile",
//   ACCOUNT_SETTINGS: "/account/settings",
//   SECURITY_SETTINGS: "/account/security",
//   NOTIFICATION_SETTINGS: "/account/notifications",
//   BILLING: "/account/billing",

//   // Sessions
//   SESSIONS: "/sessions",
//   SESSION_DETAILS: "/sessions/:sessionId",

//   // Integrations & API
//   INTEGRATIONS: "/integrations",
//   API_TOKENS: "/account/api-tokens",

//   // Base Routes
//   INVITE_URL: "/invite/workspace/:inviteCode/join",
//   ACCEPT_INVITE: "/invite/workspace/:inviteCode/accept",

//   CONTACT: "/contact",
//   TERMS_OF_SERVICE: "/terms-of-service",
//   PRIVACY_POLICY: "/privacy-policy",
//   HELP_CENTER: "/help",

//   // Admin Routes
//   ADMIN_DASHBOARD: "/admin/dashboard",
//   USER_MANAGEMENT: "/admin/users",
//   WORKSPACE_MANAGEMENT: "/admin/workspaces",
//   AUDIT_LOGS: "/admin/audit-logs",
//   SYSTEM_SETTINGS: "/admin/settings",
// };
