import {Link, useLocation} from "react-router";
import {Settings, LogOut} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {SidebarTrigger} from "./ui/sidebar";
import {Separator} from "./ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {ModeToggle} from "./mode-toggle";
import {useWorkspaceId} from "@/hooks/use-workspace-id";
import {getUserInitials} from "@/lib/utils";
import useAuthStore from "@/store";
import {useSignOutMutation} from "@/hooks/use-auth";

export const Header = () => {
  const workspaceId = useWorkspaceId();
  const {user, clearUser} = useAuthStore();
  const location = useLocation();
  const {pathname} = location;

  // Determines the page heading based on the current pathname.
  const getPageHeading = (pathname: string) => {
    if (pathname.includes("/project/")) return "Project";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/tasks")) return "Tasks";
    if (pathname.includes("/members")) return "Members";
    return null; // Default to Dashboard if no match
  };
  const pageHeading = getPageHeading(pathname);

  const {mutate: signOut} = useSignOutMutation();
  const handleSignOut = () => {
    signOut();
    clearUser();
  };

  return (
    <header
      className="bg-background sticky top-0 z-50 flex h-[60px] shrink-0 items-center border-b transition-all duration-200"
      role="banner"
      aria-label="Page header">
      <div className="flex flex-1 items-center justify-between px-3">
        {/* Left side */}
        <div className="flex items-center justify-start gap-2">
          {/* Sidebar Trigger Button */}
          <SidebarTrigger className="size-8 rounded-md p-2 transition-colors duration-200" />

          {/* Vertical Separator */}
          <Separator
            orientation="vertical"
            className="mx-2 h-5 border-l border-gray-300"
            decorative
          />

          {/* Breadcrumb Navigation */}
          <Breadcrumb>
            <BreadcrumbList>
              {/* Dashboard Link */}
              <BreadcrumbItem className="hidden text-base font-medium md:block">
                {pageHeading ? (
                  <BreadcrumbLink asChild>
                    <Link
                      to={`/workspace/${workspaceId}`}
                      className="hover:text-primary relative overflow-hidden transition-colors duration-200">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="line-clamp-1">Dashboard</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {/* Dynamic Page Heading */}
              {pageHeading && (
                <>
                  <BreadcrumbSeparator className="text-muted-foreground/70 hidden transition-opacity duration-200 ease-in-out md:block" />
                  <BreadcrumbItem className="text-base font-medium">
                    <BreadcrumbPage className="line-clamp-1 transition-transform duration-200 ease-in-out">
                      {pageHeading}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-9 cursor-pointer shadow-sm transition-transform duration-200 ease-in-out">
                <AvatarImage
                  src={user?.avatarUrl ?? ""}
                  alt=""
                  aria-hidden="true"
                />
                <AvatarFallback className="bg-primary/10 text-primary transition-colors duration-300 ease-in-out">
                  {getUserInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56"
              sideOffset={8}>
              <DropdownMenuLabel className="flex flex-col py-1">
                <span className="font-medium">{user?.name}</span>
                <span className="text-muted-foreground text-xs">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/60" />

              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:bg-accent cursor-pointer transition-colors duration-200">
                  <Link
                    to={`/workspace/${workspaceId}/settings`}
                    className="flex w-full items-center">
                    <Settings
                      className="mr-2 size-4 transition-transform duration-300 ease-in-out hover:rotate-90"
                      aria-hidden="true"
                    />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem
                className="text-destructive hover:text-destructive focus:text-destructive cursor-pointer transition-colors duration-200"
                onSelect={handleSignOut}>
                <LogOut
                  className="mr-2 size-4 transition-transform duration-200 ease-in-out hover:translate-x-1"
                  aria-hidden="true"
                />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
