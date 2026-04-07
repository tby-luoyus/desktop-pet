# 需求跟踪矩阵 (Requirements Tracking Matrix)

**文档版本**: v1.0.2
**创建日期**: 2026-04-07
**最后更新**: 2026-04-07
**项目**: DesktopPet - LLM驱动桌面宠物
**状态**: ✅ Sprint 0完成

---

## 1. 概述

本文档跟踪所有需求从定义到实现的完整生命周期，确保每个需求都被正确实现和测试。

### 1.1 追踪维度

| 维度 | 说明 |
|------|------|
| **需求 → 设计** | 需求是否已映射到系统设计 |
| **需求 → 代码** | 需求是否已实现 |
| **需求 → 测试** | 需求是否有对应测试用例 |
| **需求 → 验收** | 需求是否通过验收 |

---

## 2. 需求-代码-测试映射表

### 2.1 功能需求追踪

| 需求ID | 需求名称 | 模块 | 设计文档 | 源代码 | 测试用例 | 验收状态 |
|--------|----------|------|----------|--------|----------|----------|
| **UR-001** | **LLM对话能力** | 02-llm | SAD.md §3.1 | `src/02-llm/` | TC-001 | ⬜ |
| UR-001-F1 | 自然对话 | 02-llm | SAD.md §3.1.1 | `gateway.ts` | TC-001-01 | ⬜ |
| UR-001-F2 | 对话上下文 | 02-llm | SAD.md §3.1.2 | `context-manager.ts` | TC-001-02 | ⬜ |
| UR-001-F3 | 长期记忆 | 06-platform | SAD.md §3.1.3 | `storage/sqlite.rs` | TC-001-03 | ⬜ |
| UR-001-F4 | 人设一致性 | 02-llm | SAD.md §3.1.4 | `prompt-manager.ts` | TC-001-04 | ⬜ |
| UR-001-F5 | 多模型支持 | 02-llm | SAD.md §3.1.5 | `clients/` | TC-001-05 | ⬜ |
| **UR-002** | **用户状态感知** | 03-perception | SAD.md §3.2 | `src/03-perception/` | TC-002 | ⬜ |
| UR-002-F1 | 活动窗口检测 | 06-platform | SAD.md §3.2.1 | `perception/window.rs` | TC-002-01 | ⬜ |
| UR-002-F2 | 空闲检测 | 06-platform | SAD.md §3.2.2 | `perception/idle.rs` | TC-002-02 | ⬜ |
| UR-002-F3 | 状态分类 | 03-perception | SAD.md §3.2.3 | `state-classifier.ts` | TC-002-03 | ⬜ |
| UR-002-F4 | 状态响应 | 03-perception | SAD.md §3.2.4 | `perception-manager.ts` | TC-002-04 | ⬜ |
| UR-002-F5 | 频率调节 | 03-perception | SAD.md §3.2.5 | `power-manager.ts` | TC-002-05 | ⬜ |
| **UR-003** | **时间感知行为** | 05-events | SAD.md §3.3 | `src/05-events/` | TC-003 | ⬜ |
| UR-003-F1 | 时段问候 | 05-events | SAD.md §3.3.1 | `schedulers/time-scheduler.ts` | TC-003-01 | ⬜ |
| UR-003-F2 | 餐食提醒 | 05-events | SAD.md §3.3.2 | `handlers/reminder-handler.ts` | TC-003-02 | ⬜ |
| UR-003-F3 | 节日祝福 | 05-events | SAD.md §3.3.3 | `schedulers/time-scheduler.ts` | TC-003-03 | ⬜ |
| UR-003-F4 | 天气关联 | 05-events | SAD.md §3.3.4 | TBD | TC-003-04 | ⬜ |
| **UR-004** | **随机事件系统** | 05-events | SAD.md §3.4 | `src/05-events/` | TC-004 | ⬜ |
| UR-004-F1 | 随机对话 | 05-events | SAD.md §3.4.1 | `random-scheduler.ts` | TC-004-01 | ⬜ |
| UR-004-F2 | 随机动作 | 05-events | SAD.md §3.4.2 | `random-scheduler.ts` | TC-004-02 | ⬜ |
| UR-004-F3 | 事件种子 | 05-events | SAD.md §3.4.3 | `seed.ts` | TC-004-03 | ⬜ |
| UR-004-F4 | 疲劳衰减 | 05-events | SAD.md §3.4.4 | `event-engine.ts` | TC-004-04 | ⬜ |
| **UR-005** | **视觉动画表现** | 04-ui | SAD.md §3.5 | `src/04-ui/components/` | TC-005 | ⬜ |
| UR-005-F1 | 待机动画 | 04-ui | SAD.md §3.5.1 | `PetSprite/` | TC-005-01 | ⬜ |
| UR-005-F2 | 情绪动画 | 04-ui | SAD.md §3.5.2 | `PetSprite/` | TC-005-02 | ⬜ |
| UR-005-F3 | 动作动画 | 04-ui | SAD.md §3.5.3 | `PetSprite/` | TC-005-03 | ⬜ |
| UR-005-F4 | 气泡对话 | 04-ui | SAD.md §3.5.4 | `ChatBubble/` | TC-005-04 | ⬜ |
| UR-005-F5 | 拖拽交互 | 04-ui | SAD.md §3.5.5 | `PetSprite/` | TC-005-05 | ⬜ |
| **UR-006** | **提醒功能** | 05-events | SAD.md §3.6 | `src/05-events/` | TC-006 | ⬜ |
| UR-006-F1 | 定时提醒 | 05-events | SAD.md §3.6.1 | `handlers/reminder-handler.ts` | TC-006-01 | ⬜ |
| UR-006-F2 | 智能提醒 | 05-events | SAD.md §3.6.2 | `state-scheduler.ts` | TC-006-02 | ⬜ |
| UR-006-F3 | 喝水提醒 | 05-events | SAD.md §3.6.3 | `handlers/reminder-handler.ts` | TC-006-03 | ⬜ |
| UR-006-F4 | 久坐提醒 | 05-events | SAD.md §3.6.4 | `handlers/reminder-handler.ts` | TC-006-04 | ⬜ |
| **UR-007** | **设置与配置** | 04-ui | SAD.md §3.7 | `src/04-ui/` | TC-007 | ⬜ |
| UR-007-F1 | LLM设置 | 04-ui | SAD.md §3.7.1 | `Settings/` | TC-007-01 | ⬜ |
| UR-007-F2 | 感知设置 | 04-ui | SAD.md §3.7.2 | `Settings/` | TC-007-02 | ⬜ |
| UR-007-F3 | 行为设置 | 04-ui | SAD.md §3.7.3 | `Settings/` | TC-007-03 | ⬜ |
| UR-007-F4 | 外观设置 | 04-ui | SAD.md §3.7.4 | `Settings/` | TC-007-04 | ⬜ |
| **UR-008** | **多宠物支持** | 04-ui | SAD.md §3.8 | TBD | TC-008 | ⬜ |

