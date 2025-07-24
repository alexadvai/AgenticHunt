"use client";

import { useState } from "react";
import {
  suggestGraphQueries,
} from "@/ai/flows/suggest-graph-queries";
import { summarizeCriticalPaths } from "@/ai/flows/summarize-critical-paths";
import { detectPrivilegeEscalation } from "@/ai/flows/detect-privilege-escalation";
import { remediateVulnerability } from "@/ai/flows/remediate-vulnerability";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, ShieldCheck, Sparkles } from "lucide-react";

type AIResult = {
  title: string;
  content: string | string[];
};

type VulnerabilityDetails = {
    type: string;
    details: string;
}

export function AICopilot() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);
  const [detectedVulnerability, setDetectedVulnerability] = useState<VulnerabilityDetails | null>(null);

  const handleSuggestQueries = async () => {
    setIsLoading("suggest");
    setResult(null);
    setDetectedVulnerability(null);
    try {
      const res = await suggestGraphQueries({
        environmentDescription: "Corporate network with AD, cloud resources, and developer machines.",
        observables: ["User 'j.doe' has admin rights on 'workstation-123'", "Kerberos ticket for 'svc-web' seen on 'dc-01'"],
      });
      setResult({ title: "Suggested Queries", content: res.queries });
      toast({ title: "AI suggestions ready!" });
    } catch (e) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not suggest queries." });
    } finally {
      setIsLoading(null);
    }
  };
  
  const handleSummarizePaths = async () => {
    setIsLoading("summarize");
    setResult(null);
    setDetectedVulnerability(null);
    try {
      const res = await summarizeCriticalPaths({
        attackGraphData: JSON.stringify({nodes: [], edges: []}),
        targetAssets: JSON.stringify(['Domain Admins Group'])
      });
      setResult({ title: "Critical Paths Summary", content: res.summary });
      toast({ title: "AI summary complete!" });
    } catch (e) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not summarize paths." });
    } finally {
      setIsLoading(null);
    }
  };
  
  const handleDetectEscalation = async () => {
    setIsLoading("escalation");
    setResult(null);
    setDetectedVulnerability(null);
    try {
      const res = await detectPrivilegeEscalation({
        userPermissions: "User 'test-user' is member of 'Domain Users'",
        systemConfigurations: "Group 'Domain Users' has write access to GPO 'Default Domain Policy'",
      });
       if(res.escalationDetected) {
            setResult({ title: "Privilege Escalation Detected", content: [res.explanation, `Severity: ${res.severity}`, ...res.recommendations] });
            setDetectedVulnerability({ type: "Privilege Escalation", details: res.explanation });
            toast({ title: "Vulnerability detected!" });
       } else {
            setResult({ title: "No Privilege Escalation Detected", content: "No vulnerabilities found based on the provided data."});
            toast({ title: "Scan complete!"});
       }
    } catch (e) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not detect escalation." });
    } finally {
      setIsLoading(null);
    }
  };

  const handleRemediate = async () => {
    if (!detectedVulnerability) return;
    setIsLoading("remediate");
    setResult(null);
    try {
        const res = await remediateVulnerability({
            vulnerabilityType: detectedVulnerability.type,
            details: detectedVulnerability.details,
        });
        setResult({ title: "Remediation Plan", content: res.remediationPlan });
        toast({ title: "Remediation plan generated." });
    } catch (e) {
        toast({ variant: "destructive", title: "AI Error", description: "Could not generate remediation plan."});
    } finally {
        setIsLoading(null);
        setDetectedVulnerability(null);
    }
  }

  return (
    <div>
        <h4 className="font-semibold text-lg flex items-center gap-2 mb-2">
            <Bot className="text-accent" />
            Agentic AI Copilot
        </h4>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Suggest Graph Queries</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-2">Get AI-suggested queries based on the current context.</p>
                    <Button onClick={handleSuggestQueries} disabled={!!isLoading} size="sm">
                        {isLoading === 'suggest' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Suggest
                    </Button>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Summarize Critical Paths</AccordionTrigger>
                <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-2">Generate a plain-English summary of critical attack paths.</p>
                     <Button onClick={handleSummarizePaths} disabled={!!isLoading} size="sm">
                        {isLoading === 'summarize' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Summarize
                    </Button>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Detect Privilege Escalation</AccordionTrigger>
                <AccordionContent>
                     <p className="text-sm text-muted-foreground mb-2">Analyze permissions and configurations for vulnerabilities.</p>
                     <Button onClick={handleDetectEscalation} disabled={!!isLoading} size="sm">
                        {isLoading === 'escalation' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Detect
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        {result && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
                <h5 className="font-bold mb-2">{result.title}</h5>
                {Array.isArray(result.content) ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {result.content.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                ) : (
                    <p className="text-sm">{result.content}</p>
                )}
            </div>
        )}

        {detectedVulnerability && (
            <div className="mt-4">
                 <Button onClick={handleRemediate} disabled={!!isLoading} className="w-full">
                    {isLoading === 'remediate' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                    Generate Remediation Plan
                </Button>
            </div>
        )}
    </div>
  );
}
