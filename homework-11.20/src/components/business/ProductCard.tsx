'use client';

import { Card, Tag, Image } from '@arco-design/web-react';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${product.id}`);
    };

    const formatSales = (sales: number) => {
        if (sales >= 1000) {
            return `${(sales / 1000).toFixed(1)}k`;
        }
        return sales.toString();
    };

    const getTagColor = (tag: string) => {
        switch (tag) {
            case '新品':
                return 'blue';
            case '热销':
                return 'red';
            case '折扣':
                return 'orange';
            default:
                return 'gray';
        }
    };

    return (
        <Card
            className={styles.productCard}
            hoverable
            onClick={handleClick}
            cover={
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        className={styles.productImage}
                        preview={false}
                    />
                </div>
            }
        >
            <div className={styles.cardContent}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.info}>
                    <div className={styles.price}>¥{product.price}</div>
                    <div className={styles.sales}>销量: {formatSales(product.sales)}</div>
                </div>
                <div className={styles.tagWrapper}>
                    <Tag color={getTagColor(product.tag)}>{product.tag}</Tag>
                </div>
            </div>
        </Card>
    );
}

