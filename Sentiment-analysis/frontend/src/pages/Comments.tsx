import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Edit, 
  Flag, 
  Search,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { mockComments, Comment } from "@/data/mockData";

export default function Comments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [filteredComments, setFilteredComments] = useState(mockComments);

  const getSentimentBadge = (sentiment: Comment["sentiment"], score: number) => {
    const baseClass = "text-xs font-medium";
    switch (sentiment) {
      case "positive":
        return <Badge className={`sentiment-positive ${baseClass}`}>Positive ({(score * 100).toFixed(0)}%)</Badge>;
      case "negative":
        return <Badge className={`sentiment-negative ${baseClass}`}>Negative ({Math.abs(score * 100).toFixed(0)}%)</Badge>;
      case "neutral":
        return <Badge className={`sentiment-neutral ${baseClass}`}>Neutral ({(Math.abs(score) * 100).toFixed(0)}%)</Badge>;
      case "mixed":
        return <Badge className={`sentiment-mixed ${baseClass}`}>Mixed ({(Math.abs(score) * 100).toFixed(0)}%)</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.85) return "text-green-600 dark:text-green-400";
    if (confidence >= 0.7) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Comments Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Review and manage analyzed stakeholder comments</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            Export
          </Button>
          <Button className="gap-2 text-xs sm:text-sm">
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            View Analysis
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments, keywords, or stakeholders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">More Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({mockComments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px]">Comment</TableHead>
                  <TableHead className="min-w-[120px]">Stakeholder</TableHead>
                  <TableHead className="min-w-[100px]">Sentiment</TableHead>
                  <TableHead className="min-w-[120px]">Confidence</TableHead>
                  <TableHead className="min-w-[150px]">Keywords</TableHead>
                  <TableHead className="min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockComments.map((comment) => (
                  <TableRow key={comment.id} className="group">
                    <TableCell className="max-w-md">
                      <div>
                        <p className="text-sm font-medium mb-1">{comment.clause}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {comment.commentText}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          Summary: {comment.summary}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{comment.stakeholderType}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.analyzedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSentimentBadge(comment.sentiment, comment.sentimentScore)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={comment.confidence * 100} 
                          className="w-20 h-2" 
                        />
                        <span className={`text-xs font-medium ${getConfidenceColor(comment.confidence)}`}>
                          {(comment.confidence * 100).toFixed(0)}%
                        </span>
                        {comment.flagged && (
                          <Flag className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {comment.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {comment.keywords.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{comment.keywords.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}