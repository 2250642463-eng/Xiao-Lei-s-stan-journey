# 测试目录说明

## 目录结构

```
tests/
├── unit/                   # 单元测试
│   ├── components/        # 组件测试
│   ├── hooks/             # Hooks 测试
│   └── utils/             # 工具函数测试
├── integration/            # 集成测试
├── helpers/                # 测试辅助工具
│   ├── test-utils.tsx     # 测试工具函数
│   └── mock-data.ts       # Mock 数据
├── setup.ts                # 测试环境设置
└── README.md               # 本文件
```

## 测试文件命名规范

测试文件应与源文件同名，加 `.test` 后缀：

- 源文件: `AdCard.jsx` → 测试: `AdCard.test.jsx`
- 源文件: `useAdData.js` → 测试: `useAdData.test.js`
- 源文件: `adFormatters.js` → 测试: `adFormatters.test.js`

## 测试文件位置映射

测试目录结构应镜像源码结构：

```
源文件: src/pages/ad-assets/v2/components/AdCard.jsx
测试:   tests/unit/components/ad-assets/v2/AdCard.test.jsx

源文件: src/pages/ad-assets/v2/hooks/useAdData.js
测试:   tests/unit/hooks/ad-assets/v2/useAdData.test.js

源文件: src/pages/ad-assets/v2/utils/adFormatters.js
测试:   tests/unit/utils/ad-assets/v2/adFormatters.test.js
```

## 运行测试

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm run test AdCard.test.jsx

# 运行测试并查看覆盖率
npm run test:coverage

# 监听模式
npm run test:watch
```

## 测试覆盖率要求

- **Hooks**: 100% 覆盖（必须）
- **Utils**: 100% 覆盖（必须）
- **Components**: 80%+ 覆盖（推荐）

## 使用测试工具

```javascript
// 使用自定义渲染函数
import { renderWithProviders, screen } from '../helpers/test-utils'
import { MyComponent } from '@/pages/my-module/components/MyComponent'

test('renders component', () => {
  renderWithProviders(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})

// 使用 Mock 数据
import { mockUser, mockAd } from '../helpers/mock-data'

test('displays user info', () => {
  render(<UserCard user={mockUser} />)
  expect(screen.getByText(mockUser.name)).toBeInTheDocument()
})
```

## 更多信息

查看项目规范文档：`docs/PROJECT_STRUCTURE.md`
