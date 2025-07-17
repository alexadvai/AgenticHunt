'use server';

/**
 * @fileOverview An AI agent that suggests relevant graph queries based on the current environment and observables.
 *
 * - suggestGraphQueries - A function that suggests graph queries.
 * - SuggestGraphQueriesInput - The input type for the suggestGraphQueries function.
 * - SuggestGraphQueriesOutput - The return type for the suggestGraphQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGraphQueriesInputSchema = z.object({
  environmentDescription: z
    .string()
    .describe('A description of the current environment.'),
  observables: z
    .array(z.string())
    .describe('A list of collected observables.'),
});
export type SuggestGraphQueriesInput = z.infer<typeof SuggestGraphQueriesInputSchema>;

const SuggestGraphQueriesOutputSchema = z.object({
  queries: z
    .array(z.string())
    .describe('A list of suggested graph queries.'),
  reasoning: z.string().describe('The AI copilot reasoning for suggesting queries.')
});
export type SuggestGraphQueriesOutput = z.infer<typeof SuggestGraphQueriesOutputSchema>;

export async function suggestGraphQueries(input: SuggestGraphQueriesInput): Promise<SuggestGraphQueriesOutput> {
  return suggestGraphQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGraphQueriesPrompt',
  input: {schema: SuggestGraphQueriesInputSchema},
  output: {schema: SuggestGraphQueriesOutputSchema},
  prompt: `You are an AI copilot assisting a security analyst in threat hunting.
  Based on the description of the current environment and the list of observables, suggest a list of relevant graph queries that can help identify potential attack paths.
  Explain your reasoning for suggesting each query.

  Environment Description: {{{environmentDescription}}}
  Observables: {{#each observables}}{{{this}}}, {{/each}}
  `,
});

const suggestGraphQueriesFlow = ai.defineFlow(
  {
    name: 'suggestGraphQueriesFlow',
    inputSchema: SuggestGraphQueriesInputSchema,
    outputSchema: SuggestGraphQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
