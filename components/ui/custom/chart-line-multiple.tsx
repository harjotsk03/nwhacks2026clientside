"use client";

import { AlertCircle, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface EmotionBreakdown {
  frustrated?: number;
  neutral?: number;
  anxious?: number;
  good?: number;
  excited?: number;
}

export interface ArchetypeDetail {
  buy: number;
  skip: number;
  switch: number;
  total: number;
}

export interface SimSummary {
  totalPersonas: number;
  buyCount: number;
  skipCount: number;
  switchCount: number;
  buyRate: number;
  skipRate: number;
  switchRate: number;
  emotionBreakdown: EmotionBreakdown;
  pricePerceptionBreakdown: Record<string, number>;
  trustDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface SimulationResponse {
  success: boolean;
  turnNumber: number;
  aiInsight: string;
  summary: SimSummary;
  momentum: {
    leaving: number;
    staying: number;
    switching: number;
    mood: string;
    marketMood: string;
  };
  brandHealth: {
    permanentlyGone: number;
    onLastChance: number;
    hasRoutine: number;
    averageTrust: number;
  };
  archetypeInsights: Record<string, ArchetypeDetail>;
}

const chartConfig = {
  count: {
    label: "Agents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartLineMultiple({ summary }: { summary: any | null }) {
  if (!summary || !summary.emotionBreakdown) return null;

  // Transform data safely
  const chartData = Object.entries(summary.emotionBreakdown)
    .filter(([_, count]) => (count as number) > 0) // Only show emotions with values
    .map(([emotion, count]) => ({
      emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      count: count as number,
      fill: emotion === "frustrated" ? "#ef4444" : "hsl(var(--chart-1))",
    }));

  const totalActions = (summary.buyCount || 0) + (summary.skipCount || 0);
  const conversionRate =
    totalActions > 0
      ? ((summary.buyCount / totalActions) * 100).toFixed(1)
      : "0";

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-md">Market Sentiment Analysis</CardTitle>
        <CardDescription>Emotional response to current pricing</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 40, top: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            {/* Added YAxis and XAxis correctly */}
            <YAxis dataKey="emotion" type="category" hide />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={5}>
              <LabelList
                dataKey="emotion"
                position="insideLeft"
                offset={8}
                className="fill-white font-medium text-[10px]"
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground font-mono"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm bg-slate-50/50 pt-4">
        <div className="flex gap-2 leading-none font-bold text-red-600">
          <AlertCircle className="h-4 w-4" />
          Critical Sentiment: {summary.emotionBreakdown.frustrated || 0} agents
          frustrated
        </div>
        <div className="text-muted-foreground text-xs">
          Conversion Rate: {conversionRate}%
        </div>
      </CardFooter>
    </Card>
  );
}