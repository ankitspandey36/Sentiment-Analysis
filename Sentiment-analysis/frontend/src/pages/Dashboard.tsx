import { motion } from "framer-motion";
import { 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Users
} from "lucide-react";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { KeywordsCloud } from "@/components/dashboard/KeywordsCloud";
import { mockAnalytics } from "@/data/mockData";

export default function Dashboard() {
  const { 
    totalComments, 
    sentimentDistribution, 
    topKeywords, 
    confidenceStats 
  } = mockAnalytics;

  const positiveRate = ((sentimentDistribution.positive / totalComments) * 100).toFixed(1);
  const flaggedCount = Math.floor(totalComments * 0.08); // 8% flagged for review

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Real-time insights from stakeholder comments and feedback
        </p>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="h-60"><AnalyticsCard
          title="Total Comments"
          value={totalComments.toLocaleString()}
          change={{ value: 12.5, type: "increase" }}
          icon={MessageSquare}
          description="All processed comments"
        /></div>
        <div className="h-60"><AnalyticsCard
          title="Positive Sentiment"
          value={`${positiveRate}%`}
          change={{ value: 3.2, type: "increase" }}
          icon={TrendingUp}
          description="Comments with positive sentiment"
        /></div>
        <div className="h-60"><AnalyticsCard
          title="High Confidence"
          value={confidenceStats.highConfidence}
          icon={CheckCircle}
          change={{ value: 4.8, type: "increase" }}
          description="Predictions above 85% confidence"
        /></div>
        <div className="h-60"><AnalyticsCard
          title="Flagged for Review"
          value={flaggedCount}
          icon={AlertTriangle}
          change={{ value: 6.7, type: "increase" }}
          description="Low confidence predictions"
        /></div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <SentimentChart data={sentimentDistribution} />
        <KeywordsCloud keywords={topKeywords} />
      </div>

      {/* Additional Metrics */}
     
      {/* Additional Metrics */}
      <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex items-stretch">
        <div className="h-60"><AnalyticsCard
          title="Processing Speed"
          value="1.2s"
          icon={Clock}
          description="Avg. time per comment"
        /></div>
        <div className="h-60"><AnalyticsCard
          title="Stakeholder Groups"
          value="5"
          icon={Users}
          description="Active participant types"
        /></div>
        <div className="h-60"><AnalyticsCard
          title="Accuracy Rate"
          value="94.2%"
          change={{ value: 1.8, type: "increase" }}
          icon={CheckCircle}
          description="Model prediction accuracy"
        /></div>
      </div>

    </div>
  );
}