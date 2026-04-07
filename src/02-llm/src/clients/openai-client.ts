/**
 * OpenAI API 客户端实现
 */

import type { LLMClient, LLMRequest, LLMResponse } from '../gateway';
import type { ChatMessage } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export class OpenAIClient implements LLMClient {
  name = 'openai';
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gpt-4o-mini') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async chat(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model || this.model,
        messages: request.messages,
        temperature: request.temperature ?? 0.8,
        max_tokens: request.max_tokens ?? 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const endTime = Date.now();

    return {
      content: data.choices[0]?.message?.content || '',
      model: data.model || this.model,
      usage: {
        prompt_tokens: data.usage?.prompt_tokens || 0,
        completion_tokens: data.usage?.completion_tokens || 0,
        total_tokens: data.usage?.total_tokens || 0,
      },
      latency_ms: endTime - startTime,
    };
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
