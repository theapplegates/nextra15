import {
  useBlogContext
} from "./chunk-KULIOWBV.js";
import "./chunk-ORMEWXMH.js";

// src/cusdis.tsx
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { jsx } from "react/jsx-runtime";
var Cusdis = dynamic(
  () => import("react-cusdis").then((mod) => mod.ReactCusdis),
  { ssr: false }
);
function Comments({
  appId,
  host = "https://cusdis.com",
  lang
}) {
  const { opts } = useBlogContext();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  useEffect(() => {
    var _a;
    (_a = window.CUSDIS) == null ? void 0 : _a.setTheme(theme);
  }, [theme]);
  if (!appId) {
    console.warn("[nextra/cusdis] `appId` is required");
    return null;
  }
  return /* @__PURE__ */ jsx(
    Cusdis,
    {
      lang,
      style: { marginTop: "4rem" },
      attrs: {
        host,
        appId,
        pageId: router.pathname,
        pageTitle: opts.title,
        theme
      }
    }
  );
}
var cusdis_default = Comments;
export {
  cusdis_default as default
};
