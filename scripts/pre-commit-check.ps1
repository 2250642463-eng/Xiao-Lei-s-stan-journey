# PowerShell 版本的代码质量检查脚本

Write-Host "========================================" -ForegroundColor Blue
Write-Host "   代码质量检查 - 防止雷代码提交" -ForegroundColor Blue
Write-Host "========================================`n" -ForegroundColor Blue

$ErrorCount = 0

# 1. 检查 console.log
Write-Host "[1/7] 检查调试代码 (console.log)..." -ForegroundColor Yellow
$stagedFiles = git diff --cached --name-only --diff-filter=ACM | Where-Object { $_ -match '\.(ts|tsx|js|jsx)$' }
$consoleLogs = $stagedFiles | ForEach-Object { 
    Select-String -Path $_ -Pattern "console\.log" -ErrorAction SilentlyContinue 
}

if ($consoleLogs) {
    Write-Host "❌ 发现 console.log 调试代码：" -ForegroundColor Red
    $consoleLogs | ForEach-Object { Write-Host "  $_" }
    Write-Host "   提示：请移除所有 console.log 或使用统一的日志工具`n" -ForegroundColor Yellow
    $ErrorCount++
} else {
    Write-Host "✓ 无调试代码`n" -ForegroundColor Green
}

# 2. 检查 TODO/FIXME
Write-Host "[2/7] 检查 TODO/FIXME..." -ForegroundColor Yellow
$todos = $stagedFiles | ForEach-Object { 
    Select-String -Path $_ -Pattern "TODO|FIXME" -ErrorAction SilentlyContinue 
}

if ($todos) {
    Write-Host "⚠️  发现 TODO/FIXME：" -ForegroundColor Yellow
    $todos | Select-Object -First 5 | ForEach-Object { Write-Host "  $_" }
    Write-Host "   提示：修复所有 TODO/FIXME 或创建 Issue 追踪`n" -ForegroundColor Yellow
}

# 3. 检查 any 类型
Write-Host "[3/7] 检查 TypeScript any 类型..." -ForegroundColor Yellow
$anyTypes = $stagedFiles | Where-Object { $_ -match '\.(ts|tsx)$' } | ForEach-Object { 
    Select-String -Path $_ -Pattern ": any" -ErrorAction SilentlyContinue 
}

if ($anyTypes) {
    Write-Host "❌ 发现 any 类型：" -ForegroundColor Red
    $anyTypes | ForEach-Object { Write-Host "  $_" }
    Write-Host "   提示：使用明确的类型定义`n" -ForegroundColor Yellow
    $ErrorCount++
} else {
    Write-Host "✓ 无 any 类型`n" -ForegroundColor Green
}

# 4. 运行 ESLint
Write-Host "[4/7] 运行 ESLint 检查..." -ForegroundColor Yellow
pnpm lint --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ESLint 检查失败" -ForegroundColor Red
    Write-Host "   运行 'pnpm lint:fix' 尝试自动修复`n" -ForegroundColor Yellow
    $ErrorCount++
} else {
    Write-Host "✓ ESLint 检查通过`n" -ForegroundColor Green
}

# 5. 运行 TypeScript 类型检查
Write-Host "[5/7] 运行 TypeScript 类型检查..." -ForegroundColor Yellow
pnpm type-check --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript 类型检查失败" -ForegroundColor Red
    Write-Host "   修复代码中的类型错误`n" -ForegroundColor Yellow
    $ErrorCount++
} else {
    Write-Host "✓ TypeScript 类型检查通过`n" -ForegroundColor Green
}

# 6. 检查代码格式
Write-Host "[6/7] 检查代码格式..." -ForegroundColor Yellow
pnpm format:check --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  代码格式需要调整" -ForegroundColor Yellow
    Write-Host "   运行 'pnpm format' 自动格式化`n" -ForegroundColor Yellow
} else {
    Write-Host "✓ 代码格式正确`n" -ForegroundColor Green
}

# 7. 检查大文件
Write-Host "[7/7] 检查是否有过大的组件文件..." -ForegroundColor Yellow
$largeFiles = $stagedFiles | Where-Object { $_ -match '\.(ts|tsx)$' } | ForEach-Object {
    $lineCount = (Get-Content $_ | Measure-Object -Line).Lines
    if ($lineCount -gt 300) {
        [PSCustomObject]@{
            File = $_
            Lines = $lineCount
        }
    }
}

if ($largeFiles) {
    Write-Host "⚠️  发现过大的文件（>300行）：" -ForegroundColor Yellow
    $largeFiles | ForEach-Object { Write-Host "  $($_.File): $($_.Lines) 行" }
    Write-Host "   提示：考虑拆分为更小的组件`n" -ForegroundColor Yellow
}

# 总结
Write-Host "========================================" -ForegroundColor Blue
if ($ErrorCount -eq 0) {
    Write-Host "✅ 所有检查通过！代码质量良好" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Blue
    exit 0
} else {
    Write-Host "❌ 发现 $ErrorCount 个错误，请修复后再提交" -ForegroundColor Red
    Write-Host "========================================`n" -ForegroundColor Blue
    Write-Host "提示：查看 docs/CODE_REVIEW_GUIDE.md 了解详细规范`n" -ForegroundColor Yellow
    exit 1
}
