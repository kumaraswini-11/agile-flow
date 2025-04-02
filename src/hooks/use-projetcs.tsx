import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {useNavigate} from "react-router";
import {toast} from "sonner";

import {AllProjectsPayload, AllProjectsResponse, ProjectByIdPayload} from "@/types/projet-types";
import axiosInstance from "@/lib/axios-instance";
import {useConfirmDialog} from "./use-confirm-dialog";

export const getProjectsInWorkspaceQueryFn = async ({
  workspaceId,
  pageSize,
  pageNumber,
}: AllProjectsPayload): Promise<AllProjectsResponse> => {
  const {data} = await axiosInstance.get<AllProjectsResponse>(
    `/project/workspaces/${workspaceId}/all`,
    {
      params: {
        pageSize,
        pageNumber,
      },
    }
  );

  return data;
};
export const useGetProjectsInWorkspaceQuery = ({
  workspaceId,
  pageSize,
  skip = false,
}: Omit<AllProjectsPayload, "pageNumber">): UseInfiniteQueryResult<
  AllProjectsPayload,
  AxiosError
> => {
  return useInfiniteQuery<AllProjectsResponse, AxiosError>({
    queryKey: ["all-projects", workspaceId, pageSize],
    queryFn: ({pageParam = 0}) =>
      getProjectsInWorkspaceQueryFn({
        workspaceId,
        pageSize,
        pageNumber: Number(pageParam) || 0,
      }),
    getNextPageParam: lastPage => {
      const {totalPages, pageNumber} = lastPage.pagination;
      return pageNumber < totalPages ? pageNumber + 1 : undefined;
    },
    placeholderData: skip ?? keepPreviousData,
    enabled: !skip,
    select: data => {
      // Flatten the project list for ease of use
      return data?.pages.flatMap(page => page.projects) ?? [];
    },
  });
};

// Delete a project form workspace by workspace Id
export const deleteProjectFromWorkspaceMutationFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayload): Promise<{message: string}> => {
  const {data} = await axiosInstance.delete<AllProjectsResponse>(
    `/project/${projectId}/workspace/${workspaceId}/delete`
  );

  return data;
};
export const useDeleteProject = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {closeDialog} = useConfirmDialog();

  return useMutation({
    mutationFn: deleteProjectFromWorkspaceMutationFn,
    onSuccess: async data => {
      // Invalidate the query after the project is deleted
      await queryClient.invalidateQueries({
        queryKey: ["all-projects", workspaceId],
      });

      toast.success(data.message || "Project deleted successfully");
      await navigate(`/workspace/${workspaceId}`);
      setTimeout(() => closeDialog(), 100);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
};
