"use client";

import { useState } from "react";
import { generateHuntQuery } from "@/ai/flows/ai-assist-hunt-queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Library, Loader2, Play, Search, Terminal } from "lucide-react";

export function HuntQueriesTab() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const prebuiltQueries = [
    {
      title: "Find all paths to Domain Admins within 3 hops",
      query: "MATCH p = shortestPath((n)-[*1..3]->(g:Group {name: 'DOMAIN ADMINS@CORP.LOCAL'})) RETURN p",
    },
    {
      title: "Find all Kerberoastable users",
      query: "MATCH (u:User)-[:MemberOf*1..]->(g:Group) WHERE u.hasspn = true RETURN u, g",
    },
    {
      title: "Shortest paths from internet-exposed assets",
      query: "MATCH p = allShortestPaths((n)-[*]-(d:Domain)) WHERE n.exposed = true RETURN p",
    },
  ];

  const handleGenerateQuery = async () => {
    if (!prompt) {
      toast({
        title: "Prompt is empty",
        description: "Please enter an objective for the hunt query.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedQuery("");
    try {
      const result = await generateHuntQuery({ objective: prompt });
      setGeneratedQuery(result.query);
      toast({
        title: "Query Generated",
        description: "AI has successfully generated a hunt query.",
      });
    } catch (error) {
      console.error("Error generating query:", error);
      toast({
        title: "Error",
        description: "Failed to generate hunt query.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunQuery = (query: string) => {
    toast({
      title: "Executing Query",
      description: `Running: ${query.substring(0, 50)}... Results will be shown in the Attack Graphs tab.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Library /> Pre-built Query Library
          </CardTitle>
          <CardDescription>
            Select from a list of common, high-impact hunt queries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {prebuiltQueries.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  <code className="block bg-muted p-2 rounded-md text-sm mb-2">
                    {item.query}
                  </code>
                  <Button size="sm" onClick={() => handleRunQuery(item.query)}>
                    <Play className="mr-2 h-4 w-4" /> Run Query
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI-Assisted Query Generation
            </CardTitle>
            <CardDescription>
              Describe your objective in plain English to generate a query.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="e.g., 'Find all paths from the finance department to critical servers'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
              <Button onClick={handleGenerateQuery} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Generate Query
              </Button>
              {generatedQuery && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Generated Query:</h4>
                  <code className="block bg-muted p-2 rounded-md text-sm mb-2">
                    {generatedQuery}
                  </code>
                   <Button size="sm" onClick={() => handleRunQuery(generatedQuery)}>
                    <Play className="mr-2 h-4 w-4" /> Run Generated Query
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal /> Custom Query
            </CardTitle>
            <CardDescription>
              Write your own hunt queries using BloodHound-style syntax.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Textarea placeholder="MATCH (n:User)-... RETURN *" rows={4}/>
             <Button className="mt-2" onClick={() => handleRunQuery("Custom Query")}>
                <Play className="mr-2 h-4 w-4" /> Run Custom Query
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
