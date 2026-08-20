# Design Document: React 19 + TypeScript Project

## Overview

本设计文档描述了一个基于 React 19 和 TypeScript 的现代化前端项目的技术架构和实现方案。该项目采用 Vite 作为构建工具，使用 ESLint 和 Prettier 保证代码质量，并提供完整的 SkillsAI 规范文档和项目规范文档，以指导团队开发。

### 技术栈

- **前端框架**: React 19
- **类型系统**: TypeScript 5.x
- **构建工具**: Vite 5.x
- **代码检查**: ESLint + TypeScript ESLint
- **代码格式化**: Prettier
- **包管理器**: npm/yarn/pnpm（推荐 pnpm）

## Architecture

### 项目结构

```
project-root/
├── .kiro/
│   └── specs/
│       └── react-typescript-project/
├── docs/
│   ├── SKILLSAI_GUIDE.md      # SkillsAI 规范文档
│   └── PROJECT_SPEC.md         # 项目规范文档
├── public/
│   └── vite.svg
├── src/
│   ├── components/             # React 组件
│   │   ├── common/            # 通用组件
│   │   └── features/          # 功能组件
│   ├── hooks/                 # 自定义 Hooks
│   ├── utils/                 # 工具函数
│   ├── types/                 # TypeScript 类型定义
│   ├── styles/                # 全局样式
│   ├── App.tsx                # 根组件
│   ├── main.tsx               # 应用入口
│   └── vite-env.d.ts          # Vite 类型定义
├── .env.example               # 环境变量模板
├── .eslintrc.json             # ESLint 配置
├── .prettierrc                # Prettier 配置
├── tsconfig.json              # TypeScript 配置
├── tsconfig.node.json         # Node 环境 TS 配置
├── vite.config.ts             # Vite 配置
├── package.json               # 项目依赖
└── README.md                  # 项目文档
```

### 架构原则

1. **关注点分离**: 组件、逻辑、样式和类型定义分离
2. **可复用性**: 组件和 Hooks 设计为可复用
3. **类型安全**: 充分利用 TypeScript 的类型系统
4. **开发体验**: 快速的热更新和清晰的错误提示

## Components and Interfaces

### 1. 构建系统 (Vite)

**配置文件**: `vite.config.ts`

```typescript
interface ViteConfig {
  plugins: Plugin[];          // React 插件等
  resolve: {
    alias: Record<string, string>;  // 路径别名，如 @/ -> src/
  };
  server: {
    port: number;             // 开发服务器端口
    host: boolean | string;   // 主机配置
  };
}
```

**功能**:
- 快速的开发服务器（HMR）
- 路径别名支持（`@/` 映射到 `src/`）
- 环境变量处理
- 生产构建优化

### 2. TypeScript 配置

**配置文件**: `tsconfig.json`

```typescript
interface TypeScriptConfig {
  compilerOptions: {
    target: string;           // ES2020
    lib: string[];            // DOM, ES2020
    jsx: string;              // react-jsx
    strict: boolean;          // true
    module: string;           // ESNext
    moduleResolution: string; // bundler
    paths: Record<string, string[]>; // 路径映射
  };
}
```

**严格模式配置**:
- `strict: true` - 启用所有严格类型检查
- `noUnusedLocals: true` - 检查未使用的局部变量
- `noUnusedParameters: true` - 检查未使用的参数
- `noFallthroughCasesInSwitch: true` - Switch 语句完整性检查

### 3. 代码质量工具

**ESLint 配置**: `.eslintrc.json`

```typescript
interface ESLintConfig {
  extends: string[];          // TypeScript 和 React 推荐规则
  parser: string;             // @typescript-eslint/parser
  plugins: string[];          // React, TypeScript 插件
  rules: Record<string, any>; // 自定义规则
}
```

**Prettier 配置**: `.prettierrc`

```typescript
interface PrettierConfig {
  semi: boolean;              // 语句末尾分号
  singleQuote: boolean;       // 单引号
  tabWidth: number;           // 缩进宽度
  trailingComma: string;      // 尾随逗号
}
```

### 4. 组件架构

**基础组件结构**:

```typescript
// Component Props Interface
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Component Definition
const Component: React.FC<ComponentProps> = (props) => {
  return <div>{props.children}</div>;
};
```

**组件分类**:
- **Common Components**: 通用 UI 组件（Button, Input, Card 等）
- **Feature Components**: 业务功能组件
- **Layout Components**: 布局组件（Header, Footer, Sidebar 等）

### 5. 自定义 Hooks

**示例 Hook 接口**:

```typescript
// useLocalStorage Hook
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T>;
```

**常用 Hooks**:
- `useLocalStorage` - 本地存储管理
- `useFetch` - 数据请求
- `useDebounce` - 防抖处理
- `useToggle` - 布尔值切换

### 6. 工具函数

**工具函数类型**:

