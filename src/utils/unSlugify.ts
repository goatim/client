export function unSlugify(slug?: string): string | undefined {
  if (!slug) {
    return undefined;
  }
  return slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(' ');
}
