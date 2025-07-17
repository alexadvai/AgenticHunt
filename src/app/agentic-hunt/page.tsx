import { AttackGraphsTab } from "@/components/agentic-hunt/attack-graphs-tab";
import { AgentsTab } from "@/components/agentic-hunt/agents-tab";
import { HuntQueriesTab } from "@/components/agentic-hunt/hunt-queries-tab";
import { ObservablesTab } from "@/components/agentic-hunt/observables-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network } from "lucide-react";

export default function AgenticHuntPage() {
  return (
    <div className="flex-grow p-4 md:p-8">
      <header className="mb-6 flex items-center gap-4">
        <Network className="h-10 w-10 text-accent" />
        <div>
            <h1 className="text-3xl font-bold text-foreground">Agentic Hunt</h1>
            <p className="text-muted-foreground">
                Graph-based analysis and visual threat hunting for enterprise environments.
            </p>
        </div>
      </header>
      <Tabs defaultValue="attack-graphs" className="flex-grow">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="attack-graphs">Attack Graphs</TabsTrigger>
          <TabsTrigger value="hunt-queries">Hunt Queries</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="observables">Observables</TabsTrigger>
        </TabsList>
        <TabsContent value="attack-graphs" className="mt-6">
          <AttackGraphsTab />
        </TabsContent>
        <TabsContent value="hunt-queries" className="mt-6">
          <HuntQueriesTab />
        </TabsContent>
        <TabsContent value="agents" className="mt-6">
          <AgentsTab />
        </TabsContent>
        <TabsContent value="observables" className="mt-6">
          <ObservablesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
