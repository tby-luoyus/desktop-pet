/**
 * Chat Store 测试
 */

import { describe, it, expect } from 'vitest';
import { useChatStore } from '../chat-store';
import type { ChatMessage } from '@llm/types';

describe('useChatStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useChatStore.setState({
      messages: [],
      isLoading: false,
    });
  });

  it('should have correct initial state', () => {
    const state = useChatStore.getState();

    expect(state.messages).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should add user message', () => {
    const message: ChatMessage = {
      id: '1',
      role: 'user',
      content: 'Hello',
      timestamp: Date.now(),
    };

    useChatStore.getState().addMessage(message);

    const state = useChatStore.getState();
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].content).toBe('Hello');
    expect(state.messages[0].role).toBe('user');
  });

  it('should add assistant message', () => {
    const message: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: 'Hi there!',
      timestamp: Date.now(),
    };

    useChatStore.getState().addMessage(message);

    const state = useChatStore.getState();
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].role).toBe('assistant');
  });

  it('should clear messages', () => {
    const userMessage: ChatMessage = {
      id: '1',
      role: 'user',
      content: 'Hello',
      timestamp: Date.now(),
    };
    const assistantMessage: ChatMessage = {
      id: '2',
      role: 'assistant',
      content: 'Hi!',
      timestamp: Date.now(),
    };

    useChatStore.getState().addMessage(userMessage);
    useChatStore.getState().addMessage(assistantMessage);
    expect(useChatStore.getState().messages).toHaveLength(2);

    useChatStore.getState().clearMessages();

    expect(useChatStore.getState().messages).toHaveLength(0);
  });

  it('should set loading state', () => {
    useChatStore.getState().setLoading(true);
    expect(useChatStore.getState().isLoading).toBe(true);

    useChatStore.getState().setLoading(false);
    expect(useChatStore.getState().isLoading).toBe(false);
  });

  it('should handle conversation flow', () => {
    const userMsg: ChatMessage = {
      id: '1',
      role: 'user',
      content: 'How are you?',
      timestamp: Date.now(),
    };
    const assistantMsg: ChatMessage = {
      id: '2',
      role: 'assistant',
      content: 'I am doing great!',
      timestamp: Date.now(),
    };

    useChatStore.getState().addMessage(userMsg);
    useChatStore.getState().addMessage(assistantMsg);

    const state = useChatStore.getState();
    expect(state.messages).toHaveLength(2);
    expect(state.messages[0].content).toBe('How are you?');
    expect(state.messages[1].content).toBe('I am doing great!');
  });
});
