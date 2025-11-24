'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@arco-design/web-react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>欢迎来到电商平台</h1>
          <p>浏览我们的商品列表，找到您心仪的商品</p>
        </div>
        <div className={styles.ctas}>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push('/products')}
          >
            进入商品列表
          </Button>
        </div>
      </main>
    </div>
  );
}
