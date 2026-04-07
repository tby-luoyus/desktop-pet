/**
 * LLM 模块类型定义
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConversationContext {
  messages: ChatMessage[];
  maxTokens: number;
  createdAt: number;
  lastAccessedAt: number;
}

export interface LLMConfig {
  provider: 'openai' | 'claude' | 'ollama';
  apiKey?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
  baseUrl?: string;
}

export interface StreamingResponse {
  content: string;
  done: boolean;
  delta?: string;
}
