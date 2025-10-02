"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface StatsData {
  totalMembers: number;
  q1Users: number;
  q2Users: number;
  q3Users: number;
}

// Fallback data
const fallbackData: StatsData = {
  totalMembers: 1248,
  q1Users: 342,
  q2Users: 87,
  q3Users: 42,
};

export default function StatsOverview() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch data from all endpoints in parallel
        const [totalUsersRes, q1Res, q2Res, q3Res] = await Promise.allSettled([
          fetch("http://127.0.0.1:8000/qw/stats/total-users/"),
          fetch("http://127.0.0.1:8000/qw/stats/total_q1/"),
          fetch("http://127.0.0.1:8000/qw/stats/total_q2/"),
          fetch("http://127.0.0.1:8000/qw/stats/total_q3/"),
        ]);

        // Extract data from responses with fallback values
        const totalMembers =
          totalUsersRes.status === "fulfilled" && totalUsersRes.value.ok
            ? await totalUsersRes.value
                .json()
                .then(
                  (data) =>
                    data.count || data.total || fallbackData.totalMembers
                )
            : fallbackData.totalMembers;

        const q1Users =
          q1Res.status === "fulfilled" && q1Res.value.ok
            ? await q1Res.value
                .json()
                .then(
                  (data) => data.count || data.total || fallbackData.q1Users
                )
            : fallbackData.q1Users;

        const q2Users =
          q2Res.status === "fulfilled" && q2Res.value.ok
            ? await q2Res.value
                .json()
                .then(
                  (data) => data.count || data.total || fallbackData.q2Users
                )
            : fallbackData.q2Users;

        const q3Users =
          q3Res.status === "fulfilled" && q3Res.value.ok
            ? await q3Res.value
                .json()
                .then(
                  (data) => data.count || data.total || fallbackData.q3Users
                )
            : fallbackData.q3Users;

        // Update stats with new data
        setStats({
          totalMembers,
          q1Users,
          q2Users,
          q3Users,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Use fallback data if any error occurs
        setStats(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Use fallback data while loading or if stats is null
  const displayStats = stats || fallbackData;

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
      {/* Total Members Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {displayStats.totalMembers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">All registered users</p>
        </CardContent>
      </Card>

      {/* Q1 Users Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Q1 Users</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {displayStats.q1Users.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round(
              (displayStats.q1Users / displayStats.totalMembers) * 100
            )}
            % of total
          </p>
        </CardContent>
      </Card>

      {/* Q2 Users Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Q2 Users</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {displayStats.q2Users.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round(
              (displayStats.q2Users / displayStats.totalMembers) * 100
            )}
            % of total
          </p>
        </CardContent>
      </Card>

      {/* Q3 Users Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Q3 Users</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {displayStats.q3Users.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round(
              (displayStats.q3Users / displayStats.totalMembers) * 100
            )}
            % of total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
