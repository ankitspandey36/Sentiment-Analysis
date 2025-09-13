import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsData } from "@/data/mockData";

interface SentimentChartProps {
  data: AnalyticsData["sentimentDistribution"];
}

const COLORS = {
  positive: "hsl(142 71% 45%)",
  negative: "hsl(0 84% 60%)",
  neutral: "hsl(43 96% 56%)",
  mixed: "hsl(262 83% 58%)",
};

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = [
    { name: "Positive", value: data.positive, color: COLORS.positive },
    { name: "Negative", value: data.negative, color: COLORS.negative },
    { name: "Neutral", value: data.neutral, color: COLORS.neutral },
    { name: "Mixed", value: data.mixed, color: COLORS.mixed },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.value} comments ({((data.value / chartData.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="analytics-card">
      <CardHeader>
        <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Overview of comment sentiment analysis results
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}