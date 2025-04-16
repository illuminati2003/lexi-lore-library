
import { useState } from "react";
import { User } from "@/types/library";
import UserCard from "./UserCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface UserListProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

const UserList = ({ users, onUserClick }: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or contact"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard
              key={user.user_id}
              user={user}
              onClick={onUserClick ? () => onUserClick(user) : undefined}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
