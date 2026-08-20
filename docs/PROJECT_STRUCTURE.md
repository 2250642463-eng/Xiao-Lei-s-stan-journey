# 项目目录结构规范

## 📁 标准目录结构

```
react-typescript-project/
├── .husky/                      # Git hooks 配置
├── .kiro/                       # Kiro 配置和规范文档
├── docs/                        # 项目文档
│   ├── CODE_STYLE_GUIDE.md
│   ├── CODE_REVIEW_GUIDE.md
│   ├── PROJECT_STRUCTURE.md    # 本文档
│   └── ...
├── public/                      # 静态资源
│   ├── images/                 # 图片资源
│   └── favicon.ico
├── scripts/                     # 脚本文件
│   ├── pre-commit-check.sh
│   └── pre-commit-check.ps1
├── src/                         # 源代码目录
│   ├── pages/                  # 页面目录（按功能模块划分）
│   │   └── ad-assets/          # 示例：广告资产模块
│   │       └── v2/             # 版本目录
│   │           ├── components/ # 该模块的组件 ⭐
│   │           ├── hooks/      # 该模块的自定义 Hooks ⭐
│   │           ├── utils/      # 该模块的工具函数 ⭐
│   │           └── index.jsx   # 模块入口
│   ├── App.tsx                 # 根组件
│   ├── main.tsx                # 应用入口
│   └── vite-env.d.ts          # Vite 类型定义
├── tests/                       # 测试目录（独立） ⭐
│   ├── unit/                   # 单元测试
│   │   ├── components/        # 组件测试
│   │   ├── hooks/             # Hooks 测试
│   │   └── utils/             # 工具函数测试
│   ├── integration/            # 集成测试
│   ├── setup.ts                # 测试环境设置
│   └── helpers/                # 测试辅助工具
│       ├── test-utils.tsx     # 测试工具函数
│       └── mock-data.ts       # Mock 数据
├── .env.example                # 环境变量示例
├── .eslintrc.json              # ESLint 配置
├── .gitignore                  # Git 忽略文件
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 配置
└── README.md                   # 项目说明

⭐ = 核心目录
```

## 🎯 核心原则

### 1. 按功能模块组织（pages 下）
- 每个业务模块有独立的文件夹
- 每个模块包含 `components/`、`hooks/`、`utils/` 三个子目录
- 模块版本化（如 v2）方便迭代

### 2. 测试文件独立存放
- **所有测试文件放在项目根目录的 `tests/` 文件夹**
- 不在源码文件旁边创建 `.test` 文件
- 测试目录结构镜像源码结构

### 3. 三大核心目录
每个模块必须包含：
- **components/** - 组件
- **hooks/** - 自定义 Hooks
- **utils/** - 工具函数

## 📋 目录说明

### 1. `src/pages/` - 页面模块目录

**作用**: 按业务功能模块组织代码

**结构规范**:
```
pages/
├── ad-assets/              # 广告资产模块
│   └── v2/                 # 版本号
│       ├── components/     # 该模块的组件
│       ├── hooks/          # 该模块的 Hooks
│       ├── utils/          # 该模块的工具函数
│       └── index.jsx       # 模块入口
├── facebook-assets/        # Facebook 资产模块
│   └── v2/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── index.jsx
└── user-management/        # 用户管理模块
    ├── components/
    ├── hooks/
    ├── utils/
    └── index.jsx
```

**命名规范**:
- 模块名使用 kebab-case（如 `ad-assets`）
- 版本号使用 v1, v2, v3 等
- 每个模块必须有 `components/`、`hooks/`、`utils/` 三个目录

### 2. `components/` - 组件目录

**作用**: 存放该模块的所有 React 组件

**结构示例**:
```
v2/components/
├── AdCard.jsx              # 广告卡片组件
├── AdList.jsx              # 广告列表组件
├── AdForm.jsx              # 广告表单组件
├── AdFilter.jsx            # 广告筛选组件
└── index.js                # 统一导出
```

**规范**:
- 组件文件使用 PascalCase 命名（如 `AdCard.jsx`）
- 一个文件一个组件
- 使用 `index.js` 统一导出所有组件
- **测试文件放在 `tests/unit/components/` 目录**

**示例代码**:
```jsx
// v2/components/AdCard.jsx
export function AdCard({ ad }) {
  return (
    <div className="ad-card">
      <h3>{ad.title}</h3>
      <p>{ad.description}</p>
    </div>
  )
}

// v2/components/index.js
export { AdCard } from './AdCard'
export { AdList } from './AdList'
export { AdForm } from './AdForm'
```

### 3. `hooks/` - 自定义 Hooks 目录

**作用**: 存放该模块的自定义 React Hooks

**结构示例**:
```
v2/hooks/
├── useAdData.js            # 广告数据 Hook
├── useAdFilter.js          # 广告筛选 Hook
├── useAdForm.js            # 广告表单 Hook
└── index.js                # 统一导出
```

**规范**:
- Hook 文件使用 camelCase 命名
- 必须以 `use` 开头（如 `useAdData.js`）
- 一个文件一个 Hook
- 使用 `index.js` 统一导出
- **测试文件放在 `tests/unit/hooks/` 目录**

**示例代码**:
```javascript
// v2/hooks/useAdData.js
import { useState, useEffect } from 'react'

export function useAdData(adId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAdData(adId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [adId])

  return { data, loading, error }
}

// v2/hooks/index.js
export { useAdData } from './useAdData'
export { useAdFilter } from './useAdFilter'
export { useAdForm } from './useAdForm'
```

### 4. `utils/` - 工具函数目录

**作用**: 存放该模块的工具函数和辅助方法

**结构示例**:
```
v2/utils/
├── adFormatters.js         # 广告数据格式化
├── adValidators.js         # 广告数据验证
├── adHelpers.js            # 广告辅助函数
└── index.js                # 统一导出
```

**规范**:
- 文件使用 camelCase 命名
- 按功能分组（formatters, validators, helpers 等）
- 纯函数，无副作用
- 使用 `index.js` 统一导出
- **测试文件放在 `tests/unit/utils/` 目录**

**示例代码**:
```javascript
// v2/utils/adFormatters.js
/**
 * 格式化广告预算
 */
