
import { Book } from "@/types/library";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-md w-12 h-12 flex items-center justify-center bg-library-muted text-library-primary flex-shrink-0">
            <BookOpen size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-medium text-lg truncate" title={book.title}>
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate" title={`by ${book.author}`}>
              by {book.author}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <Badge variant={book.available ? "outline" : "secondary"}>
                {book.genre}
              </Badge>
              <Badge variant={book.available ? "default" : "destructive"} className="ml-2">
                {book.available ? "Available" : "Borrowed"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
