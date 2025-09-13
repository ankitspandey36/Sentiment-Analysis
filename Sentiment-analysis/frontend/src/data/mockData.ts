export interface Comment {
  id: string;
  stakeholderType: string;
  clause: string;
  commentText: string;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  sentimentScore: number;
  confidence: number;
  summary: string;
  keywords: string[];
  analyzedAt: string;
  flagged?: boolean;
}

export interface AnalyticsData {
  totalComments: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
    mixed: number;
  };
  topKeywords: Array<{ word: string; count: number; sentiment?: string }>;
  stakeholderBreakdown: Array<{ type: string; count: number; avgSentiment: number }>;
  confidenceStats: {
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
  };
}

// --- Example Comments from Ministry of Corporate Affairs eConsultation ---
export const mockComments: Comment[] = [
  {
    id: "1",
    stakeholderType: "Chartered Accountant",
    clause: "Clause 5.1 – Corporate Governance Disclosures",
    commentText:
      "The enhanced disclosure requirements on related-party transactions are a welcome move. This will improve transparency and investor confidence.",
    sentiment: "positive",
    sentimentScore: 0.82,
    confidence: 0.91,
    summary:
      "Supports enhanced related-party disclosure rules for greater transparency and investor confidence.",
    keywords: ["related-party transactions", "transparency", "investor confidence", "corporate governance"],
    analyzedAt: "2024-01-20T10:15:00Z",
    flagged: false
  },
  {
    id: "2",
    stakeholderType: "Industry Association",
    clause: "Clause 7.3 – Compliance Timeline",
    commentText:
      "The proposed compliance window of 6 months is impractical for medium-sized companies. We request at least 12 months to adapt internal systems.",
    sentiment: "negative",
    sentimentScore: -0.63,
    confidence: 0.87,
    summary:
      "Finds 6-month compliance window impractical; requests extension to 12 months for medium-sized companies.",
    keywords: ["compliance window", "medium-sized companies", "internal systems", "timeline extension"],
    analyzedAt: "2024-01-20T11:40:00Z",
    flagged: true
  },
  {
    id: "3",
    stakeholderType: "Corporate Law Firm",
    clause: "Clause 3.4 – Audit Committee Powers",
    commentText:
      "While granting broader powers to audit committees is positive, clarity is needed on how these powers interact with board oversight responsibilities.",
    sentiment: "mixed",
    sentimentScore: 0.18,
    confidence: 0.79,
    summary:
      "Welcomes broader audit committee powers but seeks clarity on overlap with board oversight.",
    keywords: ["audit committee", "board oversight", "corporate governance", "clarity"],
    analyzedAt: "2024-01-20T13:05:00Z",
    flagged: false
  },
  {
    id: "4",
    stakeholderType: "Academic Institution",
    clause: "Clause 2.2 – Corporate Social Responsibility Reporting",
    commentText:
      "The reporting format for CSR expenditure appears adequate and may encourage better measurement of social impact. Inclusion of sector-wise metrics could be beneficial.",
    sentiment: "neutral",
    sentimentScore: 0.24,
    confidence: 0.83,
    summary:
      "CSR reporting format adequate; suggests adding sector-wise impact metrics.",
    keywords: ["CSR expenditure", "social impact", "sector-wise metrics", "reporting format"],
    analyzedAt: "2024-01-20T14:20:00Z",
    flagged: false
  },
  {
    id: "5",
    stakeholderType: "Public Company",
    clause: "Clause 9.1 – Penalties for Non-Compliance",
    commentText:
      "The proposed penalties for delayed filings are excessive and could adversely impact cash-strapped companies. A graded penalty system should be considered.",
    sentiment: "negative",
    sentimentScore: -0.71,
    confidence: 0.86,
    summary:
      "Objects to excessive penalties for delayed filings; recommends graded penalty system.",
    keywords: ["penalties", "delayed filings", "graded system", "cash-strapped companies"],
    analyzedAt: "2024-01-20T09:05:00Z",
    flagged: true
  }
];

export const mockAnalytics: AnalyticsData = {
  totalComments: 312,
  sentimentDistribution: {
    positive: 112,
    negative: 95,
    neutral: 58,
    mixed: 47
  },
  topKeywords: [
    { word: "corporate", count: 54, sentiment: "positive" },
    { word: "compliance timeline", count: 42, sentiment: "negative" },
    { word: "penalties", count: 37, sentiment: "negative" },
    { word: "CSR reporting", count: 33, sentiment: "neutral" },
    { word: "audit committee", count: 28, sentiment: "mixed" },
    { word: "related-party transactions", count: 25, sentiment: "positive" },
    { word: "investor confidence", count: 22, sentiment: "positive" },
    { word: "medium-sized companies", count: 19, sentiment: "negative" }
  ],
  stakeholderBreakdown: [
    { type: "Chartered Accountants", count: 96, avgSentiment: 0.38 },
    { type: "Industry Associations", count: 78, avgSentiment: -0.41 },
    { type: "Corporate Law Firms", count: 44, avgSentiment: 0.15 },
    { type: "Academic Institutions", count: 34, avgSentiment: 0.11 },
    { type: "Public Companies", count: 20, avgSentiment: -0.32 }
  ],
  confidenceStats: {
    highConfidence: 240,
    mediumConfidence: 52,
    lowConfidence: 20
  }
};
