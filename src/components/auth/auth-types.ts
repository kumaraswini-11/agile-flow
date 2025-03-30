export interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: {
    _id: string;
    name: string;
    owner: string;
    inviteCode: string;
  };
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
