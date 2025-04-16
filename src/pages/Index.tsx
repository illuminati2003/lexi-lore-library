
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentBorrows from "@/components/dashboard/RecentBorrows";
import GenreDistribution from "@/components/dashboard/GenreDistribution";
import { getBooks, getUsers, getBorrowHistory } from "@/services/libraryService";
import { Book, BookIcon, CheckCircle, Users, RefreshCw } from "lucide-react";

interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalUsers: number;
  activeLoans: number;
}

const Index = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    activeLoans: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [books, users, borrows] = await Promise.all([
          getBooks(),
          getUsers(),
          getBorrowHistory()
        ]);

        setStats({
          totalBooks: books.length,
          availableBooks: books.filter(book => book.available).length,
          borrowedBooks: books.filter(book => !book.available).length,
          totalUsers: users.length,
          activeLoans: borrows.filter(borrow => !borrow.returned).length
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Library Management System Overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="Total Books" 
            value={stats.totalBooks} 
            description="Total books in the library" 
            icon={<BookIcon size={24} />} 
          />
          <StatCard 
            title="Available Books" 
            value={stats.availableBooks} 
            description="Books ready for borrowing" 
            icon={<CheckCircle size={24} />} 
          />
          <StatCard 
            title="Borrowed Books" 
            value={stats.borrowedBooks} 
            description="Books currently borrowed" 
            icon={<Book size={24} />} 
          />
          <StatCard 
            title="Total Members" 
            value={stats.totalUsers} 
            description="Registered library members" 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="Active Loans" 
            value={stats.activeLoans} 
            description="Books yet to be returned" 
            icon={<RefreshCw size={24} />} 
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Borrows</h2>
            <RecentBorrows />
          </div>
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Genre Distribution</h2>
            <GenreDistribution />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
