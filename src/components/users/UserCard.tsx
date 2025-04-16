
import { User } from "@/types/library";
import { Card, CardContent } from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-library-muted text-library-primary flex-shrink-0">
            <UserIcon size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-medium text-lg truncate" title={user.name}>
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate" title={user.contact}>
              {user.contact}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              User ID: {user.user_id}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
