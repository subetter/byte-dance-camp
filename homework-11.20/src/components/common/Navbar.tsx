'use client';

import { Layout, Button, Badge } from '@arco-design/web-react';
import { useCartStore } from '@/store';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
const { Header } = Layout;

export default function Navbar() {
    const { toggleCart, getTotalCount } = useCartStore();
    const cartCount = getTotalCount();
    const router = useRouter();
    return (
        <Header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <div className={styles.logo} onClick={() => router.push('/products')}>电商平台</div>
                <div className={styles.navbarRight}>
                    <Button type="text" onClick={toggleCart}>
                        <Badge count={cartCount} offset={[0, 0]}>
                            <span className={styles.cartIcon}>🛒</span>
                        </Badge>
                    </Button>
                </div>
            </div>
        </Header>
    );
}

