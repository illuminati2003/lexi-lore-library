
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUsers, getBooks, addBorrow } from "@/services/libraryService";
import { User, Book } from "@/types/library";
import { toast } from "sonner";

const formSchema = z.object({
  user_id: z.string().min(1, { message: "User is required" }),
  book_id: z.string().min(1, { message: "Book is required" }),
  borrow_date: z.date({
    required_error: "Borrow date is required",
  }),
  return_date: z.date().optional(),
});

const BorrowForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      book_id: "",
      borrow_date: new Date(),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, booksData] = await Promise.all([
          getUsers(),
          getBooks(),
        ]);
        setUsers(usersData);
        setBooks(booksData);
        setAvailableBooks(booksData.filter(book => book.available));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const borrowData = {
        user_id: parseInt(values.user_id),
        book_id: parseInt(values.book_id),
        borrow_date: format(values.borrow_date, "yyyy-MM-dd"),
        return_date: values.return_date ? format(values.return_date, "yyyy-MM-dd") : null,
      };

      await addBorrow(borrowData);
      toast.success("Book borrowed successfully");
      navigate("/borrow");
    } catch (error) {
      toast.error("Failed to process borrowing");
      console.error("Error processing borrowing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select User</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id.toString()}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="book_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Book</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableBooks.length > 0 ? (
                    availableBooks.map((book) => (
                      <SelectItem key={book.book_id} value={book.book_id.toString()}>
                        {book.title} by {book.author}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="none">
                      No available books
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="borrow_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Borrow Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="return_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expected Return Date (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date) => date <= form.getValues("borrow_date")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/borrow")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || availableBooks.length === 0}>
            {isSubmitting ? "Processing..." : "Borrow Book"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BorrowForm;
