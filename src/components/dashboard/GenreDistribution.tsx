
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooks } from "@/services/libraryService";
import { Book } from "@/types/library";

interface GenreData {
  name: string;
  value: number;
}

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe",
  "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
];

const GenreDistribution = () => {
  const [genreData, setGenreData] = useState<GenreData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getBooks();
        const genreCounts: Record<string, number> = {};

        books.forEach((book: Book) => {
          const genre = book.genre || "Unknown";
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });

        const data = Object.entries(genreCounts).map(([name, value]) => ({
          name,
          value,
        }));

        setGenreData(data);
      } catch (error) {
        console.error("Failed to fetch book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genre Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {loading ? (
          <div className="flex justify-center py-10">Loading...</div>
        ) : genreData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genreData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} book(s)`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No genre data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenreDistribution;
