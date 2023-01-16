import { Model } from '../../api';
import Tournament from '../tournaments/model';
import Wallet from '../../market/wallets/model';

export default interface TournamentParticipant extends Model<'tournament_participant'> {
  tournament?: Tournament | string;
  wallet?: Wallet | string;
  dividends_gains?: number;
  dividends_percentage?: number;
  position?: number;
  last_position?: number;
  score?: number;
}
