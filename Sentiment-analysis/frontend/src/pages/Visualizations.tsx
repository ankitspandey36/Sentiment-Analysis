import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Eye, Download, Share, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { KeywordsCloud } from "@/components/dashboard/KeywordsCloud";
import { mockAnalytics } from "@/data/mockData";

export default function Visualizations() {
  const stakeholderData = mockAnalytics.stakeholderBreakdown.map(item => ({
    name: item.type.replace("s", ""),
    count: item.count,
    sentiment: (item.avgSentiment * 100).toFixed(1),
    avgSentiment: item.avgSentiment
  }));

  const trendData = [
    { month: "Jan", positive: 45, negative: 32, neutral: 23 },
    { month: "Feb", positive: 52, negative: 28, neutral: 20 },
    { month: "Mar", positive: 48, negative: 35, neutral: 17 },
    { month: "Apr", positive: 61, negative: 25, neutral: 14 },
    { month: "May", positive: 58, negative: 22, neutral: 20 },
    { month: "Jun", positive: 65, negative: 18, neutral: 17 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Data Visualizations</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Interactive charts and insights from comment analysis
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Share className="h-3 w-3 sm:h-4 sm:w-4" />
            Share
          </Button>
          <Button className="gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Export Charts</span>
          </Button>
        </div>
      </motion.div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <SentimentChart data={mockAnalytics.sentimentDistribution} />
        <KeywordsCloud keywords={mockAnalytics.topKeywords} />
      </div>

      {/* Stakeholder Analysis */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="text-lg">Stakeholder Group Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Comment volume and average sentiment by stakeholder type
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stakeholderData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mt-4 sm:mt-6">
            {stakeholderData.map((item) => (
              <div key={item.name} className="text-center p-3 rounded-lg bg-muted/30">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-2xl font-bold text-primary">{item.count}</p>
                <p className={`text-xs ${
                  item.avgSentiment > 0 ? "text-green-600" : 
                  item.avgSentiment < 0 ? "text-red-600" : "text-amber-600"
                }`}>
                  {item.avgSentiment > 0 ? "+" : ""}{item.sentiment}% avg
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Trends */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="text-lg">Sentiment Trends Over Time</CardTitle>
          <p className="text-sm text-muted-foreground">
            Monthly evolution of comment sentiments
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Line 
                  type="monotone" 
                  dataKey="positive" 
                  stroke="hsl(142 71% 45%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(142 71% 45%)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="negative" 
                  stroke="hsl(0 84% 60%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(0 84% 60%)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke="hsl(43 96% 56%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(43 96% 56%)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[hsl(142_71%_45%)] rounded"></div>
              <span className="text-sm">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[hsl(0_84%_60%)] rounded"></div>
              <span className="text-sm">Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[hsl(43_96%_56%)] rounded"></div>
              <span className="text-sm">Neutral</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="analytics-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {mockAnalytics.confidenceStats.highConfidence}
                </div>
                <p className="text-sm font-medium">High Confidence</p>
                <p className="text-xs text-muted-foreground">≥ 85%</p>
                <div className="mt-2 h-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ 
                      width: `${(mockAnalytics.confidenceStats.highConfidence / mockAnalytics.totalComments) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="analytics-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {mockAnalytics.confidenceStats.mediumConfidence}
                </div>
                <p className="text-sm font-medium">Medium Confidence</p>
                <p className="text-xs text-muted-foreground">70-84%</p>
                <div className="mt-2 h-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ 
                      width: `${(mockAnalytics.confidenceStats.mediumConfidence / mockAnalytics.totalComments) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="analytics-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {mockAnalytics.confidenceStats.lowConfidence}
                </div>
                <p className="text-sm font-medium">Low Confidence</p>
                <p className="text-xs text-muted-foreground">&lt; 70%</p>
                <div className="mt-2 h-2 bg-red-100 dark:bg-red-900 rounded-full">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ 
                      width: `${(mockAnalytics.confidenceStats.lowConfidence / mockAnalytics.totalComments) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}