export function formatAdBudget(amount, currency = '$') {
  return `${currency}${amount.toFixed(2)}`
}

/**
 * 格式化广告状态
 */
export function formatAdStatus(status) {
  const statusMap = {
    active: '活跃',
    paused: '暂停',
    ended: '结束'
  }
  return statusMap[status] || status
}

// v2/utils/index.js
export * from './adFormatters'
export * from './adValidators'
export * from './adHelpers'
```

### 5. `tests/` - 测试目录（独立）

**重要**: 测试文件不放在源码旁边，统一放在项目根目录的 `tests/` 文件夹

**结构规范**:
```
tests/
├── unit/                       # 单元测试
│   ├── components/            # 组件测试
│   │   ├── ad-assets/
│   │   │   └── v2/
│   │   │       ├── AdCard.test.jsx
│   │   │       ├── AdList.test.jsx
│   │   │       └── AdForm.test.jsx
│   │   └── facebook-assets/
│   ├── hooks/                 # Hooks 测试
│   │   └── ad-assets/
│   │       └── v2/
│   │           ├── useAdData.test.js
│   │           └── useAdFilter.test.js
│   └── utils/                 # 工具函数测试
│       └── ad-assets/
│           └── v2/
│               ├── adFormatters.test.js
│               └── adValidators.test.js
├── integration/                # 集成测试
│   └── ad-workflow.test.js
├── e2e/                        # 端到端测试（可选）
├── setup.ts                    # 测试环境设置
└── helpers/                    # 测试辅助工具
    ├── test-utils.tsx         # 测试工具函数
    ├── mock-data.ts           # Mock 数据
    └── render-with-providers.tsx
```

**测试文件命名规范**:
- 测试文件名与源文件同名，加 `.test` 后缀
- 源文件: `AdCard.jsx` → 测试: `AdCard.test.jsx`
- 源文件: `useAdData.js` → 测试: `useAdData.test.js`
- 源文件: `adFormatters.js` → 测试: `adFormatters.test.js`

**测试文件路径映射**:
```
源文件: src/pages/ad-assets/v2/components/AdCard.jsx
测试:   tests/unit/components/ad-assets/v2/AdCard.test.jsx

源文件: src/pages/ad-assets/v2/hooks/useAdData.js
测试:   tests/unit/hooks/ad-assets/v2/useAdData.test.js

源文件: src/pages/ad-assets/v2/utils/adFormatters.js
测试:   tests/unit/utils/ad-assets/v2/adFormatters.test.js
```

**测试示例**:
```javascript
// tests/unit/components/ad-assets/v2/AdCard.test.jsx
import { render, screen } from '@testing-library/react'
import { AdCard } from '@/pages/ad-assets/v2/components/AdCard'

