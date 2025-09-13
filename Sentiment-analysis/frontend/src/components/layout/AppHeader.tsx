import { Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function AppHeader() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <SidebarTrigger className="hover:bg-accent flex-shrink-0 p-2" />
            <div className="hidden sm:block flex-1 min-w-0 px-2">
              <h1 className="text-base sm:text-lg font-semibold text-foreground">
                Analytics Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Stakeholder comment analysis and insights
              </p>
            </div>
            <div className="sm:hidden flex-1 min-w-0 px-2">
              <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative h-9 w-9 sm:h-10 sm:w-10 p-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-9 w-9 sm:h-10 sm:w-10 p-2"
            >
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 sm:gap-3 h-9 sm:h-10 px-3">
                  <div className="hero-gradient p-2 rounded-full flex-shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="hidden lg:block text-left min-w-0">
                    <p className="text-sm font-medium truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">analyst@gov.ca</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}