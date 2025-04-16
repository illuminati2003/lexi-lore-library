
import { Book, BorrowHistory, User, NewUser, NewBook, NewBorrow } from "@/types/library";

// Mock data
let users: User[] = [
  { user_id: 1, name: "Alice Johnson", contact: "alice@example.com" },
  { user_id: 2, name: "Bob Smith", contact: "bob@example.com" },
  { user_id: 3, name: "Carol Davis", contact: "carol@example.com" },
  { user_id: 4, name: "David Wilson", contact: "david@example.com" },
  { user_id: 5, name: "Eva Brown", contact: "eva@example.com" },
];

let books: Book[] = [
  { book_id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
  { book_id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", available: false },
  { book_id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", available: true },
  { book_id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
  { book_id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", available: false },
  { book_id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", available: true },
  { book_id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", available: true },
  { book_id: 8, title: "Lord of the Flies", author: "William Golding", genre: "Fiction", available: true },
  { book_id: 9, title: "Animal Farm", author: "George Orwell", genre: "Political", available: true },
  { book_id: 10, title: "The Da Vinci Code", author: "Dan Brown", genre: "Mystery", available: true },
];

let borrowHistory: BorrowHistory[] = [
  { borrow_id: 1, user_id: 1, book_id: 2, borrow_date: "2024-04-01", return_date: null, returned: false },
  { borrow_id: 2, user_id: 3, book_id: 5, borrow_date: "2024-03-15", return_date: null, returned: false },
  { borrow_id: 3, user_id: 2, book_id: 1, borrow_date: "2024-02-20", return_date: "2024-03-10", returned: true },
  { borrow_id: 4, user_id: 4, book_id: 3, borrow_date: "2024-01-05", return_date: "2024-01-25", returned: true },
  { borrow_id: 5, user_id: 5, book_id: 7, borrow_date: "2024-03-01", return_date: "2024-03-20", returned: true },
];

// Helper function to generate IDs
const generateId = (items: any[]): number => {
  return items.length > 0 ? Math.max(...items.map(item => Object.values(item)[0])) + 1 : 1;
};

// User methods
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 300);
  });
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users.find(user => user.user_id === id)), 300);
  });
};

export const addUser = async (newUser: NewUser): Promise<User> => {
  const user = { ...newUser, user_id: generateId(users) };
  users = [...users, user];
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(user), 300);
  });
};

// Book methods
export const getBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...books]), 300);
  });
};

export const getBookById = async (id: number): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books.find(book => book.book_id === id)), 300);
  });
};

export const addBook = async (newBook: NewBook): Promise<Book> => {
  const book = { ...newBook, book_id: generateId(books) };
  books = [...books, book];
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(book), 300);
  });
};

export const updateBookAvailability = async (id: number, available: boolean): Promise<Book | undefined> => {
  const index = books.findIndex(book => book.book_id === id);
  if (index === -1) return undefined;
  
  books[index] = { ...books[index], available };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(books[index]), 300);
  });
};

// Borrow methods
export const getBorrowHistory = async (): Promise<BorrowHistory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Join with user and book data
      const enrichedHistory = borrowHistory.map(borrow => ({
        ...borrow,
        user: users.find(user => user.user_id === borrow.user_id),
        book: books.find(book => book.book_id === borrow.book_id)
      }));
      resolve(enrichedHistory);
    }, 300);
  });
};

export const getBorrowsByUserId = async (userId: number): Promise<BorrowHistory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBorrows = borrowHistory
        .filter(borrow => borrow.user_id === userId)
        .map(borrow => ({
          ...borrow,
          user: users.find(user => user.user_id === borrow.user_id),
          book: books.find(book => book.book_id === borrow.book_id)
        }));
      resolve(userBorrows);
    }, 300);
  });
};

export const addBorrow = async (newBorrow: NewBorrow): Promise<BorrowHistory> => {
  const borrow = { 
    ...newBorrow, 
    borrow_id: generateId(borrowHistory),
    returned: false
  };
  
  borrowHistory = [...borrowHistory, borrow];
  
  // Update book availability
  await updateBookAvailability(newBorrow.book_id, false);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrichedBorrow = {
        ...borrow,
        user: users.find(user => user.user_id === borrow.user_id),
        book: books.find(book => book.book_id === borrow.book_id)
      };
      resolve(enrichedBorrow);
    }, 300);
  });
};

export const returnBook = async (borrowId: number): Promise<BorrowHistory | undefined> => {
  const index = borrowHistory.findIndex(borrow => borrow.borrow_id === borrowId);
  if (index === -1) return undefined;
  
  const returnDate = new Date().toISOString().split('T')[0];
  borrowHistory[index] = { 
    ...borrowHistory[index], 
    return_date: returnDate, 
    returned: true 
  };
  
  // Update book availability
  await updateBookAvailability(borrowHistory[index].book_id, true);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrichedBorrow = {
        ...borrowHistory[index],
        user: users.find(user => user.user_id === borrowHistory[index].user_id),
        book: books.find(book => book.book_id === borrowHistory[index].book_id)
      };
      resolve(enrichedBorrow);
    }, 300);
  });
};

// Statistics and reports
export const getLibraryStatistics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalBooks = books.length;
      const availableBooks = books.filter(book => book.available).length;
      const borrowedBooks = books.filter(book => !book.available).length;
      const totalUsers = users.length;
      const activeLoans = borrowHistory.filter(borrow => !borrow.returned).length;
      
      resolve({
        totalBooks,
        availableBooks,
        borrowedBooks,
        totalUsers,
        activeLoans
      });
    }, 300);
  });
};

// Search functionality
export const searchBooks = async (query: string): Promise<Book[]> => {
  query = query.toLowerCase();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) || 
        book.genre.toLowerCase().includes(query)
      );
      resolve(results);
    }, 300);
  });
};
