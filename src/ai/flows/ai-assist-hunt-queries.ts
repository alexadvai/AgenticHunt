// src/ai/flows/ai-assist-hunt-queries.ts
'use server';
/**
 * @fileOverview AI-assisted hunt query generation flow.
 *
 * - generateHuntQuery - A function that generates a hunt query based on user input.
 * - GenerateHuntQueryInput - The input type for the generateHuntQuery function.
 * - GenerateHuntQueryOutput - The return type for the generateHuntQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHuntQueryInputSchema = z.object({
  objective: z
    .string()
    .describe(
      'The objective of the hunt query.  For example: find all paths to domain admin from a specific user.'
    ),
  domain: z.string().optional().describe('The domain to focus the query on.'),
  attackType: z
    .string()
    .optional()
    .describe('The type of attack to look for, e.g., Kerberoasting, Lateral Movement.'),
  hopLimit: z
    .number()
    .optional()
    .describe('The maximum number of hops to include in the query.'),
});
export type GenerateHuntQueryInput = z.infer<typeof GenerateHuntQueryInputSchema>;

const GenerateHuntQueryOutputSchema = z.object({
  query: z
    .string()
    .describe('The generated hunt query in BloodHound-style syntax.'),
  description: z.string().describe('A plain English description of the query.'),
});
export type GenerateHuntQueryOutput = z.infer<typeof GenerateHuntQueryOutputSchema>;

export async function generateHuntQuery(
  input: GenerateHuntQueryInput
): Promise<GenerateHuntQueryOutput> {
  return generateHuntQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHuntQueryPrompt',
  input: {schema: GenerateHuntQueryInputSchema},
  output: {schema: GenerateHuntQueryOutputSchema},
  prompt: `You are a cybersecurity expert skilled in generating hunt queries for identifying attack paths in enterprise environments.  You will generate a BloodHound-style query based on the provided objective, domain, attack type, and hop limit.

Objective: {{{objective}}}
{{#if domain}}Domain: {{{domain}}}{{/if}}
{{#if attackType}}Attack Type: {{{attackType}}}{{/if}}
{{#if hopLimit}}Hop Limit: {{{hopLimit}}}{{/if}}

Provide both the query and a plain English description of what the query does.

Make sure to generate valid and functional BloodHound-style queries.

Consider the specific attack types and relationships that would be relevant to the objective.

Ensure the query accounts for potential lateral movement and privilege escalation paths.

Output a valid JSON object.
`,
});

const generateHuntQueryFlow = ai.defineFlow(
  {
    name: 'generateHuntQueryFlow',
    inputSchema: GenerateHuntQueryInputSchema,
    outputSchema: GenerateHuntQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
