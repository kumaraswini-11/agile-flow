import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

import {User} from "@/types/auth-types";
import {Workspace} from "@/types/workspace-types";
import {PermissionType} from "@/constants";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  workspace: Workspace | null;
  memberPermissions: PermissionType[];
}

interface AuthActions {
  setUser: (user: User) => void;
  clearUser: () => void;
  setWorkspace: (workspace: Workspace) => void;
  clearWorkspace: () => void;
  setMemberPermissions: (memberPermissions: PermissionType[]) => void;
  clearMemberPermissions: () => void;
  hasPermission: (permission?: PermissionType) => boolean;
  // refetchAuth: () => void;
  // refetchWorkspace: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: {
        _id: "user123",
        name: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "https://example.com/avatar.jpg",
        isActive: true,
        provider: "google",
        lastLogin: new Date("2025-03-30T12:00:00Z"),
        createdAt: "2022-01-01T12:00:00Z",
        updatedAt: "2025-03-30T12:00:00Z",
        currentWorkspace: {
          _id: "workspace123",
          name: "Design Team",
          description: "Workspace for the design team to collaborate on projects.",
          owner: "user123",
          inviteCode: "ABCD1234",
        },
      },
      workspace: {
        _id: "workspace123",
        name: "Design Team",
        description: "Workspace for the design team to collaborate on projects.",
        owner: "user123",
        inviteCode: "ABCD1234",
      },

      // user: null,
      // workspace: null,
      isAuthenticated: false,
      memberPermissions: [],

      setUser: user => set({user, isAuthenticated: Boolean(user)}),
      clearUser: () => set({user: null, isAuthenticated: false}),

      setWorkspace: workspace => set({workspace}),
      clearWorkspace: () => set({workspace: null}),

      setMemberPermissions: permissions => set({memberPermissions: permissions}),
      clearMemberPermissions: () => set({memberPermissions: []}),

      hasPermission: permission => {
        const {memberPermissions} = get();
        return memberPermissions.includes(permission!);
      },

      // refetchAuth: async () => {
      //   // Example for fetching user data and updating state
      //   // You can implement your API call here
      //   // Example: const user = await api.fetchUser();
      //   // set({ user });
      // },

      // refetchWorkspace: async () => {
      //   // Example for fetching workspace data and updating state
      //   // You can implement your API call here
      //   // Example: const workspace = await api.fetchWorkspace();
      //   // set({ workspace });
      // },
    }),
    {
      name: "user-storage", // Unique key for localStorage
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// Custom hooks to access store state and actions
export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useWorkspace = () => useAuthStore(state => state.workspace);
export const usePermissions = () => useAuthStore(state => state.memberPermissions);

export const useAuthActions = () => {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);
  const setWorkspace = useAuthStore(state => state.setWorkspace);
  const clearWorkspace = useAuthStore(state => state.clearWorkspace);
  const setMemberPermissions = useAuthStore(state => state.setMemberPermissions);
  const clearMemberPermissions = useAuthStore(state => state.clearMemberPermissions);
  const hasPermission = useAuthStore(state => state.hasPermission);
  // const refetchAuth = useAuthStore(state => state.refetchAuth);
  // const refetchWorkspace = useAuthStore(state => state.refetchWorkspace);

  return {
    setUser,
    clearUser,
    setWorkspace,
    clearWorkspace,
    setMemberPermissions,
    clearMemberPermissions,
    hasPermission,
    // refetchAuth,
    // refetchWorkspace,
  };
};

export default useAuthStore;
