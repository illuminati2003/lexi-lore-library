
import { User, Book, BorrowHistory, NewUser, NewBook, NewBorrow } from "@/types/library";

// Mock data for users
const mockUsers: User[] = [
  { user_id: 1, name: "John Doe", contact: "john.doe@email.com" },
  { user_id: 2, name: "Jane Smith", contact: "jane.smith@email.com" },
  { user_id: 3, name: "Robert Johnson", contact: "robert.johnson@email.com" },
];

// Mock data for books
const mockBooks: Book[] = [
  { book_id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", available: true },
  { book_id: 2, title: "1984", author: "George Orwell", genre: "Sci-Fi", available: false },
  { book_id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", available: true },
  { book_id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", available: true },
];

// Mock data for borrowing history
const mockBorrowHistory: BorrowHistory[] = [
  { 
    borrow_id: 1, 
    user_id: 1, 
    book_id: 2, 
    borrow_date: "2023-10-15", 
    return_date: null, 
    returned: false,
    user: mockUsers[0],
    book: mockBooks[1]
  },
  { 
    borrow_id: 2, 
    user_id: 3, 
    book_id: 1, 
    borrow_date: "2023-10-10", 
    return_date: "2023-10-20", 
    returned: true,
    user: mockUsers[2],
    book: mockBooks[0]
  },
];

// Function to get all users
export const getUsers = async (): Promise<User[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockUsers];
};

// Function to get a user by ID
export const getUserById = async (userId: number): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockUsers.find(user => user.user_id === userId);
};

// Function to add a new user
export const addUser = async (userData: NewUser): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  const newUser: User = {
    user_id: mockUsers.length + 1,
    ...userData
  };
  mockUsers.push(newUser);
  return newUser;
};

// Function to get all books
export const getBooks = async (): Promise<Book[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockBooks];
};

// Function to get a book by ID
export const getBookById = async (bookId: number): Promise<Book | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBooks.find(book => book.book_id === bookId);
};

// Function to add a new book
export const addBook = async (bookData: NewBook): Promise<Book> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  const newBook: Book = {
    book_id: mockBooks.length + 1,
    ...bookData
  };
  mockBooks.push(newBook);
  return newBook;
};

// Function to update book availability
export const updateBookAvailability = async (bookId: number, available: boolean): Promise<Book | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const bookIndex = mockBooks.findIndex(book => book.book_id === bookId);
  if (bookIndex !== -1) {
    mockBooks[bookIndex].available = available;
    return mockBooks[bookIndex];
  }
  return undefined;
};

// Function to get borrowing history
export const getBorrowHistory = async (): Promise<BorrowHistory[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [...mockBorrowHistory];
};

// Function to add a new borrow record
export const addBorrow = async (borrowData: NewBorrow): Promise<BorrowHistory> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find the associated user and book
  const user = mockUsers.find(u => u.user_id === borrowData.user_id);
  const book = mockBooks.find(b => b.book_id === borrowData.book_id);
  
  // Mark the book as unavailable
  if (book) {
    book.available = false;
  }
  
  const newBorrow: BorrowHistory = {
    borrow_id: mockBorrowHistory.length + 1,
    ...borrowData,
    returned: false,
    user,
    book
  };
  
  mockBorrowHistory.push(newBorrow);
  return newBorrow;
};

// Function to mark a book as returned
export const returnBook = async (borrowId: number): Promise<BorrowHistory | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const borrowIndex = mockBorrowHistory.findIndex(borrow => borrow.borrow_id === borrowId);
  
  if (borrowIndex !== -1) {
    // Update borrow record
    mockBorrowHistory[borrowIndex].returned = true;
    mockBorrowHistory[borrowIndex].return_date = new Date().toISOString().split('T')[0];
    
    // Make book available again
    const bookId = mockBorrowHistory[borrowIndex].book_id;
    const bookIndex = mockBooks.findIndex(book => book.book_id === bookId);
    
    if (bookIndex !== -1) {
      mockBooks[bookIndex].available = true;
    }
    
    return mockBorrowHistory[borrowIndex];
  }
  
  return undefined;
};
