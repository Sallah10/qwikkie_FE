// src/components/dashboard/Charts.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Mock data for charts
const pointsDistributionData = [
  { level: "Q1", points: 100, members: 1248, target: 1248 },
  { level: "Q2", points: 250, members: 342, target: 500 },
  { level: "Q3", points: 700, members: 87, target: 350 },
  { level: "Q4", points: 850, members: 42, target: 200 },
  { level: "Q5", points: 1500, members: 18, target: 100 },
  { level: "Q6", points: 2000, members: 8, target: 50 },
  { level: "Q7", points: 5000, members: 3, target: 25 },
];

const socialMediaData = [
  { platform: "TikTok", follows: 650, likes: 1240, shares: 320, comments: 180 },
  {
    platform: "Instagram",
    follows: 280,
    likes: 980,
    shares: 210,
    comments: 120,
  },
  {
    platform: "Facebook",
    follows: 420,
    likes: 1560,
    shares: 430,
    comments: 95,
  },
  { platform: "X", follows: 90, likes: 340, shares: 120, comments: 65 },
];

const weeklyProgressData = [
  { week: "Week 1", points: 12000, newMembers: 240 },
  { week: "Week 2", points: 19500, newMembers: 180 },
  { week: "Week 3", points: 23000, newMembers: 150 },
  { week: "Week 4", points: 29500, newMembers: 120 },
  { week: "Week 5", points: 35800, newMembers: 90 },
  { week: "Week 6", points: 41200, newMembers: 75 },
  { week: "Week 7", points: 45800, newMembers: 60 },
];

const levelDistributionData = [
  { name: "Q1", value: 1248 },
  { name: "Q2", value: 342 },
  { name: "Q3", value: 87 },
  { name: "Q4", value: 42 },
  { name: "Q5", value: 18 },
  { name: "Q6", value: 8 },
  { name: "Q7", value: 3 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FF6B6B",
];

export function PointsDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Points Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pointsDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="members" fill="#8884d8" />
              <Bar dataKey="target" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function SocialMediaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={socialMediaData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="follows" stackId="a" fill="#8884d8" />
              <Bar dataKey="likes" stackId="a" fill="#82ca9d" />
              <Bar dataKey="shares" stackId="a" fill="#ffc658" />
              <Bar dataKey="comments" stackId="a" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function WeeklyProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="points"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="newMembers"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function LevelDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={levelDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {levelDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
