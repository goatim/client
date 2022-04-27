import { Model } from '@cezembre/fronts';

export interface CompositionSettingPosition {
  id?: string;
  x?: number;
  y?: number;
}

export default interface CompositionSetting extends Model {
  name?: string;
  description?: string;
  positions?: CompositionSettingPosition[];
}
