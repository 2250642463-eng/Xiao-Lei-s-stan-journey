# 代码审查指南（Code Review Guide）

## 概述

代码审查是确保代码质量、防止"雷代码"进入主分支的重要环节。本文档定义了提交代码前必须检查的项目。

## 🎯 目标

- **防止低质量代码**：拦截潜在的 bug 和性能问题
- **保持代码一致性**：确保团队代码风格统一
- **知识共享**：通过审查过程学习和改进
- **降低维护成本**：高质量代码更容易维护

## ⚠️ 什么是"雷代码"？

以下代码问题会被视为"雷代码"，必须修复才能提交：

### 1. 类型安全问题
```typescript
// ❌ 雷代码：使用 any 类型
function processData(data: any) {
  return data.value
}

// ✅ 好代码：明确类型
function processData<T extends { value: string }>(data: T) {
  return data.value
}
```

### 2. 空值处理不当
```typescript
// ❌ 雷代码：可能导致运行时错误
function getUserName(user: User) {
  return user.profile.name  // profile 可能为 null
}

// ✅ 好代码：安全的空值处理
function getUserName(user: User) {
  return user.profile?.name ?? '未知用户'
}
```

### 3. 未处理的异步错误
```typescript
// ❌ 雷代码：未处理的 Promise
async function fetchData() {
  fetch('/api/data')  // 没有 await，没有错误处理
}

// ✅ 好代码：正确的错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) throw new Error('请求失败')
    return await response.json()
  } catch (error) {
    console.error('数据获取失败:', error)
    return null
  }
}
```

### 4. 内存泄漏风险
```typescript
// ❌ 雷代码：未清理的 effect
useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  // 忘记清理！
}, [])

// ✅ 好代码：正确清理资源
useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 1000)
  
  return () => clearInterval(interval)
}, [])
```

### 5. 直接修改状态
```typescript
// ❌ 雷代码：直接修改 state
const [items, setItems] = useState([])
items.push(newItem)  // 直接修改！

// ✅ 好代码：创建新数组
setItems([...items, newItem])
```

### 6. 无限循环风险
```typescript
// ❌ 雷代码：可能导致无限渲染
useEffect(() => {
  setCount(count + 1)  // 依赖 count，但又修改 count
}, [count])

// ✅ 好代码：使用函数式更新
useEffect(() => {
  setCount(prev => prev + 1)
}, [])
```

### 7. 性能问题
```typescript
// ❌ 雷代码：每次渲染都创建新函数
function Component({ data }) {
  return (
    <button onClick={() => processData(data)}>
      处理
    </button>
  )
}

// ✅ 好代码：使用 useCallback
function Component({ data }) {
  const handleClick = useCallback(() => {
    processData(data)
  }, [data])
  
  return <button onClick={handleClick}>处理</button>
}
```

### 8. 硬编码和魔法值
```typescript
// ❌ 雷代码：魔法数字
setTimeout(callback, 5000)
if (user.status === 1) { }

// ✅ 好代码：使用常量
const TIMEOUT_MS = 5000
const USER_STATUS = { ACTIVE: 1, INACTIVE: 0 } as const

setTimeout(callback, TIMEOUT_MS)
if (user.status === USER_STATUS.ACTIVE) { }
```

## 📋 提交前检查清单

### 必须项（Must Have）⚠️

在提交代码前，**必须**确认以下所有项：

- [ ] **代码可以运行**
  - `npm run dev` 正常启动
  - 无控制台错误

- [ ] **所有自动检查通过**
  - `npm run lint` - ESLint 检查通过
  - `npm run type-check` - TypeScript 类型检查通过
  - `npm run format:check` - 代码格式正确

- [ ] **没有 console.log 调试代码**
  - 移除所有调试用的 console.log
  - 必要的日志使用统一的日志工具

- [ ] **没有注释掉的代码**
  - 删除无用的注释代码
  - 如需保留，添加说明注释

- [ ] **没有 TODO 或 FIXME**
  - 修复所有 TODO 和 FIXME
  - 或创建 Issue 追踪

- [ ] **类型定义完整**
  - 没有 `any` 类型
  - 函数有明确的参数和返回值类型
  - Props 接口定义完整

- [ ] **错误处理完善**
  - 所有异步操作有错误处理
  - 用户友好的错误提示
  - 不会导致应用崩溃

- [ ] **资源清理正确**
  - useEffect 有清理函数
  - 取消订阅和定时器
  - 移除事件监听器

### 推荐项（Should Have）✅

强烈建议检查：

- [ ] **命名规范**
  - 组件使用 PascalCase
  - 函数/变量使用 camelCase
  - 常量使用 UPPER_SNAKE_CASE
  - 命名语义清晰

- [ ] **代码复用**
  - 重复代码提取为函数
  - 相似组件提取公共部分
  - 使用自定义 Hooks

- [ ] **性能优化**
  - 大列表使用虚拟滚动
  - 复杂计算使用 useMemo
  - 回调函数使用 useCallback
  - 避免不必要的重渲染

- [ ] **可访问性（a11y）**
  - 图片有 alt 属性
  - 按钮有明确文本或 aria-label
  - 表单有正确的 label
  - 键盘可访问

- [ ] **注释和文档**
  - 复杂逻辑有注释说明
  - 公共函数有 JSDoc
  - 组件有使用示例

### 可选项（Nice to Have）💡

如果时间允许：

- [ ] **单元测试**
  - 关键功能有测试覆盖
  - 边界情况测试

- [ ] **性能测试**
  - 大数据量下测试
  - 慢网络环境测试

