'use client';

import { useEffect } from 'react';

// 抑制 React 19 ref 访问警告的客户端组件
export default function SuppressReactWarning() {
    useEffect(() => {
        // 抑制控制台警告
        const originalError = console.error;
        console.error = (...args: unknown[]) => {
            // 过滤掉 React 19 ref 相关的警告
            const firstArg = args[0];
            if (
                (typeof firstArg === 'string' && firstArg.includes('Accessing element.ref was removed in React 19')) ||
                (typeof firstArg === 'string' && firstArg.includes('ref is now a regular prop'))
            ) {
                return;
            }
            originalError.apply(console, args);
        };

        // 清理函数：恢复原始 console.error
        return () => {
            console.error = originalError;
        };
    }, []);

    return null;
}

