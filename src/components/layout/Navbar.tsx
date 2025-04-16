
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu,
  Search,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-serif font-bold text-2xl text-library-primary">
              LexiLore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-library-primary font-medium">
              Dashboard
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-library-primary font-medium">
              Books
            </Link>
            <Link to="/users" className="text-gray-700 hover:text-library-primary font-medium">
              Users
            </Link>
            <Link to="/borrow" className="text-gray-700 hover:text-library-primary font-medium">
              Borrowing
            </Link>
          </nav>

          {/* Search and Menu on Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {showSearchBar ? (
              <div className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Search books..."
                  className="pr-8 w-60"
                  autoFocus
                />
                <button 
                  className="absolute right-2 text-gray-500"
                  onClick={() => setShowSearchBar(false)}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearchBar(true)}
              >
                <Search size={20} />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/books" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Books
            </Link>
            <Link 
              to="/users" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link 
              to="/borrow" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Borrowing
            </Link>
            {/* Mobile Search */}
            <div className="px-4 py-2">
              <Input
                type="text"
                placeholder="Search books..."
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
