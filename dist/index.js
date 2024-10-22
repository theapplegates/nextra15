import {
  BlogProvider,
  useBlogContext
} from "./chunk-KULIOWBV.js";
import {
  getStaticTags,
  getTags,
  split
} from "./chunk-MORU2T4I.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-ORMEWXMH.js";

// src/index.tsx
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { MDXProvider } from "nextra/mdx";
import { useRef } from "react";

// src/constants.tsx
import { jsxs } from "react/jsx-runtime";
var DEFAULT_THEME = {
  footer: /* @__PURE__ */ jsxs("small", { className: "_mt-32 _block", children: [
    "CC BY-NC 4.0 ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " \xA9 Shu Ding."
  ] }),
  readMore: "Read More \u2192"
};

// src/mdx-theme.tsx
import Link from "next/link";
import { Code, Pre, Table, Td, Th, Tr } from "nextra/components";
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState
} from "react";
import { createPortal } from "react-dom";
import { Fragment, jsx, jsxs as jsxs2 } from "react/jsx-runtime";
var HeadingContext = createContext(createRef());
var H1 = ({ children }) => {
  const ref = useContext(HeadingContext);
  const { opts } = useBlogContext();
  const [showHeading, setShowHeading] = useState(false);
  useEffect(() => {
    if (ref.current && opts.hasJsxInH1) {
      setShowHeading(true);
    }
  }, [opts.hasJsxInH1, ref]);
  return /* @__PURE__ */ jsx(Fragment, { children: showHeading && createPortal(children, ref.current) });
};
function HeadingLink(_a) {
  var _b = _a, {
    tag: Tag,
    children,
    id,
    className
  } = _b, props = __objRest(_b, [
    "tag",
    "children",
    "id",
    "className"
  ]);
  return /* @__PURE__ */ jsxs2(
    Tag,
    __spreadProps(__spreadValues({
      id,
      className: (
        // can be added by footnotes
        className === "sr-only" ? "_sr-only" : `subheading-${Tag}`
      )
    }, props), {
      children: [
        children,
        id && /* @__PURE__ */ jsx(
          "a",
          {
            href: `#${id}`,
            className: "_not-prose subheading-anchor",
            "aria-label": "Permalink for this section"
          }
        )
      ]
    })
  );
}
var EXTERNAL_HREF_REGEX = /https?:\/\//;
var A = (_a) => {
  var _b = _a, { children, href = "" } = _b, props = __objRest(_b, ["children", "href"]);
  if (EXTERNAL_HREF_REGEX.test(href)) {
    return /* @__PURE__ */ jsx("a", __spreadProps(__spreadValues({ href, target: "_blank", rel: "noreferrer" }, props), { children }));
  }
  const ComponentToUse = href.startsWith("#") ? "a" : Link;
  return /* @__PURE__ */ jsx(ComponentToUse, __spreadProps(__spreadValues({ href }, props), { children }));
};
var components = {
  h1: H1,
  h2: (props) => /* @__PURE__ */ jsx(HeadingLink, __spreadValues({ tag: "h2" }, props)),
  h3: (props) => /* @__PURE__ */ jsx(HeadingLink, __spreadValues({ tag: "h3" }, props)),
  h4: (props) => /* @__PURE__ */ jsx(HeadingLink, __spreadValues({ tag: "h4" }, props)),
  h5: (props) => /* @__PURE__ */ jsx(HeadingLink, __spreadValues({ tag: "h5" }, props)),
  h6: (props) => /* @__PURE__ */ jsx(HeadingLink, __spreadValues({ tag: "h6" }, props)),
  a: A,
  pre: (_a) => {
    var _b = _a, { children } = _b, props = __objRest(_b, ["children"]);
    return /* @__PURE__ */ jsx(Pre, __spreadProps(__spreadValues({ className: "_not-prose" }, props), { children }));
  },
  tr: Tr,
  th: Th,
  td: Td,
  table: (props) => /* @__PURE__ */ jsx(Table, __spreadValues({ className: "_not-prose" }, props)),
  code: Code
};

