
import { useState, useEffect } from "react";
import { BorrowHistory } from "@/types/library";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBorrowHistory, returnBook } from "@/services/libraryService";
import { format } from "date-fns";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";

const BorrowingTable = () => {
  const [borrowHistory, setBorrowHistory] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingReturn, setProcessingReturn] = useState<number | null>(null);

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  const fetchBorrowHistory = async () => {
    try {
      setLoading(true);
      const history = await getBorrowHistory();
      // Sort by status (not returned first) and then by borrow date (most recent first)
      const sorted = history.sort((a, b) => {
        if (a.returned === b.returned) {
          return new Date(b.borrow_date).getTime() - new Date(a.borrow_date).getTime();
        }
        return a.returned ? 1 : -1;
      });
      
      setBorrowHistory(sorted);
    } catch (error) {
      console.error("Failed to fetch borrow history:", error);
      toast.error("Failed to load borrowing history");
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (borrowId: number) => {
    setProcessingReturn(borrowId);
    try {
      await returnBook(borrowId);
      toast.success("Book returned successfully");
      await fetchBorrowHistory(); // Refresh the list
    } catch (error) {
      console.error("Failed to return book:", error);
      toast.error("Failed to process return");
    } finally {
      setProcessingReturn(null);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return format(new Date(dateStr), "MMM d, yyyy");
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowHistory.length > 0 ? (
                borrowHistory.map((borrow) => (
                  <TableRow key={borrow.borrow_id}>
                    <TableCell className="font-medium">{borrow.user?.name}</TableCell>
                    <TableCell>{borrow.book?.title}</TableCell>
                    <TableCell>{formatDate(borrow.borrow_date)}</TableCell>
                    <TableCell>{formatDate(borrow.return_date)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={borrow.returned ? "outline" : "default"}
                      >
                        {borrow.returned ? "Returned" : "Borrowed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!borrow.returned && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReturnBook(borrow.borrow_id)}
                          disabled={processingReturn === borrow.borrow_id}
                        >
                          {processingReturn === borrow.borrow_id ? (
                            <RotateCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            "Return"
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No borrowing records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BorrowingTable;
