
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import BookList from "@/components/books/BookList";
import { getBooks } from "@/services/libraryService";
import { Book } from "@/types/library";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight">Books</h1>
            <p className="text-muted-foreground mt-1">
              Manage your book collection
            </p>
          </div>
          <Link to="/books/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </Link>
        </div>
        
        {/* Books Content */}
        {loading ? (
          <div className="flex justify-center py-10">Loading books...</div>
        ) : (
          <BookList books={books} />
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
