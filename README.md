# DesktopPet - LLM驱动桌面宠物

> 你的桌面上的智能小生命——懂你、陪你、提醒你

---

## 📁 项目文档导航

```
DesktopPet/
├── 📋 SRS.md                    ← ⭐ 核心需求文档（必读）
├── 📊 PROJECT-STRUCTURE.md       ← 项目结构总览
├── 📑 requirements-tracking.md  ← 需求跟踪矩阵
│
├── 📁 docs/
│   ├── 📁 01-research/          ← 5份技术调研报告
│   │   ├── 01-framework-research.md
│   │   ├── 02-art-resources-research.md
│   │   ├── 03-llm-architecture-research.md
│   │   ├── 04-user-state-perception-research.md
│   │   └── 05-development-process-research.md
│   │
│   ├── 📁 02-requirements/      ← 需求文档 ⭐
│   │   ├── SRS.md              ← 需求规格说明书
│   │   ├── PROJECT-STRUCTURE.md ← 项目结构
│   │   └── requirements-tracking.md
│   │
│   ├── 📁 03-design/           ← 设计文档（待编写）
│   ├── 📁 04-testing/          ← 测试文档（待编写）
│   ├── 📁 05-delivery/         ← 交付文档（待编写）
│   └── 📁 06-meetingRecords/   ← 会议记录（待添加）
│
├── 📁 src/                      ← 源代码（待开发）
├── 📁 resources/                ← 资源文件（待添加）
├── 📁 configs/                  ← 配置文件
└── 📁 tools/                    ← 开发工具
```

---

## 🎯 项目核心目标

| 优先级 | 能力 | 说明 |
|--------|------|------|
| ⭐ P0 | LLM对话 | 与用户自然语言对话 |
| ⭐ P0 | 用户状态感知 | 感知用户当前活动状态 |
| ⭐ P0 | 时间感知 | 不同时间段不同行为 |
| P1 | 随机事件 | 主动互动增加趣味 |
| P1 | 视觉动画 | 丰富的表情和动画 |
| P2 | 提醒功能 | 饭点/久坐提醒 |

---

## 🛠 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | **Tauri 2.x** | 轻量桌面框架 (5-20MB) |
| 前端 | React 18 + TypeScript | UI渲染 |
| 状态 | Zustand | 轻量状态管理 |
| 后端 | Rust | Win32 API调用 |
| LLM | OpenAI/Claude/Ollama | 多模型支持 |

---

## 📋 已完成文档

| 文档 | 状态 | 说明 |
|------|------|------|
| SRS.md | ✅ 冻结待审 | 需求规格说明书 v1.0.0 |
| PROJECT-STRUCTURE.md | ✅ 已完成 | 项目结构总览 |
| requirements-tracking.md | ✅ 已完成 | 需求跟踪矩阵 |
| 01-framework-research.md | ✅ 已完成 | 框架选型调研 |
| 02-art-resources-research.md | ✅ 已完成 | 美术资源调研 |
| 03-llm-architecture-research.md | ✅ 已完成 | LLM架构调研 |
| 04-user-state-perception-research.md | ✅ 已完成 | 感知系统调研 |
| 05-development-process-research.md | ✅ 已完成 | 开发流程调研 |

---

## 🚀 下一步行动

### Sprint 0: 项目初始化

- [ ] 创建Git仓库
- [ ] 配置开发环境 (Tauri + React + TypeScript)
- [ ] 初始化项目结构
- [ ] 搭建CI/CD

### Sprint 1: MVP开发

- [ ] LLM Gateway实现
- [ ] 基础对话UI
- [ ] 基础感知模块
- [ ] 基础待机动画

---

## 📅 项目周期

```
前期准备: 2026-04-07 (今日)
   ↓
Sprint 0: 2026-04-07 ~ 2026-04-13 (项目初始化)
   ↓
Sprint 1: 2026-04-14 ~ 2026-04-27 (MVP开发)
   ↓
Sprint 2+: 持续迭代...
```

---

## 👥 项目团队

| 角色 | 负责人 | 备注 |
|------|--------|------|
| 项目owner | [待定] | - |
| 开发者 | Claude (AI) + User | AI辅助开发 |
| 审阅者 | [待定] | - |

---

## 📄 许可证

MIT License

---

*最后更新: 2026-04-07*
