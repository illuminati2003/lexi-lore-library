
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
