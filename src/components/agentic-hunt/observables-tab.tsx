"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { observables } from "@/lib/agentic-hunt-data";
import { format } from "date-fns";
import {
  Eye,
  KeyRound,
  Ticket,
  UserCheck,
  Users2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const iconMap = {
  kerberos_ticket: <Ticket className="h-4 w-4" />,
  group_membership: <Users2 className="h-4 w-4" />,
  session_token: <KeyRound className="h-4 w-4" />,
  admin_rights: <UserCheck className="h-4 w-4" />,
};

export function ObservablesTab() {
  const [showAiInsight, setShowAiInsight] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
            <Eye />
            <CardTitle>Collected Observables</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ai-insight-toggle"
            checked={showAiInsight}
            onCheckedChange={setShowAiInsight}
          />
          <Label htmlFor="ai-insight-toggle" className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Insight
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Source Host</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Associated User</TableHead>
                {showAiInsight && <TableHead>AI Insight</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {observables.map((obs) => (
                <TableRow key={obs.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {iconMap[obs.type]}
                      <span className="capitalize">
                        {obs.type.replace("_", " ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{obs.value}</TableCell>
                  <TableCell>{obs.sourceHost}</TableCell>
                  <TableCell>
                    {format(new Date(obs.collectedAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>{obs.associatedUser}</TableCell>
                  {showAiInsight && (
                    <TableCell>
                      {obs.isSuspicious ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="destructive" className="gap-1.5">
                                <AlertTriangle className="h-3 w-3" />
                                Suspicious
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-semibold">{obs.aiTag}</p>
                              <p>{obs.aiReasoning}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Badge variant="secondary">Normal</Badge>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
