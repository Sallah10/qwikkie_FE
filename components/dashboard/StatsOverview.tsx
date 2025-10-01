"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, TrendingUp, Target } from "lucide-react";
import { useEffect, useState } from "react";
// Mock data - to be replaced with API calls
interface StatsData {
  totalMembers: number;
  activeThisWeek: number;
  totalPoints: number;
  levelTargets: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
    q6: number;
    q7: number;
  };
}

const statsData = {
  totalMembers: 1248,
  activeThisWeek: 342,
  totalPoints: 45876,
  levelTargets: {
    q1: 1248,
    q2: 342,
    q3: 87,
    q4: 42,
    q5: 18,
    q6: 8,
    q7: 3,
  },
};

export default function StatsOverview() {
  const [, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/mock/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Fallback data
        setStats({
          totalMembers: 1248,
          activeThisWeek: 342,
          totalPoints: 45876,
          levelTargets: {
            q1: 1248,
            q2: 342,
            q3: 87,
            q4: 42,
            q5: 18,
            q6: 8,
            q7: 3,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.totalMembers}</div>
          <p className="text-xs text-muted-foreground">+12% from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active This Week
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.activeThisWeek}</div>
          <p className="text-xs text-muted-foreground">+8% from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statsData.totalPoints.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+1,240 today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Q7 Target Progress
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statsData.levelTargets.q7}/5
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((statsData.levelTargets.q7 / 5) * 100)}% of target
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
