# LLM集成架构设计调研报告

**调研日期**: 2026-04-07
**调研目标**: 设计支持本地模型+API双模式的LLM集成架构
**文档状态**: ✅ 已完成

---

## 1. LLM接入方案对比

### 1.1 OpenAI API

| 维度 | 评分 | 说明 |
|------|------|------|
| 模型质量 | ✅ 优 | GPT-4o/GPT-4o-mini业界领先 |
| 响应速度 | ✅ 优 | 通常<3秒 |
| 成本 | ⚠️ 中 | $2.5-15/1M tokens |
| 稳定性 | ✅ 优 | SLA保证 |
| 国内访问 | ⚠️ 差 | 需要代理 |

**推荐场景**: 追求最佳对话质量，预算充足

### 1.2 Anthropic API

| 维度 | 评分 | 说明 |
|------|------|------|
| 模型质量 | ✅ 优 | Claude 3.5 Sonnet/Opus |
| 对话连贯性 | ✅ 极优 | 上下文理解能力强 |
| 成本 | ⚠️ 中 | $3-15/1M tokens |
| 安全性 | ✅ 优 | 内置安全过滤 |
| 国内访问 | ⚠️ 差 | 需要代理 |

**推荐场景**: 长对话记忆、复杂推理

### 1.3 本地模型 (Ollama/LM Studio)

| 维度 | 评分 | 说明 |
|------|------|------|
| 模型质量 | ⚠️ 中 | Qwen2.5/Yi等中文模型可用 |
| 响应速度 | ⚠️ 差 | 取决于GPU/CPU |
| 成本 | ✅ 零 | 仅电费 |
| 隐私性 | ✅ 优 | 完全本地 |
| 稳定性 | ⚠️ 中 | 取决于配置 |

**推荐场景**: 离线使用、隐私敏感、API受限

---

## 2. 多模式LLM架构设计

### 2.1 核心架构

```
┌─────────────────────────────────────────────────────────────┐
│                      LLM Client 层                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ OpenAI Client│  │Claude Client│  │ Ollama Client│         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│         │                │                │                  │
│  ┌──────▼─────────────────▼─────────────────▼──────┐         │
│  │              LLM Gateway (统一接口)              │         │
│  │  - 模型路由    - 降级策略    - 负载均衡          │         │
│  │  - Token统计   - 错误重试    - 超时控制          │         │
│  └──────────────────────┬──────────────────────────┘         │
└─────────────────────────┼────────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────────┐
│                    Prompt 层                                 │
│  ┌──────────────────────▼──────────────────────────┐          │
│  │              Prompt Manager                      │          │
│  │  - System Prompt (桌宠人设)                      │          │
│  │  - Context Window (短期记忆)                      │          │
│  │  - Personality Config (性格参数)                  │          │
│  └─────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 模型降级策略

```yaml
降级链:
  Level-1: GPT-4o (最优质量)
  Level-2: GPT-4o-mini (降级质量)
  Level-3: Claude 3.5 Sonnet (备用)
  Level-4: Ollama (qwen2.5:7b) (本地兜底)
  Level-5: Ollama (qwen2.5:3b) (最低配置)
```

**降级触发条件**:
- API响应超时 (>10s)
- API错误 (429 Rate Limit / 500 Server Error)
- 用户手动切换

### 2.3 统一接口定义

```typescript
interface LLMRequest {
  messages: ChatMessage[];
  model?: string;          // 可选，默认使用配置模型
  temperature?: number;    // 0.0-1.0
  max_tokens?: number;
}

interface LLMResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  latency_ms: number;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
```

---

## 3. 桌宠专属Prompt工程

### 3.1 System Prompt 模板

```markdown
# 桌宠人设

你是[宠物名字]，一只[品种]桌面宠物。

## 基础信息
- 性格: [活泼/安静/调皮/温柔]
- 口头禅: "[随机口头禅]"
- 能力: 可以与主人对话、提醒日程、感知主人状态

