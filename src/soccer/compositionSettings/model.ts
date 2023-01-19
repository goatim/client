import { Model } from '../../api';
import { PlayerPosition } from '../players/model';

export interface CompositionSettingPosition {
  id: string;
  name?: string;
  x?: number;
  y?: number;
  only?: PlayerPosition[];
}

export default interface CompositionSetting extends Model<'composition_setting'> {
  name?: string;
  description?: string;
  positions?: CompositionSettingPosition[];
  is_default?: boolean;
}
