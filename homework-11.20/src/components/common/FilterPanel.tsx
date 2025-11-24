'use client';

import { Card, Checkbox, InputNumber, Button } from '@arco-design/web-react';
import { useProductStore } from '@/store';
import { FilterParams } from '@/types';
import { useState, useEffect } from 'react';
import styles from './FilterPanel.module.css';

const categories = [
    { label: '男装', value: '男装' },
    { label: '女装', value: '女装' },
    { label: '鞋靴', value: '鞋靴' },
    { label: '配饰', value: '配饰' },
];

export default function FilterPanel() {
    const { filterParams, setFilterParams } = useProductStore();
    const [localFilters, setLocalFilters] = useState<FilterParams>(filterParams);

    useEffect(() => {
        setLocalFilters(filterParams);
    }, [filterParams]);

    const handleCategoryChange = (value: string[]) => {
        console.log('Selected category:', value);
        const newFilters = {
            ...localFilters,
            category: value.length > 0 ? value : undefined,
        };
        setLocalFilters(newFilters);
        setFilterParams(newFilters);
    };

    const handlePriceChange = (type: 'min' | 'max', value: number | undefined) => {
        const newFilters = {
            ...localFilters,
            [type === 'min' ? 'minPrice' : 'maxPrice']: value,
        };
        setLocalFilters(newFilters);
    };

    const handlePriceApply = () => {
        setFilterParams(localFilters);
    };

    const handleReset = () => {
        const resetFilters: FilterParams = {};
        setLocalFilters(resetFilters);
        setFilterParams(resetFilters);
    };

    return (
        <Card className={styles.filterPanel} title="筛选区" bordered={false}>
            <div className={styles.filterSection}>
                <div className={styles.filterTitle}>分类</div>
                <Checkbox.Group
                    value={localFilters.category || []}
                    onChange={handleCategoryChange}
                    direction="vertical"
                >
                    {categories.map((cat) => (
                        <Checkbox key={cat.value} value={cat.value}>
                            {cat.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </div>

            <div className={styles.filterSection}>
                <div className={styles.filterTitle}>价格区间</div>
                <div className={styles.priceInputs}>
                    <InputNumber
                        placeholder="最低价"
                        value={localFilters.minPrice}
                        onChange={(value) => handlePriceChange('min', value as number | undefined)}
                        min={0}
                        style={{ width: '100%' }}
                    />
                    <span className={styles.priceSeparator}>-</span>
                    <InputNumber
                        placeholder="最高价"
                        value={localFilters.maxPrice}
                        onChange={(value) => handlePriceChange('max', value as number | undefined)}
                        min={0}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className={styles.priceActions}>
                    <Button type="primary" size="small" onClick={handlePriceApply}>
                        确定
                    </Button>
                    <Button size="small" onClick={handleReset}>
                        重置
                    </Button>
                </div>
            </div>
        </Card>
    );
}

