/**
 * get-folder-images.ts  (server-only — uses Node.js `fs`)
 *
 * Scans a subfolder inside /public and returns the list of image paths
 * that actually exist, so clients never request files that 404.
 *
 * Usage (in a Server Component or generateStaticParams):
 *   const images = getFolderImages("assets/images/projects/bazaarku");
 *   // → ["/assets/images/projects/bazaarku/1.png", …]
 */

import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

/**
 * Returns sorted public-root-relative paths for every image file
 * found directly inside `publicSubfolder` (non-recursive).
 *
 * @param publicSubfolder  Path relative to /public, no leading slash.
 *                         e.g. "assets/images/projects/bazaarku"
 */
export function getFolderImages(publicSubfolder: string): string[] {
  try {
    const absDir = path.join(process.cwd(), "public", publicSubfolder);
    if (!fs.existsSync(absDir)) return [];

    return fs
      .readdirSync(absDir)
      .filter((name) => {
        const ext = path.extname(name).toLowerCase();
        return IMAGE_EXTENSIONS.has(ext);
      })
      .sort((a, b) => {
        // Natural sort: "1.png" < "2.png" < "10.png"
        const num = (s: string) => {
          const m = s.match(/^(\d+)/);
          return m ? parseInt(m[1], 10) : Infinity;
        };
        const d = num(a) - num(b);
        return d !== 0 ? d : a.localeCompare(b);
      })
      .map((name) => `/${publicSubfolder}/${name}`);
  } catch {
    return [];
  }
}

/**
 * Convenience: scans all per-item folders for an array of items that
 * carry an `imageFolder` property (e.g. projects, experience).
 *
 * Returns a Record keyed by `imageFolder`.
 */
export function getFolderImagesMap<T extends { imageFolder: string }>(
  items: T[]
): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const item of items) {
    // imageFolder is like "/assets/images/projects/bazaarku"
    // strip the leading slash to get the path relative to /public
    const subfolder = item.imageFolder.replace(/^\//, "");
    map[item.imageFolder] = getFolderImages(subfolder);
  }
  return map;
}
