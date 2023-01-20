import User from './model';

export function getUserPublicName(user: User): string | null {
  if (user.pseudo?.length) {
    return user.pseudo;
  }

  if (user.first_name?.length) {
    return user.first_name;
  }

  return null;
}
