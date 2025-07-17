import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap, Bot } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground">
              Uncover Attack Paths with <span className="text-primary">Agentic Hunt</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A powerful, graph-based visual threat hunting platform that leverages AI to identify, visualize, and remediate complex security threats.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <span className="text-md text-foreground">Visualize complex attack graphs.</span>
              </li>
              <li className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-accent" />
                <span className="text-md text-foreground">Leverage AI-assisted hunt queries.</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                <span className="text-md text-foreground">Accelerate threat detection and response.</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/agentic-hunt">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-xl shadow-2xl p-2 bg-card border">
                <Image
                    src="https://placehold.co/1200x800.png"
                    width={1200}
                    height={800}
                    alt="Agentic Hunt application screenshot"
                    className="rounded-lg"
                    data-ai-hint="hunt hackers"
                />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
