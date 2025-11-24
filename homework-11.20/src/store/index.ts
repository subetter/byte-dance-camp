import { create } from 'zustand';
import { Product, FilterParams, SortType, CartItem } from '@/types';

// 商品列表和筛选状态
interface ProductStore {
    products: Product[];
    filteredProducts: Product[];
    loading: boolean;
    error: string | null;
    filterParams: FilterParams;
    sortType: SortType;
    currentPage: number;
    pageSize: number;

    // Actions
    setProducts: (products: Product[]) => void;
    setFilterParams: (params: FilterParams) => void;
    setSortType: (sort: SortType) => void;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    applyFiltersAndSort: () => void;
}

// 购物车状态
interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity: number }) => void;
    removeItem: (productId: string, size: string, color: string) => void;
    updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    getTotalPrice: () => number;
    getTotalCount: () => number;
}

// 商品列表 Store
export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    filterParams: {},
    sortType: 'default',
    currentPage: 1,
    pageSize: 12,

    setProducts: (products) => set({ products }),

    setFilterParams: (params) => {
        set({ filterParams: params, currentPage: 1 });
        get().applyFiltersAndSort();
    },

    setSortType: (sort) => {
        set({ sortType: sort });
        get().applyFiltersAndSort();
    },

    setCurrentPage: (page) => set({ currentPage: page }),

    setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    applyFiltersAndSort: () => {
        const { products, filterParams, sortType } = get();
        let filtered = [...products];

        // 应用筛选
        if (filterParams.category && filterParams.category.length > 0) {
            filtered = filtered.filter(p => filterParams.category!.includes(p.category));
        }
        if (filterParams.minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= filterParams.minPrice!);
        }
        if (filterParams.maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= filterParams.maxPrice!);
        }

        // 应用排序
        switch (sortType) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'sales-desc':
                filtered.sort((a, b) => b.sales - a.sales);
                break;
            default:
                break;
        }

        set({ filteredProducts: filtered });
    },
}));

// 购物车 Store
export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
            i => i.productId === item.productId &&
                i.size === item.size &&
                i.color === item.color
        );

        if (existingIndex >= 0) {
            // 如果已存在，增加数量
            const newItems = [...items];
            newItems[existingIndex].quantity += item.quantity;
            set({ items: newItems, isOpen: true });
        } else {
            // 新增商品
            set({ items: [...items, { ...item, quantity: item.quantity }], isOpen: true });
        }
    },

    removeItem: (productId, size, color) => {
        const { items } = get();
        set({
            items: items.filter(
                i => !(i.productId === productId && i.size === size && i.color === color)
            ),
        });
    },

    updateQuantity: (productId, size, color, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
            get().removeItem(productId, size, color);
            return;
        }
        const newItems = items.map(item =>
            item.productId === productId && item.size === size && item.color === color
                ? { ...item, quantity }
                : item
        );
        set({ items: newItems });
    },

    clearCart: () => set({ items: [] }),

    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
}));

