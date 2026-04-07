# 贡献指南

感谢您对 DesktopPet 项目的贡献！

---

## 1. 开发前准备

### 1.1 环境要求

- Node.js 18+
- Rust 1.70+
- Git 2.30+
- Windows 10/11 (64-bit)

### 1.2 开发环境搭建

```bash
# 克隆仓库
git clone https://github.com/[username]/DesktopPet.git
cd DesktopPet

# 安装前端依赖
npm install

# 验证开发环境
npm run tauri dev
```

---

## 2. 分支管理

### 2.1 创建功能分支

```bash
# 从 develop 创建新功能分支
git checkout develop
git checkout -b feature/your-feature-name

# 或创建文档分支
git checkout -b docs/update-readme
```

### 2.2 命名规范

| 分支类型 | 命名格式 | 示例 |
|----------|----------|------|
| 功能 | `feature/` + 简短描述 | `feature/llm-gateway` |
| 修复 | `fix/` + 问题描述 | `fix/memory-leak` |
| 文档 | `docs/` + 简短描述 | `docs/srs-update` |
| 发布 | `release/` + 版本号 | `release/v1.0.0` |

---

## 3. 提交规范

### 3.1 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 3.2 示例

```bash
# 好示例
git commit -m "feat(llm): add OpenAI API client

- Implement chat completion endpoint
- Add streaming support
- Handle rate limit errors

Closes #123"

# 避免
git commit -m "updated stuff"
git commit -m "fix bug"
```

### 3.3 Type类型

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `test` | 测试相关 |
| `chore` | 构建/工具/辅助 |

---

## 4. 代码规范

### 4.1 TypeScript

- 使用 ESLint + Prettier
- 所有新代码必须TypeScript
- 禁止使用 `any` 类型

### 4.2 Rust

- 使用 Clippy 进行代码检查
- 遵循 `rustfmt` 格式化
- 公共API必须有文档注释

### 4.3 测试覆盖率

| 模块 | 最低覆盖率 |
|------|------------|
| 核心模块 | 80% |
| LLM模块 | 70% |
| 感知模块 | 70% |
| 整体 | 70% |

---

## 5. Pull Request 流程

### 5.1 创建 PR

1. 确保所有测试通过
2. 更新相关文档（如有必要）
3. 填写 PR 描述模板

### 5.2 PR 描述模板

```markdown
## 描述
[简短描述本次变更]

## 关联需求
- [ ] 关联 SRS 需求: UR-XXX

## 测试情况
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过（如适用）

## 截图/录屏
[如有UI变更]
```

---

## 6. 问题反馈

### 6.1 Bug报告

请包含：
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息

### 6.2 功能建议

请包含：
- 使用场景
- 预期效果
- 替代方案（如有）

---

## 7. 许可证

本项目采用 MIT 许可证，提交代码即表示您同意该许可证。

---

*最后更新: 2026-04-07*
