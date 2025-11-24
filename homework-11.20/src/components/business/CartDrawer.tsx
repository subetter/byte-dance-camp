'use client';

import { Drawer, Button, Image, InputNumber, Empty, Message } from '@arco-design/web-react';
import { useCartStore } from '@/store';
import { useRouter } from 'next/navigation';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { isOpen, items, toggleCart, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const totalPrice = getTotalPrice();

    const handleCheckout = () => {
        if (items.length === 0) {
            Message.warning('购物车为空');
            return;
        }
        Message.info('跳转到结算页面（待实现）');
        // router.push('/checkout');
    };

    return (
        <Drawer
            title="购物车"
            visible={isOpen}
            onCancel={toggleCart}
            width={400}
            footer={
                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>总计: </span>
                        <span className={styles.totalPrice}>¥{totalPrice.toFixed(2)}</span>
                    </div>
                    <Button type="primary" size="large" onClick={handleCheckout} disabled={items.length === 0}>
                        结算
                    </Button>
                </div>
            }
        >
            {items.length === 0 ? (
                <Empty description="购物车为空" />
            ) : (
                <div className={styles.cartList}>
                    {items.map((item, index) => (
                        <div key={`${item.productId}-${item.size}-${item.color}-${index}`} className={styles.cartItem}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                className={styles.itemImage}
                                preview={false}
                            />
                            <div className={styles.itemInfo}>
                                <div className={styles.itemTitle}>{item.title}</div>
                                <div className={styles.itemSpec}>
                                    {item.size} / {item.color}
                                </div>
                                <div className={styles.itemPrice}>¥{item.price}</div>
                            </div>
                            <div className={styles.itemActions}>
                                <InputNumber
                                    value={item.quantity}
                                    onChange={(value) => updateQuantity(item.productId, item.size, item.color, value as number)}
                                    min={1}
                                    size="small"
                                    style={{ width: 80 }}
                                />
                                <Button
                                    type="text"
                                    status="danger"
                                    size="small"
                                    onClick={() => removeItem(item.productId, item.size, item.color)}
                                >
                                    删除
                                </Button>
                            </div>
                        </div>
                    ))}
                    {items.length > 0 && (
                        <Button type="text" status="danger" onClick={clearCart} className={styles.clearButton}>
                            清空购物车
                        </Button>
                    )}
                </div>
            )}
        </Drawer>
    );
}

