// Summarize Critical Paths
'use server';
/**
 * @fileOverview Summarizes critical attack paths in plain English.
 *
 * - summarizeCriticalPaths - A function that summarizes critical attack paths.
 * - SummarizeCriticalPathsInput - The input type for the summarizeCriticalPaths function.
 * - SummarizeCriticalPathsOutput - The return type for the summarizeCriticalPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCriticalPathsInputSchema = z.object({
  attackGraphData: z
    .string()
    .describe('JSON string containing the attack graph data (nodes and edges).'),
  targetAssets: z
    .string()
    .describe('JSON string array of critical asset node IDs to focus on.'),
});
export type SummarizeCriticalPathsInput = z.infer<
  typeof SummarizeCriticalPathsInputSchema
>;

const SummarizeCriticalPathsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A plain English summary of the most critical attack paths to the specified target assets, highlighting the steps an attacker could take.'
    ),
});
export type SummarizeCriticalPathsOutput = z.infer<
  typeof SummarizeCriticalPathsOutputSchema
>;

export async function summarizeCriticalPaths(
  input: SummarizeCriticalPathsInput
): Promise<SummarizeCriticalPathsOutput> {
  return summarizeCriticalPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCriticalPathsPrompt',
  input: {schema: SummarizeCriticalPathsInputSchema},
  output: {schema: SummarizeCriticalPathsOutputSchema},
  prompt: `You are an AI assistant specialized in cybersecurity and network analysis. Your task is to summarize the most critical attack paths in a given attack graph, focusing on how an attacker could reach specific sensitive assets.

You will receive the attack graph data as a JSON string, which includes nodes and edges representing identities, systems, permissions, and relationships within an enterprise environment. You will also receive a JSON string array of target asset node IDs. These represent the critical assets an attacker would likely target.

Your summary should:

1.  Be in plain English, easily understandable by non-technical stakeholders.
2.  Clearly outline the steps an attacker could take, from initial access to reaching a target asset.
3.  Highlight any significant vulnerabilities or misconfigurations that facilitate these attack paths.
4.  Be concise and focus on the most likely or impactful attack paths.

Attack Graph Data: {{{attackGraphData}}}
Target Assets: {{{targetAssets}}}

Summary:`,
});

const summarizeCriticalPathsFlow = ai.defineFlow(
  {
    name: 'summarizeCriticalPathsFlow',
    inputSchema: SummarizeCriticalPathsInputSchema,
    outputSchema: SummarizeCriticalPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