```typescript
// 类名合并工具
function cn(...classes: (string | undefined | null | false)[]): string;

// API 请求工具
interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function fetchAPI<T>(url: string, options?: FetchOptions): Promise<T>;
```

## Data Models

### 环境变量类型

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 通用类型定义

```typescript
// API 响应类型
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// 分页数据类型
interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 表单状态类型
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
}
```

## Correctness Properties

*属性（Property）是关于系统行为的形式化陈述，应该在所有有效执行中保持为真。属性是人类可读的规范和机器可验证的正确性保证之间的桥梁。*

由于本项目主要是项目脚手架和配置的搭建，大部分需求是关于文件存在性和配置正确性的验证，这些更适合用示例测试而非属性测试。因此，本项目的正确性验证主要通过单元测试（示例测试）来完成。

### 配置文件验证

以下是需要验证的关键配置和文件存在性（通过单元测试验证）:

**Example 1: 必需配置文件存在**
验证项目包含所有必需的配置文件：
- `package.json` 存在且包含必需依赖
- `tsconfig.json` 存在且配置了严格模式
- `vite.config.ts` 存在且配置正确
- `.eslintrc.json` 存在且包含 TypeScript 支持
- `.prettierrc` 存在
**Validates: Requirements 1.4, 1.5, 3.1, 4.1, 4.3**

**Example 2: 目录结构完整**
验证项目包含必需的目录结构：
- `src/` 目录存在
- `src/components/`、`src/hooks/`、`src/utils/`、`src/types/` 目录存在
- `public/` 目录存在
- `docs/` 目录存在
**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

**Example 3: TypeScript 配置正确**
验证 `tsconfig.json` 包含正确配置：
- `strict: true` 已启用
- `jsx: "react-jsx"` 已配置
- 路径别名已配置
- `noUnusedLocals` 和 `noUnusedParameters` 已启用
**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

**Example 4: ESLint 配置包含 React 规则**
验证 `.eslintrc.json` 包含 React 和 TypeScript 插件配置
**Validates: Requirements 4.1, 4.2**

**Example 5: 开发脚本存在**
验证 `package.json` 包含 `dev`、`build`、`preview` 脚本
**Validates: Requirements 7.3**

**Example 6: 环境变量模板存在**
验证 `.env.example` 文件存在
**Validates: Requirements 7.2, 7.5**

**Example 7: 基础组件和工具存在**
验证项目包含：
- `src/App.tsx` 存在
- `src/hooks/` 目录包含示例 Hook
- `src/utils/` 目录包含工具函数
- `src/types/` 目录包含类型定义
**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

**Example 8: SkillsAI 规范文档完整**
验证 `docs/SKILLSAI_GUIDE.md` 存在且包含以下章节：
- AI 辅助开发指南
- Prompt 工程最佳实践
- 组件生成模板
- 代码审查和重构工作流
**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

**Example 9: 项目规范文档完整**
验证 `docs/PROJECT_SPEC.md` 存在且包含以下章节：
- 命名约定
- 组件架构模式
- 状态管理指南
- 样式规范
- 测试要求
**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

**Example 10: README 文档完整**
验证 `README.md` 存在且包含：
- 项目设置和安装步骤
- 可用脚本说明
- 对 SkillsAI 和项目规范文档的引用
**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

## Error Handling

### TypeScript 编译错误

- **严格模式错误**: TypeScript 将报告所有类型不安全的代码
- **未使用变量**: 编译器将警告未使用的变量和参数
- **路径解析错误**: 错误的导入路径将被捕获

### 开发时错误

- **ESLint 错误**: 代码质量问题将在编辑器中实时显示
- **HMR 错误**: 热更新失败时将在浏览器控制台显示详细错误
- **运行时错误**: React 错误边界捕获组件错误

### 构建错误

- **依赖缺失**: npm/pnpm 将报告缺失的依赖
- **类型错误**: 构建前 TypeScript 编译将失败
- **打包错误**: Vite 将报告模块解析和打包错误

## Testing Strategy

### 测试方法

本项目的测试策略主要关注**配置验证**和**文档完整性检查**，而非业务逻辑测试。

### 单元测试（Unit Tests）

**测试工具**: Vitest（与 Vite 原生集成）

**测试范围**:
1. **配置文件验证测试**
   - 验证所有必需的配置文件存在
   - 验证配置文件包含正确的配置项
   - 验证 package.json 包含必需的依赖和脚本

2. **目录结构测试**
   - 验证所有必需的目录存在
   - 验证目录包含预期的文件

3. **文档完整性测试**
   - 验证文档文件存在
   - 验证文档包含必需的章节（通过内容搜索）

**测试示例**:

