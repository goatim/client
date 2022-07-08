import Asset from '../assets/model';

export default interface ShareBulk {
  asset: Asset | string;
  nb_shares: number;
}
