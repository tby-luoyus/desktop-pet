# DesktopPet 项目结构总览

**文档版本**: v1.0.0
**创建日期**: 2026-04-07
**文档状态**: ✅ 已完成

---

## 1. 整体目录结构

```
DesktopPet/
│
├── 📁 docs/                              # 项目文档
│   ├── 📁 01-research/                  # 技术调研文档
│   │   ├── 01-framework-research.md      # 框架选型调研
│   │   ├── 02-art-resources-research.md # 美术资源调研
│   │   ├── 03-llm-architecture-research.md # LLM架构调研
│   │   ├── 04-user-state-perception-research.md # 感知系统调研
│   │   └── 05-development-process-research.md # 开发流程调研
│   │
│   ├── 📁 02-requirements/              # 需求文档
│   │   ├── SRS.md                       # 软件需求规格说明书 ⭐核心
│   │   ├── SRS-appendix-A-glossary.md    # 术语表
│   │   ├── SRS-appendix-B-use-cases.md   # 用例详述
│   │   ├── requirements-tracking.md      # 需求跟踪矩阵
│   │   └── PROJECT-STRUCTURE.md          # 项目结构总览 ⭐本文档
│   │
│   ├── 📁 03-design/                    # 设计文档
│   │   ├── SAD.md                       # 系统架构文档
│   │   ├── DDS.md                       # 详细设计说明
│   │   ├── database-design.md            # 数据库设计
│   │   ├── interface-spec.md             # 接口规格说明
│   │   └── UI-design.md                  # UI设计规范
│   │
│   ├── 📁 04-testing/                   # 测试文档
│   │   ├── test-plan.md                 # 测试计划
│   │   ├── 01-unit/                     # 单元测试
│   │   │   ├── llm-gateway-test.md
│   │   │   ├── perception-test.md
│   │   │   └── event-engine-test.md
│   │   ├── 02-integration/              # 集成测试
│   │   │   └── api-integration-test.md
│   │   ├── 03-acceptance/                # 验收测试
│   │   │   └── uat-checklist.md
│   │   └── test-reports/                 # 测试报告归档
│   │
│   ├── 📁 05-delivery/                  # 交付文档
│   │   ├── user-manual.md               # 用户手册
│   │   ├── deployment-guide.md           # 部署指南
│   │   ├── release-notes.md              # 发布说明
│   │   └── ops-guide.md                  # 运维指南
│   │
│   └── 📁 06-meetingRecords/            # 会议记录
│       ├── 2026-04-07-sprint-0-planning.md
│       ├── 2026-04-21-sprint-1-review.md
│       └── 2026-04-21-sprint-1-retro.md
│
├── 📁 src/                              # 源代码
│   │
│   ├── 📁 01-core/                      # 核心模块
│   │   ├── src/
│   │   │   ├── index.ts                 # 核心入口
│   │   │   ├── types/                   # 类型定义
│   │   │   │   ├── pet.ts               # 宠物状态类型
│   │   │   │   ├── llm.ts               # LLM类型
│   │   │   │   └── perception.ts         # 感知类型
│   │   │   ├── constants/               # 常量定义
│   │   │   │   ├── prompts.ts           # System Prompt
│   │   │   │   └── behaviors.ts         # 行为常量
│   │   │   └── utils/                    # 工具函数
│   │   │       ├── time.ts              # 时间工具
│   │   │       └── logger.ts            # 日志工具
│   │   └── tests/                       # 核心模块测试
│   │
│   ├── 📁 02-llm/                       # LLM集成模块
│   │   ├── src/
│   │   │   ├── gateway.ts              # LLM统一网关
│   │   │   ├── clients/                 # 模型客户端
│   │   │   │   ├── openai-client.ts    # OpenAI
│   │   │   │   ├── claude-client.ts    # Claude
│   │   │   │   └── ollama-client.ts    # Ollama
│   │   │   ├── prompt-manager.ts       # Prompt管理
│   │   │   ├── context-manager.ts       # 上下文管理
│   │   │   └── fallback.ts             # 降级策略
│   │   └── tests/
│   │       └── gateway.test.ts
│   │
│   ├── 📁 03-perception/                # 感知系统模块
│   │   ├── src/
│   │   │   ├── perception-manager.ts   # 感知管理器
│   │   │   ├── state-classifier.ts     # 状态分类器
│   │   │   ├── activity-monitor.ts     # 活动监控
│   │   │   ├── idle-detector.ts         # 空闲检测
│   │   │   ├── power-manager.ts        # 电源管理
│   │   │   └── privacy-manager.ts      # 隐私管理
│   │   └── tests/
│   │       └── classifier.test.ts
│   │
│   ├── 📁 04-ui/                        # UI层模块
│   │   ├── src/
│   │   │   ├── components/             # React组件
│   │   │   │   ├── PetSprite/          # 宠物精灵组件
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── animations.ts    # 动画状态机
│   │   │   │   │   └── sprites/         # 精灵图资源
│   │   │   │   ├── ChatBubble/          # 对话气泡
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Settings/             # 设置面板
│   │   │   │   │   └── index.tsx
│   │   │   │   └── TrayMenu/            # 托盘菜单
│   │   │   │       └── index.tsx
│   │   │   ├── stores/                  # 状态管理
│   │   │   │   ├── pet-store.ts         # 宠物状态
│   │   │   │   ├── chat-store.ts         # 对话状态
│   │   │   │   └── settings-store.ts    # 设置状态
│   │   │   ├── hooks/                   # 自定义Hooks
│   │   │   │   ├── usePerception.ts
│   │   │   │   ├── useLLM.ts
│   │   │   │   └── useAnimation.ts
│   │   │   └── App.tsx                  # 应用入口
│   │   │
│   │   └── public/
│   │       └── sprites/                 # 精灵图资源
│   │
│   ├── 📁 05-events/                    # 事件系统模块
│   │   ├── src/
│   │   │   ├── event-engine.ts          # 事件引擎
│   │   │   ├── schedulers/              # 调度器
│   │   │   │   ├── time-scheduler.ts    # 时间调度
│   │   │   │   ├── state-scheduler.ts   # 状态调度
│   │   │   │   └── random-scheduler.ts   # 随机调度
│   │   │   ├── handlers/                # 事件处理器
│   │   │   │   ├── greeting-handler.ts
│   │   │   │   ├── reminder-handler.ts
│   │   │   │   └── random-handler.ts
│   │   │   └── seed.ts                  # 随机种子生成
│   │   └── tests/
│   │       └── engine.test.ts
│   │
│   └── 📁 06-platform/                   # 平台集成模块 (Rust/Tauri)
│       ├── src/
│       │   ├── main.rs                  # Tauri入口
│       │   ├── lib.rs                   # 库入口
│       │   ├── commands/                # Tauri命令
│       │   │   ├── mod.rs
│       │   │   ├── perception.rs        # 感知命令
│       │   │   ├── storage.rs          # 存储命令
│       │   │   └── system.rs           # 系统命令
│       │   ├── perception/              # Win32感知实现
│       │   │   ├── mod.rs
│       │   │   ├── window.rs
│       │   │   ├── idle.rs
│       │   │   └── screenshot.rs
│       │   └── storage/                # 本地存储
│       │       ├── mod.rs
│       │       └── sqlite.rs
│       │
│       └── Cargo.toml
│
├── 📁 resources/                       # 外部资源
│   ├── 📁 01-sprites/                  # 精灵图资源
│   │   ├── default/                    # 默认宠物精灵
│   │   │   ├── idle/                   # 待机动画
│   │   │   ├── happy/                  # 开心动画
│   │   │   ├── sad/                    # 难过动画
│   │   │   ├── curious/                 # 好奇动画
│   │   │   ├── sleeping/                # 睡眠动画
│   │   │   └── walking/                 # 行走动画
│   │   ├── hamster/                    # 仓鼠宠物(可选)
│   │   └── custom/                     # 用户自定义宠物
│   │
│   ├── 📁 02-sounds/                   # 音效资源
│   │   ├── effects/                    # 效果音
│   │   │   ├── pop.mp3                 # 气泡音
│   │   │   ├── ding.mp3                # 提醒音
│   │   │   └── ...                     # 更多音效
│   │   └── bgm/                        # 背景音乐(可选)
│   │
│   └── 📁 03-models/                   # 本地AI模型(可选)
│       └── ollama/                     # Ollama模型目录
│
├── 📁 tests/                           # 集成测试
│   ├── 01-unit/                        # 单元测试
│   │   └── (对应各模块的单元测试)
│   ├── 02-integration/                  # 集成测试
│   │   ├── llm-integration.test.ts
│   │   └── perception-integration.test.ts
│   └── 03-acceptance/                    # 验收测试
│       └── e2e.test.ts
│
├── 📁 configs/                          # 配置文件
│   ├── settings.yaml                   # 应用配置
│   ├── prompts/                        # LLM Prompt配置
│   │   ├── system-prompt.md            # 系统提示词
│   │   └── behavior-prompts.ts         # 行为Prompt
│   ├── logging.yaml                    # 日志配置
│   └── app-icons/                      # 应用图标
│
├── 📁 tools/                           # 开发工具脚本
│   ├── scripts/
│   │   ├── setup-dev.ps1              # 开发环境搭建
│   │   ├── build-release.ps1           # 发布打包
│   │   └── generate-sprite.ts          # 精灵图生成辅助
│   └── CI-CD/
│       └── github-actions.yml           # CI/CD配置
│
├── src-tauri/                          # Tauri Rust后端
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── icons/
│
├── src/                               # React前端源码
│   ├── main.tsx
│   ├── App.tsx
│   └── ...
│
├── package.json                        # Node.js依赖
├── tsconfig.json                       # TypeScript配置
├── vite.config.ts                     # Vite配置
├── tailwind.config.js                 # TailwindCSS配置
├── .eslintrc.js                       # ESLint配置
├── .gitignore
├── README.md                          # 项目说明
├── CLAUDE.md                          # AI协作指南
├── LICENSE                            # MIT许可证
└── CONTRIBUTING.md                    # 贡献指南
```