// src/meta.tsx
import Link2 from "next/link";

// src/theme-switch.tsx
import { useTheme } from "next-themes";
import { useMounted } from "nextra/hooks";
import { MoonIcon, SunIcon } from "nextra/icons";
import { jsx as jsx2 } from "react/jsx-runtime";
function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return /* @__PURE__ */ jsx2(
    "span",
    {
      role: "button",
      "aria-label": "Toggle Dark Mode",
      className: "_cursor-pointer _p-2 _text-current",
      tabIndex: 0,
      onClick: toggleTheme,
      onKeyDown: (e) => {
        if (e.key === "Enter") toggleTheme();
      },
      children: mounted && isDark ? /* @__PURE__ */ jsx2(MoonIcon, {}) : /* @__PURE__ */ jsx2(SunIcon, {})
    }
  );
}

// src/utils/parent.ts
import { useRouter } from "next/router";

// src/utils/traverse.ts
function traverse(pageMap, matcher) {
  for (const pageMapItem of pageMap) {
    if (matcher(pageMapItem)) {
      return pageMapItem;
    }
  }
  for (const item of pageMap) {
    if ("children" in item) {
      const matched = traverse(item.children, matcher);
      if (matched) {
        return matched;
      }
    }
  }
  return null;
}

// src/utils/parent.ts
function getParent({ opts }) {
  let back = null;
  const parentPages = [];
  const { route } = useRouter();
  traverse(opts.pageMap, (page) => {
    if ("route" in page && route !== page.route && (route + "/").startsWith(page.route === "/" ? "/" : page.route + "/")) {
      parentPages.push(page);
    }
  });
  const parentPage = parentPages.reverse().find(
    (page) => "frontMatter" in page && page.frontMatter && page.frontMatter.type === "posts"
  );
  if (parentPage) {
    back = parentPage.route;
  }
  return { parentPage, back };
}

// src/meta.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Meta() {
  var _a, _b;
  const { opts, config } = useBlogContext();
  const { author, date, tag } = opts.frontMatter;
  const { back } = getParent({ opts, config });
  const tags = tag ? split(tag) : [];
  const tagsEl = tags.map((t) => /* @__PURE__ */ jsx3(
    Link2,
    {
      href: `/tags/${t}`,
      className: "\n          _select-none\n          _rounded-md\n          _bg-gray-200\n          _px-1\n          _text-sm\n          _text-gray-400\n          _transition-colors\n          hover:_bg-gray-300\n          hover:_text-gray-500\n          dark:_bg-gray-600\n          dark:_text-gray-300\n          dark:hover:_bg-gray-700\n          dark:hover:_text-gray-200\n        ",
      children: t
    },
    t
  ));
  const readingTime = (_a = opts.readingTime) == null ? void 0 : _a.text;
  const dateObj = date ? new Date(date) : null;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: "_mb-8 _flex _gap-3 " + (readingTime ? "_items-start" : "_items-center"),
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "_not-prose _grow dark:_text-gray-400 _text-gray-600", children: [
          /* @__PURE__ */ jsxs3("div", { className: "_flex _flex-wrap _items-center _gap-1", children: [
            author,
            author && date && ",",
            dateObj && /* @__PURE__ */ jsx3("time", { dateTime: dateObj.toISOString(), children: ((_b = config.dateFormatter) == null ? void 0 : _b.call(config, dateObj)) || dateObj.toDateString() }),
            (author || date) && (readingTime || tags.length > 0) && /* @__PURE__ */ jsx3("span", { className: "_px-1", children: "\u2022" }),
            readingTime || tagsEl
          ] }),
          readingTime && /* @__PURE__ */ jsx3("div", { className: "_mt-1 _flex _flex-wrap _items-center _gap-1", children: tagsEl })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "_flex _items-center _gap-3 print:_hidden", children: [
          back && /* @__PURE__ */ jsx3(Link2, { href: back, children: "Back" }),
          config.darkMode && /* @__PURE__ */ jsx3(ThemeSwitch, {})
        ] })
      ]
    }
  );
}

