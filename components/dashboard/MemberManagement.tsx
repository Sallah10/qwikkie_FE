"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Member {
  id: number;
  username: string | null;
  created_at: string;
  points: number;
  level: string;
  platform: string;
}

// Fallback mock data
const fallbackMembers: Member[] = [
  {
    id: 1,
    username: "john_doe",
    created_at: "2024-01-15T10:30:00Z",
    points: 12500,
    level: "Q7",
    platform: "telegram",
  },
  {
    id: 2,
    username: "sarah_wilson",
    created_at: "2024-01-20T14:20:00Z",
    points: 9800,
    level: "Q6",
    platform: "instagram",
  },
  {
    id: 3,
    username: "mike_tyson",
    created_at: "2024-02-05T09:15:00Z",
    points: 7600,
    level: "Q5",
    platform: "facebook",
  },
  {
    id: 4,
    username: "emma_stone",
    created_at: "2024-02-10T16:45:00Z",
    points: 5400,
    level: "Q4",
    platform: "telegram",
  },
  {
    id: 5,
    username: "alex_jones",
    created_at: "2024-02-15T11:20:00Z",
    points: 3200,
    level: "Q3",
    platform: "x",
  },
  {
    id: 6,
    username: "lisa_ray",
    created_at: "2024-02-20T13:10:00Z",
    points: 2100,
    level: "Q2",
    platform: "tiktok",
  },
  {
    id: 7,
    username: "tom_cruise",
    created_at: "2024-03-01T08:30:00Z",
    points: 1500,
    level: "Q1",
    platform: "instagram",
  },
  {
    id: 8,
    username: "anna_karenina",
    created_at: "2024-03-05T12:25:00Z",
    points: 800,
    level: "Q1",
    platform: "telegram",
  },
  {
    id: 9,
    username: "bruce_wayne",
    created_at: "2024-03-10T15:40:00Z",
    points: 600,
    level: "Q1",
    platform: "facebook",
  },
  {
    id: 10,
    username: "diana_prince",
    created_at: "2024-03-15T10:15:00Z",
    points: 400,
    level: "Q1",
    platform: "x",
  },
  {
    id: 11,
    username: "peter_parker",
    created_at: "2024-03-20T14:50:00Z",
    points: 350,
    level: "Q1",
    platform: "telegram",
  },
  {
    id: 12,
    username: "tony_stark",
    created_at: "2024-03-25T09:35:00Z",
    points: 300,
    level: "Q1",
    platform: "instagram",
  },
  {
    id: 13,
    username: "steve_rogers",
    created_at: "2024-04-01T11:20:00Z",
    points: 250,
    level: "Q1",
    platform: "tiktok",
  },
  {
    id: 14,
    username: "natasha_romanoff",
    created_at: "2024-04-05T13:45:00Z",
    points: 200,
    level: "Q1",
    platform: "facebook",
  },
  {
    id: 15,
    username: "clint_barton",
    created_at: "2024-04-10T16:30:00Z",
    points: 150,
    level: "Q1",
    platform: "telegram",
  },
];

const levelColors: Record<string, string> = {
  Q1: "bg-gray-100 text-gray-800",
  Q2: "bg-blue-100 text-blue-800",
  Q3: "bg-green-100 text-green-800",
  Q4: "bg-yellow-100 text-yellow-800",
  Q5: "bg-orange-100 text-orange-800",
  Q6: "bg-purple-100 text-purple-800",
  Q7: "bg-red-100 text-red-800",
};

const platformColors: Record<string, string> = {
  telegram: "bg-blue-100 text-blue-800",
  instagram: "bg-pink-100 text-pink-800",
  facebook: "bg-blue-100 text-blue-800",
  tiktok: "bg-black text-white",
  x: "bg-black text-white",
};

interface MemberManagementProps {
  isStandalone?: boolean;
}

export default function MemberManagement({
  isStandalone = false,
}: MemberManagementProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isStandalone ? 10 : 10; // Show 10 for both, but paginate only in standalone

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("http://127.0.0.1:8000/qw/users/top5/", {
          mode: "cors",
        });

        if (!res.ok) throw new Error("Failed to fetch members");

        const data: Member[] = await res.json();
        console.log("Members data:", data);
        setMembers(data);
        setFilteredMembers(data);
      } catch (err) {
        console.error("Error fetching members, using fallback data:", err);
        // Use fallback data if API fails
        setMembers(fallbackMembers);
        setFilteredMembers(fallbackMembers);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(members);
      setCurrentPage(1);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = members.filter(
        (member) =>
          member.username?.toLowerCase().includes(query) ||
          member.platform.toLowerCase().includes(query) ||
          member.level.toLowerCase().includes(query) ||
          member.id.toString().includes(query)
      );
      setFilteredMembers(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, members]);

  // Pagination logic - Only for standalone mode
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Show first 10 for overview, paginated for standalone
  const currentMembers = isStandalone
    ? filteredMembers.slice(startIndex, endIndex)
    : filteredMembers.slice(0, 10); // Always show first 10 for overview

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Member Management</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="p-4 text-center text-muted-foreground">Loading…</p>
        ) : (
          <>
            {/* Search results info */}
            {searchQuery && (
              <div className="mb-4 text-sm text-muted-foreground">
                Found {filteredMembers.length} member
                {filteredMembers.length !== 1 ? "s" : ""} matching &quot;
                {searchQuery}&quot;
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.username ?? `User #${member.id}`}
                      </TableCell>
                      <TableCell>
                        {new Date(member.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            platformColors[member.platform] ??
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {member.platform}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            levelColors[member.level] ??
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {member.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {member.points.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No members found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls - Only show for standalone */}
            {isStandalone && filteredMembers.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredMembers.length)} of{" "}
                  {filteredMembers.length} members
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
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
              </div>
            )}

            {/* Show "View All" message for overview */}
            {!isStandalone && filteredMembers.length > 10 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing 10 of {filteredMembers.length} members.{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  View all members
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