### 2.2 非功能需求追踪

| 需求ID | 需求名称 | 目标指标 | 当前状态 | 验证方法 |
|--------|----------|----------|----------|----------|
| **NF-001** | 启动时间 | < 3秒 | ⬜ | 手动计时 |
| **NF-002** | 内存占用 | < 200MB | ⬜ | 任务管理器 |
| **NF-003** | CPU占用 | < 5% (平均) | ⬜ | 性能监控 |
| **NF-004** | LLM响应 | < 10秒 | ⬜ | API计时 |
| **NF-005** | 动画帧率 | >= 24fps | ⬜ | 帧率检测 |
| **NF-006** | 安装包大小 | < 50MB | ⬜ | 打包后测量 |
| **NF-007** | 隐私-数据本地 | 100%本地 | ⬜ | 代码审查 |
| **NF-008** | 隐私-感知范围 | 符合边界 | ⬜ | 隐私审计 |

---

## 3. 需求状态定义

| 状态代码 | 状态名称 | 说明 |
|----------|----------|------|
| 📋 **OPEN** | 开放 | 需求已定义，待实现 |
| 🔨 **IN_PROGRESS** | 进行中 | 正在实现 |
| ✅ **IMPLEMENTED** | 已实现 | 代码已完成 |
| ✅ **TESTED** | 已测试 | 测试通过 |
| ✅ **VERIFIED** | 已验收 | 验收通过 |
| ❌ **REJECTED** | 已拒绝 | 需求被拒绝或推迟 |

---

## 4. Sprint 0 实施记录 (2026-04-07)

### 已实现模块
- ✅ 项目基础结构搭建
- ✅ Tauri 2.x + React 18 + TypeScript 前端配置
- ✅ Rust Win32感知模块 (`perception.rs`)
- ✅ LLM Gateway架构 (`src/02-llm/`)
- ✅ UI组件脚手架 (`PetSprite`, `ChatBubble`, `Settings`, `TrayMenu`)
- ✅ Zustand状态管理 (`pet-store`, `chat-store`, `settings-store`)
- ✅ GitHub Actions CI/CD配置
- ✅ 文档体系 (SRS, 需求跟踪, 项目结构)
- ✅ MSVC工具链支持
- ✅ 图标资源生成
- ✅ 前端构建验证通过 (`npm run build`)
- ✅ Rust后端编译验证通过 (`cargo check`)

### 待实现模块 (Sprint 1+)
- ⬜ LLM对话上下文管理
- ⬜ 用户状态分类器
- ⬜ 时间调度器
- ⬜ 随机事件引擎
- ⬜ 提醒处理器
- ⬜ 完整UI交互

## 5. 变更记录

| 变更日期 | 需求ID | 变更内容 | 变更原因 | 审批人 |
|----------|--------|----------|----------|--------|
| 2026-04-07 | 全部 | Sprint 0初始化：项目结构、核心模块脚手架 | 项目启动 | - |

---

## 5. 验收标准映射

| 验收检查项 | 对应需求 | 验收方法 | 验收人 |
|-----------|----------|----------|--------|
| 输入"你好"10秒内回复 | UR-001-F1 | 手动测试 | |
| 能记住之前的话题 | UR-001-F2 | 连续对话测试 | |
| 能正确显示当前窗口 | UR-002-F1 | 切换应用测试 | |
| 5分钟无操作后进入睡眠 | UR-002-F2 | 等待测试 | |
| 饭点提醒功能正常 | UR-003-F2 | 时间测试 | |
| 动画流畅度达标 | UR-005 | 帧率检测 | |
| 配置修改即时生效 | UR-007 | 设置测试 | |
| 重启后配置保留 | UR-007 | 重启测试 | |

---

**文档结束**
