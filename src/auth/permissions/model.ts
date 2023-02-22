import { Model } from '../../api';

export enum PermissionLevel {
  /**
   * God - Created the system.
   */
  GOD = 0,

  /**
   * Owner - Own the land, only god can judge him
   */
  OWNER = 1,

  /**
   * Admin - Rule the institution.
   */
  ADMIN = 2,

  /**
   * Manager - Is in charge of his section.
   */
  MANAGER = 3,

  /**
   * Moderator - Approves or reject the content.
   */
  MODERATOR = 4,

  /**
   * Tester - has few abilities help improve the system.
   */
  TESTER = 5,

  /**
   * Human - Just a human.
   */
  HUMAN = 6,
}

export interface Permission extends Model<'permission'> {
  expiration?: string;
  is_revoked?: boolean;
  user?: string;
  wallet?: string;
  level?: PermissionLevel;
  target?: string;
  tags?: string[];
  initiator?: string;
}