- [ ] **兼容性测试**
  - 不同浏览器测试
  - 响应式布局测试

## 🔍 自审清单（Self Review）

提交 PR 前，先自己审查一遍代码：

### 1. 整体检查
```bash
# 查看即将提交的所有改动
git diff main...HEAD

# 查看修改的文件列表
git diff --stat main...HEAD
```

### 2. 逐行检查

- 每一行改动都是必要的吗？
- 有没有意外包含的调试代码？
- 有没有遗漏的文件？
- 格式是否正确？

### 3. 功能检查

- 新功能是否完整实现？
- 边界情况是否处理？
- 错误情况是否处理？
- 用户体验是否友好？

### 4. 代码质量

- 变量名是否语义清晰？
- 函数是否职责单一？
- 代码是否容易理解？
- 是否有潜在的性能问题？

## 🚫 常见雷代码模式

### 模式 1: 未定义类型
```typescript
// ❌ 雷代码
const [data, setData] = useState()

// ✅ 好代码
interface UserData {
  id: string
  name: string
}
const [data, setData] = useState<UserData | null>(null)
```

### 模式 2: 不安全的类型断言
```typescript
// ❌ 雷代码
const user = data as User  // 假设 data 一定是 User

// ✅ 好代码
function isUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data
}
const user = isUser(data) ? data : null
```

### 模式 3: 缺少依赖
```typescript
// ❌ 雷代码
useEffect(() => {
  fetchUser(userId)
}, [])  // 缺少 userId 依赖

// ✅ 好代码
useEffect(() => {
  fetchUser(userId)
}, [userId])
```

### 模式 4: 同步的异步操作
```typescript
// ❌ 雷代码
useEffect(() => {
  async function loadData() {
    const data = await fetchData()
    setData(data)
  }
  loadData()
}, [])

// ✅ 好代码（处理竞态条件）
useEffect(() => {
  let cancelled = false
  
  async function loadData() {
    const data = await fetchData()
    if (!cancelled) {
      setData(data)
    }
  }
  
  loadData()
  return () => { cancelled = true }
}, [])
```

### 模式 5: 深层嵌套
```typescript
// ❌ 雷代码
if (user) {
  if (user.profile) {
    if (user.profile.settings) {
      if (user.profile.settings.notifications) {
        return user.profile.settings.notifications.email
      }
    }
  }
}

// ✅ 好代码
return user?.profile?.settings?.notifications?.email ?? false
```

### 模式 6: 大型组件
```typescript
// ❌ 雷代码：一个 500 行的组件

// ✅ 好代码：拆分为小组件
function UserProfile() {
  return (
    <>
      <UserHeader />
      <UserDetails />
      <UserSettings />
    </>
  )
}
```

## 🛠️ 自动化工具

### 运行所有检查
```bash
# 一次性运行所有检查
npm run lint && npm run type-check && npm run format:check
```

### ESLint 检查
```bash
# 检查所有问题
npm run lint

# 自动修复
npm run lint:fix
```

### TypeScript 检查
```bash
# 类型检查
npm run type-check
```

### 格式检查
```bash
# 检查格式
npm run format:check

# 自动格式化
npm run format
```

## 📊 代码审查标准

### 代码质量评分

**优秀（90-100分）：**
- 所有检查项通过
- 代码清晰易读
- 性能优化良好
- 错误处理完善
- 有适当的注释

**良好（70-89分）：**
- 必须项全部通过
- 推荐项大部分完成
- 代码可读性好
- 基本错误处理

**需要改进（50-69分）：**
- 必须项通过
- 部分推荐项完成
- 代码可以工作但需优化

**不合格（<50分）：**
- 有必须项未通过
- 存在明显的"雷代码"
- 需要大幅修改

## 🎓 审查技巧

### 1. 提交前等待 5 分钟
提交前休息 5 分钟，再用新的视角审查代码。

### 2. 从用户视角思考
这段代码对用户有什么影响？会不会造成困扰？

### 3. 考虑边界情况
- 空值情况
- 网络失败
- 数据异常
- 权限不足

### 4. 关注安全性
- XSS 攻击
- CSRF 攻击
- 敏感信息泄露
- 权限控制

### 5. 性能影响
- 会不会造成内存泄漏？
- 会不会阻塞渲染？
- 数据量大时会怎样？

## 📝 审查模板

创建 PR 时使用此模板：

```markdown
## 变更说明
<!-- 简要描述这次改动 -->

## 自审清单
- [ ] 代码可以正常运行
- [ ] 所有自动检查通过
- [ ] 无 console.log 和调试代码
- [ ] 无注释掉的代码
- [ ] 类型定义完整
- [ ] 错误处理完善
- [ ] 资源清理正确
- [ ] 命名规范
- [ ] 无明显性能问题

## 测试情况
<!-- 如何测试这些改动 -->
- [ ] 本地测试通过
- [ ] 边界情况测试
- [ ] 错误情况测试

## 截图（如果是 UI 改动）
<!-- 添加截图 -->

## 相关 Issue
<!-- Closes #123 -->
```

## 🚨 紧急情况处理

### 生产环境 Hotfix

紧急修复可以适当放宽标准，但：
- **必须**通过类型检查
- **必须**通过 ESLint
- **必须**有错误处理
- 修复后立即补充测试

### 跳过检查（极不推荐）
```bash
# 仅在极端紧急情况下使用
git commit --no-verify -m "fix: 紧急修复"
```

## 📚 参考资源

- [Google Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)
- [React 官方最佳实践](https://react.dev/learn/thinking-in-react)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**记住：好的代码审查不是为了挑刺，而是为了共同提高代码质量，保护产品和用户。**
