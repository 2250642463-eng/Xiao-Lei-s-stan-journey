# Commit 信息示例速查

## 快速参考

```bash
# 新功能
git commit -m "feat: 添加用户登录功能"
git commit -m "feat(auth): 实现 JWT 认证"

# 修复 bug
git commit -m "fix: 修复登录按钮无响应问题"
git commit -m "fix(api): 修复接口超时错误"

# 文档更新
git commit -m "docs: 更新 README 安装说明"
git commit -m "docs(api): 添加 API 使用文档"

# 代码格式化
git commit -m "style: 统一代码缩进"
git commit -m "style: 格式化所有 TS 文件"

# 重构
git commit -m "refactor: 重构用户模块"
git commit -m "refactor(hooks): 优化 useAuth 实现"

# 性能优化
git commit -m "perf: 优化列表渲染性能"
git commit -m "perf(api): 添加请求缓存"

# 测试
git commit -m "test: 添加登录组件单元测试"
git commit -m "test(utils): 完善工具函数测试覆盖"

# 构建相关
git commit -m "build: 升级 vite 到 6.0"
git commit -m "build: 添加 husky 和 commitlint"

# CI/CD
git commit -m "ci: 添加 GitHub Actions 工作流"
git commit -m "ci: 配置自动部署"

# 其他
git commit -m "chore: 更新 .gitignore"
git commit -m "chore: 清理未使用的依赖"
```

## 常见场景

### 添加新页面
```bash
git commit -m "feat(pages): 添加用户个人资料页面"
```

### 修复样式问题
```bash
git commit -m "fix(styles): 修复导航栏在移动端显示异常"
```

### 更新依赖
```bash
git commit -m "build: 升级 React 到 19.0.0"
```

### 添加组件
```bash
git commit -m "feat(components): 添加 Modal 弹窗组件"
```

### 优化代码
```bash
git commit -m "refactor: 简化状态管理逻辑"
```

### 修复类型错误
```bash
git commit -m "fix(types): 修正 User 接口类型定义"
```

## 多行提交示例

```bash
git commit -m "feat(payment): 实现支付功能

添加了完整的支付模块：
- 支付宝支付集成
- 微信支付集成  
- 支付状态回调
- 支付记录查询

Closes #123"
```

## 错误示例与修正

### ❌ 错误示例

```bash
# 类型错误
git commit -m "添加登录功能"  # 缺少 type
git commit -m "Feature: 添加登录"  # type 应该小写

# subject 问题
git commit -m "feat:"  # subject 不能为空
git commit -m "feat: 添加登录功能。"  # 不要句号
git commit -m "feat: 这是一个非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的提交信息"  # 太长

# 格式错误
git commit -m "feat(auth) 添加登录"  # 缺少冒号
git commit -m "feat :添加登录"  # 冒号前不要空格
```

### ✅ 正确示例

```bash
git commit -m "feat: 添加登录功能"
git commit -m "feat(auth): 实现用户认证"
git commit -m "fix: 修复登录按钮点击无响应"
git commit -m "docs: 更新 API 文档"
```

## 测试你的 commit

在实际提交前，可以测试你的 commit 信息是否符合规范：

```bash
# 测试 commit 信息
echo "feat: 添加新功能" | pnpm exec commitlint

# 如果输出没有错误，说明符合规范
```

## 如果提交被拒绝

### Pre-commit 检查失败

```bash
# 查看具体错误
pnpm lint

# 自动修复
pnpm lint:fix

# 类型检查
pnpm type-check
```

### Commit 信息不符合规范

```bash
# 修改上一次的 commit 信息
git commit --amend -m "feat: 新的符合规范的信息"
```

## 快速记忆口诀

- **feat** - 新功能（feature）
- **fix** - 修 bug
- **docs** - 文档（documentation）
- **style** - 格式（不影响代码运行）
- **refactor** - 重构
- **perf** - 性能（performance）
- **test** - 测试
- **build** - 构建
- **ci** - 持续集成
- **chore** - 杂项（琐事）
