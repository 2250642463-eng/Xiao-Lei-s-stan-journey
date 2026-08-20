# React 19 + TypeScript 项目

一个基于 React 19 和 TypeScript 的现代化前端开发框架，集成了完整的代码规范和自动化检查工具。

## ✨ 特性

- ⚡️ **Vite** - 极速的开发体验
- ⚛️ **React 19** - 最新版本的 React
- 🔷 **TypeScript** - 完整的类型安全
- 📏 **ESLint** - 代码质量检查
- 💅 **Prettier** - 代码格式化
- 🐶 **Husky** - Git hooks 自动化
- 📝 **Commitlint** - 规范的提交信息
- 🚦 **Lint-staged** - 只检查暂存文件

## 📦 技术栈

- React 19.0.0
- TypeScript 5.6.2
- Vite 6.0.5
- ESLint 9.17.0
- Prettier 3.4.2

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装

```bash
# 克隆项目（如果从 Git 获取）
git clone <repository-url>
cd react-typescript-project

# 安装依赖
npm install

# 初始化 Git hooks
npm run prepare
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 开发服务器将运行在 http://localhost:5173
```

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📜 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 错误 |
| `npm run format` | 格式化代码 |
| `npm run format:check` | 检查代码格式 |
| `npm run type-check` | TypeScript 类型检查 |

## 📁 项目结构

```
react-typescript-project/
├── .husky/                 # Git hooks 配置
│   ├── pre-commit         # 提交前检查
│   └── commit-msg         # 提交信息检查
├── docs/                   # 项目文档
│   ├── CODE_STYLE_GUIDE.md      # 代码风格指南
│   ├── GIT_COMMIT_GUIDE.md      # Git 提交规范
│   ├── COMMIT_EXAMPLES.md       # 提交信息示例
│   ├── SKILLSAI_GUIDE.md        # SkillsAI 规范（待完成）
│   └── PROJECT_SPEC.md          # 项目规范（待完成）
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/        # React 组件
│   │   ├── common/       # 通用组件
│   │   └── features/     # 功能组件
│   ├── hooks/            # 自定义 Hooks
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript 类型定义
│   ├── styles/           # 全局样式
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 应用入口
│   └── vite-env.d.ts     # Vite 环境类型
├── .env.example           # 环境变量示例
├── .eslintrc.json         # ESLint 配置
├── .prettierrc            # Prettier 配置
├── .gitignore             # Git 忽略文件
├── commitlint.config.js   # Commitlint 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
├── package.json           # 项目依赖
└── README.md              # 项目文档
```

## 📖 开发规范

### 代码规范

本项目使用严格的代码规范，详见 [代码风格指南](./docs/CODE_STYLE_GUIDE.md)。

主要规范：
- **TypeScript 严格模式**：启用所有类型检查
- **命名规范**：组件使用 PascalCase，函数/变量使用 camelCase
- **组件规范**：使用函数组件和 TypeScript 接口
- **导入顺序**：React → 第三方库 → 项目内部 → 样式

### Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

提交信息格式：
```
<type>(<scope>): <subject>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `build`: 构建系统或依赖变动
- `ci`: CI 配置
- `chore`: 其他杂项

**示例：**
```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix(auth): 修复登录按钮无响应"
git commit -m "docs: 更新 README"
```

详见：
- [Git 提交规范指南](./docs/GIT_COMMIT_GUIDE.md)
- [提交信息示例](./docs/COMMIT_EXAMPLES.md)

### 自动化检查

项目配置了 Git hooks，会在提交时自动执行：

**Pre-commit（提交前）：**
- ESLint 代码检查
- Prettier 代码格式化
- TypeScript 类型检查

**Commit-msg（提交信息检查）：**
- Commitlint 检查提交信息格式

如果检查失败，提交将被阻止。

## 🔧 配置说明

### 环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

### TypeScript 配置

项目启用了 TypeScript 严格模式：
- `strict: true` - 所有严格类型检查
- `noUnusedLocals: true` - 检查未使用的变量
- `noUnusedParameters: true` - 检查未使用的参数

路径别名已配置：
```typescript
import { Button } from '@/components/Button'
```

### ESLint 配置

使用 TypeScript ESLint 和 React 推荐规则：
- TypeScript 类型检查
- React Hooks 规则
- React Refresh 规则

### Prettier 配置

代码格式化规则：
- 不使用分号
- 使用单引号
- 2 空格缩进
- 尾随逗号（ES5）

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feat/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feat/amazing-feature`)
5. 开启 Pull Request

**注意：** 所有提交必须遵循提交规范，代码必须通过 ESLint 和 TypeScript 检查。

## 📚 更多文档

- [代码风格指南](./docs/CODE_STYLE_GUIDE.md) - 详细的代码规范
- [Git 提交规范](./docs/GIT_COMMIT_GUIDE.md) - 完整的提交规范说明
- [提交示例速查](./docs/COMMIT_EXAMPLES.md) - 快速参考提交格式
- [SkillsAI 规范](./docs/SKILLSAI_GUIDE.md) - AI 辅助开发指南（待完成）
- [项目规范](./docs/PROJECT_SPEC.md) - 项目开发规范（待完成）

## 🔗 相关资源

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📄 许可证

MIT License

## 💬 反馈与支持

如有问题或建议，请提交 Issue。
