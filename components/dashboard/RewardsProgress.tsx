// src/components/dashboard/RewardsProgress.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data - to be replaced with API calls
const rewardsData = [
  {
    level: "Q1",
    points: 100,
    members: 1248,
    target: "Welcome to Race",
    progress: 100,
    winners: "All",
    timeline: "Week 1",
  },
  {
    level: "Q2",
    points: 250,
    members: 342,
    target: "Airtime (2000)",
    progress: 68.4,
    winners: "First 10",
    timeline: "Week 2",
  },
  {
    level: "Q3",
    points: 700,
    members: 87,
    target: "Mystery Box",
    progress: 24.9,
    winners: "First 10",
    timeline: "Week 3",
  },
  {
    level: "Q4",
    points: 850,
    members: 42,
    target: "Badge & Wallet Credit",
    progress: 84,
    winners: "First 5",
    timeline: "Week 4",
  },
  {
    level: "Q5",
    points: 1500,
    members: 18,
    target: "Referral Code",
    progress: 36,
    winners: "First 10",
    timeline: "Week 5",
  },
  {
    level: "Q6",
    points: 2000,
    members: 8,
    target: "VIP Pass / Ambassadorship",
    progress: 160,
    winners: "First 5",
    timeline: "Week 6",
  },
  {
    level: "Q7",
    points: 5000,
    members: 3,
    target: "Cash Reward (200,000)",
    progress: 60,
    winners: "First 5",
    timeline: "Week 7",
  },
];

export default function RewardsProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {rewardsData.map((reward) => (
            <div key={reward.level} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-bold w-8">{reward.level}</span>
                  <span className="text-sm text-muted-foreground">
                    {reward.points} pts
                  </span>
                  <span className="text-sm font-medium">{reward.target}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {reward.members} members
                </div>
              </div>
              <Progress
                value={reward.progress > 100 ? 100 : reward.progress}
                className="h-2"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{reward.winners} winners</span>
                <span>{reward.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
