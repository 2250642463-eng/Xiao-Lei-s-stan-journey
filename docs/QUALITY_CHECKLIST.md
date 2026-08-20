# 代码质量检查清单（快速参考）

## 🚀 提交前 30 秒检查

在运行 `git commit` 之前，快速过一遍：

### ⚡ 快速检查（必须）
- [ ] 代码能运行（`npm run dev` 正常）
- [ ] 无 `console.log`
- [ ] 无注释掉的代码
- [ ] 无 `any` 类型
- [ ] 无 `TODO` / `FIXME`

### 🔧 自动检查命令
```bash
# 一键运行所有检查
npm run check

# 或手动运行
npm run lint          # ESLint 检查
npm run type-check    # TypeScript 检查
npm run format:check  # 格式检查
```

## ❌ 10 种常见"雷代码"

### 1. 使用 `any` 类型
```typescript
// ❌ 不要这样
function process(data: any) { }

// ✅ 应该这样
function process<T>(data: T) { }
```

### 2. 不安全的空值访问
```typescript
// ❌ 不要这样
user.profile.name

// ✅ 应该这样
user?.profile?.name ?? '默认值'
```

### 3. 未处理的 Promise
```typescript
// ❌ 不要这样
fetch('/api')

// ✅ 应该这样
try {
  await fetch('/api')
} catch (error) {
  handleError(error)
}
```

### 4. 忘记清理 Effect
```typescript
// ❌ 不要这样
useEffect(() => {
  setInterval(...)
}, [])

// ✅ 应该这样
useEffect(() => {
  const timer = setInterval(...)
  return () => clearInterval(timer)
}, [])
```

### 5. 直接修改 State
```typescript
// ❌ 不要这样
items.push(newItem)

// ✅ 应该这样
setItems([...items, newItem])
```

### 6. 缺少依赖
```typescript
// ❌ 不要这样
useEffect(() => {
  doSomething(value)
}, [])

// ✅ 应该这样
useEffect(() => {
  doSomething(value)
}, [value])
```

### 7. 魔法数字
```typescript
// ❌ 不要这样
setTimeout(fn, 5000)

// ✅ 应该这样
const DELAY_MS = 5000
setTimeout(fn, DELAY_MS)
```

### 8. 不必要的重渲染
```typescript
// ❌ 不要这样
<Button onClick={() => handleClick(id)} />

// ✅ 应该这样
const onClick = useCallback(() => handleClick(id), [id])
<Button onClick={onClick} />
```

### 9. 未定义的变量类型
```typescript
// ❌ 不要这样
const [data, setData] = useState()

// ✅ 应该这样
const [data, setData] = useState<Data | null>(null)
```

### 10. 深层嵌套
```typescript
// ❌ 不要这样
if (a) {
  if (b) {
    if (c) {
      // ...
    }
  }
}

// ✅ 应该这样
if (!a) return
if (!b) return
if (!c) return
// ...
```

## 📋 提交前完整清单

### 代码检查
- [ ] 移除所有 `console.log`
- [ ] 移除所有注释代码
- [ ] 没有 `any` 类型
- [ ] 所有变量有明确类型
- [ ] 函数有返回值类型
- [ ] Props 有接口定义

### 错误处理
- [ ] 所有异步操作有 try-catch
- [ ] 有用户友好的错误提示
- [ ] 不会导致应用崩溃

### 资源管理
- [ ] useEffect 有清理函数
- [ ] 定时器被清理
- [ ] 事件监听器被移除
- [ ] 订阅被取消

### 性能
- [ ] 大列表使用虚拟滚动
- [ ] 复杂计算使用 useMemo
- [ ] 回调使用 useCallback
- [ ] 避免不必要的重渲染

### 命名规范
- [ ] 组件使用 PascalCase
- [ ] 函数/变量使用 camelCase
- [ ] 常量使用 UPPER_SNAKE_CASE
- [ ] 命名语义清晰

### 代码组织
- [ ] 单个文件不超过 300 行
- [ ] 单个函数不超过 50 行
- [ ] 重复代码已提取
- [ ] 相似逻辑已合并

### 测试（可选）
- [ ] 手动测试功能
- [ ] 测试边界情况
- [ ] 测试错误情况

## 🔍 自动检查工具

### 方式 1: 使用 npm 脚本
```bash
npm run check
```

### 方式 2: 使用 PowerShell 脚本
```powershell
.\scripts\pre-commit-check.ps1
```

### 方式 3: Git 提交（自动运行）
```bash
git commit -m "feat: 你的提交"
# 会自动运行所有检查
```

## 💡 快速修复命令

### 自动修复 ESLint 错误
```bash
npm run lint:fix
```

### 自动格式化代码
```bash
npm run format
```

### 查看类型错误
```bash
npm run type-check
```

## 🚨 如果检查失败

### ESLint 错误
```bash
npm run lint        # 查看错误
npm run lint:fix    # 自动修复
```

### 类型错误
- 查看错误信息
- 添加正确的类型定义
- 不要使用 `any`

### 格式错误
```bash
npm run format      # 自动格式化
```

## 📖 详细文档

查看完整的代码审查指南：
- [代码审查指南](./CODE_REVIEW_GUIDE.md)
- [代码风格指南](./CODE_STYLE_GUIDE.md)
- [Git 提交规范](./GIT_COMMIT_GUIDE.md)

## ⏱️ 时间估算

- **快速检查**: 30 秒
- **自动检查**: 1-2 分钟
- **手动审查**: 5-10 分钟
- **完整审查**: 10-20 分钟

## 🎯 质量目标

- **0** console.log
- **0** any 类型
- **0** ESLint 错误
- **0** TypeScript 错误
- **100%** 代码格式化

---

**记住：5 分钟的代码审查可以避免 5 小时的 bug 修复！**
