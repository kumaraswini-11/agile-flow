import {useState} from "react";
import {Link} from "react-router";
import {Mail, LogOut, ChevronsUpDown} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AppLogo} from "../logo";
import {TooltipProvider} from "../ui/tooltip";
import {ScrollArea} from "../ui/scroll-area";
import {Separator} from "../ui/separator";
import {Badge} from "../ui/badge";
import {useWorkspaceId} from "@/hooks/use-workspace-id";
import {WorkspaceSwitcher} from "./workspace-switcher";
import {NavMain} from "./nav-main";
import useAuthStore from "@/store/user";
import {SignOutDialog} from "./sign-out-dialog";
import {NavProjects} from "./nav-projects";

export const Asidebar = () => {
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);

  const {open} = useSidebar();
  const workspaceId = useWorkspaceId();
  const {user} = useAuthStore();

  const getUserInitials = (name?: string): string => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return `${nameParts[0]?.[0] || ""}${nameParts[1]?.[0] || ""}`.toUpperCase();
  };

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Sidebar collapsible="icon">
          <SidebarHeader className="bg-background flex h-[60px] items-center border-b !py-0">
            <div className="flex h-full w-full items-center justify-start px-2.5">
              <AppLogo
                url={`/workspace/${workspaceId}`}
                flag={open}
                text="Agile Flow"
                className="flex items-center gap-3 text-lg font-medium"
              />
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-background m-0 p-1">
            <ScrollArea className="h-[calc(100vh-120px)]">
              <SidebarGroup className="space-y-1 !py-0">
                <SidebarGroupContent>
                  {/* Workspace Selector */}
                  <WorkspaceSwitcher />
                  <Separator className="my-2" />

                  {/* Main Navigation */}
                  <NavMain />
                  <Separator className="my-2" />

                  {/* Nav Projects */}
                  <NavProjects />
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </SidebarContent>

          <SidebarFooter className="bg-background border-t py-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="hover:bg-muted data-[state=open]:bg-muted w-full">
                      <Avatar className="size-9 shadow-sm">
                        <AvatarImage
                          src={user?.avatarUrl ?? ""}
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getUserInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left">
                        <span className="truncate text-sm font-semibold">
                          {user?.name ?? "N/A"}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {user?.email ?? "anonymous@example.com"}
                        </span>
                      </div>
                      <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                    side="top"
                    align="start"
                    sideOffset={4}>
                    <DropdownMenuLabel>Account Details</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        asChild>
                        <Link
                          to="/messages"
                          className="flex items-center">
                          <Mail className="mr-2 size-4" />
                          <span>Messages</span>
                          <Badge
                            className="ml-auto"
                            variant="secondary">
                            3
                          </Badge>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup> 
                    <DropdownMenuSeparator />*/}
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={() => setIsSignOutDialogOpen(true)}>
                      <LogOut className="mr-2 size-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </TooltipProvider>

      <SignOutDialog
        isOpen={isSignOutDialogOpen}
        setIsOpen={setIsSignOutDialogOpen}
      />
    </>
  );
};
