import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: LucideIcon;
  description?: string;
  className?: string;
  gradient?: boolean;
}

export function AnalyticsCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  className = "",
  gradient = false,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={`analytics-card ${gradient ? "hero-gradient text-white" : ""} ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-4 w-4 ${gradient ? "text-white/80" : "text-muted-foreground"}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <p className={`text-xs flex items-center gap-1 mt-1 ${
              gradient ? "text-white/70" : "text-muted-foreground"
            }`}>
              <span className={`inline-block w-2 h-2 rounded-full ${
                change.type === "increase" 
                  ? gradient ? "bg-green-200" : "bg-green-500" 
                  : gradient ? "bg-red-200" : "bg-red-500"
              }`} />
              {change.type === "increase" ? "+" : ""}{change.value}% from last period
            </p>
          )}
          {description && (
            <p className={`text-xs mt-1 ${
              gradient ? "text-white/70" : "text-muted-foreground"
            }`}>
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}