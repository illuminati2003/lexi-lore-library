
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  Calendar,
  Home,
  LogOut,
  Settings,
  BookPlus,
  UserPlus,
  BarChart3
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <div className="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        <SidebarLink to="/" icon={<Home size={20} />} text="Dashboard" />
        <SidebarLink to="/books" icon={<BookOpen size={20} />} text="Books" />
        <SidebarLink to="/users" icon={<Users size={20} />} text="Users" />
        <SidebarLink to="/borrow" icon={<Calendar size={20} />} text="Borrowing" />
        <SidebarLink to="/reports" icon={<BarChart3 size={20} />} text="Reports" />
      </div>
      
      <div className="mt-6 space-y-1">
        <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Quick Actions
        </p>
        <SidebarLink to="/books/new" icon={<BookPlus size={20} />} text="Add Book" />
        <SidebarLink to="/users/new" icon={<UserPlus size={20} />} text="Add User" />
      </div>
      
      <div className="mt-auto space-y-1">
        <SidebarLink to="/settings" icon={<Settings size={20} />} text="Settings" />
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-library-muted hover:text-library-primary rounded-md transition-colors">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarLink = ({ to, icon, text }: SidebarLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-gray-700",
        "hover:bg-library-muted hover:text-library-primary rounded-md transition-colors"
      )}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Sidebar;
