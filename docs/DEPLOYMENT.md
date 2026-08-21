# 部署指南

## 测试环境部署

### 方式一：Vercel 部署（推荐，最简单）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署到测试环境**
```bash
# 首次部署
vercel

# 后续部署
vercel --prod
```

4. **配置自定义域名**
- 进入 Vercel 项目设置
- 添加你的测试域名
- 按照提示配置 DNS（添加 CNAME 记录）

### 方式二：Netlify 部署

1. **安装 Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **登录 Netlify**
```bash
netlify login
```

3. **构建项目**
```bash
pnpm build
```

4. **部署**
```bash
# 首次部署
netlify deploy

# 生产部署
netlify deploy --prod
```

5. **配置域名**
- 进入 Netlify 项目设置
- Domain Settings → Add custom domain
- 配置 DNS

### 方式三：传统服务器部署

1. **构建项目**
```bash
pnpm build
```

2. **构建产物在 `dist/` 目录**

3. **上传到服务器**
```bash
# 使用 SCP
scp -r dist/* user@your-server:/var/www/html/

# 或使用 FTP 工具上传 dist 目录内容
```

4. **Nginx 配置示例**
```nginx
server {
    listen 80;
    server_name your-test-domain.com;
    
    root /var/www/html;
    index index.html;
    
    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 环境配置

### 测试环境
- 使用 `.env.test` 配置
- 构建命令：`pnpm build --mode test`

### 生产环境
- 使用 `.env.production` 配置
- 构建命令：`pnpm build`

## DNS 配置

将你的测试域名指向部署平台：

### Vercel
- Type: CNAME
- Name: @ 或 www
- Value: cname.vercel-dns.com

### Netlify
- Type: CNAME
- Name: @ 或 www
- Value: [your-site-name].netlify.app

### 自己的服务器
- Type: A
- Name: @
- Value: 你的服务器 IP

## 部署检查清单

- [ ] 运行 `pnpm check` 确保代码质量
- [ ] 运行 `pnpm build` 确保构建成功
- [ ] 检查 dist 目录生成正确
- [ ] 配置域名 DNS
- [ ] 测试部署后的功能
- [ ] 检查移动端适配
- [ ] 检查浏览器兼容性

## 常见问题

### 1. 路由 404 问题
确保服务器配置了 SPA 路由回退到 index.html

### 2. 静态资源加载失败
检查 vite.config.ts 中的 base 配置

### 3. 环境变量不生效
确保环境变量以 VITE_ 开头，并重新构建

## 持续部署（CI/CD）

可以配置 GitHub Actions 自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to Test

on:
  push:
    branches: [ test ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm deploy
```
