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

export const mockComments: Comment[] = [
  {
    id: "1",
    stakeholderType: "Public Citizen",
    clause: "Section 3.2 - Environmental Protection",
    commentText: "I strongly support the new environmental protection measures proposed in this policy. The regulations will help preserve our natural resources for future generations and ensure sustainable development practices.",
    sentiment: "positive",
    sentimentScore: 0.85,
    confidence: 0.92,
    summary: "Strong support for environmental protection measures and sustainable development focus.",
    keywords: ["environmental protection", "sustainable development", "natural resources", "regulations"],
    analyzedAt: "2024-01-15T10:30:00Z",
    flagged: false
  },
  {
    id: "2",
    stakeholderType: "Industry Association",
    clause: "Section 4.1 - Compliance Requirements",
    commentText: "The proposed compliance timeline is unrealistic for small businesses. We need at least 18 months instead of 12 to properly implement these changes without significant financial burden.",
    sentiment: "negative",
    sentimentScore: -0.65,
    confidence: 0.88,
    summary: "Concerns about unrealistic compliance timeline for small businesses, requests extension to 18 months.",
    keywords: ["compliance timeline", "small businesses", "financial burden", "implementation"],
    analyzedAt: "2024-01-15T11:45:00Z",
    flagged: true
  },
  {
    id: "3",
    stakeholderType: "Environmental NGO",
    clause: "Section 2.3 - Emission Standards",
    commentText: "While we appreciate the effort to address emissions, the proposed standards may not be stringent enough to meet our climate commitments. We recommend adopting stricter targets aligned with international best practices.",
    sentiment: "mixed",
    sentimentScore: 0.15,
    confidence: 0.76,
    summary: "Appreciates emission efforts but suggests stricter standards aligned with international practices.",
    keywords: ["emission standards", "climate commitments", "international practices", "stricter targets"],
    analyzedAt: "2024-01-15T14:20:00Z",
    flagged: false
  },
  {
    id: "4",
    stakeholderType: "Academic Institution",
    clause: "Section 1.4 - Research Provisions",
    commentText: "The research funding allocation is adequate and will support important studies on policy effectiveness. However, consideration should be given to including interdisciplinary approaches.",
    sentiment: "neutral",
    sentimentScore: 0.25,
    confidence: 0.81,
    summary: "Adequate research funding noted, suggests including interdisciplinary approaches.",
    keywords: ["research funding", "policy effectiveness", "interdisciplinary approaches", "studies"],
    analyzedAt: "2024-01-15T16:10:00Z",
    flagged: false
  },
  {
    id: "5",
    stakeholderType: "Municipal Government",
    clause: "Section 5.2 - Local Implementation",
    commentText: "Local governments will face significant challenges implementing these policies without adequate provincial support and funding. We strongly urge the government to provide comprehensive implementation assistance.",
    sentiment: "negative",
    sentimentScore: -0.72,
    confidence: 0.85,
    summary: "Local implementation concerns, requests comprehensive provincial support and funding assistance.",
    keywords: ["local implementation", "provincial support", "funding assistance", "implementation challenges"],
    analyzedAt: "2024-01-15T09:15:00Z",
    flagged: true
  }
];

export const mockAnalytics: AnalyticsData = {
  totalComments: 247,
  sentimentDistribution: {
    positive: 89,
    negative: 76,
    neutral: 52,
    mixed: 30
  },
  topKeywords: [
    { word: "environmental protection", count: 45, sentiment: "positive" },
    { word: "compliance costs", count: 38, sentiment: "negative" },
    { word: "implementation timeline", count: 32, sentiment: "mixed" },
    { word: "sustainable development", count: 28, sentiment: "positive" },
    { word: "funding support", count: 25, sentiment: "neutral" },
    { word: "regulatory burden", count: 23, sentiment: "negative" },
    { word: "climate commitments", count: 21, sentiment: "positive" },
    { word: "small businesses", count: 19, sentiment: "negative" }
  ],
  stakeholderBreakdown: [
    { type: "Public Citizens", count: 95, avgSentiment: 0.35 },
    { type: "Industry Associations", count: 68, avgSentiment: -0.42 },
    { type: "Environmental NGOs", count: 42, avgSentiment: 0.18 },
    { type: "Academic Institutions", count: 28, avgSentiment: 0.12 },
    { type: "Municipal Governments", count: 14, avgSentiment: -0.28 }
  ],
  confidenceStats: {
    highConfidence: 186,
    mediumConfidence: 43,
    lowConfidence: 18
  }
};