```typescript
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Project Structure Tests', () => {
  it('should have all required config files', () => {
    expect(existsSync('package.json')).toBe(true);
    expect(existsSync('tsconfig.json')).toBe(true);
    expect(existsSync('vite.config.ts')).toBe(true);
    expect(existsSync('.eslintrc.json')).toBe(true);
    expect(existsSync('.prettierrc')).toBe(true);
  });

  it('should have strict mode enabled in tsconfig', () => {
    const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf-8'));
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it('should have required directories', () => {
    expect(existsSync('src')).toBe(true);
    expect(existsSync('src/components')).toBe(true);
    expect(existsSync('src/hooks')).toBe(true);
    expect(existsSync('src/utils')).toBe(true);
    expect(existsSync('src/types')).toBe(true);
  });

  it('should have SkillsAI documentation', () => {
    expect(existsSync('docs/SKILLSAI_GUIDE.md')).toBe(true);
    const content = readFileSync('docs/SKILLSAI_GUIDE.md', 'utf-8');
    expect(content).toContain('AI 辅助开发');
    expect(content).toContain('Prompt 工程');
  });
});
```

### 集成测试

**范围**: 验证项目可以正常启动和构建

```typescript
describe('Build and Development Tests', () => {
  it('should build without errors', async () => {
    // 运行 npm run build 并验证成功
  });

  it('should start dev server', async () => {
    // 运行 npm run dev 并验证服务器启动
  });
});
```

### 测试配置

**Vitest 配置** (`vitest.config.ts`):

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
```

### 测试覆盖率

由于本项目主要是配置和脚手架，测试覆盖率目标：
- 配置文件验证: 100%
- 目录结构验证: 100%
- 文档完整性验证: 100%

### 持续集成

建议在 CI/CD 流程中运行：
1. TypeScript 类型检查 (`tsc --noEmit`)
2. ESLint 检查 (`eslint . --ext ts,tsx`)
3. Prettier 格式检查 (`prettier --check "src/**/*.{ts,tsx}"`)
4. 单元测试 (`vitest run`)
5. 构建测试 (`npm run build`)

## SkillsAI 规范文档内容

`docs/SKILLSAI_GUIDE.md` 将包含：

1. **AI 辅助开发指南**
   - 如何使用 AI 编码助手（Kiro、GitHub Copilot 等）
   - AI 在不同开发阶段的应用
   - AI 辅助调试和问题解决

2. **Prompt 工程最佳实践**
   - 编写清晰的代码生成提示词
   - 上下文提供策略
   - 迭代改进提示词的方法

3. **组件生成模板**
   - React 组件生成提示词模板
   - Hook 生成提示词模板
   - 工具函数生成提示词模板

4. **代码审查和重构工作流**
   - 使用 AI 进行代码审查
   - AI 辅助重构策略
   - 代码质量改进建议

## 项目规范文档内容

`docs/PROJECT_SPEC.md` 将包含：

1. **命名约定**
   - 文件命名规则（PascalCase for components, camelCase for utils）
   - 组件命名规则
   - 变量和函数命名规则
   - 类型定义命名规则

2. **组件架构模式**
   - 函数组件 vs 类组件（推荐函数组件）
   - Props 接口定义规范
   - 组件组织结构
   - 组件复用策略

3. **状态管理指南**
   - 本地状态管理（useState, useReducer）
   - 全局状态管理方案选择
   - Context API 使用规范
   - 状态提升策略

4. **样式规范**
   - CSS Modules / Tailwind CSS / Styled Components 选择
   - 样式文件组织
   - 响应式设计规范
   - 主题和设计系统

5. **测试要求**
   - 单元测试编写规范
   - 测试文件命名和组织
   - Mock 和测试工具使用
   - 测试覆盖率要求

6. **代码审查清单**
   - 类型安全检查
   - 性能考虑
   - 可访问性（a11y）检查
   - 代码风格一致性

## Implementation Notes

### 初始化步骤

1. 使用 Vite 创建 React + TypeScript 项目
2. 安装并配置 ESLint 和 Prettier
3. 配置 TypeScript 严格模式
4. 创建项目目录结构
5. 创建 SkillsAI 和项目规范文档
6. 编写 README 文档
7. 创建示例组件、Hooks 和工具函数
8. 配置测试框架（Vitest）
9. 编写配置验证测试

### 开发工作流

1. **开发**: `npm run dev` - 启动开发服务器
2. **类型检查**: `npm run type-check` - 运行 TypeScript 类型检查
3. **代码检查**: `npm run lint` - 运行 ESLint
4. **格式化**: `npm run format` - 运行 Prettier
5. **测试**: `npm run test` - 运行测试套件
6. **构建**: `npm run build` - 构建生产版本

### 扩展建议

项目搭建完成后，可以根据需要添加：
- 路由库（React Router）
- 状态管理库（Zustand、Redux Toolkit）
- UI 组件库（Ant Design、Material-UI）
- HTTP 客户端（Axios、TanStack Query）
- 表单处理（React Hook Form）
- 样式方案（Tailwind CSS、Styled Components）