---

## 2. 目录结构说明

### 2.1 文档体系 (docs/)

| 目录 | 用途 | 审阅要求 |
|------|------|----------|
| `01-research/` | 前期技术调研成果 | 可选审阅 |
| `02-requirements/` | **SRS核心需求文档** | 必须审阅冻结 |
| `03-design/` | 系统和详细设计 | 建议审阅 |
| `04-testing/` | 测试计划、用例、报告 | 测试前审阅 |
| `05-delivery/` | 交付文档（用户手册等） | 发布前完成 |
| `06-meetingRecords/` | 会议记录归档 | 自动归档 |

### 2.2 源码体系 (src/)

| 模块 | 职责 | 关键技术 |
|------|------|----------|
| `01-core/` | 核心类型、常量、工具 | TypeScript |
| `02-llm/` | LLM统一网关、多模型支持 | OpenAI/Claude/Ollama SDK |
| `03-perception/` | 用户状态感知 | Win32 API (Rust) |
| `04-ui/` | React UI组件层 | React 18 + Zustand |
| `05-events/` | 随机事件调度引擎 | 时间/状态驱动 |
| `06-platform/` | Tauri平台集成 | Rust + Tauri |

### 2.3 资源体系 (resources/)

| 目录 | 用途 | 来源 |
|------|------|------|
| `01-sprites/` | 宠物精灵图动画 | 开源/自制作 |
| `02-sounds/` | 音效文件 | 开源音效 |
| `03-models/` | Ollama本地模型 | 可选配置 |