// src/nav.tsx
import Link3 from "next/link";

// src/utils/collect.ts
import { useRouter as useRouter2 } from "next/router";

// src/utils/date.ts
var sortDate = (a, b) => {
  var _a, _b;
  if (!((_a = a.frontMatter) == null ? void 0 : _a.date) || !((_b = b.frontMatter) == null ? void 0 : _b.date)) return -1;
  return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
};
var DATE_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?(:\d{2}\.\d{3}Z)?$/;
var DATE_REGEX_WITH_SLASH = /^\d{4}\/\d{1,2}\/\d{1,2}( \d{1,2}:\d{1,2})?$/;
var isValidDate = (date) => DATE_REGEX.test(date) || DATE_REGEX_WITH_SLASH.test(date);

// src/utils/collect.ts
var isNav = (page) => {
  var _a;
  const type = "frontMatter" in page && ((_a = page.frontMatter) == null ? void 0 : _a.type);
  return type && ["page", "posts"].includes(type);
};
var isPost = (page) => {
  if ("children" in page || "data" in page || page.name.startsWith("_"))
    return false;
  const { draft, type } = page.frontMatter || {};
  return !draft && (!type || type === "post");
};
function collectPostsAndNavs({ opts }) {
  const posts = [];
  const navPages = [];
  const { route } = useRouter2();
  traverse(opts.pageMap, (page) => {
    if (isNav(page)) {
      navPages.push(__spreadProps(__spreadValues({}, page), { active: page.route === route }));
    }
    if (isPost(page)) {
      posts.push(page);
    }
  });
  posts.sort(sortDate);
  navPages.sort(sortDate);
  return { posts, navPages };
}

// src/nav.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function Nav() {
  var _a;
  const { opts, config } = useBlogContext();
  const { navPages } = collectPostsAndNavs({ opts, config });
  return /* @__PURE__ */ jsxs4("div", { className: "_mb-8 _flex _items-center _gap-3", children: [
    /* @__PURE__ */ jsxs4("div", { className: "_flex _grow _flex-wrap _items-center _justify-end _gap-3", children: [
      navPages.map((page) => {
        var _a2;
        const name = ((_a2 = page.frontMatter) == null ? void 0 : _a2.title) || page.name;
        if (page.active) {
          return /* @__PURE__ */ jsx4(
            "span",
            {
              className: "_cursor-default dark:_text-gray-400 _text-gray-600",
              children: name
            },
            page.route
          );
        }
        return /* @__PURE__ */ jsx4(Link3, { href: page.route, children: name }, page.route);
      }),
      (_a = config.navs) == null ? void 0 : _a.map((nav) => /* @__PURE__ */ jsx4(Link3, { href: nav.url, children: nav.name }, nav.url))
    ] }),
    config.darkMode && /* @__PURE__ */ jsx4(ThemeSwitch, {})
  ] });
}

// src/posts-layout.tsx
import Link4 from "next/link";
import { useRouter as useRouter3 } from "next/router";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function PostsLayout() {
  const { config, opts } = useBlogContext();
  const { posts } = collectPostsAndNavs({ config, opts });
  const router = useRouter3();
  const { type } = opts.frontMatter;
  const tagName = type === "tag" ? router.query.tag : null;
  const postList = posts.map((post) => {
    var _a, _b, _c;
    if (tagName) {
      const tags = getTags(post);
      if (!Array.isArray(tagName) && !tags.includes(tagName)) {
        return null;
      }
    } else if (type === "tag") {
      return null;
    }
    const postTitle = ((_a = post.frontMatter) == null ? void 0 : _a.title) || post.name;
    const date = ((_b = post.frontMatter) == null ? void 0 : _b.date) ? new Date(post.frontMatter.date) : null;
    const description = (_c = post.frontMatter) == null ? void 0 : _c.description;
    return /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx5("h2", { className: "_not-prose _mt-6 _mb-2 _text-xl _font-semibold", children: /* @__PURE__ */ jsx5(Link4, { href: post.route, children: postTitle }) }),
      description && /* @__PURE__ */ jsxs5("p", { className: "_mb-2 dark:_text-gray-400 _text-gray-600", children: [
        description,
        config.readMore && /* @__PURE__ */ jsx5(Link4, { href: post.route, className: "_ml-2", children: config.readMore })
      ] }),
      date && /* @__PURE__ */ jsx5(
        "time",
        {
          className: "_text-sm dark:_text-gray-400 _text-gray-600",
          dateTime: date.toISOString(),
          children: date.toDateString()
        }
      )
    ] }, post.route);
  });
  return /* @__PURE__ */ jsx5(Fragment2, { children: postList });
}

