# 代码风格指南

## 概述

本文档定义了项目的代码规范，包括 TypeScript、React、CSS 等的编码标准。所有代码必须遵循这些规范。

## 自动化工具

项目使用以下工具强制执行代码规范：

- **ESLint**: 代码质量和风格检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查
- **Husky + lint-staged**: Git hooks 自动检查

## TypeScript 规范

### 基本原则

1. **始终使用 TypeScript**，避免使用 `any` 类型
2. **显式类型注解**，特别是函数参数和返回值
3. **使用接口定义**复杂对象结构
4. **枚举优先使用 const enum**

### 命名规范

```typescript
// ✅ 好的命名
interface UserProfile {
  userId: string
  userName: string
  createdAt: Date
}

type ApiResponse<T> = {
  data: T
  status: number
  message: string
}

const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'

function fetchUserData(userId: string): Promise<UserProfile> {
  // ...
}

// ❌ 不好的命名
interface user_profile {} // 应该使用 PascalCase
const maxretrycount = 3 // 常量应该全大写
function FetchUserData() {} // 函数应该使用 camelCase
```

### 类型定义

```typescript
// ✅ 优先使用 interface
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

// ✅ 使用 type 定义联合类型、交叉类型
type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ExtendedButtonProps = ButtonProps & { variant: ButtonVariant }

// ✅ 泛型命名清晰
function fetchData<TData, TError = Error>(
  url: string
): Promise<TData> {
  // ...
}

// ❌ 避免使用 any
function processData(data: any) {} // 不好
function processData<T>(data: T) {} // 好
```

### 类型断言

```typescript
// ✅ 使用 as 语法（推荐）
const element = document.getElementById('root') as HTMLDivElement

// ❌ 避免使用 <> 语法（与 JSX 冲突）
const element = <HTMLDivElement>document.getElementById('root')

// ✅ 使用类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

## React 规范

### 组件定义

```typescript
// ✅ 使用函数组件和 TypeScript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

// ❌ 避免使用默认导出（除了页面组件）
export default function Button() {} // 不推荐

// ✅ 使用命名导出
export function Button() {} // 推荐
```

### 文件命名

```
src/
├── components/
│   ├── Button.tsx          # PascalCase 组件文件
│   └── UserProfile.tsx
├── hooks/
│   ├── useLocalStorage.ts  # camelCase Hook 文件
│   └── useFetch.ts
├── utils/
│   ├── formatDate.ts       # camelCase 工具文件
│   └── apiClient.ts
└── types/
    └── index.ts            # 类型定义
```

### Hooks 使用

```typescript
// ✅ 自定义 Hook 必须以 use 开头
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  
  useEffect(() => {
    // ...
  }, [key])
  
  return [value, setValue] as const
}

// ✅ Hook 依赖数组完整
useEffect(() => {
  fetchData(userId)
}, [userId]) // 包含所有依赖

// ❌ 不要遗漏依赖
useEffect(() => {
  fetchData(userId)
}, []) // 错误：缺少 userId
```

### Props 解构

```typescript
// ✅ 在参数中解构 props
const UserCard: React.FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  )
}

// ❌ 不要在组件内部解构
const UserCard: React.FC<UserCardProps> = (props) => {
  const { name, email, avatar } = props // 不推荐
  // ...
}
```

### 条件渲染

```typescript
// ✅ 使用 && 和三元运算符
return (
  <div>
    {isLoading && <Spinner />}
    {error ? <ErrorMessage error={error} /> : <Content data={data} />}
  </div>
)

// ✅ 复杂条件提取为变量
const shouldShowButton = isAuthenticated && hasPermission && !isLoading

return <div>{shouldShowButton && <Button />}</div>

// ❌ 避免过于复杂的 JSX 内联逻辑
return (
  <div>
    {isAuthenticated && hasPermission && !isLoading && !error && (
      <Button /> // 太复杂
    )}
  </div>
)
```

## 样式规范

### CSS 命名（BEM 风格）

```css
/* ✅ 使用 BEM 命名规范 */
.button {
  /* Block */
}

.button--primary {
  /* Modifier */
}

.button__icon {
  /* Element */
}

.button__icon--large {
  /* Element + Modifier */
}
```

### CSS 组织

```css
/* 1. 定位 */
.element {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  /* 2. 盒模型 */
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  /* 3. 排版 */
  font-size: 1rem;
  line-height: 1.5;
  color: #333;

  /* 4. 视觉 */
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;

  /* 5. 其他 */
  cursor: pointer;
  transition: all 0.3s;
}
```

## 代码组织

### 导入顺序

```typescript
// 1. React 相关
import { useState, useEffect } from 'react'
import type { FC } from 'react'

// 2. 第三方库
import axios from 'axios'
import dayjs from 'dayjs'

// 3. 项目内部 - 组件
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

// 4. 项目内部 - Hooks
import { useAuth } from '@/hooks/useAuth'

// 5. 项目内部 - 工具和类型
import { formatDate } from '@/utils/formatDate'
import type { User } from '@/types'

// 6. 样式
import './styles.css'
```

### 文件结构

```typescript
// 1. 类型定义
interface ComponentProps {
  // ...
}

// 2. 常量
const DEFAULT_VALUE = 'default'

// 3. 辅助函数（如果只在本文件使用）
function helperFunction() {
  // ...
}

// 4. 主组件
export const Component: FC<ComponentProps> = (props) => {
  // Hooks
  const [state, setState] = useState()
  
  // 派生状态
  const derivedValue = useMemo(() => {}, [])
  
  // 事件处理
  const handleClick = () => {}
  
  // 副作用
  useEffect(() => {}, [])
  
  // 渲染
  return <div>...</div>
}
```

## 注释规范

### JSDoc 注释

```typescript
/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @returns 用户信息对象
 * @throws {Error} 当用户不存在时抛出错误
 */
export async function getUserInfo(userId: string): Promise<UserInfo> {
  // ...
}

/**
 * 按钮组件
 * @example
 * ```tsx
 * <Button label="点击我" onClick={handleClick} />
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
  // ...
}
```

### 行内注释

```typescript
// ✅ 解释"为什么"，而不是"做什么"
// 使用 setTimeout 避免与 React 的批量更新冲突
setTimeout(() => {
  setState(newValue)
}, 0)

// ❌ 不要写显而易见的注释
// 设置 count 为 0
const count = 0
```

## 最佳实践

### 1. 避免魔法数字

```typescript
// ❌ 不好
setTimeout(callback, 3000)

// ✅ 好
const DEBOUNCE_DELAY_MS = 3000
setTimeout(callback, DEBOUNCE_DELAY_MS)
```

### 2. 提前返回

```typescript
// ✅ 好
function processUser(user: User | null) {
  if (!user) return null
  if (!user.isActive) return null
  
  return user.name
}

// ❌ 不好
function processUser(user: User | null) {
  if (user) {
    if (user.isActive) {
      return user.name
    }
  }
  return null
}
```

### 3. 使用可选链和空值合并

```typescript
// ✅ 好
const userName = user?.profile?.name ?? '未知用户'

// ❌ 不好
const userName = 
  user && user.profile && user.profile.name 
    ? user.profile.name 
    : '未知用户'
```

### 4. 不可变数据操作

```typescript
// ✅ 好 - 创建新数组
const newItems = [...items, newItem]
const filtered = items.filter(item => item.active)

// ❌ 不好 - 直接修改原数组
items.push(newItem)
```

## 检查命令

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 格式化
npm run format

# 格式检查（不修改文件）
npm run format:check
```

## 参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [React TypeScript 速查表](https://react-typescript-cheatsheet.netlify.app/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
