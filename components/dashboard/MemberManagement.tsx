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
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Member {
  id: number;
  username: string | null;
  created_at: string;
  points: number;
  level: string;
  platform: string;
}

const levelColors: Record<string, string> = {
  Q1: "bg-gray-100 text-gray-800",
  Q2: "bg-blue-100 text-blue-800",
  Q3: "bg-green-100 text-green-800",
  Q4: "bg-yellow-100 text-yellow-800",
  Q5: "bg-orange-100 text-orange-800",
  Q6: "bg-purple-100 text-purple-800",
  Q7: "bg-red-100 text-red-800",
};

export default function MemberManagement() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/qw/users/top5/",
          { mode: "cors" }
        );

        // Debugging info to verify response
        console.log("Status:", res.status);
        console.log("Content-Type:", res.headers.get("content-type"));

        if (!res.ok) throw new Error("Failed to fetch members");

        const data: Member[] = await res.json();
        console.log("Members data:", data);
        setMembers(data);
      } catch (err) {
        console.error("Error fetching top 5 users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.username ?? member.id}
                  </TableCell>
                  <TableCell>
                    {new Date(member.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.platform}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        levelColors[member.level] ?? "bg-gray-100 text-gray-800"
                      }
                    >
                      {member.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {member.points.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
