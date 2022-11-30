import { Model } from '../../api';

export interface CompositionSettingPosition {
  id: string;
  name?: string;
  x?: number;
  y?: number;
}

export default interface CompositionSetting extends Model<'composition_setting'> {
  name?: string;
  description?: string;
  positions?: CompositionSettingPosition[];
  is_default?: boolean;
}
