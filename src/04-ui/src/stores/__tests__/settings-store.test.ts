/**
 * Settings Store 测试
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useSettingsStore } from '../settings-store';

describe('useSettingsStore', () => {
  beforeEach(() => {
    // Reset to defaults
    useSettingsStore.getState().resetSettings();
  });

  it('should have correct initial LLM settings', () => {
    const state = useSettingsStore.getState();

    expect(state.llm.provider).toBe('openai');
    expect(state.llm.model).toBe('gpt-4o-mini');
    expect(state.llm.temperature).toBe(0.8);
    expect(state.llm.maxTokens).toBe(500);
    expect(state.llm.timeout).toBe(30000);
  });

  it('should have fallback enabled by default', () => {
    const state = useSettingsStore.getState();

    expect(state.llm.fallback.enabled).toBe(true);
    expect(state.llm.fallback.chain).toContain('gpt-4o-mini');
  });

  it('should have correct Ollama settings', () => {
    const state = useSettingsStore.getState();

    expect(state.llm.ollama.baseUrl).toBe('http://localhost:11434');
    expect(state.llm.ollama.model).toBe('qwen2.5:7b');
  });

  it('should have perception enabled by default', () => {
    const state = useSettingsStore.getState();

    expect(state.perception.enabled).toBe(true);
    expect(state.perception.interval.foregroundWindow).toBe(10000);
    expect(state.perception.interval.idleDetection).toBe(30000);
  });

  it('should have random events enabled by default', () => {
    const state = useSettingsStore.getState();

    expect(state.events.randomEvents.enabled).toBe(true);
    expect(state.events.randomEvents.probabilityPerHour).toBeGreaterThan(0);
  });

  it('should have time-based events enabled by default', () => {
    const state = useSettingsStore.getState();

    expect(state.events.timeBasedEvents.enabled).toBe(true);
    expect(state.events.timeBasedEvents.meals.lunch).toBe('12:00-13:00');
    expect(state.events.timeBasedEvents.meals.dinner).toBe('18:00-19:00');
  });

  it('should have reminders enabled by default', () => {
    const state = useSettingsStore.getState();

    expect(state.reminders.enabled).toBe(true);
    expect(state.reminders.water.enabled).toBe(true);
    expect(state.reminders.sit.enabled).toBe(true);
  });

  it('should have correct UI defaults', () => {
    const state = useSettingsStore.getState();

    expect(state.ui.pet.scale).toBe(1.0);
    expect(state.ui.pet.opacity).toBe(1.0);
    expect(state.ui.pet.position).toEqual({ x: 100, y: 100 });
  });

  it('should have privacy settings with local storage', () => {
    const state = useSettingsStore.getState();

    expect(state.privacy.screenCaptureEnabled).toBe(false);
    expect(state.privacy.audioDetectionEnabled).toBe(false);
    expect(state.privacy.dataStorageLocal).toBe(true);
  });

  it('should update LLM provider', () => {
    useSettingsStore.getState().updateSettings({
      llm: { ...useSettingsStore.getState().llm, provider: 'ollama' },
    });

    expect(useSettingsStore.getState().llm.provider).toBe('ollama');
  });

  it('should update perception interval', () => {
    useSettingsStore.getState().updateSettings({
      perception: {
        ...useSettingsStore.getState().perception,
        interval: {
          ...useSettingsStore.getState().perception.interval,
          foregroundWindow: 5000,
        },
      },
    });

    expect(useSettingsStore.getState().perception.interval.foregroundWindow).toBe(5000);
  });

  it('should reset to default settings', () => {
    // Make some changes
    useSettingsStore.getState().updateSettings({
      llm: { ...useSettingsStore.getState().llm, provider: 'ollama' },
    });

    // Reset
    useSettingsStore.getState().resetSettings();

    // Should be back to default
    expect(useSettingsStore.getState().llm.provider).toBe('openai');
  });
});
