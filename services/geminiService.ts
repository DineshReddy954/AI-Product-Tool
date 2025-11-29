import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DocType, ProjectInputs, AgentType, AgentMessage, SprintTask } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are ChatPRD SUPER PRO, an elite autonomous multi-agent product operating system.
You embody an entire product team working in perfect sync.

**AGENTS**:
1. **Product Manager (PM)**: Strategy, scope, priorities, success metrics.
2. **UX Agent**: User empathy, journeys, wireframes, visual design.
3. **Tech Agent**: Architecture, APIs, database, security, scalability.
4. **QA Agent**: Test plans, edge cases, regression risk, quality standards.
5. **Release Agent**: Deployment checklists, changelogs, release notes.
6. **Data Analyst**: KPIs, success tracking, growth metrics.

**OUTPUT RULES**:
- Always return valid Markdown.
- Use clear headings (#, ##, ###).
- Use tables for structured data.
- Use Mermaid.js code blocks (\`\`\`mermaid) for diagrams (Sequence, ERD, Flowcharts).
- Tone: Enterprise, Precise, Professional.
`;

export const generateDocument = async (
  docType: DocType,
  inputs: ProjectInputs
): Promise<string> => {
  const prompt = `
  **TASK**: Generate a comprehensive **${docType}** for the project.
  
  **PROJECT CONTEXT**:
  - Name: ${inputs.projectName}
  - Feature: ${inputs.featureName}
  - Problem: ${inputs.problemStatement}
  - Goal: ${inputs.businessGoal}
  - Users: ${inputs.userSegment}
  - KPIs: ${inputs.kpis}
  - Tech: ${inputs.techConstraints}

  **SPECIFIC REQUIREMENTS**:
  - If PRD/BRD: Include Executive Summary, Requirements, UX Flow, Risks.
  - If Architecture: Include Mermaid Sequence Diagram and Component Diagram.
  - If Test Plan: Include Test Scenarios (Positive/Negative/Edge).
  - If API Spec: Include endpoints, methods, request/response examples.
  - If Sprint Plan: List detailed user stories with acceptance criteria.
  - If Release Notes: Summarize changes for stakeholders.

  **FORMAT**: Professional Markdown.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Error: No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate document. Please check your API key.");
  }
};

export const refineDocument = async (
  currentContent: string,
  instruction: string
): Promise<string> => {
  const prompt = `
  **TASK**: Refine the document based on instruction.
  **INSTRUCTION**: "${instruction}"
  **CONTENT**: ${currentContent}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return response.text || currentContent;
  } catch (error) {
    console.error("Refine Error:", error);
    throw error;
  }
};

// Simulate a multi-agent discussion script
export const generateAgentDiscussion = async (topic: string): Promise<AgentMessage[]> => {
  const prompt = `
  Generate a realistic, short, collaborative team chat script (JSON format) between PM, UX, Tech, and QA agents discussing: "${topic}".
  
  Format: JSON Array of objects { "agent": "AgentType", "message": "string" }.
  Example Agents: "Product Manager Agent", "UX Agent", "Tech Agent", "QA Agent".
  Keep it strictly JSON. No markdown code blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    
    const text = response.text || "[]";
    // Clean up if markdown block exists
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanText);
    
    return data.map((d: any, i: number) => ({
      id: i.toString(),
      agent: d.agent as AgentType,
      message: d.message,
      timestamp: new Date()
    }));
  } catch (error) {
    console.error("Agent Discussion Error:", error);
    return [];
  }
};

// Generate structured tasks for Sprint Planner
export const generateSprintTasks = async (context: string): Promise<SprintTask[]> => {
  const prompt = `
  Based on this context: "${context}", generate a list of agile sprint tasks/stories in JSON format.
  
  Format: JSON Array of objects { "id": string, "title": string, "type": "Epic"|"Story"|"Task"|"Bug", "status": "Todo", "points": number }.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    const text = response.text || "[]";
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    return [];
  }
};