---

## 3. 核心文件说明

### 3.1 入口文件

| 文件 | 路径 | 说明 |
|------|------|------|
| Tauri入口 | `src-tauri/src/main.rs` | Rust后端入口 |
| React入口 | `src/main.tsx` | 前端入口 |
| 应用入口 | `src/App.tsx` | React根组件 |
| 核心入口 | `src/01-core/src/index.ts` | 核心模块入口 |

### 3.2 关键配置文件

| 文件 | 路径 | 说明 |
|------|------|------|
| Tauri配置 | `src-tauri/tauri.conf.json` | Tauri窗口/打包配置 |
| 应用配置 | `configs/settings.yaml` | 功能开关等 |
| Prompt配置 | `configs/prompts/system-prompt.md` | 桌宠人设 |
| CI/CD配置 | `tools/CI-CD/github-actions.yml` | GitHub Actions |

---

## 4. 模块依赖关系

```
┌─────────────────────────────────────────────────────────────────┐
│                        模块依赖图                                 │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │    01-core      │  ← 所有模块依赖
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   02-llm   │    │03-perception│    │  05-events  │
   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
          │                  │                  │
          │                  │                  │
          └────────┬─────────┴────────┬─────────┘
                   │                 │
                   ▼                 ▼
            ┌─────────────┐   ┌─────────────┐
            │    04-ui    │◄──│  06-platform│
            │             │   │  (Tauri/Rust│
            └─────────────┘   └─────────────┘
```

---

## 5. 开发工作流

### 5.1 源码开发流程

```
1. 创建分支
   git checkout -b feature/xxx

2. 开发源码
   src/01-core/         # 核心模块
   src/02-llm/          # LLM模块
   ...

3. 编写测试
   tests/01-unit/       # 单元测试
   tests/02-integration/ # 集成测试

4. 更新文档（如有必要）
   docs/03-design/      # 设计文档
   docs/04-testing/     # 测试文档

5. 提交PR
   git add .
   git commit -m "feat: xxx"
   git push origin feature/xxx
```

### 5.2 文档管理流程

```
需求变更 → 更新SRS → 更新需求跟踪矩阵
                ↓
           更新设计文档（如有必要）
                ↓
           更新测试用例
                ↓
           验收测试
```

---

## 6. 关键约定

### 6.1 命名约定

| 类型 | 约定 | 示例 |
|------|------|------|
| 分支 | `feature/` / `fix/` / `docs/` | `feature/llm-gateway` |
| 提交 | Conventional Commits | `feat: add LLM gateway` |
| 文件 | kebab-case | `llm-gateway.ts` |
| 组件 | PascalCase | `PetSprite.tsx` |
| 测试 | `*.test.ts` | `gateway.test.ts` |

### 6.2 文档版本控制

| 文档类型 | 版本格式 | 状态 |
|----------|----------|------|
| SRS | v1.0.0 | 冻结后不变 |
| SAD | v1.0.0 | 重大变更时更新 |
| DDS | v0.1.0 | 持续迭代更新 |
| 测试报告 | v日期 | 每次测试后归档 |

---

## 7. 快速导航

| 任务 | 文档位置 |
|------|----------|
| 了解项目目标 | `docs/02-requirements/SRS.md` |
| 查看技术选型 | `docs/01-research/01-framework-research.md` |
| 理解系统架构 | `docs/03-design/SAD.md` |
| 查看测试计划 | `docs/04-testing/test-plan.md` |
| 用户操作手册 | `docs/05-delivery/user-manual.md` |
| 贡献代码 | `CONTRIBUTING.md` |

---

**文档结束**
