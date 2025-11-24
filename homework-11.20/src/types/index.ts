// 商品类型定义
export interface Product {
    id: string;
    title: string;
    price: number;
    sales: number;
    tag: '新品' | '热销' | '折扣';
    category: '男装' | '女装' | '鞋靴' | '配饰';
    images: string[];
    description: string;
    specs: {
        sizes: string[];
        colors: string[];
        stock: Record<string, Record<string, number>>; // {size: {color: stock}}
    };
}

// 筛选条件
export interface FilterParams {
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
}

// 排序方式
export type SortType = 'price-asc' | 'price-desc' | 'sales-desc' | 'default';

// 购物车商品项
export interface CartItem {
    productId: string;
    title: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

