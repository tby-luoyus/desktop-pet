/**
 * Pet Store 测试
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { usePetStore } from '../pet-store';

describe('usePetStore', () => {
  beforeEach(() => {
    // Reset store before each test
    usePetStore.getState().resetPet();
  });

  it('should have correct initial state', () => {
    const state = usePetStore.getState();

    expect(state.position).toEqual({ x: 100, y: 100 });
    expect(state.currentMood).toBe('idle');
    expect(state.isSleeping).toBe(false);
    expect(state.level).toBe(1);
    expect(state.experience).toBe(0);
  });

  it('should update position', () => {
    usePetStore.getState().setPosition({ x: 200, y: 300 });

    const state = usePetStore.getState();
    expect(state.position).toEqual({ x: 200, y: 300 });
  });

  it('should update mood', () => {
    usePetStore.getState().setMood('happy');

    const state = usePetStore.getState();
    expect(state.currentMood).toBe('happy');
  });

  it('should update sleeping state', () => {
    usePetStore.getState().setSleeping(true);

    const state = usePetStore.getState();
    expect(state.isSleeping).toBe(true);
  });

  it('should set mood to sleeping when sleeping is true', () => {
    usePetStore.getState().setSleeping(true);

    const state = usePetStore.getState();
    expect(state.isSleeping).toBe(true);
    expect(state.currentMood).toBe('sleeping');
  });

  it('should add experience', () => {
    usePetStore.getState().addExperience(50);

    const state = usePetStore.getState();
    expect(state.experience).toBe(50);
  });

  it('should level up when experience reaches threshold', () => {
    usePetStore.getState().addExperience(100);

    const state = usePetStore.getState();
    expect(state.level).toBe(2);
    expect(state.experience).toBe(0);
  });

  it('should accumulate experience beyond level up', () => {
    usePetStore.getState().addExperience(150);

    const state = usePetStore.getState();
    expect(state.level).toBe(2);
    expect(state.experience).toBe(50);
  });

  it('should reset pet to initial state', () => {
    usePetStore.getState().setPosition({ x: 500, y: 500 });
    usePetStore.getState().setMood('happy');
    usePetStore.getState().addExperience(100);

    usePetStore.getState().resetPet();

    const state = usePetStore.getState();
    expect(state.position).toEqual({ x: 100, y: 100 });
    expect(state.currentMood).toBe('idle');
    expect(state.level).toBe(1);
    expect(state.experience).toBe(0);
  });
});
