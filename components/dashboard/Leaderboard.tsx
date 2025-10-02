"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Medal, Trophy, ChevronLeft, ChevronRight } from "lucide-react";

interface Member {
  id: number;
  username: string | null;
  points: number;
  level: string;
}

// Fallback data
const fallbackMembers: Member[] = [
  { id: 1, username: "champion_1", points: 12500, level: "Q7" },
  { id: 2, username: "pro_player", points: 9800, level: "Q6" },
  { id: 3, username: "rising_star", points: 7600, level: "Q5" },
  { id: 4, username: "active_member", points: 5400, level: "Q4" },
  { id: 5, username: "dedicated_user", points: 3200, level: "Q3" },
  { id: 6, username: "regular_player", points: 2100, level: "Q2" },
  { id: 7, username: "new_comer", points: 1500, level: "Q1" },
  { id: 8, username: "beginner_1", points: 800, level: "Q1" },
  { id: 9, username: "beginner_2", points: 600, level: "Q1" },
  { id: 10, username: "beginner_3", points: 400, level: "Q1" },
  { id: 11, username: "beginner_4", points: 350, level: "Q1" },
  { id: 12, username: "beginner_5", points: 300, level: "Q1" },
  { id: 13, username: "beginner_6", points: 250, level: "Q1" },
  { id: 14, username: "beginner_7", points: 200, level: "Q1" },
  { id: 15, username: "beginner_8", points: 150, level: "Q1" },
  { id: 16, username: "beginner_9", points: 100, level: "Q1" },
  { id: 17, username: "beginner_10", points: 80, level: "Q1" },
  { id: 18, username: "beginner_11", points: 60, level: "Q1" },
  { id: 19, username: "beginner_12", points: 40, level: "Q1" },
  { id: 20, username: "beginner_13", points: 20, level: "Q1" },
];

function rankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return rank;
}

interface LeaderboardProps {
  isStandalone?: boolean;
}

export default function Leaderboard({
  isStandalone = false,
}: LeaderboardProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isStandalone ? 20 : 10;

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch("http://127.0.0.1:8000/qw/users/top10/", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Member[] = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Error loading leaderboard, using fallback data:", err);
        // Use fallback data if API fails
        setMembers(fallbackMembers);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = isStandalone
    ? members.slice(startIndex, endIndex)
    : members.slice(0, itemsPerPage); // show first 10 for overview

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
          Leaderboard {isStandalone && `(Page ${currentPage} of ${totalPages})`}
        </CardTitle>
        <Trophy className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="p-4 text-center text-muted-foreground">Loading…</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMembers.map((member, idx) => {
                  const globalIndex = isStandalone ? startIndex + idx : idx;
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {rankIcon(globalIndex + 1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.username ?? `User #${member.id}`}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {member.level}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {member.points.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination Controls - Only show for standalone */}
            {isStandalone && members.length > itemsPerPage && (
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
