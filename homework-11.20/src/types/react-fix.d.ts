// 修复 React 19 ref 访问警告的类型声明
// 这个警告来自依赖库（如 Arco Design）内部，我们无法直接修改
// 通过类型声明来确保 React 18 的类型定义正确

declare module 'react' {
    // 扩展 ReactElement 类型，确保 ref 在 React 18 中正常工作
    interface ReactElement<T extends string | JSXElementConstructor<unknown> = string | JSXElementConstructor<unknown>> {
        ref?: LegacyRef<T>;
    }
}

export { };
