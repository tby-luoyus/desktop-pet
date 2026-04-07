# 用户状态感知技术方案调研报告

**调研日期**: 2026-04-07
**调研目标**: 设计桌宠用户状态感知系统（核心功能）
**文档状态**: ✅ 已完成

---

## 1. 感知技术体系

### 1.1 感知维度分类

| 感知类型 | 技术手段 | 隐私敏感度 | 频率建议 |
|----------|----------|------------|----------|
| **活动窗口** | GetForegroundWindow | 低 | 5-10秒 |
| **窗口标题** | GetWindowText | 低 | 5-10秒 |
| **应用切换** | Win32 Event Hook | 低 | 事件驱动 |
| **屏幕截图** | GDI/DXGI截图 | 高 | 5分钟/次 |
| **音频感知** | 麦克风检测 | 极高 | 事件驱动 |
| **输入状态** | GetKeyboardState | 中 | 事件驱动 |
| **空闲时间** | GetLastInputInfo | 低 | 30秒 |
| **日历/邮件** | 系统API/Outlook | 中 | 15分钟 |

### 1.2 Windows API 技术栈

```rust
// Tauri/Rust 后端 Win32 API 调用

// 1. 获取前台窗口
#[link(name = "user32")]
extern "system" {
    fn GetForegroundWindow() -> HWND;
    fn GetWindowTextW(hwnd: HWND, lpString: PWSTR, nMaxCount: i32) -> i32;
    fn GetWindowThreadProcessId(hwnd: HWND, lpdwProcessId: *mut u32) -> u32;
}

// 2. 获取活动应用信息
#[link(name = "user32")]
extern "system" {
    fn GetLastInputInfo(plii: *mut LASTINPUTINFO) -> bool;
}

// 3. 屏幕截图
// 使用 dxgi 或 gdi+ 进行屏幕捕获
```

---

## 2. 感知频率设计

### 2.1 推荐感知频率矩阵

| 感知任务 | 检测频率 | 触发条件 | 备注 |
|----------|----------|----------|------|
| 窗口活动 | 5-10秒 | 轮询 | 判断是否在工作 |
| 空闲检测 | 30秒 | 轮询 | 长时间无操作 |
| 截图分析 | 5分钟 | 定时 | 高隐私，频率低 |
| 音频检测 | 事件 | 麦克风输入 | 开关控制 |
| 日历同步 | 15分钟 | 定时 | 会议/提醒 |

### 2.2 节能策略

```typescript
// 智能频率调整
enum PowerMode {
  ACTIVE = 1,    // 5秒检测间隔
  NORMAL = 2,    // 10秒检测间隔
  ECO = 3,       // 30秒检测间隔
  SLEEP = 4,     // 5分钟检测间隔
}

// 根据用户状态动态调整
function adjustPollingInterval() {
  if (isUserActive() && !isBatterySaving()) {
    return PowerMode.ACTIVE;
  } else if (isBatterySaving()) {
    return PowerMode.ECO;
  } else {
    return PowerMode.NORMAL;
  }
}
```

---

## 3. 用户状态分类与响应

### 3.1 状态分类体系

```typescript
interface UserState {
  category: 'WORKING' | 'IDLE' | 'MEETING' | 'RESTING' | 'AWAY' | 'UNKNOWN';
  confidence: number;          // 置信度 0-1
  details: {
    activeApp?: string;        // 当前应用
    windowTitle?: string;      // 窗口标题
    idleMinutes?: number;      // 空闲时长
    recentApps?: string[];      // 最近应用列表
  };
  timestamp: number;
}
```

### 3.2 状态判断逻辑

| 用户状态 | 判断条件 | 桌宠响应 |
|----------|----------|----------|
| **工作中** | 窗口频繁切换 / Office/IDE/浏览器 | 减少打扰，可简短互动 |
| **开会中** | 音频设备活跃 / 会议应用 | 保持安静，可气泡提示 |
| **空闲中** | 无键盘鼠标输入 > 5分钟 | 主动问候或展示趣味动作 |
| **离开中** | 锁屏 / 长时间无活动 | 睡眠动画 |
| **用餐中** | 时间12:00-13:00 或 18:00-19:00 | 问候，提醒健康 |
| **深夜** | 时间 > 22:00 或 < 6:00 | 晚安问候，减少互动 |

### 3.3 动态话题生成规则

```typescript
// 基于感知状态的话题推荐
function generateTopics(state: UserState): string[] {
  const now = new Date();
  const hour = now.getHours();

  // 基础话题
  const base = [
    "主人辛苦了，要不要休息一下？",
    "今天天气不错呢~",
  ];

  // 状态相关
  const stateTopics = {
    WORKING: ["工作顺利吗？", "要不要来杯咖啡？", "加油哦！"],
    IDLE: ["主人好像在想事情？", "我们来聊聊天吧~"],
    MEETING: ["会议加油！", "我在旁边陪着你~"],
    RESTING: ["休息是为了走更远的路~", "主人辛苦了~"],
  };

  // 时间相关
  const timeTopics = {
    morning: ["早上好！今天计划做什么？", "新的一天开始啦~"],
    lunch: ["该吃午饭啦！", "主人饿了吗？"],
    evening: ["晚上好！今天累不累？", "辛苦了一天~"],
    night: ["夜深了，早点休息哦~", "晚安，主人~"],
  };

  return [...base, ...stateTopics[state.category], ...getTimeTopics(hour)];
}
```

