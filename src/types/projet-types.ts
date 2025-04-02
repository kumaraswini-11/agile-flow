import {Pagination} from ".";

export interface Project {
  _id: string;
  name: string;
  emoji: string;
  description: string;
  workspace: string;
  createdBy: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  workspaceId: string;
  data: {
    emoji: string;
    name: string;
    description: string;
  };
}

export interface ProjectCreationResponse {
  message: "Project created successfully";
  project: Project;
}

export interface EditProjectPayload {
  workspaceId: string;
  projectId: string;
  data: {
    emoji: string;
    name: string;
    description: string;
  };
}

// All projects in a workspace, with optional pagination and filtering
export interface AllProjectsPayload {
  workspaceId: string;
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  skip?: boolean;
}

export interface AllProjectsResponse {
  message: string;
  projects: Project[];
  pagination: Pagination;
}

// Single project with in a worksapce
export interface ProjectByIdPayload {
  workspaceId: string;
  projectId: string;
}
