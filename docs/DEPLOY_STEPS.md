# Vercel 部署步骤（develop 分支）

## 一次性设置步骤

### 1. 登录 Vercel
在终端运行：
```bash
vercel login
```
- 会打开浏览器让你登录
- 可以用 GitHub / GitLab / Email 登录

### 2. 首次部署 develop 分支
确保你在 develop 分支上：
```bash
git branch  # 确认当前在 develop 分支
```

然后运行：
```bash
vercel
```

会问你几个问题：
1. **Set up and deploy?** → Yes
2. **Which scope?** → 选择你的账号
3. **Link to existing project?** → No (第一次选 No)
4. **What's your project's name?** → xiaotang-space-test（或你想要的名字）
5. **In which directory is your code located?** → ./（直接回车）
6. **Want to override the settings?** → No（直接回车）

完成后会给你一个测试 URL，比如：
```
https://xiaotang-space-test.vercel.app
```

### 3. 配置自定义域名

登录 Vercel 网站：
1. 进入项目 Settings
2. 找到 Domains 选项
3. 添加你的测试域名（比如 test.yourdomain.com）
4. 按照提示配置 DNS：
   - Type: CNAME
   - Name: test（或 @ 如果是根域名）
   - Value: cname.vercel-dns.com

### 4. 设置 Git 集成（推荐）

在 Vercel 项目设置中：
1. 进入 Git → Connect Git Repository
2. 选择你的 GitHub 仓库
3. 配置分支：
   - Production Branch: main
   - Deploy Branch: develop
4. 保存后，每次推送到 develop 分支会自动部署

## 日常部署流程（配置好 Git 集成后）

只需要推送代码到 develop 分支：
```bash
git add .
git commit -m "feat: your changes"
git push origin develop
```

Vercel 会自动检测并部署！

## 手动部署（不用 Git 集成）

如果不想配置 Git 集成，每次都可以手动部署：
```bash
# 确保在 develop 分支
git checkout develop

# 拉取最新代码
git pull origin develop

# 部署
vercel --prod
```

## 查看部署状态

```bash
vercel ls  # 列出所有部署
vercel inspect [deployment-url]  # 查看具体部署信息
```

## 环境变量配置

如果需要配置环境变量（比如 API 地址）：
```bash
vercel env add
```
或者在 Vercel 网站项目设置的 Environment Variables 中添加。

## 回滚部署

如果新部署有问题，可以快速回滚：
1. 在 Vercel 网站找到之前的部署
2. 点击 Promote to Production

## 分支策略总结

- **main** 分支 → 生产环境（正式站）
- **develop** 分支 → 测试环境（test.yourdomain.com）
- **feature/** 分支 → 本地开发，不部署
