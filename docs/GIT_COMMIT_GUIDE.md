# Git 提交规范指南

## Commit 信息格式

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 基本格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 示例

```bash
feat(auth): 添加用户登录功能

实现了基于 JWT 的用户登录系统，包括：
- 登录表单组件
- Token 存储和管理
- 自动刷新 Token 机制

Closes #123
```

## Type 类型说明

### 必须使用以下类型之一：

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(user): 添加用户个人资料页面` |
| `fix` | 修复 bug | `fix(login): 修复登录按钮点击无响应` |
| `docs` | 文档更新 | `docs(readme): 更新安装说明` |
| `style` | 代码格式（不影响功能） | `style: 统一代码缩进为 2 空格` |
| `refactor` | 重构代码 | `refactor(api): 重构 API 请求层` |
| `perf` | 性能优化 | `perf(list): 优化列表渲染性能` |
| `test` | 测试相关 | `test(utils): 添加工具函数单元测试` |
| `build` | 构建系统或依赖变动 | `build: 升级 vite 到 6.0` |
| `ci` | CI 配置变动 | `ci: 添加 GitHub Actions 工作流` |
| `chore` | 其他杂项 | `chore: 更新 .gitignore` |
| `revert` | 回退之前的提交 | `revert: 回退 feat(auth) 提交` |

## Scope（可选）

用于说明 commit 影响的范围，例如：

- `auth` - 认证相关
- `user` - 用户相关
- `api` - API 相关
- `ui` - UI 组件
- `utils` - 工具函数

## Subject

- 简明扼要描述本次提交
- 使用第一人称现在时：`添加` 而不是 `已添加` 或 `添加了`
- 第一个字母小写
- 结尾不加句号
- 最大长度 100 字符

## Body（可选）

- 详细描述本次提交的内容
- 可以分多行
- 解释为什么做这个改动，以及如何解决问题

## Footer（可选）

- 关联 Issue：`Closes #123` 或 `Fixes #456`
- 不兼容变动：`BREAKING CHANGE: API 路径已更改`

## 提交示例

### 简单提交

```bash
feat: 添加搜索功能
```

```bash
fix: 修复导航栏在移动端显示异常
```

```bash
docs: 更新 README 安装步骤
```

### 带 scope 的提交

```bash
feat(components): 添加 Button 组件
```

```bash
fix(api): 修复请求超时问题
```

```bash
refactor(hooks): 优化 useLocalStorage 实现
```

### 完整提交（带 body 和 footer）

```bash
feat(payment): 实现支付功能

添加了支付模块，包括：
- 支付宝支付集成
- 微信支付集成
- 支付状态回调处理
- 支付记录查询

Closes #234
```

```bash
fix(form): 修复表单验证问题

修复了以下问题：
1. 邮箱格式验证不正确
2. 必填字段提示未显示
3. 提交按钮状态异常

Fixes #456, #457
```

## 提交前检查清单

在提交代码之前，确保：

- [ ] 代码已经过 ESLint 检查（`npm run lint`）
- [ ] 代码已格式化（`npm run format`）
- [ ] TypeScript 类型检查通过（`npm run type-check`）
- [ ] Commit 信息符合规范格式
- [ ] 相关文档已更新
- [ ] 测试已通过（如有）

## Git Hooks 自动检查

本项目配置了以下 Git hooks：

### pre-commit（提交前）
自动执行：
- **lint-staged**: 对暂存的文件运行 ESLint 和 Prettier
- **type-check**: TypeScript 类型检查

如果检查失败，提交将被阻止。

### commit-msg（提交信息检查）
自动执行：
- **commitlint**: 检查 commit 信息是否符合规范

如果不符合规范，提交将被阻止。

## 常见错误及解决方法

### 错误 1: Type 不在允许的列表中

```
❌ type must be one of [feat, fix, docs, ...]
```

**解决方法**: 使用正确的 type，如 `feat`, `fix`, `docs` 等。

### 错误 2: Subject 为空

```
❌ subject may not be empty
```

**解决方法**: 添加简短的描述信息。

### 错误 3: Header 太长

```
❌ header must not be longer than 120 characters
```

**解决方法**: 缩短 commit 信息，或将详细内容放到 body 中。

### 错误 4: ESLint 错误

```
❌ ESLint found errors
```

**解决方法**: 
```bash
npm run lint:fix  # 自动修复
# 或手动修复代码问题
```

### 错误 5: TypeScript 类型错误

```
❌ TypeScript type check failed
```

**解决方法**: 修复代码中的类型错误。

## 跳过检查（不推荐）

在紧急情况下，可以跳过检查：

```bash
# 跳过 pre-commit 检查
git commit --no-verify -m "emergency fix"

# 但不推荐这样做，应该修复问题后再提交
```

## 最佳实践

1. **频繁提交**: 小步快跑，每次只提交一个逻辑变更
2. **清晰描述**: 让别人（包括未来的自己）能理解为什么做这个改动
3. **遵循规范**: 统一的提交信息便于生成 changelog 和代码审查
4. **关联 Issue**: 使用 `Closes #123` 自动关闭相关 Issue
5. **原子提交**: 每次提交应该是完整的、可工作的状态

## 工具推荐

### VS Code 插件

- **Conventional Commits**: 帮助生成符合规范的 commit 信息
- **GitLens**: 强大的 Git 可视化工具

### 命令行工具

```bash
# 使用 commitizen 生成规范的 commit（可选）
npm install -g commitizen
git cz  # 替代 git commit
```

## 参考资源

- [Conventional Commits 规范](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Commitlint 文档](https://commitlint.js.org/)
