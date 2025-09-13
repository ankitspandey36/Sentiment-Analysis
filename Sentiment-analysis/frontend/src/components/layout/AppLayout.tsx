import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { motion } from "framer-motion";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AppHeader />
            <main className="flex-1 overflow-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full p-4 sm:p-6"
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}