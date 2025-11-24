# 电商平台项目

这是一个基于 [Next.js](https://nextjs.org) 构建的电商平台项目，使用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) 初始化。

## 项目简介

本项目是一个完整的电商平台前端应用，实现了商品列表页和商品详情页的核心功能，包括：
- 商品筛选（分类、价格区间）
- 商品排序（价格、销量）
- 分页加载
- 商品详情展示
- 规格选择（尺码、颜色）
- 购物车功能
- 响应式设计（支持桌面、平板、手机）

## 技术栈

- **框架**: Next.js 16.0.3 (App Router)
- **UI 库**: Arco Design 2.66.8
- **状态管理**: Zustand 5.0.8
- **语言**: TypeScript 5
- **样式**: CSS Modules

## 快速开始

首先，安装依赖：

```bash
npm install
```

然后，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

你可以通过修改 `src/app/page.tsx` 来编辑页面。文件保存后，页面会自动更新。

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── products/          # 商品列表页
│   └── product/[id]/      # 商品详情页
├── components/
│   ├── common/            # 通用组件（导航栏、分页器、筛选组件）
│   └── business/          # 业务组件（商品卡片、规格选择器、购物车）
├── store/                 # Zustand 状态管理
├── types/                 # TypeScript 类型定义
└── utils/                 # 工具函数（Mock 数据生成）
```

## 功能特性

### 商品列表页 (`/products`)
- ✅ 商品筛选（按分类、价格区间）
- ✅ 商品排序（价格升序/降序、销量）
- ✅ 分页加载（支持自定义每页数量）
- ✅ 响应式布局
- ✅ 加载态、空态、错误态处理

### 商品详情页 (`/product/[id]`)
- ✅ 商品图片轮播（主图 + 缩略图）
- ✅ 商品信息展示
- ✅ 规格选择（尺码、颜色、数量）
- ✅ 库存显示（根据规格动态显示）
- ✅ 加入购物车功能
- ✅ 推荐/相似商品展示

### 购物车功能
- ✅ 购物车抽屉（从右侧滑出）
- ✅ 商品数量调整
- ✅ 商品删除
- ✅ 购物车总价计算
- ✅ 购物车商品数量徽章

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 代码检查

## 了解更多

要了解更多关于 Next.js 的信息，可以查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的功能和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎反馈和贡献！

## 部署到 Vercel

部署 Next.js 应用最简单的方式是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，这是 Next.js 的创建者提供的平台。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## 注意事项

1. **Mock 数据**: 当前使用简单的数据生成函数，如需使用 Mock.js，请先安装：
   ```bash
   npm install mockjs @types/mockjs --save-dev
   ```

2. **图片加载**: 当前使用 picsum.photos 作为占位图片，实际项目中应替换为真实图片 URL

3. **API 集成**: 当前为前端模拟数据，实际项目中需要连接后端服务或创建 API 路由

## 项目说明

本项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化和加载 [Geist](https://vercel.com/font) 字体，这是 Vercel 的新字体家族。

更详细的项目结构说明请查看 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)。
