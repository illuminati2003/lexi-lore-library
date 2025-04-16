
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";

const Reports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download library reports
          </p>
        </div>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Reports provide insights into library operations and usage patterns. 
            Select a report type below to generate and download it.
          </AlertDescription>
        </Alert>
        
        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Cards */}
          <ReportCard 
            title="Borrowing Activity" 
            description="Track borrowing patterns by user, time period, and book genre"
          />
          
          <ReportCard 
            title="Inventory Status" 
            description="Overview of available, borrowed, and overdue books"
          />
          
          <ReportCard 
            title="User Activity" 
            description="Analysis of user borrowing frequency and preferences"
          />
          
          <ReportCard 
            title="Popular Books" 
            description="Most frequently borrowed books by category"
          />
          
          <ReportCard 
            title="Overdue Items" 
            description="List of books that are past their due date"
          />
          
          <ReportCard 
            title="Monthly Summary" 
            description="Overview of all library activity for the month"
          />
        </div>
      </div>
    </MainLayout>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
}

const ReportCard = ({ title, description }: ReportCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Generate Report
      </Button>
    </CardContent>
  </Card>
);

export default Reports;
