
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BorrowHistory } from "@/types/library";
import { getBorrowHistory } from "@/services/libraryService";

const RecentBorrows = () => {
  const [recentBorrows, setRecentBorrows] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getBorrowHistory();
        // Sort by borrow date, most recent first
        const sorted = history.sort((a, b) => 
          new Date(b.borrow_date).getTime() - new Date(a.borrow_date).getTime()
        ).slice(0, 5); // Take only 5 most recent
        setRecentBorrows(sorted);
      } catch (error) {
        console.error("Failed to fetch borrow history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not returned";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Borrowings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Borrowed</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBorrows.map((borrow) => (
                <TableRow key={borrow.borrow_id}>
                  <TableCell className="font-medium">{borrow.user?.name}</TableCell>
                  <TableCell>{borrow.book?.title}</TableCell>
                  <TableCell>{formatDate(borrow.borrow_date)}</TableCell>
                  <TableCell className="text-right">
                    <span 
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        borrow.returned 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {borrow.returned ? "Returned" : "Borrowed"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {recentBorrows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No recent borrowings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBorrows;
