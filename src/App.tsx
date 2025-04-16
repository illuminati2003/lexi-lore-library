
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import Borrowing from "./pages/Borrowing";
import AddBorrowing from "./pages/AddBorrowing";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/new" element={<AddBook />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<AddUser />} />
        <Route path="/borrow" element={<Borrowing />} />
        <Route path="/borrow/new" element={<AddBorrowing />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
