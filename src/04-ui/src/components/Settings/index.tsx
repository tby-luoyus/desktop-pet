import { useState } from 'react';
import { useSettingsStore } from '../../stores/settings-store';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const settings = useSettingsStore();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    settings.updateSettings(localSettings);
    onClose();
  };

  const handleChange = (path: string, value: unknown) => {
    const keys = path.split('.');
    setLocalSettings((prev) => {
      const newSettings = { ...prev };
      let current: Record<string, unknown> = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] as Record<string, unknown> };
        current = current[keys[i]] as Record<string, unknown>;
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  return (
    <div className="settings-panel">
      <h2>⚙️ 设置</h2>

      {/* LLM 设置 */}
      <div className="settings-section">
        <h3>🤖 LLM 设置</h3>

        <div className="settings-row">
          <label>Provider</label>
          <select
            value={localSettings.llm.provider}
            onChange={(e) => handleChange('llm.provider', e.target.value)}
          >
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
            <option value="ollama">Ollama (本地)</option>
          </select>
        </div>

        <div className="settings-row">
          <label>API Key</label>
          <input
            type="password"
            placeholder="sk-..."
            value={localSettings.llm.apiKey}
            onChange={(e) => handleChange('llm.apiKey', e.target.value)}
          />
        </div>

        <div className="settings-row">
          <label>Model</label>
          <input
            type="text"
            value={localSettings.llm.model}
            onChange={(e) => handleChange('llm.model', e.target.value)}
          />
        </div>
      </div>

      {/* 感知设置 */}
      <div className="settings-section">
        <h3>👁️ 感知设置</h3>

        <div className="settings-row">
          <label>启用感知</label>
          <div
            className={`toggle ${localSettings.perception.enabled ? 'active' : ''}`}
            onClick={() => handleChange('perception.enabled', !localSettings.perception.enabled)}
          />
        </div>

        <div className="settings-row">
          <label>检测间隔 (秒)</label>
          <input
            type="number"
            min={5}
            max={60}
            value={localSettings.perception.interval.foregroundWindow / 1000}
            onChange={(e) =>
              handleChange('perception.interval.foregroundWindow', Number(e.target.value) * 1000)
            }
          />
        </div>
      </div>

      {/* 事件设置 */}
      <div className="settings-section">
        <h3>🎲 事件设置</h3>

        <div className="settings-row">
          <label>随机事件</label>
          <div
            className={`toggle ${localSettings.events.randomEvents.enabled ? 'active' : ''}`}
            onClick={() =>
              handleChange('events.randomEvents.enabled', !localSettings.events.randomEvents.enabled)
            }
          />
        </div>

        <div className="settings-row">
          <label>餐食提醒</label>
          <div
            className={`toggle ${localSettings.events.timeBasedEvents.enabled ? 'active' : ''}`}
            onClick={() =>
              handleChange('events.timeBasedEvents.enabled', !localSettings.events.timeBasedEvents.enabled)
            }
          />
        </div>
      </div>

      {/* 外观设置 */}
      <div className="settings-section">
        <h3>🎨 外观设置</h3>

        <div className="settings-row">
          <label>缩放</label>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={localSettings.ui.pet.scale}
            onChange={(e) => handleChange('ui.pet.scale', Number(e.target.value))}
          />
          <span>{localSettings.ui.pet.scale}x</span>
        </div>

        <div className="settings-row">
          <label>透明度</label>
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.1}
            value={localSettings.ui.pet.opacity}
            onChange={(e) => handleChange('ui.pet.opacity', Number(e.target.value))}
          />
          <span>{localSettings.ui.pet.opacity * 100}%</span>
        </div>
      </div>

      {/* 按钮 */}
      <div className="settings-row" style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={onClose}>
          取消
        </button>
        <button className="btn btn-primary" onClick={handleSave} style={{ marginLeft: '12px' }}>
          保存
        </button>
      </div>
    </div>
  );
}