// src/index.tsx
import { useTheme as useTheme2 } from "next-themes";
import { Fragment as Fragment3, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var layoutSet = /* @__PURE__ */ new Set(["post", "page", "posts", "tag"]);
function NextraLayout({
  children,
  pageOpts,
  themeConfig
}) {
  var _a;
  const config = __spreadValues(__spreadValues({}, DEFAULT_THEME), themeConfig);
  const ref = useRef(null);
  const { title: pageTitle, frontMatter } = pageOpts;
  frontMatter.type || (frontMatter.type = "post");
  const { type, date } = frontMatter;
  if (!layoutSet.has(type)) {
    throw new Error(
      `nextra-theme-blog does not support the layout type "${type}" It only supports "post", "page", "posts" and "tag"`
    );
  }
  if (date && !isValidDate(date)) {
    throw new Error(
      `Invalid date "${date}". Provide date in "YYYY/M/D", "YYYY/M/D H:m", "YYYY-MM-DD", "[YYYY-MM-DD]T[HH:mm]" or "[YYYY-MM-DD]T[HH:mm:ss.SSS]Z" format.`
    );
  }
  const title = `${pageTitle}${config.titleSuffix || ""}`;
  const Footer = {
    post: () => /* @__PURE__ */ jsxs6(Fragment3, { children: [
      config.postFooter,
      config.comments
    ] }),
    posts: PostsLayout,
    tag: PostsLayout,
    page: null
  }[type];
  return /* @__PURE__ */ jsxs6(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: [
    /* @__PURE__ */ jsxs6(Head, { children: [
      /* @__PURE__ */ jsx6("title", { children: title }),
      (_a = config.head) == null ? void 0 : _a.call(config, { title, meta: frontMatter }),
      /* @__PURE__ */ jsx6("style", { children: ":root{--nextra-bg:250,250,250;}.dark{--nextra-bg:17,17,17;}" })
    ] }),
    /* @__PURE__ */ jsx6(BlogProvider, { value: { config, opts: pageOpts }, children: /* @__PURE__ */ jsxs6(
      "article",
      {
        className: "_container _prose max-md:_prose-sm dark:_prose-invert",
        dir: "ltr",
        children: [
          /* @__PURE__ */ jsxs6(HeadingContext.Provider, { value: ref, children: [
            pageOpts.hasJsxInH1 ? /* @__PURE__ */ jsx6("h1", { ref }) : null,
            pageOpts.hasJsxInH1 ? null : /* @__PURE__ */ jsx6("h1", { children: pageTitle }),
            type === "post" ? /* @__PURE__ */ jsx6(Meta, {}) : /* @__PURE__ */ jsx6(Nav, {}),
            /* @__PURE__ */ jsx6(MDXProvider, { components: __spreadValues(__spreadValues({}, components), config.components), children }),
            Footer && /* @__PURE__ */ jsx6(Footer, {})
          ] }),
          config.footer
        ]
      }
    ) })
  ] });
}
export {
  NextraLayout as default,
  getStaticTags,
  useBlogContext,
  useTheme2 as useTheme
};
