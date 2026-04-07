import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LLMSettings {
  provider: 'openai' | 'claude' | 'ollama';
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  timeout: number;
  fallback: {
    enabled: boolean;
    chain: string[];
  };
  ollama: {
    baseUrl: string;
    model: string;
  };
}

interface PerceptionSettings {
  enabled: boolean;
  interval: {
    foregroundWindow: number;
    idleDetection: number;
    screenAnalysis: number;
  };
  idleThreshold: number;
}

interface RandomEventSettings {
  enabled: boolean;
  probabilityPerHour: number;
  minInterval: number;
}

interface TimeBasedEventSettings {
  enabled: boolean;
  meals: {
    lunch: string;
    dinner: string;
  };
  sleepStart: string;
  sleepEnd: string;
}

interface ReminderSettings {
  enabled: boolean;
  water: {
    enabled: boolean;
    interval: number;
  };
  sit: {
    enabled: boolean;
    interval: number;
    threshold: number;
  };
}

interface UISettings {
  pet: {
    scale: number;
    opacity: number;
    position: {
      x: number;
      y: number;
    };
  };
  chatBubble: {
    maxLength: number;
    duration: number;
  };
}

interface PrivacySettings {
  screenCaptureEnabled: boolean;
  audioDetectionEnabled: boolean;
  dataStorageLocal: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

interface SettingsState {
  llm: LLMSettings;
  perception: PerceptionSettings;
  events: {
    randomEvents: RandomEventSettings;
    timeBasedEvents: TimeBasedEventSettings;
  };
  reminders: ReminderSettings;
  ui: UISettings;
  privacy: PrivacySettings;

  // Actions
  updateSettings: (partial: Partial<SettingsState>) => void;
  resetSettings: () => void;
}

interface SettingsData {
  llm: LLMSettings;
  perception: PerceptionSettings;
  events: {
    randomEvents: RandomEventSettings;
    timeBasedEvents: TimeBasedEventSettings;
  };
  reminders: ReminderSettings;
  ui: UISettings;
  privacy: PrivacySettings;
}

const defaultSettings: SettingsData = {
  llm: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4o-mini',
    temperature: 0.8,
    maxTokens: 500,
    timeout: 30000,
    fallback: {
      enabled: true,
      chain: ['gpt-4o-mini', 'claude-3-haiku', 'ollama:qwen2.5:7b'],
    },
    ollama: {
      baseUrl: 'http://localhost:11434',
      model: 'qwen2.5:7b',
    },
  },
  perception: {
    enabled: true,
    interval: {
      foregroundWindow: 10000,
      idleDetection: 30000,
      screenAnalysis: 300000,
    },
    idleThreshold: 300000,
  },
  events: {
    randomEvents: {
      enabled: true,
      probabilityPerHour: 3,
      minInterval: 600000,
    },
    timeBasedEvents: {
      enabled: true,
      meals: {
        lunch: '12:00-13:00',
        dinner: '18:00-19:00',
      },
      sleepStart: '22:00',
      sleepEnd: '06:00',
    },
  },
  reminders: {
    enabled: true,
    water: {
      enabled: true,
      interval: 3600000,
    },
    sit: {
      enabled: true,
      interval: 3600000,
      threshold: 3600000,
    },
  },
  ui: {
    pet: {
      scale: 1.0,
      opacity: 1.0,
      position: {
        x: 100,
        y: 100,
      },
    },
    chatBubble: {
      maxLength: 50,
      duration: 5000,
    },
  },
  privacy: {
    screenCaptureEnabled: false,
    audioDetectionEnabled: false,
    dataStorageLocal: true,
    logLevel: 'info',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      updateSettings: (partial) =>
        set((state) => ({
          ...state,
          ...partial,
        })),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'desktop-pet-settings',
    }
  )
);
