'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout, Carousel, Image, Empty, Spin, Message } from '@arco-design/web-react';
import { useProductStore, useCartStore } from '@/store';
import { Product } from '@/types';
import Navbar from '@/components/common/Navbar';
import SpecSelector from '@/components/business/SpecSelector';
import ProductCard from '@/components/business/ProductCard';
import CartDrawer from '@/components/business/CartDrawer';
import styles from './page.module.css';

const { Content } = Layout;

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const { products } = useProductStore();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                let productList = products;

                // 如果商品列表未加载，先加载
                if (productList.length === 0) {
                    const { generateProducts } = await import('@/utils/mockData');
                    productList = generateProducts(50);
                    useProductStore.getState().setProducts(productList);
                }

                // 模拟API调用延迟
                await new Promise(resolve => setTimeout(resolve, 300));

                const foundProduct = productList.find(p => p.id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    Message.error('商品不存在');
                    router.push('/products');
                }
            } catch (err) {
                Message.error('加载商品失败' + (err as string));
                router.push('/products');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const handleAddToCart = (size: string, color: string, quantity: number) => {
        if (!product) return;

        addItem({
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            size,
            color,
            quantity,
        });
    };

    // 获取推荐商品（同分类的其他商品）
    const getRecommendedProducts = () => {
        if (!product) return [];
        return products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 6);
    };

    if (loading) {
        return (
            <Layout className={styles.layout}>
                <Navbar />
                <Content className={styles.loadingWrapper}>
                    <Spin size={40} />
                </Content>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout className={styles.layout}>
                <Navbar />
                <Content className={styles.errorWrapper}>
                    <Empty description="商品不存在" />
                </Content>
            </Layout>
        );
    }

    const recommendedProducts = getRecommendedProducts();

    const updateImageIndex = (index: number) => {
        setCurrentImageIndex(index);
        console.log('更新图片index:', index);
        console.log('product.images:', product.images[index]);
        console.log('product:', product);

    };
    return (
        <Layout className={styles.layout}>
            <Navbar />
            <CartDrawer />
            <Content className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.mainSection}>
                        {/* 左侧：图片轮播 */}
                        <div className={styles.imageSection}>
                            <div className={styles.mainImage}>
                                <Carousel
                                    currentIndex={currentImageIndex}
                                    indicatorType="dot"
                                    showArrow="hover"
                                    className={styles.carousel}
                                    animation="slide"
                                    onChange={updateImageIndex}
                                >
                                    {product.images.map((img, index) => (
                                        <div key={index}>
                                            <Image
                                                src={img}
                                                alt={`${product.title} - ${index + 1}`}
                                                className={styles.productImage}
                                                loader={true}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div className={styles.thumbnails}>
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.thumbnail} ${currentImageIndex === index ? styles.active : ''}`}
                                        onClick={() => updateImageIndex(index)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`缩略图 ${index + 1}`}
                                            className={styles.thumbnailImage}
                                            preview={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 右侧：商品信息和规格选择 */}
                        <div className={styles.infoSection}>
                            <h1 className={styles.title}>{product.title}</h1>
                            <div className={styles.price}>¥{product.price}</div>
                            <div className={styles.description}>{product.description}</div>
                            <SpecSelector product={product} onAddToCart={handleAddToCart} />
                        </div>
                    </div>

                    {/* 推荐商品 */}
                    {recommendedProducts.length > 0 && (
                        <div className={styles.recommendedSection}>
                            <h2 className={styles.recommendedTitle}>推荐/相似商品</h2>
                            <div className={styles.recommendedGrid}>
                                {recommendedProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Content>
        </Layout>
    );
}

