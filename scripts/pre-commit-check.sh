#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   代码质量检查 - 防止雷代码提交${NC}"
echo -e "${BLUE}========================================${NC}\n"

# 错误计数
ERROR_COUNT=0

# 1. 检查是否有 console.log
echo -e "${YELLOW}[1/7]${NC} 检查调试代码 (console.log)..."
CONSOLE_LOGS=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' | xargs grep -n "console\.log" 2>/dev/null || true)
if [ ! -z "$CONSOLE_LOGS" ]; then
    echo -e "${RED}❌ 发现 console.log 调试代码：${NC}"
    echo "$CONSOLE_LOGS"
    echo -e "${YELLOW}   提示：请移除所有 console.log 或使用统一的日志工具${NC}\n"
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo -e "${GREEN}✓ 无调试代码${NC}\n"
fi

# 2. 检查是否有注释掉的代码
echo -e "${YELLOW}[2/7]${NC} 检查注释掉的代码..."
COMMENTED_CODE=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' | xargs grep -n "^[[:space:]]*\/\/" 2>/dev/null | grep -E "(function|const|let|var|if|for)" || true)
if [ ! -z "$COMMENTED_CODE" ]; then
    echo -e "${YELLOW}⚠️  发现可能的注释代码（请人工确认）：${NC}"
    echo "$COMMENTED_CODE" | head -5
    echo -e "${YELLOW}   提示：删除无用代码或添加说明注释${NC}\n"
fi

# 3. 检查 TODO 和 FIXME
echo -e "${YELLOW}[3/7]${NC} 检查 TODO/FIXME..."
TODOS=$(git diff --cached --name-only --diff-filter=ACM | xargs grep -n -E "TODO|FIXME" 2>/dev/null || true)
if [ ! -z "$TODOS" ]; then
    echo -e "${YELLOW}⚠️  发现 TODO/FIXME：${NC}"
    echo "$TODOS"
    echo -e "${YELLOW}   提示：修复所有 TODO/FIXME 或创建 Issue 追踪${NC}\n"
fi

# 4. 检查 any 类型
echo -e "${YELLOW}[4/7]${NC} 检查 TypeScript any 类型..."
ANY_TYPES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' | xargs grep -n ": any" 2>/dev/null || true)
if [ ! -z "$ANY_TYPES" ]; then
    echo -e "${RED}❌ 发现 any 类型：${NC}"
    echo "$ANY_TYPES"
    echo -e "${YELLOW}   提示：使用明确的类型定义${NC}\n"
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo -e "${GREEN}✓ 无 any 类型${NC}\n"
fi

# 5. 运行 ESLint
echo -e "${YELLOW}[5/7]${NC} 运行 ESLint 检查..."
pnpm lint --silent
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ESLint 检查失败${NC}"
    echo -e "${YELLOW}   运行 'pnpm lint:fix' 尝试自动修复${NC}\n"
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo -e "${GREEN}✓ ESLint 检查通过${NC}\n"
fi

# 6. 运行 TypeScript 类型检查
echo -e "${YELLOW}[6/7]${NC} 运行 TypeScript 类型检查..."
pnpm type-check --silent
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ TypeScript 类型检查失败${NC}"
    echo -e "${YELLOW}   修复代码中的类型错误${NC}\n"
    ERROR_COUNT=$((ERROR_COUNT + 1))
else
    echo -e "${GREEN}✓ TypeScript 类型检查通过${NC}\n"
fi

# 7. 检查代码格式
echo -e "${YELLOW}[7/7]${NC} 检查代码格式..."
pnpm format:check --silent
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  代码格式需要调整${NC}"
    echo -e "${YELLOW}   运行 'pnpm format' 自动格式化${NC}\n"
else
    echo -e "${GREEN}✓ 代码格式正确${NC}\n"
fi

# 总结
echo -e "${BLUE}========================================${NC}"
if [ $ERROR_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ 所有检查通过！代码质量良好${NC}"
    echo -e "${BLUE}========================================${NC}\n"
    exit 0
else
    echo -e "${RED}❌ 发现 $ERROR_COUNT 个错误，请修复后再提交${NC}"
    echo -e "${BLUE}========================================${NC}\n"
    echo -e "${YELLOW}提示：查看 docs/CODE_REVIEW_GUIDE.md 了解详细规范${NC}\n"
    exit 1
fi
