"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { AICopilot } from "./ai-copilot";
import { Badge } from "../ui/badge";

type NodeDetailsDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  node: any;
};

export function NodeDetailsDrawer({
  isOpen,
  setIsOpen,
  node,
}: NodeDetailsDrawerProps) {
  if (!node) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <div className="h-full flex flex-col">
            <SheetHeader className="p-6">
            <SheetTitle className="text-2xl">{node.label}</SheetTitle>
            <SheetDescription>
                Details for {node.type} node.
            </SheetDescription>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
                <div>
                    <h4 className="font-semibold text-lg">Node Information</h4>
                    <Separator className="my-2" />
                    <div className="space-y-2 text-sm">
                        <p><strong>ID:</strong> <code className="text-xs">{node.id}</code></p>
                        <p><strong>Type:</strong> <span className="capitalize">{node.type}</span></p>
                        <div className="flex items-center gap-1"><strong>Risk Score:</strong> <Badge variant={node.riskScore > 75 ? "destructive" : "secondary"}>{node.riskScore}</Badge></div>
                        <p><strong>First Seen:</strong> {new Date(node.metadata.firstSeen).toLocaleString()}</p>
                        <p><strong>Last Seen:</strong> {new Date(node.metadata.lastSeen).toLocaleString()}</p>
                        <div>
                            <strong>Tags:</strong>
                            <div className="flex gap-2 flex-wrap mt-1">
                                {node.metadata.tags.map((tag: string) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <AICopilot />
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
