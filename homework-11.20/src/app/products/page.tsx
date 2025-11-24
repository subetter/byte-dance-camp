'use client';

import { useEffect, useState } from 'react';
import { Layout, Select, Empty, Spin, Message } from '@arco-design/web-react';
import { useProductStore } from '@/store';
import { generateProducts } from '@/utils/mockData';
import Navbar from '@/components/common/Navbar';
import FilterPanel from '@/components/common/FilterPanel';
import ProductCard from '@/components/business/ProductCard';
import Pagination from '@/components/common/Pagination';
import CartDrawer from '@/components/business/CartDrawer';
import styles from './page.module.css';
import { SortType } from '@/types';

const { Content, Sider } = Layout;

export default function ProductsPage() {
    const {
        products,
        filteredProducts,
        loading,
        error,
        currentPage,
        pageSize,
        setProducts,
        setLoading,
        setError,
        applyFiltersAndSort,
    } = useProductStore();

    const [sortType, setSortType] = useState<string>('default');

    // 初始化数据
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 500));
                const mockProducts = generateProducts(50);
                setProducts(mockProducts);
                applyFiltersAndSort();
            } catch (err) {
                setError('加载商品失败，请重试');
                Message.error(err as string);
            } finally {
                setLoading(false);
            }
        };

        if (products.length === 0) {
            loadProducts();
        }
    }, []);

    // 处理排序
    const handleSortChange = (value: string) => {
        setSortType(value);
        useProductStore.getState().setSortType(value as SortType);
    };

    // 获取当前页的商品
    const getCurrentPageProducts = () => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return filteredProducts.slice(start, end);
    };

    const currentProducts = getCurrentPageProducts();

    return (
        <Layout className={styles.layout}>
            <Navbar />
            <CartDrawer />
            <Content className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.mainContent}>
                        <Sider width={240} className={styles.sider}>
                            <FilterPanel />
                        </Sider>
                        <Content className={styles.productArea}>
                            <div className={styles.toolbar}>
                                <div className={styles.sortSection}>
                                    <span className={styles.sortLabel}>排序:</span>
                                    <Select
                                        value={sortType}
                                        onChange={handleSortChange}
                                        style={{ width: 150 }}
                                    >
                                        <Select.Option value="default">默认</Select.Option>
                                        <Select.Option value="price-asc">价格 ↑</Select.Option>
                                        <Select.Option value="price-desc">价格 ↓</Select.Option>
                                        <Select.Option value="sales-desc">销量</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            {loading ? (
                                <div className={styles.loadingWrapper}>
                                    <Spin size={40} />
                                </div>
                            ) : error ? (
                                <div className={styles.errorWrapper}>
                                    <Empty description={error} />
                                    <button
                                        onClick={() => window.location.reload()}
                                        className={styles.retryButton}
                                    >
                                        重试
                                    </button>
                                </div>
                            ) : currentProducts.length === 0 ? (
                                <div className={styles.emptyWrapper}>
                                    <Empty description="未找到符合条件的商品" />
                                    <button
                                        onClick={() => useProductStore.getState().setFilterParams({})}
                                        className={styles.backButton}
                                    >
                                        返回
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.productGrid}>
                                        {currentProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination />
                                </>
                            )}
                        </Content>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

