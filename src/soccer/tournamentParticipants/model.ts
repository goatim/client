import { Model } from '../../api';
import { Tournament } from '../tournaments';
import { Wallet } from '../../market';

export interface TournamentParticipant extends Model<'tournament_participant'> {
  tournament?: Tournament | string;
  wallet?: Wallet | string;
  gains?: number;
  variation?: number;
  position?: number;
  last_position?: number;
  score?: number;
}
