export function unSlugify(slug?: string): string | undefined {
  if (!slug) {
    return undefined;
  }
  return slug
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}
