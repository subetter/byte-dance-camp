# 电商平台项目结构说明

## 项目概述
这是一个基于 Next.js 16 + TypeScript + Arco Design + Zustand 的电商平台项目，实现了商品列表页和商品详情页的完整功能。

## 技术栈
- **框架**: Next.js 16.0.3 (App Router)
- **UI库**: Arco Design 2.66.8
- **状态管理**: Zustand 5.0.8
- **语言**: TypeScript 5
- **样式**: CSS Modules

## 项目结构

```
src/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx               # 根布局（引入 Arco Design 样式）
│   ├── page.tsx                 # 首页（跳转到商品列表）
│   ├── products/
│   │   └── page.tsx             # 商品列表页
│   └── product/
│       └── [id]/
│           └── page.tsx         # 商品详情页（动态路由）
├── components/
│   ├── common/                  # 通用组件
│   │   ├── Navbar.tsx           # 导航栏（含购物车图标）
│   │   ├── FilterPanel.tsx      # 筛选面板（分类、价格区间）
│   │   └── Pagination.tsx       # 分页器
│   └── business/                # 业务组件
│       ├── ProductCard.tsx      # 商品卡片
│       ├── SpecSelector.tsx     # 规格选择器（尺码、颜色、数量）
│       └── CartDrawer.tsx       # 购物车抽屉
├── store/
│   └── index.ts                 # Zustand 状态管理
│       ├── useProductStore      # 商品列表、筛选、排序、分页状态
│       └── useCartStore         # 购物车状态
├── types/
│   └── index.ts                 # TypeScript 类型定义
└── utils/
    └── mockData.ts              # Mock 数据生成（模拟商品数据）
```

## 核心功能

### 1. 商品列表页 (`/products`)
- ✅ 商品筛选（分类、价格区间）
- ✅ 商品排序（价格升序/降序、销量）
- ✅ 分页加载（支持自定义每页数量）
- ✅ 响应式布局（Desktop / Tablet / Mobile）
- ✅ 加载态、空态、错误态处理

### 2. 商品详情页 (`/product/[id]`)
- ✅ 商品图片轮播（主图 + 缩略图）
- ✅ 商品信息展示（标题、价格、描述）
- ✅ 规格选择（尺码、颜色、数量）
- ✅ 库存显示（根据规格动态显示）
- ✅ 加入购物车功能
- ✅ 推荐/相似商品展示

### 3. 购物车功能
- ✅ 购物车抽屉（从右侧滑出）
- ✅ 商品数量调整
- ✅ 商品删除
- ✅ 购物车总价计算
- ✅ 购物车商品数量徽章

## 状态管理

### ProductStore (商品相关状态)
- `products`: 所有商品列表
- `filteredProducts`: 筛选后的商品列表
- `filterParams`: 筛选条件（分类、价格区间）
- `sortType`: 排序方式
- `currentPage`: 当前页码
- `pageSize`: 每页数量
- `loading`: 加载状态
- `error`: 错误信息

### CartStore (购物车状态)
- `items`: 购物车商品列表
- `isOpen`: 购物车抽屉是否打开
- `addItem`: 添加商品到购物车
- `removeItem`: 从购物车移除商品
- `updateQuantity`: 更新商品数量
- `getTotalPrice`: 获取总价
- `getTotalCount`: 获取商品总数

## 组件说明

### 通用组件
1. **Navbar**: 顶部导航栏，包含购物车图标和数量徽章
2. **FilterPanel**: 左侧筛选面板，支持分类和价格区间筛选
3. **Pagination**: 分页器，支持页码跳转和每页数量选择

### 业务组件
1. **ProductCard**: 商品卡片，展示商品图片、标题、价格、销量、标签
2. **SpecSelector**: 规格选择器，支持尺码、颜色选择，数量调整，库存显示
3. **CartDrawer**: 购物车抽屉，展示购物车商品列表，支持数量调整和删除

## 响应式设计

- **Desktop (> 1024px)**: 完整布局，筛选面板在左侧
- **Tablet (768px - 1024px)**: 筛选面板移至顶部，商品网格自适应
- **Mobile (< 768px)**: 单列布局，优化触摸交互

## 使用说明

### 启动开发服务器
```bash
npm run dev
```

### 访问页面
- 首页: http://localhost:3000
- 商品列表: http://localhost:3000/products
- 商品详情: http://localhost:3000/product/[id]

### 功能测试
1. 在商品列表页进行筛选和排序
2. 点击商品卡片进入详情页
3. 选择规格并加入购物车
4. 查看购物车并调整商品数量

## 注意事项

1. **Mock 数据**: 当前使用简单的数据生成函数，如需使用 Mock.js，请先安装：
   ```bash
   npm install mockjs @types/mockjs --save-dev
   ```

2. **图片加载**: 当前使用 picsum.photos 作为占位图片，实际项目中应替换为真实图片URL

3. **API 集成**: 当前为前端模拟数据，实际项目中需要：
   - 创建 API 路由或连接后端服务
   - 替换 Mock 数据生成为真实 API 调用
   - 添加错误处理和加载状态

4. **性能优化**: 
   - 商品图片建议使用 Next.js Image 组件优化
   - 大量商品时考虑虚拟滚动
   - 添加商品列表缓存

## 后续优化建议

1. 添加商品搜索功能
2. 实现用户登录和订单管理
3. 添加商品收藏功能
4. 优化图片加载和懒加载
5. 添加单元测试和集成测试
6. 实现服务端渲染（SSR）优化 SEO

