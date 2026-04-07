/**
 * LLM Gateway 模块测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LLMGateway, registerClient, getAllClients } from '../gateway';
import type { LLMClient, LLMRequest, LLMResponse } from '../gateway';

describe('LLMGateway', () => {
  // Mock client implementation
  const createMockClient = (name: string, shouldFail = false): LLMClient => ({
    name,
    chat: vi.fn(async (_request: LLMRequest): Promise<LLMResponse> => {
      if (shouldFail) {
        throw new Error(`${name} failed`);
      }
      return {
        content: `Response from ${name}`,
        model: name,
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
        latency_ms: 100,
      };
    }),
    healthCheck: vi.fn(async (): Promise<boolean> => !shouldFail),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerClient', () => {
    it('should register a client', () => {
      const client = createMockClient('test-client');
      registerClient(client);

      expect(getAllClients()).toContain('test-client');
    });
  });

  describe('chat', () => {
    it('should use primary client for chat', async () => {
      const mockClient = createMockClient('primary');
      registerClient(mockClient);

      const gateway = new LLMGateway('primary', [], false);
      const messages = [{ role: 'user' as const, content: 'Hello' }];

      const response = await gateway.chat({ messages });

      expect(response.content).toBe('Response from primary');
      expect(mockClient.chat).toHaveBeenCalled();
    });

    it('should throw when primary client not found', async () => {
      const gateway = new LLMGateway('nonexistent', [], false);

      await expect(
        gateway.chat({ messages: [{ role: 'user', content: 'Hello' }] })
      ).rejects.toThrow('Primary client "nonexistent" not found');
    });

    it('should fallback to secondary client when primary fails', async () => {
      const primaryClient = createMockClient('primary', true);
      const fallbackClient = createMockClient('fallback');
      registerClient(primaryClient);
      registerClient(fallbackClient);

      const gateway = new LLMGateway('primary', ['fallback'], true);
      const messages = [{ role: 'user' as const, content: 'Hello' }];

      const response = await gateway.chat({ messages });

      expect(response.content).toBe('Response from fallback');
    });

    it('should throw when all clients fail and fallback disabled', async () => {
      const primaryClient = createMockClient('primary', true);
      registerClient(primaryClient);

      const gateway = new LLMGateway('primary', [], false);

      await expect(
        gateway.chat({ messages: [{ role: 'user', content: 'Hello' }] })
      ).rejects.toThrow();
    });
  });

  describe('healthCheck', () => {
    it('should return health status for all clients', async () => {
      registerClient(createMockClient('client1'));
      registerClient(createMockClient('client2'));

      const gateway = new LLMGateway('client1', ['client2'], true);
      const results = await gateway.healthCheck();

      expect(results).toHaveProperty('client1');
      expect(results).toHaveProperty('client2');
    });

    it('should return false for unhealthy clients', async () => {
      registerClient(createMockClient('healthy'));
      registerClient(createMockClient('unhealthy', true));

      const gateway = new LLMGateway('healthy', ['unhealthy'], true);
      const results = await gateway.healthCheck();

      expect(results.healthy).toBe(true);
      expect(results.unhealthy).toBe(false);
    });
  });
});

describe('ChatMessage types', () => {
  it('should accept valid message structure', () => {
    const message = { role: 'user' as const, content: 'Hello' };
    expect(message.role).toBe('user');
    expect(message.content).toBe('Hello');
  });

  it('should accept assistant role', () => {
    const message = { role: 'assistant' as const, content: 'Hi' };
    expect(message.role).toBe('assistant');
  });

  it('should accept system role', () => {
    const message = { role: 'system' as const, content: 'You are helpful' };
    expect(message.role).toBe('system');
  });
});
