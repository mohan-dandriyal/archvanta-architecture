// Map template page URLs to sections available on this single-page site.
export function sectionHref(href: string): string {
  if (!href) return "#projects";
  if (href.startsWith("/services")) return "#services";
  if (href.startsWith("/projects")) return "#projects";
  if (href === "/about") return "#about";
  if (["/contact", "/career", "/certifications"].includes(href)) {
    return "#contact";
  }
  return href;
}
