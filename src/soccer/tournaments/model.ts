import { Model } from '../../api';
import Match from '../matches/model';

export default interface Tournament extends Model<'tournament'> {
  title?: string;
  slug?: string;
  description?: string;
  matches?: Match[];
}
