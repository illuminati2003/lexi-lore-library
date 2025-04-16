
import MainLayout from "@/components/layout/MainLayout";
import BorrowForm from "@/components/borrowing/BorrowForm";

const AddBorrowing = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">New Borrowing</h1>
          <p className="text-muted-foreground mt-1">
            Record a new book borrowing
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <BorrowForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddBorrowing;
