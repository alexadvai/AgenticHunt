"use client";

import { useState } from "react";
import Image from 'next/image';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, Gem, Globe, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { NodeDetailsDrawer } from "./node-details-drawer";


export function AttackGraphsTab() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [date, setDate] = useState<Date>();

  const handleNodeClick = () => {
    setSelectedNode({
      id: "node-uuid-1",
      type: "user",
      label: "svc-admin@corp.local",
      riskScore: 87,
      metadata: {
        hostname: "hostname123",
        ip: "10.0.0.23",
        domain: "corp.local",
        firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        lastSeen: new Date().toISOString(),
        tags: ["Critical", "Exposed"],
      },
    });
    setIsDrawerOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graph Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center gap-4 md:gap-6 rounded-lg border p-4 bg-card-foreground/5">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold text-foreground">Filters</h3>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corp.local">corp.local</SelectItem>
              <SelectItem value="dev.local">dev.local</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by attack type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kerberoasting">Kerberoasting</SelectItem>
              <SelectItem value="lateral-movement">Lateral Movement</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center space-x-2">
            <Switch id="da-paths" />
            <Label htmlFor="da-paths" className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-red-400" /> DA Paths</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="critical-assets" />
            <Label htmlFor="critical-assets" className="flex items-center gap-1.5"><Gem className="h-4 w-4 text-blue-400"/> Critical Assets</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="internet-exposed" />
            <Label htmlFor="internet-exposed" className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-green-400"/> Internet Exposed</Label>
          </div>
        </div>

        <div className="relative w-full h-[60vh] rounded-lg overflow-hidden border bg-background">
          <Image src="https://placehold.co/1200x800.png" alt="Attack Graph" layout="fill" objectFit="cover" data-ai-hint="network graph" />
           <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 right-4">
             <Button onClick={handleNodeClick}>View Example Node Details</Button>
          </div>
          <div className="absolute top-4 left-4 p-2 bg-black/50 rounded-lg">
            <p className="text-sm text-white">Neo4j-style graph visualization area</p>
          </div>
        </div>
      </CardContent>
      <NodeDetailsDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        node={selectedNode}
      />
    </Card>
  );
}
