// src/ai/flows/detect-privilege-escalation.ts
'use server';
/**
 * @fileOverview AI-powered tool to detect abnormal privilege escalations or misconfigurations.
 *
 * - detectPrivilegeEscalation - A function that triggers the detection process.
 * - DetectPrivilegeEscalationInput - The input type for the detectPrivilegeEscalation function.
 * - DetectPrivilegeEscalationOutput - The return type for the detectPrivilegeEscalation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPrivilegeEscalationInputSchema = z.object({
  userPermissions: z.string().describe('A detailed list of user permissions.'),
  systemConfigurations: z.string().describe('A detailed description of system configurations.'),
});
export type DetectPrivilegeEscalationInput = z.infer<typeof DetectPrivilegeEscalationInputSchema>;

const DetectPrivilegeEscalationOutputSchema = z.object({
  escalationDetected: z.boolean().describe('Whether a privilege escalation or misconfiguration is detected.'),
  explanation: z.string().describe('An explanation of the detected privilege escalation or misconfiguration.'),
  severity: z.string().describe('The severity level of the detected issue (e.g., low, medium, high).'),
  affectedEntities: z.array(z.string()).describe('List of entities (users, systems) affected by the issue.'),
  recommendations: z.array(z.string()).describe('Recommendations to address the detected issue.'),
});
export type DetectPrivilegeEscalationOutput = z.infer<typeof DetectPrivilegeEscalationOutputSchema>;

export async function detectPrivilegeEscalation(input: DetectPrivilegeEscalationInput): Promise<DetectPrivilegeEscalationOutput> {
  return detectPrivilegeEscalationFlow(input);
}

const detectPrivilegeEscalationPrompt = ai.definePrompt({
  name: 'detectPrivilegeEscalationPrompt',
  input: {schema: DetectPrivilegeEscalationInputSchema},
  output: {schema: DetectPrivilegeEscalationOutputSchema},
  prompt: `You are an AI Copilot specializing in detecting abnormal privilege escalations and misconfigurations in enterprise environments.

  Analyze the provided user permissions and system configurations to identify potential vulnerabilities.
  Determine if a privilege escalation or misconfiguration is present.
  If detected, provide a detailed explanation, severity level, affected entities, and recommendations to address the issue.

  User Permissions:
  {{userPermissions}}

  System Configurations:
  {{systemConfigurations}}

  Based on your analysis, determine:
  - escalationDetected: true if a privilege escalation or misconfiguration is detected, false otherwise.
  - explanation: A detailed explanation of the detected issue.
  - severity: The severity level of the detected issue (e.g., low, medium, high).
  - affectedEntities: List of entities (users, systems) affected by the issue.
  - recommendations: Recommendations to address the detected issue.
  Ensure that the output is valid JSON conforming to DetectPrivilegeEscalationOutputSchema. The Zod descriptions are:

  ${JSON.stringify(DetectPrivilegeEscalationOutputSchema.describe)}
`,
});

const detectPrivilegeEscalationFlow = ai.defineFlow(
  {
    name: 'detectPrivilegeEscalationFlow',
    inputSchema: DetectPrivilegeEscalationInputSchema,
    outputSchema: DetectPrivilegeEscalationOutputSchema,
  },
  async input => {
    const {output} = await detectPrivilegeEscalationPrompt(input);
    return output!;
  }
);
