
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import UserList from "@/components/users/UserList";
import { getUsers } from "@/services/libraryService";
import { User } from "@/types/library";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage library member accounts
            </p>
          </div>
          <Link to="/users/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>
        
        {/* Users Content */}
        {loading ? (
          <div className="flex justify-center py-10">Loading users...</div>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </MainLayout>
  );
};

export default Users;
