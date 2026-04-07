/**
 * LLM Gateway - 多模型统一接入层
 *
 * 支持 OpenAI API / Claude API / Ollama 本地模型
 * 实现自动降级策略
 */

import type { ChatMessage } from './types';

export interface LLMRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  latency_ms: number;
}

export interface LLMClient {
  name: string;
  chat(request: LLMRequest): Promise<LLMResponse>;
  healthCheck(): Promise<boolean>;
}

// 客户端注册表
const clients: Map<string, LLMClient> = new Map();

/**
 * 注册 LLM 客户端
 */
export function registerClient(client: LLMClient): void {
  clients.set(client.name, client);
}

/**
 * 获取客户端
 */
export function getClient(name: string): LLMClient | undefined {
  return clients.get(name);
}

/**
 * 获取所有可用客户端
 */
export function getAllClients(): string[] {
  return Array.from(clients.keys());
}

/**
 * 统一网关类
 */
export class LLMGateway {
  private primaryClient: string;
  private fallbackChain: string[];
  private fallbackEnabled: boolean;

  constructor(primary: string, fallbackChain: string[] = [], fallbackEnabled = true) {
    this.primaryClient = primary;
    this.fallbackChain = fallbackChain;
    this.fallbackEnabled = fallbackEnabled;
  }

  /**
   * 发送对话请求，自动处理降级
   */
  async chat(request: LLMRequest): Promise<LLMResponse> {
    // 尝试主客户端
    const primary = clients.get(this.primaryClient);
    if (!primary) {
      throw new Error(`Primary client "${this.primaryClient}" not found`);
    }

    try {
      return await primary.chat(request);
    } catch (error) {
      console.error(`Primary client error:`, error);

      // 如果禁用降级或没有备选，直接抛出
      if (!this.fallbackEnabled || this.fallbackChain.length === 0) {
        throw error;
      }

      // 尝试降级链
      for (const clientName of this.fallbackChain) {
        const client = clients.get(clientName);
        if (!client) continue;

        try {
          console.log(`Falling back to: ${clientName}`);
          return await client.chat(request);
        } catch (fallbackError) {
          console.error(`Fallback client "${clientName}" error:`, fallbackError);
          continue;
        }
      }

      // 所有客户端都失败
      throw new Error('All LLM clients failed');
    }
  }

  /**
   * 健康检查所有客户端
   */
  async healthCheck(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    for (const [name, client] of clients) {
      try {
        results[name] = await client.healthCheck();
      } catch {
        results[name] = false;
      }
    }

    return results;
  }
}

// 默认网关实例
export const defaultGateway = new LLMGateway(
  'openai',
  ['claude', 'ollama'],
  true
);
