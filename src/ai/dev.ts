import { config } from 'dotenv';
config();

import '@/ai/flows/detect-privilege-escalation.ts';
import '@/ai/flows/detect-suspicious-observables.ts';
import '@/ai/flows/ai-assist-hunt-queries.ts';
import '@/ai/flows/suggest-graph-queries.ts';
import '@/ai/flows/summarize-critical-paths.ts';
import '@/ai/flows/remediate-vulnerability.ts';
