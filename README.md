# Agentic Hunt

Agentic Hunt is a powerful, graph-based visual threat hunting platform built with Next.js and Genkit. It's designed for enterprise security teams to leverage AI-powered analysis to help identify, visualize, and remediate complex attack paths within an environment.

## Key Features

-   **Attack Graph Visualization**: Visually explore your network and identity relationships to uncover hidden attack paths. Filter by domain, attack type, critical assets, and more.
-   **AI-Assisted Hunt Queries**: Describe your threat hunting objectives in plain English and let the AI generate the corresponding BloodHound-style queries for you.
-   **Agent Management**: Deploy and manage data collection agents across your environment to gather security-relevant observables.
-   **AI-Powered Analysis**: The application uses a Genkit-powered AI copilot to:
    -   Suggest relevant graph queries based on environmental context.
    -   Summarize critical attack paths in an easy-to-understand format.
    -   Detect potential privilege escalation vulnerabilities.
    -   Analyze observables for suspicious activity.

## Getting Started

1.  **Launch the App**: The application is ready to run. Start the development server:
    ```bash
    npm run dev
    ```
2.  **Explore the UI**:
    -   Navigate to the **Agentic Hunt** page.
    -   Switch between the **Attack Graphs**, **Hunt Queries**, **Agents**, and **Observables** tabs to explore the core features.
    -   Interact with the **AI Copilot** in the node details drawer to see its analytical capabilities in action.

This project is a demonstration of building a complex, AI-driven application using modern web technologies. Feel free to explore the code in the `src` directory to see how it all works.