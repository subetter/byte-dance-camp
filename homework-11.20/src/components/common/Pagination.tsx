'use client';

import { Pagination as ArcoPagination, Select } from '@arco-design/web-react';
import { useProductStore } from '@/store';
import styles from './Pagination.module.css';

export default function Pagination() {
    const { currentPage, pageSize, filteredProducts, setCurrentPage, setPageSize } = useProductStore();
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    if (total === 0) return null;

    return (
        <div className={styles.paginationWrapper}>
            <ArcoPagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={handlePageChange}
                showTotal
                showJumper
            />
            <div className={styles.pageSizeSelector}>
                <span>每页数量：</span>
                <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    style={{ width: 80 }}
                    size="small"
                >
                    <Select.Option value={12}>12</Select.Option>
                    <Select.Option value={24}>24</Select.Option>
                    <Select.Option value={48}>48</Select.Option>
                </Select>
            </div>
        </div>
    );
}

