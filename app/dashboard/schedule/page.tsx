// src/app/dashboard/schedule/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Trophy, Users } from "lucide-react";

export default function SchedulePage() {
  const upcomingEvents = [
    {
      id: 1,
      name: "Weekly Challenge Announcement",
      date: "Nov 12, 2023",
      time: "2:00 PM",
      type: "Challenge",
    },
    {
      id: 2,
      name: "Q2 Reward Distribution",
      date: "Nov 15, 2023",
      time: "10:00 AM",
      type: "Reward",
    },
    {
      id: 3,
      name: "Community AMA Session",
      date: "Nov 18, 2023",
      time: "4:00 PM",
      type: "Event",
    },
    {
      id: 4,
      name: "Q3 Target Deadline",
      date: "Nov 25, 2023",
      time: "11:59 PM",
      type: "Deadline",
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "Challenge":
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case "Reward":
        return <Users className="h-5 w-5 text-green-500" />;
      case "Event":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "Deadline":
        return <Calendar className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Schedule & Events"
        description="Manage upcoming events and deadlines"
      />

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {event.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
