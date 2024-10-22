// src/blog-context.ts
import { createContext, useContext } from "react";
var BlogContext = createContext(null);
var BlogProvider = BlogContext.Provider;
var useBlogContext = () => {
  const value = useContext(BlogContext);
  if (!value) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return value;
};

export {
  BlogProvider,
  useBlogContext
};
