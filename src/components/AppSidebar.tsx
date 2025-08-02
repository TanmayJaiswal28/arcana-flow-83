import { Home, Users, Repeat, FileText, Settings, Brain, Package, Cog } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Agents", url: "/agents", icon: Users },
  { title: "Simulate", url: "/simulate", icon: Repeat },
  { title: "Payment Logs", url: "/logs", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary border-r-2 border-primary neon-glow font-medium" 
      : "hover:bg-primary/10 hover:text-primary transition-colors"

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-64"} border-r border-border bg-sidebar transition-all duration-300`} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center neon-glow">
              <span className="text-lg font-bold text-primary-foreground">AP</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-base gradient-primary bg-clip-text text-transparent">
                  AutoPayAI
                </h2>
                <p className="text-xs text-muted-foreground terminal-font">
                  Monad Network
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs text-muted-foreground px-2 mb-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="web3-card p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center pulse-glow">
                  <Cog className="w-4 h-4 text-accent" />
                </div>
                <div className="text-xs">
                  <p className="font-medium text-accent">Blockchain Status</p>
                  <p className="text-muted-foreground terminal-font">Monad • Block #2847521</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}