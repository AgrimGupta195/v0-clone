import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Convert an object of filePath -> content into a nested tree array
// suitable for `TreeView`. Directories are represented as arrays
// [name, ...children], files are plain string names.
export function convertFilesToTreeItems(files = {}) {
  const root = {};

  Object.keys(files).forEach((path) => {
    const parts = path.split("/");
    let node = root;
    parts.forEach((part, idx) => {
      if (!node[part]) {
        node[part] = { __children: {} };
      }
      if (idx === parts.length - 1) {
        // mark as file
        node[part].__isFile = true;
      }
      node = node[part].__children;
    });
  });

  const build = (node) => {
    return Object.keys(node)
      .sort()
      .map((key) => {
        const entry = node[key];
        const children = entry.__children || {};
        const childKeys = Object.keys(children);
        if (childKeys.length === 0 && entry.__isFile) {
          return key;
        }
        // folder: include files and nested folders
        return [key, ...build(children)];
      });
  };

  return build(root);
}
