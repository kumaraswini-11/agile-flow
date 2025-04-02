import {ArrowRight, Folder, Loader2, MoreHorizontal, Plus, Trash2} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {useWorkspaceId} from "@/hooks/use-workspace-id";
import {PermissionsGuard} from "@/components/permission-guard";
import {Permissions} from "@/constants";
import {ConfirmDialog} from "@/components/confirm-dialog";
import {useConfirmDialog} from "@/hooks/use-confirm-dialog";
import {useCreateProjectDialog} from "@/hooks/use-create-project-dialog";
import {useGetProjectsInWorkspaceQuery, useDeleteProject} from "@/hooks/use-projetcs";

interface Project {
  _id: string;
  name: string;
  emoji: string;
}

export function NavProjects() {
  const {isMobile} = useSidebar();
  const workspaceId = useWorkspaceId();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const {isOpen, dialogContext, openDialog, closeDialog} = useConfirmDialog();
  const {openDialog: openProjectDialog} = useCreateProjectDialog();

  const {
    data: projects = [
      {
        _id: "123abc",
        name: "Project Apollo",
        emoji: "🚀",
        description: "A project to develop a new space exploration application.",
        workspace: "workspaceId123",
        createdBy: {
          _id: "user123",
          name: "Jane Doe",
          profilePicture: "https://example.com/profile.jpg",
        },
        createdAt: "2025-04-01T12:00:00Z",
        updatedAt: "2025-04-02T15:30:00Z",
      },
      {
        _id: "1236abc",
        name: "Project Apollo",
        emoji: "🚀",
        description: "A project to develop a new space exploration application.",
        workspace: "workspaceId123",
        createdBy: {
          _id: "user123",
          name: "Jane Doe",
          profilePicture: "https://example.com/profile.jpg",
        },
        createdAt: "2025-04-01T12:00:00Z",
        updatedAt: "2025-04-02T15:30:00Z",
      },
    ],
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    pageSize: 5, // Number of projects per page
    skip: !workspaceId, // Skip fetching if no workspace ID
  });

  const {mutate: deleteProject, isPending: isProjectDeletePending} = useDeleteProject(workspaceId);
  const handleDeleteProjectConfirmation = () => {
    if (!dialogContext || !workspaceId) return;

    deleteProject({
      workspaceId,
      projectId: dialogContext?._id as string,
    });
  };

  return (
    <>
      {/* Sidebar group for projects */}
      <SidebarGroup className="p-0 group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="w-full items-center justify-between">
          <span className="text-xs font-medium">Projects</span>

          {/* Button for creating a new project (only if the user has permission) */}
          <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
            <Button
              onClick={void openProjectDialog}
              type="button"
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border p-0">
              <Plus className="size-4" />
              <span className="sr-only">Create project</span>
            </Button>
          </PermissionsGuard>
        </SidebarGroupLabel>

        {/* Sidebar menu for displaying projects */}
        <ScrollArea className="h-[320px]">
          <SidebarMenu className="pb-2">
            {/* Handle different states for projects loading */}
            {isError && (
              <div className="text-destructive px-2 py-2 text-sm">
                Error occurred while fetching projects.
              </div>
            )}

            {isFetching && !isFetchingNextPage && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
              </div>
            )}

            {!isFetching && !isFetchingNextPage && projects?.length === 0 ? (
              <div className="space-y-4 px-2 py-2">
                <p className="text-muted-foreground text-xs">
                  There are no projects in this workspace yet. Projects you create will show up
                  here.
                </p>

                {/* Button to create a project */}
                <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
                  <Button
                    variant="link"
                    type="button"
                    className="h-auto p-0 text-xs font-semibold"
                    onClick={void openProjectDialog}>
                    Create a project
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </PermissionsGuard>
              </div>
            ) : (
              projects?.map((project: Project) => {
                const projectUrl = `/workspace/${workspaceId}/project/${project._id}`;
                const isActive = projectUrl === pathname;

                return (
                  <SidebarMenuItem key={project._id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}>
                      <Link
                        to={projectUrl}
                        className={cn(
                          "flex items-center gap-2 truncate",
                          isActive && "font-medium"
                        )}>
                        <div className={cn("rounded-full border bg-transparent p-1")}>
                          <span className="flex h-4 w-4 items-center justify-center">
                            {project.emoji}
                          </span>
                        </div>
                        <span className="truncate">{project.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* Dropdown for project actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">More options</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}>
                        <DropdownMenuItem
                          onClick={() => void navigate(projectUrl)}
                          className="flex items-center gap-2">
                          <Folder className="text-muted-foreground size-4" />
                          <span>View Project</span>
                        </DropdownMenuItem>

                        {/* Delete project option (only if the user has permission) */}
                        <PermissionsGuard requiredPermission={Permissions.DELETE_PROJECT}>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive flex items-center gap-2"
                            disabled={isProjectDeletePending}
                            onClick={() => openDialog(project)}>
                            <Trash2 className="size-4" />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </PermissionsGuard>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                );
              })
            )}

            {/* Load more projects if available */}
            {hasNextPage && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-muted-foreground hover:text-foreground"
                  disabled={isFetchingNextPage}
                  onClick={() => void fetchNextPage()}>
                  <MoreHorizontal className="size-4" />
                  <span>{isFetchingNextPage ? "Loading..." : "Load more"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarGroup>

      {/* Confirmation dialog for deleting projects */}
      <ConfirmDialog
        isOpen={isOpen}
        isLoading={isProjectDeletePending}
        onClose={closeDialog}
        onConfirm={handleDeleteProjectConfirmation}
        title="Delete Project"
        description={`Are you sure you want to delete "${dialogContext?.name ?? "this project"}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