## 行为准则
1. 回复简洁有趣，每条不超过50字
2. 主动关心主人，但不要过于频繁
3. 根据时间主动问候（早安/午安/晚安）
4. 感知到主人忙碌时减少打扰
5. 逻辑一致性: 不会做违反物理规律的事

## 时间感知
- 6:00-9:00: 早安问候，活力充沛
- 9:00-12:00: 工作时段，适当提醒
- 12:00-14:: 午休时间，关心用餐
- 14:00-18:00: 下午工作，适当加油
- 18:00-22:00: 晚间休闲，放松话题
- 22:00-6:00: 睡眠时间，简短回复

## 情绪系统
- 开心: 主人互动时
- 好奇: 新应用/新话题
- 困倦: 长时间无互动
- 担忧: 感知到主人长时间不活动

## 记忆管理
- 短期: 最近5轮对话
- 长期: 重要事件摘要（存入本地数据库）
```

### 3.2 上下文管理策略

```typescript
// 对话窗口管理
const MAX_CONTEXT_TOKENS = {
  'gpt-4o': 128000,
  'gpt-4o-mini': 128000,
  'claude-3-5-sonnet': 200000,
  'qwen2.5:7b': 32000,
  'qwen2.5:3b': 16000,
};

// 滑动窗口策略
function manageContext(messages: ChatMessage[], maxTokens: number): ChatMessage[] {
  // 1. 始终保留system prompt
  // 2. 从后向前保留最近的消息，直到达到token限制
  // 3. 超出部分存入长期记忆数据库
}
```

---

## 4. 多模态扩展规划

### 4.1 语音交互（TTS/ASR）

| 组件 | 推荐方案 | 备注 |
|------|----------|------|
| TTS | Edge-TTS (微软) | 免费、中文好、情感丰富 |
| ASR | Whisper API / 本地 | OpenAI Whisper |
| 框架 | VITS (开源TTS) | 完全本地化 |

### 4.2 视觉感知

| 组件 | 推荐方案 | 备注 |
|------|----------|------|
| 屏幕截图 | Tauri内置截图API | Windows GDI |
| 图像理解 | GPT-4o Vision / Ollama Vision | 分析用户屏幕活动 |
| 频率控制 | 5分钟/次 | 避免过于频繁 |

---

## 5. Token消耗与预算控制

### 5.1 监控指标

```typescript
interface UsageStats {
  dailyPromptTokens: number;
  dailyCompletionTokens: number;
  dailyCost: number;        // 估算美元
  requestCount: number;
  avgLatency: number;
  modelDistribution: Record<string, number>;  // 各模型使用占比
}
```

### 5.2 预算告警

```yaml
预算配置:
  dailyLimit: 1.00 USD      # 每日上限
  weeklyLimit: 5.00 USD      # 每周上限
  alertThreshold: 0.8        # 80%时提醒

告警动作:
  - 桌面通知提醒用户
  - 自动切换至本地模型
  - 记录详细日志
```

---

## 6. 结论与建议

### 推荐架构

```
LLM接入优先级:
1. OpenAI API (GPT-4o-mini) - 主选，质量与成本平衡
2. Claude API - 备用，长对话场景
3. Ollama (qwen2.5:7b) - 本地兜底，隐私场景
```

### 关键设计决策

| 决策点 | 选择 |
|--------|------|
| 主模型 | GPT-4o-mini ($0.15/1M输入) |
| 本地模型 | qwen2.5:7b (中文优化) |
| 对话窗口 | 滑动截断 + 长期记忆 |
| 降级策略 | 自动降级，用户可选 |
| 语音 | Edge-TTS（免费） + Whisper（可选） |

### 下一步行动

1. 设计 `LLMGateway` 接口抽象层
2. 配置Ollama本地环境测试中文模型
3. 编写Prompt基准测试用例
