# 字节跳动工程训练营课程作业

<details>
  <summary>
    <strong>作业1-11.17日--> 使用html完成个人简历制作</strong>
    这是一个使用纯HTML、CSS和JavaScript实现的个人简历单页应用。
  </summary>
  
### 项目特色

-  ✅ 纯前端实现 - 无需任何框架或外部依赖

-  ✅ 响应式设计 - 适配桌面端和移动端

-  ✅ 语义化HTML - 使用HTML5语义化标签

-  ✅ CSS Grid/Flex布局 - 现代化布局技术

-  ✅ 交互功能 - 项目经历可展开/折叠

-  ✅ 打印友好 - 优化打印样式

### 技术栈

-  HTML5 - 语义化标签和文档结构

-  CSS3 - Grid布局、Flexbox、CSS变量、媒体查询

-  JavaScript - DOM操作和交互功能

### 功能特性

#### 布局特性

-  两栏式布局（侧边栏+主内容区）

-  响应式设计，支持移动端适配

-  侧边栏粘性定位

#### 交互功能

-  项目经历展开/折叠动画

-  平滑的过渡效果

-  图标旋转指示器

#### 视觉设计

-  CSS变量主题系统

-  现代化UI设计

-  打印样式优化



### 自定义配置

#### 修改主题颜色

在CSS的 :root 部分修改CSS变量：
```css
:root {
    --primary-color: #097cef;    /* 主色调 */
    --secondary-color: #66b3e7;  /* 辅助色 */
    --accent-color: #e74c3c;     /* 强调色 */
    /* 更多颜色变量... */
}
```

#### 添加新项目

在HTML的 #projects 部分添加新的项目块：
```html
<div class="project-item">
    <div class="project-header">
        <h3>项目标题</h3>
        <span class="toggle-icon">◀</span>
    </div>
    <div class="project-content">
        <!-- 项目内容 -->
    </div>
</div>
```


### 浏览器兼容性
-  Chrome 60+

-  Firefox 55+

-  Safari 12+

-  Edge 79+

### 样式架构

-  使用CSS变量实现主题系统

-  模块化CSS组织

-  移动优先的响应式设计

### JavaScript功能

-  纯原生JavaScript实现

-  事件委托处理

-  平滑动画过渡
</details>

<details>
  
 <summary><strong>作业2-11.20日--> 使用React框架完成电商列表页及详情页</strong></summary>
 
 ### 项目简介
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

### 项目结构

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

### 功能特性

#### 商品列表页 (`/products`)
- ✅ 商品筛选（按分类、价格区间）
- ✅ 商品排序（价格升序/降序、销量）
- ✅ 分页加载（支持自定义每页数量）
- ✅ 响应式布局
- ✅ 加载态、空态、错误态处理

#### 商品详情页 (`/product/[id]`)
- ✅ 商品图片轮播（主图 + 缩略图）
- ✅ 商品信息展示
- ✅ 规格选择（尺码、颜色、数量）
- ✅ 库存显示（根据规格动态显示）
- ✅ 加入购物车功能
- ✅ 推荐/相似商品展示

#### 购物车功能
- ✅ 购物车抽屉（从右侧滑出）
- ✅ 商品数量调整
- ✅ 商品删除
- ✅ 购物车总价计算
- ✅ 购物车商品数量徽章

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 代码检查

  </details>
