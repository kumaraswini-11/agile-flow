import {PermissionType} from "@/constants";

export interface Workspace {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  inviteCode: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description: string;
}

export interface UpdateWorkspaceRequest {
  workspaceId: string;
  data: {
    name: string;
    description: string;
  };
}

export interface CreateWorkspaceResponse {
  message: string;
  workspace: Workspace;
}

export interface AllWorkspacesResponse {
  message: string;
  workspaces: Workspace[];
}

export type WorkspaceWithMembers = Workspace & {
  members: {
    _id: string;
    userId: string;
    workspaceId: string;
    role: {
      _id: string;
      name: string;
      permissions: PermissionType[];
    };
    joinedAt: string;
    createdAt: string;
  }[];
};

export interface WorkspaceByIdResponse {
  message: string;
  workspace: WorkspaceWithMembers;
}

export interface ChangeWorkspaceMemberRoleRequest {
  workspaceId: string;
  data: {
    roleId: string;
    memberId: string;
  };
}

export interface AllWorkspaceMembersResponse {
  message: string;
  members: {
    _id: string;
    userId: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string | null;
    };
    workspaceId: string;
    role: {
      _id: string;
      name: string;
    };
    joinedAt: string;
    createdAt: string;
  }[];
  roles: Role[];
}

export interface WorkspaceAnalyticsResponse {
  message: string;
  analytics: {
    totalTasks: number;
    overdueTasks: number;
    completedTasks: number;
  };
}

export interface Role {
  _id: string;
  name: string;
}
