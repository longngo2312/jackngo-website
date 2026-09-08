/**
 * Resolves a path in /public against the deploy base.
 *
 * Vite rewrites asset URLs in index.html and anything reached through an
 * `import`, but a plain "/logos/react.svg" string in a component is left
 * untouched. On GitHub Pages the site is served from /jackngo-website/, so
 * those root-absolute paths would 404. Always route public assets through
 * this helper rather than hardcoding a leading slash.
 */
export function asset(path: string): string {
  // BASE_URL is normalized by Vite and always ends in a slash.
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
