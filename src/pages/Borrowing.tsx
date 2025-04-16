
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import BorrowingTable from "@/components/borrowing/BorrowingTable";

const Borrowing = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight">Borrowing Records</h1>
            <p className="text-muted-foreground mt-1">
              Track book borrowings and returns
            </p>
          </div>
          <Link to="/borrow/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Borrowing
            </Button>
          </Link>
        </div>
        
        {/* Borrowing Content */}
        <div className="rounded-lg border bg-white shadow-sm">
          <BorrowingTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default Borrowing;
