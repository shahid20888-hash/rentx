import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Map h1 to h2 to prevent duplicate h1 elements from MDX body content
    h1: (props) => <h2 {...props} />
  };
}
