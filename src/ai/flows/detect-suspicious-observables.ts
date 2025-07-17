// src/ai/flows/detect-suspicious-observables.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for detecting suspicious observables using AI-driven anomaly detection.
 *
 * - detectSuspiciousObservables - A function that identifies potentially malicious activities based on observable data.
 * - DetectSuspiciousObservablesInput - The input type for the detectSuspiciousObservables function.
 * - DetectSuspiciousObservablesOutput - The return type for the detectSuspiciousObservables function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectSuspiciousObservablesInputSchema = z.object({
  observableType: z.string().describe('The type of observable (e.g., kerberos_ticket, group_membership).'),
  observableValue: z.string().describe('The value of the observable (e.g., ticket string, group name).'),
  sourceHost: z.string().describe('The host from which the observable was collected.'),
  collectedAt: z.string().describe('The timestamp when the observable was collected.'),
  agentId: z.string().describe('The ID of the agent that collected the observable.'),
});
export type DetectSuspiciousObservablesInput = z.infer<typeof DetectSuspiciousObservablesInputSchema>;

const DetectSuspiciousObservablesOutputSchema = z.object({
  isSuspicious: z.boolean().describe('Whether the observable is considered suspicious.'),
  aiTag: z.string().describe('A tag providing insight into why the observable is suspicious.'),
  reasoning: z.string().describe('The AI reasoning behind the suspiciousness assessment.'),
});
export type DetectSuspiciousObservablesOutput = z.infer<typeof DetectSuspiciousObservablesOutputSchema>;

export async function detectSuspiciousObservables(input: DetectSuspiciousObservablesInput): Promise<DetectSuspiciousObservablesOutput> {
  return detectSuspiciousObservablesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectSuspiciousObservablesPrompt',
  input: {schema: DetectSuspiciousObservablesInputSchema},
  output: {schema: DetectSuspiciousObservablesOutputSchema},
  prompt: `You are an AI threat detection expert analyzing network observables for suspicious activity.

  Based on the provided observable data, determine if the observable is suspicious and provide a reasoning for your assessment.

  Observable Type: {{{observableType}}}
  Observable Value: {{{observableValue}}}
  Source Host: {{{sourceHost}}}
  Collected At: {{{collectedAt}}}
  Agent ID: {{{agentId}}}

  Consider factors such as unusual values, anomalous timing, and the context of the source host and agent.
  If the observable is suspicious, provide a brief explanation for why and assign an appropriate AI tag.
  Respond using JSON format.
  `,
});

const detectSuspiciousObservablesFlow = ai.defineFlow(
  {
    name: 'detectSuspiciousObservablesFlow',
    inputSchema: DetectSuspiciousObservablesInputSchema,
    outputSchema: DetectSuspiciousObservablesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
