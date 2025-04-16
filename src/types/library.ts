
export interface User {
  user_id: number;
  name: string;
  contact: string;
}

export interface Book {
  book_id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export interface BorrowHistory {
  borrow_id: number;
  user_id: number;
  book_id: number;
  borrow_date: string;
  return_date: string | null;
  returned: boolean;
  user?: User; // For joined data
  book?: Book; // For joined data
}

export type NewUser = Omit<User, 'user_id'>;
export type NewBook = Omit<Book, 'book_id'>;
export type NewBorrow = Omit<BorrowHistory, 'borrow_id' | 'returned' | 'user' | 'book'>;
