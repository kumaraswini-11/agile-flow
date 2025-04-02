import {Workspace} from "./workspace-types";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isActive: boolean;
  provider: "credential" | "google" | "github";
  lastLogin?: Date;
  createdAt: string;
  updatedAt: string;
  currentWorkspace: Workspace;
}

export interface CurrentUserResponse {
  message: string;
  user: User;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string;
  user: {
    _id: string;
    currentWorkspace: string;
  };
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}
