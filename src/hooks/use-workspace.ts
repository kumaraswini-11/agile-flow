import {AxiosResponse} from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import axiosInstance from "@/lib/axios-instance";
import {AllWorkspacesResponse} from "@/types/workspace-types";

// Function to fetch all workspaces the user is a member of
const fetchUserWorkspaces = async (): Promise<AllWorkspacesResponse> => {
  const response: AxiosResponse<AllWorkspacesResponse> = await axiosInstance.get("/workspace/all");
  return response.data;
};
export const useUserWorkspaces = () => {
  return useQuery<AllWorkspacesResponse, UseQueryResult>({
    queryKey: ["user-workspaces"],
    queryFn: fetchUserWorkspaces,
    staleTime: 1,
    refetchOnMount: true,
  });
};
