export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type RoleType = keyof typeof ROLES;
