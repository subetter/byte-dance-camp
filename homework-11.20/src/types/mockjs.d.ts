declare module 'mockjs' {
    interface MockjsRandom {
        // 中文相关
        ctitle(min?: number, max?: number): string;
        cparagraph(min?: number, max?: number): string;
        cword(pool?: string, min?: number, max?: number): string;
        csentence(min?: number, max?: number): string;

        // 数字相关
        integer(min?: number, max?: number): number;
        natural(min?: number, max?: number): number;
        float(min?: number, max?: number, dmin?: number, dmax?: number): number;

        // 图片相关
        image(size?: string, background?: string, foreground?: string, format?: string, text?: string): string;

        // 颜色相关
        color(): string;

        // 数组相关
        pick<T>(arr: T[]): T;
    }

    interface MockjsStatic {
        mock<T>(template: T): T;
        Random: MockjsRandom;
        setup(settings: MockjsSettings): void;
    }

    const Mock: MockjsStatic;
    export = Mock;
}