describe('AdCard Component', () => {
  it('renders ad title and description', () => {
    const ad = {
      title: 'Test Ad',
      description: 'Test Description'
    }
    render(<AdCard ad={ad} />)
    
    expect(screen.getByText('Test Ad')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })
})

// tests/unit/hooks/ad-assets/v2/useAdData.test.js
import { renderHook, waitFor } from '@testing-library/react'
import { useAdData } from '@/pages/ad-assets/v2/hooks/useAdData'

describe('useAdData Hook', () => {
  it('fetches ad data successfully', async () => {
    const { result } = renderHook(() => useAdData('ad-123'))
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toBeTruthy()
    expect(result.current.error).toBeNull()
  })
})

// tests/unit/utils/ad-assets/v2/adFormatters.test.js
import { formatAdBudget, formatAdStatus } from '@/pages/ad-assets/v2/utils/adFormatters'

describe('Ad Formatters', () => {
  describe('formatAdBudget', () => {
    it('formats budget with default currency', () => {
      expect(formatAdBudget(100)).toBe('$100.00')
    })
    
    it('formats budget with custom currency', () => {
      expect(formatAdBudget(100, '¥')).toBe('¥100.00')
    })
  })
  
  describe('formatAdStatus', () => {
    it('formats known status', () => {
      expect(formatAdStatus('active')).toBe('活跃')
      expect(formatAdStatus('paused')).toBe('暂停')
    })
  })
})
```

## 📏 命名规范总结

| 类型 | 命名规则 | 示例 | 位置 |
|------|---------|------|------|
| 页面模块 | kebab-case | `ad-assets`, `user-management` | pages/ |
| 版本目录 | v + 数字 | `v1`, `v2`, `v3` | pages/module/ |
| 组件文件 | PascalCase | `AdCard.jsx`, `UserProfile.jsx` | v2/components/ |
| Hooks 文件 | camelCase + use前缀 | `useAdData.js`, `useAuth.js` | v2/hooks/ |
| 工具函数文件 | camelCase | `adFormatters.js`, `validators.js` | v2/utils/ |
| 测试文件 | 原名 + .test | `AdCard.test.jsx`, `useAdData.test.js` | tests/unit/ |
| 常量 | UPPER_SNAKE_CASE | `API_URL`, `MAX_COUNT` | 文件内 |

## ✅ 最佳实践

### 1. 模块化组织
每个业务模块独立，包含自己的 components、hooks、utils

```
✅ 好的结构
pages/ad-assets/v2/
  ├── components/  # 该模块的组件
  ├── hooks/       # 该模块的 Hooks
  ├── utils/       # 该模块的工具函数
  └── index.jsx

❌ 不好的结构
src/
  ├── all-components/  # 所有模块混在一起
  ├── all-hooks/
  └── all-utils/
```

### 2. 版本化管理
使用版本号管理不同的迭代

```
pages/ad-assets/
  ├── v1/         # 旧版本
  └── v2/         # 新版本，可以与 v1 共存
```

### 3. 测试文件独立
所有测试文件放在项目根目录的 `tests/` 文件夹

```
✅ 好的结构
src/pages/ad-assets/v2/components/AdCard.jsx
tests/unit/components/ad-assets/v2/AdCard.test.jsx

❌ 不好的结构
src/pages/ad-assets/v2/components/
  ├── AdCard.jsx
  └── AdCard.test.jsx  # 测试文件不应该在这里
```

### 4. 使用 index.js 统一导出
```javascript
// v2/components/index.js
export { AdCard } from './AdCard'
export { AdList } from './AdList'
export { AdForm } from './AdForm'

// 使用时
import { AdCard, AdList } from '@/pages/ad-assets/v2/components'
```

### 5. 一个文件一个组件/Hook/函数类
```
✅ 好的结构
components/
  ├── AdCard.jsx     # 只包含 AdCard 组件
  ├── AdList.jsx     # 只包含 AdList 组件
  └── AdForm.jsx

❌ 不好的结构
components/
  └── ad-components.jsx  # 包含多个组件，不推荐
```

## 🧪 测试规范

### 测试覆盖率要求

| 类型 | 覆盖率目标 | 优先级 |
|------|----------|--------|
| Hooks | 100% | ⚠️ 必须 |
| Utils | 100% | ⚠️ 必须 |
| Components | 80%+ | ✅ 推荐 |

### 测试文件组织

**原则**: 测试目录结构镜像源码结构

```
源码结构:
src/pages/ad-assets/v2/
  ├── components/AdCard.jsx
  ├── hooks/useAdData.js
  └── utils/adFormatters.js

测试结构:
tests/unit/
  ├── components/ad-assets/v2/AdCard.test.jsx
  ├── hooks/ad-assets/v2/useAdData.test.js
  └── utils/ad-assets/v2/adFormatters.test.js
```

### 测试命名规范

```javascript
describe('组件/Hook/函数名', () => {
  describe('方法名或功能点', () => {
    it('should do something', () => {
      // 测试代码
    })
  })
})
```

## 📦 导入路径规范

使用路径别名 `@/` 代替相对路径：

```javascript
// ❌ 不好：使用相对路径
import { AdCard } from '../../../components/AdCard'
import { useAdData } from '../../../hooks/useAdData'
import { formatAdBudget } from '../../../utils/adFormatters'

// ✅ 好：使用路径别名
import { AdCard } from '@/pages/ad-assets/v2/components'
import { useAdData } from '@/pages/ad-assets/v2/hooks'
import { formatAdBudget } from '@/pages/ad-assets/v2/utils'
```

配置在 `tsconfig.json` 和 `vite.config.ts`:
```json
{
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## 🔄 完整示例

### 创建新模块的步骤

**1. 创建模块目录结构**
```bash
pages/user-management/
  ├── components/
  ├── hooks/
  ├── utils/
  └── index.jsx
```

**2. 创建组件**
```javascript
// pages/user-management/components/UserCard.jsx
export function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

// pages/user-management/components/index.js
export { UserCard } from './UserCard'
```

**3. 创建 Hook**
```javascript
// pages/user-management/hooks/useUserData.js
import { useState, useEffect } from 'react'

export function useUserData(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])

  return { user, loading }
}

// pages/user-management/hooks/index.js
export { useUserData } from './useUserData'
```

**4. 创建工具函数**
```javascript
// pages/user-management/utils/userFormatters.js
export function formatUserRole(role) {
  const roleMap = {
    admin: '管理员',
    user: '普通用户',
    guest: '访客'
  }
  return roleMap[role] || role
}

// pages/user-management/utils/index.js
export * from './userFormatters'
```

**5. 创建测试文件**
```javascript
// tests/unit/components/user-management/UserCard.test.jsx
import { render, screen } from '@testing-library/react'
import { UserCard } from '@/pages/user-management/components/UserCard'

describe('UserCard', () => {
  it('renders user information', () => {
    const user = { name: 'John', email: 'john@example.com' }
    render(<UserCard user={user} />)
    expect(screen.getByText('John')).toBeInTheDocument()
  })
})

// tests/unit/hooks/user-management/useUserData.test.js
import { renderHook, waitFor } from '@testing-library/react'
import { useUserData } from '@/pages/user-management/hooks/useUserData'

describe('useUserData', () => {
  it('fetches user data', async () => {
    const { result } = renderHook(() => useUserData('user-1'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.user).toBeTruthy()
  })
})

// tests/unit/utils/user-management/userFormatters.test.js
import { formatUserRole } from '@/pages/user-management/utils/userFormatters'

describe('formatUserRole', () => {
  it('formats role correctly', () => {
    expect(formatUserRole('admin')).toBe('管理员')
    expect(formatUserRole('user')).toBe('普通用户')
  })
})
```

**6. 模块入口文件**
```javascript
// pages/user-management/index.jsx
export * from './components'
export * from './hooks'
export * from './utils'

// 或导出主页面组件
export { default as UserManagement } from './UserManagement'
```

## 🚫 常见错误

### 1. 测试文件放错位置
```
❌ 错误
src/pages/ad-assets/v2/components/
  ├── AdCard.jsx
  └── AdCard.test.jsx  # 不应该在这里

✅ 正确
src/pages/ad-assets/v2/components/AdCard.jsx
tests/unit/components/ad-assets/v2/AdCard.test.jsx
```

### 2. 模块结构不完整
```
❌ 错误
pages/ad-assets/v2/
  └── AdCard.jsx  # 直接放组件

✅ 正确
pages/ad-assets/v2/
  ├── components/
  │   └── AdCard.jsx
  ├── hooks/
  └── utils/
```

### 3. 命名不规范
```
❌ 错误
adCard.jsx          # 组件应该用 PascalCase
UseAdData.js        # Hook 应该用 camelCase
ad_formatters.js    # 应该用 camelCase

✅ 正确
AdCard.jsx
useAdData.js
adFormatters.js
```

### 4. 混合不同模块的代码
```
❌ 错误
pages/shared/components/  # 不同模块的组件混在一起
  ├── AdCard.jsx
  ├── UserCard.jsx
  └── ProductCard.jsx

✅ 正确
pages/
  ├── ad-assets/v2/components/AdCard.jsx
  ├── user-management/components/UserCard.jsx
  └── products/components/ProductCard.jsx
```

## 📝 检查清单

提交代码前，确认：

- [ ] 模块目录包含 components、hooks、utils 三个文件夹
- [ ] 测试文件放在 `tests/` 目录，不在源码旁边
- [ ] 组件文件使用 PascalCase 命名
- [ ] Hooks 文件使用 camelCase 且以 use 开头
- [ ] 工具函数文件使用 camelCase
- [ ] 每个子目录都有 `index.js` 统一导出
- [ ] 所有 Hooks 和 Utils 都有对应的测试文件
- [ ] 测试文件命名为 `原文件名.test.jsx/js`
- [ ] 导入使用路径别名 `@/` 而不是相对路径

---

**记住：清晰的目录结构是项目可维护性的基础！**
