# DesktopPet - AI协作开发指南

> 本文件为AI辅助开发指南，供Claude等AI工具理解项目上下文

---

## 1. 项目概述

**项目名称**: DesktopPet - LLM驱动Windows桌面宠物
**技术栈**: Tauri 2.x + React 18 + TypeScript + Rust
**目标**: 打造"懂你、陪你、提醒你"的桌面智能伴侣

---

## 2. 文档体系

| 文档 | 位置 | 用途 |
|------|------|------|
| **SRS.md** | `docs/02-requirements/` | 核心需求规格说明书 |
| **PROJECT-STRUCTURE.md** | `docs/02-requirements/` | 项目结构总览 |
| **requirements-tracking.md** | `docs/02-requirements/` | 需求跟踪矩阵 |

**重要**: 任何代码变更前必须参考SRS.md中的需求定义

---

## 3. 模块架构

```
src/
├── 01-core/        # 核心类型、常量、工具
├── 02-llm/        # LLM统一网关
├── 03-perception/  # 用户状态感知
├── 04-ui/          # React UI组件
├── 05-events/      # 随机事件引擎
└── 06-platform/    # Tauri/Rust平台层
```

---

## 4. 开发规范

### 4.1 提交规范 (Conventional Commits)

```
feat:     新功能
fix:      Bug修复
docs:     文档更新
style:    代码格式（不影响功能）
refactor: 重构（非新功能非修复）
test:     测试相关
chore:    构建/工具/辅助
```

### 4.2 分支规范

```
main           # 主分支（稳定版本）
├── develop    # 开发分支
├── feature/*  # 功能分支
├── fix/*      # 修复分支
├── docs/*     # 文档分支
└── release/*  # 发布分支
```

### 4.3 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| TypeScript/React | PascalCase | `PetSprite.tsx` |
| Rust | snake_case | `perception_manager.rs` |
| 配置/文档 | kebab-case | `test-plan.md` |
| 测试 | `*.test.ts` | `gateway.test.ts` |

---

## 5. AI辅助开发指南

### 5.1 代码生成请求模板

```markdown
我正在开发[模块名]模块，需要：
1. [具体需求描述]
2. 参考：SRS.md §[章节号]
3. 遵循规范：[编码规范链接]

请给出：
- 核心接口定义
- 类型声明
- 关键实现逻辑
```

### 5.2 任务分解粒度

| 粒度 | 预估时间 | 适用场景 |
|------|----------|----------|
| Epic | 1-4周 | 跨模块大功能 |
| Story | 3-7天 | 完整功能模块 |
| Task | 0.5-2天 | 具体实现任务 |
| Subtask | 1-4小时 | 单个代码块 |

---

## 6. 关键约束

### 6.1 隐私约束（最高优先级）

- 所有感知数据必须本地存储，绝不上传
- 禁止采集：键盘输入内容、屏幕截图原始数据、麦克风音频内容
- 敏感信息处理：参见SRS.md §7隐私需求

### 6.2 性能约束

| 指标 | 目标 |
|------|------|
| 启动时间 | < 3秒 |
| 内存占用 | < 200MB |
| 包体积 | < 50MB |
| 动画帧率 | >= 24fps |

---

## 7. 资源链接

- [Tauri 2.x文档](https://tauri.app/)
- [React 18文档](https://react.dev/)
- [Rust语言文档](https://doc.rust-lang.org/)
- [OpenAI API文档](https://platform.openai.com/)
- [Ollama文档](https://github.com/ollama/ollama)

---

*本文档最后更新: 2026-04-07*
