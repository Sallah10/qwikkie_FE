"use client";

import { JSX, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Heart,
  Share,
  UserPlus,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Activity {
  id: number;
  username: string | null;
  action: string;
  points: number;
  platform: string;
  created_at: string;
}

// Fallback data
const fallbackActivities: Activity[] = [
  {
    id: 1,
    username: "john_doe",
    action: "comment",
    points: 50,
    platform: "telegram",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
  },
  {
    id: 2,
    username: "sarah_w",
    action: "like",
    points: 10,
    platform: "instagram",
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
  },
  {
    id: 3,
    username: "mike_t",
    action: "share",
    points: 100,
    platform: "facebook",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 4,
    username: "anna_k",
    action: "referral",
    points: 200,
    platform: "telegram",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 5,
    username: "tom_b",
    action: "follow",
    points: 25,
    platform: "x",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 6,
    username: "lisa_m",
    action: "comment",
    points: 50,
    platform: "tiktok",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 7,
    username: "alex_r",
    action: "like",
    points: 10,
    platform: "instagram",
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
];

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

interface RecentActivityProps {
  isStandalone?: boolean;
}

export default function RecentActivity({
  isStandalone = false,
}: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isStandalone ? 20 : 10;

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch("http://127.0.0.1:8000/qw/pointslog/first7/", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // map backend keys to our interface
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        console.error(
          "Error fetching recent activities, using fallback data:",
          err
        );
        // Use fallback data if API fails
        setActivities(fallbackActivities);
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

  // Pagination logic
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = isStandalone
    ? activities.slice(startIndex, endIndex)
    : activities.slice(0, itemsPerPage); // Always show first 10 for overview

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Activity{" "}
          {isStandalone && `(Page ${currentPage} of ${totalPages})`}
        </CardTitle>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="p-4 text-center text-muted-foreground">Loading…</p>
        ) : (
          <>
            <div className="space-y-4">
              {currentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {actionIcons[activity.action] ?? (
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                    )}
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
                      <span className="text-xs capitalize">
                        {activity.action}
                      </span>
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

            {/* Pagination Controls - Only show for standalone */}
            {isStandalone && activities.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
