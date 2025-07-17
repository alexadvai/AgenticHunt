export const agents = [
  {
    id: "agent-001",
    hostname: "DC-01",
    ip: "10.0.0.5",
    lastHeartbeat: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    scanMode: "Scheduled",
    tags: ["Domain Controller", "Critical"],
  },
  {
    id: "agent-002",
    hostname: "WEB-SRV-01",
    ip: "192.168.1.100",
    lastHeartbeat: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    scanMode: "On-demand",
    tags: ["Web Server", "Exposed"],
  },
  {
    id: "agent-003",
    hostname: "DEV-WS-123",
    ip: "10.0.1.55",
    lastHeartbeat: new Date(Date.now() - 1000 * 60 * 23).toISOString(),
    scanMode: "Scheduled",
    tags: ["Developer", "Workstation"],
  },
    {
    id: "agent-004",
    hostname: "FIN-PC-021",
    ip: "10.0.2.78",
    lastHeartbeat: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    scanMode: "On-demand",
    tags: ["Finance"],
  },
];

export const observables: {
    id: string;
    type: "kerberos_ticket" | "group_membership" | "session_token" | "admin_rights";
    value: string;
    sourceHost: string;
    collectedAt: string;
    agentId: string;
    associatedUser: string;
    isSuspicious: boolean;
    aiTag: string;
    aiReasoning: string;
}[] = [
  {
    id: "obs-001",
    type: "admin_rights",
    value: "j.doe -> workstation-123",
    sourceHost: "workstation-123",
    collectedAt: new Date().toISOString(),
    agentId: "agent-003",
    associatedUser: "j.doe",
    isSuspicious: true,
    aiTag: "anomalous_admin_right",
    aiReasoning: "Developer user has admin rights on a non-dev machine.",
  },
  {
    id: "obs-002",
    type: "kerberos_ticket",
    value: "krbtgt/CORP.LOCAL",
    sourceHost: "DC-01",
    collectedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    agentId: "agent-001",
    associatedUser: "svc-backup",
    isSuspicious: false,
    aiTag: "",
    aiReasoning: "",
  },
  {
    id: "obs-003",
    type: "group_membership",
    value: "s.smith -> Domain Admins",
    sourceHost: "DC-01",
    collectedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    agentId: "agent-001",
    associatedUser: "s.smith",
    isSuspicious: false,
    aiTag: "",
    aiReasoning: "",
  },
  {
    id: "obs-004",
    type: "session_token",
    value: "admin@corp.local",
    sourceHost: "WEB-SRV-01",
    collectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    agentId: "agent-002",
    associatedUser: "admin",
    isSuspicious: true,
    aiTag: "privileged_session_on_exposed_host",
    aiReasoning: "Domain Admin session found on an internet-exposed server.",
  },
];
