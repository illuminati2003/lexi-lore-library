
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  CalendarDays, 
  LibraryBig,
  CircleOff,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentBorrows from "@/components/dashboard/RecentBorrows";
import GenreDistribution from "@/components/dashboard/GenreDistribution";
import { getLibraryStatistics } from "@/services/libraryService";

const Index = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    activeLoans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getLibraryStatistics();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch library statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight">Library Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your library operations
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/books/new">
              <Button>Add Book</Button>
            </Link>
            <Link to="/borrow/new">
              <Button variant="outline">New Borrowing</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="py-10 text-center">Loading statistics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Books"
              value={stats.totalBooks}
              icon={<LibraryBig size={24} />}
            />
            <StatCard
              title="Available Books"
              value={stats.availableBooks}
              icon={<BookOpen size={24} />}
              className="border-green-100"
            />
            <StatCard
              title="Borrowed Books"
              value={stats.borrowedBooks}
              icon={<CircleOff size={24} />}
              className="border-amber-100"
            />
            <StatCard
              title="Registered Users"
              value={stats.totalUsers}
              icon={<Users size={24} />}
            />
            <StatCard
              title="Active Loans"
              value={stats.activeLoans}
              icon={<CalendarDays size={24} />}
            />
            <StatCard
              title="Returns This Month"
              value="12"
              icon={<BadgeCheck size={24} />}
            />
          </div>
        )}

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBorrows />
          <GenreDistribution />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
