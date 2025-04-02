import {LucideIcon, Settings, Users, CheckCircle, LayoutDashboard} from "lucide-react";
import {Link, useLocation} from "react-router";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useWorkspaceId} from "@/hooks/use-workspace-id";
import {cn} from "@/lib/utils";
import {Permissions} from "@/constants";
import {useAuthActions} from "@/store/user";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const NavMain: React.FC = () => {
  const {open} = useSidebar();
  const {hasPermission} = useAuthActions();
  const canManageSettings = hasPermission(Permissions.MANAGE_WORKSPACE_SETTINGS);

  const workspaceId = useWorkspaceId();
  const location = useLocation();
  const pathname = location.pathname;

  const navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      url: `/workspace/${workspaceId}`,
    },
    {
      title: "Tasks",
      url: `/workspace/${workspaceId}/tasks`,
      icon: CheckCircle,
    },
    {
      title: "Members",
      url: `/workspace/${workspaceId}/members`,
      icon: Users,
    },
    ...(canManageSettings
      ? [
          {
            title: "Settings",
            url: `/workspace/${workspaceId}/settings`,
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarMenuItem key={item.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    asChild
                    className={cn(
                      "group transition-colors duration-200",
                      pathname === item.url ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}>
                    <Link
                      to={item.url}
                      className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "size-6 transition-colors duration-200",
                          pathname === item.url
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span className="flex-1 text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {!open && (
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
