import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  MessageSquare,
  Upload,
  Eye,
  Settings,
  LogOut,
  Brain,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
    description: "Analytics Overview"
  },
  {
    title: "Comments",
    url: "/comments",
    icon: MessageSquare,
    description: "Manage Comments"
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
    description: "Upload Data"
  },
  {
    title: "Visualizations",
    url: "/visualizations",
    icon: Eye,
    description: "Charts & Insights"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "System Settings"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

    const getNavClasses = (path: string) => {
    const active = isActive(path);
    if (active) {
      return "bg-white text-blue-600 font-medium shadow hover:bg-white hover:text-blue-600"; // selected: white bg, blue text, stays same on hover
    }
    return "text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200"; // default: gray text, hover: blue bg, white text
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64 md:w-67"} collapsible="icon">
      <SidebarHeader className="p-4 sm:p-6 border-b border-sidebar-border">
        <motion.div 
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NavLink to="/" className="hero-gradient p-1.5 sm:p-2 rounded-lg flex-shrink-0">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </NavLink>
          {!isCollapsed && (
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg text-sidebar-foreground truncate">
                eConsultation
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                Comment Analyzer
              </p>
            </div>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full p-2 h-12">
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(item.url)}
                      title={isCollapsed ? item.title : ""}
                    >
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm sm:text-base truncate">{item.title}</span>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        
      </SidebarContent>
    </Sidebar>
  );
}