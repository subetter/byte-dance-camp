import Mock from 'mockjs';
import { Product } from '@/types';

// Mock.js 配置
const categories = ['男装', '女装', '鞋靴', '配饰'];
const tags = ['新品', '热销', '折扣'];
const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['黑', '白', '蓝'];

// 生成单个商品的库存数据
function generateStock(): Record<string, Record<string, number>> {
    const stock: Record<string, Record<string, number>> = {};
    sizes.forEach(size => {
        stock[size] = {};
        colors.forEach(color => {
            // 使用 Mock.js 生成库存数量（1-50之间）
            stock[size][color] = Mock.Random.integer(1, 50);
        });
    });
    return stock;
}

// 生成单个商品数据
function generateProduct(id: number): Product {
    // 使用 Mock.js 随机选择分类和标签
    const category = Mock.Random.pick(categories) as '男装' | '女装' | '鞋靴' | '配饰';
    const tag = Mock.Random.pick(tags) as '新品' | '热销' | '折扣';

    // 使用 Mock.js 生成价格（50-450之间）
    const price = Mock.Random.integer(50, 450);

    // 使用 Mock.js 生成销量（100-5100之间）
    const sales = Mock.Random.integer(100, 5100);

    // 使用 Mock.js 生成商品标题
    const titleParts = [
        `${category}商品 ${id}`,
        Mock.Random.ctitle(3, 6), // 形容词
        Mock.Random.ctitle(2, 4), // 特性
        Mock.Random.ctitle(2, 4), // 特性
    ];
    const title = titleParts.join(' - ');

    // 使用 Mock.js 生成商品描述
    const description = Mock.mock('@cparagraph(1, 2)').replace(/。/g, '，').slice(0, -1) + '。';
    const fullDescription = `这是一款优质的${category}商品，${description}`;

    // 生成图片 URL（使用 picsum.photos 作为占位图，确保每次不同）
    const images = [
        `https://picsum.photos/400/400?random=${id}`,
        `https://picsum.photos/400/400?random=${id + 1000}`,
        `https://picsum.photos/400/400?random=${id + 2000}`,
    ];

    return {
        id: `product-${id}`,
        title,
        price,
        sales,
        tag,
        category,
        images,
        description: fullDescription,
        specs: {
            sizes,
            colors,
            stock: generateStock(),
        },
    };
}

// 生成商品列表
export function generateProducts(count: number = 50): Product[] {
    // 使用 Mock.js 批量生成
    return Array.from({ length: count }, (_, i) => generateProduct(i + 1));
}
