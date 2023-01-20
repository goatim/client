export type PlayerNameFormat = 'initials' | 'reduced' | 'full';

export function formatPlayerName(
  firstName?: string,
  lastName?: string,
  format: PlayerNameFormat = 'reduced',
): string | undefined {
  if (!firstName && !lastName) {
    return undefined;
  }

  let result = '';

  if (firstName) {
    if (format === 'full') {
      result += firstName;
    } else {
      result += firstName.match(/^([A-zÀ-ú])|\s([A-zÀ-ú])/gu)?.join('. ') || '';
      if (result) {
        result += '.';
      }
    }
  }

  if (lastName) {
    if (result) {
      result += ' ';
    }
    if (format === 'initials') {
      result += lastName.match(/^([A-zÀ-ú])|\s([A-zÀ-ú])/gu)?.join('. ') || '';
    } else {
      result += lastName;
    }
  }
  return result;
}
