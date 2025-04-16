
import { useState } from "react";
import { Book } from "@/types/library";
import BookCard from "./BookCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface BookListProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
}

const BookList = ({ books, onBookClick }: BookListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAvailability, setFilterAvailability] = useState<"all" | "available" | "borrowed">("all");
  const [filterGenre, setFilterGenre] = useState<string>("all");

  // Extract unique genres from books
  const genres = ["all", ...Array.from(new Set(books.map(book => book.genre)))];

  // Filter books based on search query and filters
  const filteredBooks = books.filter(book => {
    // Search by title or author
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by availability
    const matchesAvailability = 
      filterAvailability === "all" || 
      (filterAvailability === "available" && book.available) ||
      (filterAvailability === "borrowed" && !book.available);
    
    // Filter by genre
    const matchesGenre =
      filterGenre === "all" || 
      book.genre === filterGenre;
    
    return matchesSearch && matchesAvailability && matchesGenre;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or author"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Availability filter */}
        <Select 
          value={filterAvailability} 
          onValueChange={(value) => setFilterAvailability(value as "all" | "available" | "borrowed")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Books</SelectItem>
            <SelectItem value="available">Available Only</SelectItem>
            <SelectItem value="borrowed">Borrowed Only</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Genre filter */}
        <Select 
          value={filterGenre} 
          onValueChange={setFilterGenre}
        >
          <SelectTrigger>
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map(genre => (
              <SelectItem key={genre} value={genre}>
                {genre === "all" ? "All Genres" : genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Books grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard
              key={book.book_id}
              book={book}
              onClick={onBookClick ? () => onBookClick(book) : undefined}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No books found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
