import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData } from "@/data/mockData";

interface KeywordsCloudProps {
  keywords: AnalyticsData["topKeywords"];
}

export function KeywordsCloud({ keywords }: KeywordsCloudProps) {
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "sentiment-positive";
      case "negative":
        return "sentiment-negative";
      case "neutral":
        return "sentiment-neutral";
      case "mixed":
        return "sentiment-mixed";
      default:
        return "bg-secondary";
    }
  };

  const getFontSize = (count: number, maxCount: number) => {
    const ratio = count / maxCount;
    return `${0.8 + ratio * 1.2}rem`;
  };

  const maxCount = Math.max(...keywords.map(k => k.count));

  return (
    <Card className="analytics-card">
      <CardHeader>
        <CardTitle className="text-lg">Top Keywords</CardTitle>
        <p className="text-sm text-muted-foreground">
          Most frequently mentioned terms in comments
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center p-3 sm:p-6">
          {keywords.map((keyword, index) => (
            <motion.div
              key={keyword.word}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <Badge
                className={`${getSentimentColor(keyword.sentiment)} cursor-pointer transition-all duration-200 hover:shadow-lg`}
                style={{ 
                  fontSize: getFontSize(keyword.count, maxCount),
                  padding: "0.5rem 1rem"
                }}
                title={`${keyword.word}: ${keyword.count} mentions`}
              >
                {keyword.word}
                <span className="ml-2 text-xs opacity-75">
                  {keyword.count}
                </span>
              </Badge>
            </motion.div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded sentiment-positive" />
            <span className="text-xs">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded sentiment-negative" />
            <span className="text-xs">Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded sentiment-neutral" />
            <span className="text-xs">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded sentiment-mixed" />
            <span className="text-xs">Mixed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}