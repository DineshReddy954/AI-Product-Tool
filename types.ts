import React from 'react';

export enum DocType {
  PRD = 'Product Requirements Document',
  BRD = 'Business Requirement Document',
  MRD = 'Market Requirements Document',
  SRS = 'Software Requirements Specification',
  USER_STORIES = 'User Stories & Epics',
  ROADMAP = 'Strategic Roadmap',
  ARCH_DIAGRAM = 'System Architecture',
  PERSONAS = 'User Personas',
  TEST_PLAN = 'QA Test Plan',
  RELEASE_NOTES = 'Release Notes',
  API_SPEC = 'API Specification',
  SPRINT_PLAN = 'Sprint Plan',
  ANALYTICS_REPORT = 'Product Analytics Report'
}

export enum AgentType {
  PM = 'Product Manager Agent',
  RESEARCHER = 'Research Agent',
  WRITER = 'Writer Agent',
  TECH = 'Tech Agent',
  UX = 'UX Agent',
  QA = 'QA Agent',
  RELEASE = 'Release Agent',
  ANALYST = 'Data Analyst Agent'
}

export interface ProjectInputs {
  projectName: string;
  featureName: string;
  problemStatement: string;
  businessGoal: string;
  userSegment: string;
  kpis: string;
  techConstraints: string;
}

export interface GeneratedDoc {
  id: string;
  type: DocType;
  title: string;
  content: string; // Markdown content
  createdAt: Date;
  version: number;
}

export interface RoadmapItem {
  id: string;
  feature: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Done';
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface AgentMessage {
  id: string;
  agent: AgentType;
  message: string;
  timestamp: Date;
}

export interface SprintTask {
  id: string;
  title: string;
  type: 'Epic' | 'Story' | 'Bug' | 'Task';
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  points?: number;
  assignee?: string;
}