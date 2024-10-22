import * as react_jsx_runtime from 'react/jsx-runtime';
import { PageOpts, PageMapItem, NextraThemeLayoutProps } from 'nextra';
import { MDXComponents } from 'nextra/mdx';
import { ReactNode } from 'react';
export { useTheme } from 'next-themes';

interface NextraBlogTheme {
    comments?: ReactNode;
    components?: MDXComponents;
    darkMode?: boolean;
    dateFormatter?: (date: Date) => string;
    footer?: ReactNode;
    head?: ({ meta, title }: {
        meta: Record<string, any>;
        title: string;
    }) => ReactNode;
    navs?: {
        name: string;
        url: string;
    }[];
    postFooter?: string;
    readMore?: string;
    titleSuffix?: string;
}
type BlogFrontMatter = {
    author?: string;
    back?: string;
    date?: string;
    description?: string;
    tag?: string | string[];
    title?: string;
    type?: 'post' | 'page' | 'posts' | 'tag';
};
interface LayoutProps {
    config: NextraBlogTheme;
    opts: PageOpts<BlogFrontMatter>;
}

declare const useBlogContext: () => LayoutProps;

declare const getStaticTags: (pageMap: PageMapItem[]) => string[];

declare function NextraLayout({ children, pageOpts, themeConfig }: NextraThemeLayoutProps<BlogFrontMatter, NextraBlogTheme>): react_jsx_runtime.JSX.Element;

export { type BlogFrontMatter, type LayoutProps, type NextraBlogTheme, NextraLayout as default, getStaticTags, useBlogContext };
