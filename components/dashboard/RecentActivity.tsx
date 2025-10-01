"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Heart,
  Share,
  UserPlus,
  Calendar,
} from "lucide-react";

interface Activity {
  id: number;
  username: string | null;
  action: string;
  points: number;
  platform: string;
  created_at: string;
}

// icon + color maps
const actionIcons: Record<string, JSX.Element> = {
  comment: <MessageSquare className="h-4 w-4 text-blue-500" />,
  like: <Heart className="h-4 w-4 text-red-500" />,
  share: <Share className="h-4 w-4 text-green-500" />,
  referral: <UserPlus className="h-4 w-4 text-purple-500" />,
  follow: <UserPlus className="h-4 w-4 text-blue-500" />,
};

const platformColors: Record<string, string> = {
  telegram: "bg-blue-100 text-blue-800",
  instagram: "bg-pink-100 text-pink-800",
  facebook: "bg-blue-100 text-blue-800",
  tiktok: "bg-black text-white",
  x: "bg-black text-white",
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/qw/pointslog/first7/",
          { headers: { "Content-Type": "application/json" } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // map backend keys to our interface
        const mapped: Activity[] = data.map((item: any) => ({
          id: item.id,
          username: item.display_name,
          action: item.action,
          points: item.points,
          platform: item.platform,
          created_at: item.created_at,
        }));
        setActivities(mapped);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="p-4 text-center text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {actionIcons[activity.action] ??
                    <MessageSquare className="h-4 w-4 text-gray-400" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {activity.username ?? `User #${activity.id}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(activity.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={
                        platformColors[activity.platform] ??
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {activity.platform}
                    </Badge>
                    <span className="text-xs capitalize">{activity.action}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    +{activity.points} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