---

## 4. 感知范围边界设计（隐私合规）

### 4.1 允许感知（低敏感）

✅ **可感知**:
- 当前前台窗口的应用名称
- 窗口标题（不含内容）
- 用户空闲/活动状态
- 电脑使用时长统计
- 系统时间/日历事件（仅标题）

### 4.2 严格禁止（高敏感）

❌ **绝不感知**:
- 窗口内的具体内容（聊天记录/文档内容）
- 键盘输入内容（密码/隐私信息）
- 麦克风音频内容（仅检测音量大小）
- 屏幕截图内容（除非用户主动分享）
- 文件系统内容

### 4.3 感知数据存储

```typescript
// 本地数据库 - 仅存储匿名统计
interface PerceptionLog {
  id: string;
  timestamp: number;
  // 绝对不存储以下内容：
  // ❌ windowTitle 原文
  // ❌ 应用内容
  // ❌ 用户输入
  // ✅ 仅存储分类结果
  stateCategory: string;
  confidence: number;
  duration: number;  // 该状态持续时长
}
```

---

## 5. 技术实现路径

### 5.1 Tauri + Rust Win32 API

```rust
// src-tauri/src/perception/mod.rs

use std::sync::Mutex;
use tauri::State;

pub struct PerceptionState {
    last_active_window: Mutex<String>,
    idle_seconds: Mutex<u64>,
    poll_interval_ms: u64,
}

// 获取前台窗口信息
#[tauri::command]
fn get_active_app() -> Result<ActiveApp, String> {
    unsafe {
        let hwnd = GetForegroundWindow();
        let mut process_id: u32 = 0;
        GetWindowThreadProcessId(hwnd, &mut process_id);

        // 获取窗口标题
        let mut title = [0u16; 512];
        let len = GetWindowTextW(hwnd, title.as_mut_ptr(), 512);

        Ok(ActiveApp {
            hwnd: hwnd.0,
            process_id,
            title: String::from_utf16_lossy(&title[..len as usize]),
        })
    }
}

// 获取空闲时间
#[tauri::command]
fn get_idle_seconds() -> Result<u64, String> {
    unsafe {
        let mut lii = LASTINPUTINFO {
            cbSize: std::mem::size_of::<LASTINPUTINFO>() as u32,
            dwTime: 0,
        };
        if GetLastInputInfo(&mut lii) {
            let idle_time = (GetTickCount() - lii.dwTime) / 1000;
            Ok(idle_time)
        } else {
            Err("Failed to get idle time".into())
        }
    }
}
```

### 5.2 前端状态管理

```typescript
// src/stores/perception.ts
import { create } from 'zustand';

interface PerceptionStore {
  userState: UserState;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

export const usePerceptionStore = create<PerceptionStore>((set, get) => ({
  userState: { category: 'UNKNOWN', confidence: 0, details: {}, timestamp: Date.now() },
  isMonitoring: false,

  startMonitoring: () => {
    set({ isMonitoring: true });
    // 启动轮询
  },

  stopMonitoring: () => {
    set({ isMonitoring: false });
  },
}));
```

---

## 6. 用户控制选项

### 6.1 感知权限分级

| 等级 | 名称 | 感知范围 | 默认 |
|------|------|----------|------|
| Level 0 | 关闭 | 仅时间感知 | ⭕ |
| Level 1 | 基础 | 活动窗口 + 空闲检测 | ✅ |
| Level 2 | 标准 | 基础 + 日历事件 | - |
| Level 3 | 增强 | 标准 + 截图分析 | - |

### 6.2 用户配置界面

```
┌─────────────────────────────────────┐
│  🐾 感知设置                        │
├─────────────────────────────────────┤
│                                     │
│  ☐ 启用活动窗口感知                  │
│    检测您正在使用的应用程序           │
│                                     │
│  ☐ 启用空闲检测                     │
│    长时间无操作时提醒您休息          │
│                                     │
│  ☐ 启用日历同步                     │
│    感知会议和日程提醒                │
│                                     │
│  ☐ 启用屏幕活动分析 (需要截图权限)    │
│    分析您的工作状态以提供更好互动     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  感知频率: [●○○○○] 中等              │
│  [5秒] [10秒] [30秒] [1分钟]        │
│                                     │
└─────────────────────────────────────┘
```

---

## 7. 结论与建议

### 推荐感知架构

```yaml
核心感知系统:
  活动窗口检测: 每10秒轮询 (Level 1)
  空闲检测: 每30秒轮询 (Level 1)
  日历同步: 每15分钟 (Level 2)
  屏幕分析: 每5分钟 (Level 3)

隐私保护:
  - 严格限制数据采集范围
  - 所有感知数据仅本地存储
  - 用户可随时关闭任何感知功能
  - 不采集任何应用内部内容
```

### 关键设计决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 主检测频率 | 10秒 | 平衡灵敏度与性能 |
| 空闲判定 | 5分钟无操作 | 符合常见"休息"习惯 |
| 截图频率 | 5分钟/次 | 保护隐私，减少干扰 |
| 默认权限 | Level 1 | 开箱即用，隐私友好 |

### 下一步行动

1. 编写Rust Win32 API感知模块
2. 设计感知数据模型（不包含敏感信息）
3. 开发用户感知权限配置UI
4. 进行感知准确度测试
