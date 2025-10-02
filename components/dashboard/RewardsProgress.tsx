// src/components/dashboard/RewardsProgress.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - to be replaced with API calls
const rewardsData = [
  {
    level: "Q1",
    points: 100,
    members: 1248,
  },
  {
    level: "Q2",
    points: 250,
    members: 342,
  },
  {
    level: "Q3",
    points: 700,
    members: 87,
  },
  {
    level: "Q4",
    points: 850,
    members: 42,
  },
  {
    level: "Q5",
    points: 1500,
    members: 18,
  },
  {
    level: "Q6",
    points: 2000,
    members: 8,
  },
  {
    level: "Q7",
    points: 5000,
    members: 3,
  },
];

export default function RewardsProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Levels Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewardsData.map((reward) => (
            <div
              key={reward.level}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg w-8">{reward.level}</span>
                <div className="text-sm">
                  <div className="font-medium">{reward.points} points</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{reward.members}</div>
                <div className="text-xs text-muted-foreground">members</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
