
import MainLayout from "@/components/layout/MainLayout";
import AddBookForm from "@/components/books/AddBookForm";

const AddBook = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Add New Book</h1>
          <p className="text-muted-foreground mt-1">
            Add a new book to the library catalog
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <AddBookForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddBook;
