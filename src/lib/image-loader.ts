/**
 * Image loader helpers for Next.js.
 *
 * Since images live in /public/assets/, we just return path strings.
 * Use next/image with these paths for automatic optimisation.
 */

/**
 * Returns a list of known image filenames for a project/experience folder.
 * In a real app you'd enumerate from the filesystem at build-time via
 * a Node.js script, or use a CMS. For now this returns a typed placeholder
 * so callers can fall back gracefully when no images are present.
 */
export function getImagesFromFolder(folderPath: string): string[] {
  // folderPath: e.g. "/assets/images/projects/bazaarku"
  // Images should be named: 1.jpg, 2.jpg, … or preview.jpg, etc.
  // Populate this at build time with `scripts/enumerate-assets.ts` or a CMS.
  void folderPath;
  return [];
}

/**
 * Returns the primary preview image path for a given folder,
 * defaulting to `{folder}/preview.jpg`.
 */
export function getPreviewImage(folderPath: string, filename = "preview.jpg"): string {
  return `${folderPath}/${filename}`;
}
