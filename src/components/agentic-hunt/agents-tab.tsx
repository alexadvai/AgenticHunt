"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Play, Plus, Wifi } from "lucide-react";
import { agents } from "@/lib/agentic-hunt-data";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export function AgentsTab() {
  const { toast } = useToast();

  const handleTriggerScan = (hostname: string) => {
    toast({
      title: "Scan Triggered",
      description: `A new scan has been queued for agent on ${hostname}.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
           <Laptop />
           <CardTitle>Deployed Agents</CardTitle>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Deploy Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deploy New Agent</DialogTitle>
              <DialogDescription>
                Follow these instructions to deploy a new Agentic Hunt agent in
                your environment.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p>1. Download the agent binary for your target OS.</p>
              <p>
                2. Run the agent with the following configuration token to
                onboard it to this instance.
              </p>
              <pre className="p-2 rounded-md bg-muted text-sm overflow-x-auto">
                <code>
                  ./agent -token
                  -abc123xyz-def456-ghi789-jkl012
                </code>
              </pre>
              <p>
                3. The agent will appear in the table once it successfully
                connects.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostname</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Heartbeat</TableHead>
                <TableHead>Scan Mode</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.hostname}</TableCell>
                  <TableCell>{agent.ip}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-500"/> 
                    {formatDistanceToNow(new Date(agent.lastHeartbeat), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={agent.scanMode === "Scheduled" ? "secondary" : "outline"}>
                        {agent.scanMode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {agent.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTriggerScan(agent.hostname)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Trigger Scan
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
