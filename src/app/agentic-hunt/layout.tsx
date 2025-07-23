// src/app/agentic-hunt/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { GitGraph, Laptop, Network, Search, Shield } from "lucide-react";

const menuItems = [
    { href: "/agentic-hunt", label: "Attack Graphs", icon: GitGraph },
    { href: "/agentic-hunt/hunt-queries", label: "Hunt Queries", icon: Search },
    { href: "/agentic-hunt/agents", label: "Agents", icon: Laptop },
    { href: "/agentic-hunt/observables", label: "Observables", icon: Network },
];


export default function AgenticHuntLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // A simple hack to make the root /agentic-hunt also match the Attack Graphs tab
  const isActive = (href: string) => {
    if (href === "/agentic-hunt") {
      return pathname === href || pathname === "/agentic-hunt/attack-graphs";
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2 p-2">
                    <Shield className="h-8 w-8 text-accent" />
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-foreground">Agentic Hunt</h2>
                        <p className="text-xs text-muted-foreground">Threat Intelligence Platform</p>
                    </div>
                 </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map(item => (
                         <SidebarMenuItem key={item.label}>
                            <Link href={item.href} passHref>
                                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                         </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                    <p>&copy; 2024 Agentic Hunt</p>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background/50 px-4 lg:h-[60px] lg:px-6 sticky top-0 backdrop-blur-sm z-10">
                <SidebarTrigger className="md:hidden"/>
                <div className="flex-1">
                    <h1 className="text-lg font-semibold md:text-2xl">
                        {menuItems.find(item => isActive(item.href))?.label || "Dashboard"}
                    </h1>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-8">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
