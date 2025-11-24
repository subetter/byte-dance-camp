'use client';

import { Radio, Button, InputNumber, Message } from '@arco-design/web-react';
import { Product } from '@/types';
import { useState, useEffect } from 'react';
import styles from './SpecSelector.module.css';

interface SpecSelectorProps {
    product: Product;
    onAddToCart: (size: string, color: string, quantity: number) => void;
}

export default function SpecSelector({ product, onAddToCart }: SpecSelectorProps) {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [availableStock, setAvailableStock] = useState<number>(0);

    useEffect(() => {
        if (selectedSize && selectedColor) {
            const stock = product.specs.stock[selectedSize]?.[selectedColor] || 0;
            setAvailableStock(stock);
            if (quantity > stock) {
                setQuantity(Math.max(1, stock));
            }
        } else {
            setAvailableStock(0);
        }
    }, [selectedSize, selectedColor, product.specs.stock, quantity]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            Message.warning('请选择尺码');
            return;
        }
        if (!selectedColor) {
            Message.warning('请选择颜色');
            return;
        }
        if (availableStock === 0) {
            Message.warning('该规格暂无库存');
            return;
        }
        if (quantity > availableStock) {
            Message.warning('库存不足');
            return;
        }
        onAddToCart(selectedSize, selectedColor, quantity);
        Message.success('已加入购物车');
    };

    const isSizeDisabled = (size: string) => {
        return !product.specs.colors.some(color => {
            const stock = product.specs.stock[size]?.[color] || 0;
            return stock > 0;
        });
    };

    const isColorDisabled = (color: string) => {
        if (!selectedSize) return false;
        const stock = product.specs.stock[selectedSize]?.[color] || 0;
        return stock === 0;
    };

    return (
        <div className={styles.specSelector}>
            <div className={styles.specSection}>
                <div className={styles.specLabel}>尺码</div>
                <Radio.Group
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className={styles.radioGroup}
                >
                    {product.specs.sizes.map((size) => (
                        <Radio
                            key={size}
                            value={size}
                            disabled={isSizeDisabled(size)}
                            className={styles.radioItem}
                        >
                            {size}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>

            <div className={styles.specSection}>
                <div className={styles.specLabel}>颜色</div>
                <Radio.Group
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className={styles.radioGroup}
                >
                    {product.specs.colors.map((color) => (
                        <Radio
                            key={color}
                            value={color}
                            disabled={isColorDisabled(color)}
                            className={styles.radioItem}
                        >
                            {color}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>

            {selectedSize && selectedColor && (
                <div className={styles.stockInfo}>
                    库存: {availableStock} 件
                </div>
            )}

            <div className={styles.quantitySection}>
                <span className={styles.quantityLabel}>数量:</span>
                <InputNumber
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={availableStock || 99}
                    disabled={!selectedSize || !selectedColor || availableStock === 0}
                    style={{ width: 100 }}
                />
            </div>

            <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || availableStock === 0}
                className={styles.addButton}
            >
                加入购物车
            </Button>
        </div>
    );
}

