/**
 * Ollama 本地模型客户端实现
 */

import type { LLMClient, LLMRequest, LLMResponse } from '../gateway';

const OLLAMA_API_URL = 'http://localhost:11434';

export class OllamaClient implements LLMClient {
  name = 'ollama';
  private baseUrl: string;
  private model: string;

  constructor(baseUrl = OLLAMA_API_URL, model = 'qwen2.5:7b') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async chat(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();

    // Ollama 使用不同的消息格式
    const ollamaMessages = request.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || this.model,
        messages: ollamaMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ollama API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const endTime = Date.now();

    return {
      content: data.message?.content || '',
      model: data.model || this.model,
      usage: {
        prompt_tokens: 0, // Ollama 不返回 token 使用统计
        completion_tokens: 0,
        total_tokens: 0,
      },
      latency_ms: endTime - startTime,
    };
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * 获取可用模型列表
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) return [];

      const data = await response.json();
      return data.models?.map((m: { name: string }) => m.name) || [];
    } catch {
      return [];
    }
  }
}
