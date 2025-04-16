
import MainLayout from "@/components/layout/MainLayout";
import AddUserForm from "@/components/users/AddUserForm";

const AddUser = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Add New User</h1>
          <p className="text-muted-foreground mt-1">
            Register a new library member
          </p>
        </div>
        
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <AddUserForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddUser;
