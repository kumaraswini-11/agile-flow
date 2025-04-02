import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Check, ChevronDown, Loader, Plus} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {useWorkspaceId} from "@/hooks/use-workspace-id";
import {useCreateWorkspaceDialog} from "@/hooks/use-create-workspace";
import {useUserWorkspaces} from "@/hooks/use-workspace";

interface Workspace {
  _id: string;
  name: string;
}

export const WorkspaceSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const {isMobile} = useSidebar();
  const workspaceId = useWorkspaceId();
  const {onOpen} = useCreateWorkspaceDialog();

  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);

  const {data, isLoading} = useUserWorkspaces();
  const workspaces = data?.workspaces ?? [];

  useEffect(() => {
    if (workspaces.length) {
      const selectedWorkspace = workspaceId
        ? workspaces.find(ws => ws._id === workspaceId)
        : workspaces[0];

      if (selectedWorkspace) {
        setActiveWorkspace(selectedWorkspace);
        if (!workspaceId) {
          // use void to ignore the promise intentionally
          void navigate(`/workspace/${selectedWorkspace._id}`);
        }
      }
    }
  }, [workspaceId, workspaces, navigate]);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    void navigate(`/workspace/${workspace._id}`);
  };

  const getWorkspaceInitial = (name: string): string => {
    return name?.split(" ")?.[0]?.charAt(0) || "W";
  };

  if (isLoading) {
    return (
      <>
        <SidebarGroupLabel className="w-full justify-between pr-0">
          <span>Workspaces</span>
          <Skeleton className="h-5 w-5 rounded-full" />
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Skeleton className="h-12 w-full rounded-md" />
          </SidebarMenuItem>
        </SidebarMenu>
      </>
    );
  }

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Workspaces</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onOpen}
          className="size-6 rounded-full p-0"
          aria-label="Add workspace">
          <Plus className="size-4" />
        </Button>
      </SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="group hover:bg-muted data-[state=open]:bg-muted w-full transition-colors">
                {activeWorkspace ? (
                  <>
                    <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md font-semibold shadow-sm">
                      {getWorkspaceInitial(activeWorkspace.name)}
                    </div>
                    <div className="grid flex-1 text-left">
                      <span className="truncate text-sm font-medium">{activeWorkspace.name}</span>
                      <span className="text-muted-foreground truncate text-xs">
                        {/* {activeWorkspace.tier ?? "Free"} */}
                        Free
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="grid flex-1 text-left">
                    <span className="truncate text-sm font-semibold">Select workspace</span>
                    <span className="text-muted-foreground truncate text-xs">
                      No workspace selected
                    </span>
                  </div>
                )}
                <ChevronDown className="text-muted-foreground ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}>
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Workspaces
              </DropdownMenuLabel>

              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Loader className="text-muted-foreground size-4 animate-spin" />
                </div>
              ) : (
                <>
                  {workspaces.length === 0 ? (
                    <div className="text-muted-foreground px-2 py-4 text-center text-sm">
                      No workspaces found
                    </div>
                  ) : (
                    workspaces.map(workspace => (
                      <DropdownMenuItem
                        key={workspace._id}
                        onClick={() => handleWorkspaceSelect(workspace)}
                        className="cursor-pointer gap-2 px-2 py-1.5">
                        <div className="bg-background flex size-8 items-center justify-center rounded-md border font-medium">
                          {getWorkspaceInitial(workspace.name)}
                        </div>
                        <span className="flex-1 truncate">{workspace.name}</span>
                        {workspace._id === workspaceId && (
                          <DropdownMenuShortcut className="ml-auto tracking-normal opacity-100">
                            <Check className="text-primary size-4" />
                          </DropdownMenuShortcut>
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer gap-2 px-2 py-1.5"
                onClick={onOpen}>
                <div className="bg-muted/50 flex size-8 items-center justify-center rounded-md border">
                  <Plus className="text-muted-foreground size-4" />
                </div>
                <span className="font-medium">Create new workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};
