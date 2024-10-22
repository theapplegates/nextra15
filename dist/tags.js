import {
  getStaticTags
} from "./chunk-MORU2T4I.js";
import "./chunk-ORMEWXMH.js";

// src/tags.tsx
import Head from "next/head";
import { useData } from "nextra/hooks";
import { jsx } from "react/jsx-runtime";
var NEXTRA_INTERNAL = Symbol.for("__nextra_internal__");
var TagTitle = ({ prefix = "Posts tagged with " }) => {
  const { tag } = useData();
  const title = `${prefix}${tag}`;
  return /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: title }) });
};
var TagName = () => {
  const { tag } = useData();
  return tag || null;
};
var getStaticPaths = () => {
  const tags = getStaticTags(globalThis[NEXTRA_INTERNAL].pageMap);
  return {
    paths: tags.map((v) => ({ params: { tag: v } })),
    fallback: false
  };
};
var getStaticProps = ({ params }) => {
  return {
    props: {
      ssg: {
        tag: params == null ? void 0 : params.tag
      }
    }
  };
};
export {
  TagName,
  TagTitle,
  getStaticPaths,
  getStaticProps
};
