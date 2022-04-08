import Address, { MinifiedAddress, formatFullAddress } from './models/address';
import Article from './models/article';
import Asset, { AssetType } from './models/asset';
import Billing, { MinifiedBilling } from './models/billing';
import Booster from './models/booster';
import BoosterInUse from './models/boosterInUse';
import BoosterInWallet from './models/boosterInWallet';
import Checkout from './models/checkout';
import City from './models/city';
import Club from './models/club';
import Country from './models/country';
import Currency from './models/currency';
import Item, { ItemType, OrderItem, BoosterItem, PackItem } from './models/item';
import League from './models/league';
import Order, { OrderType } from './models/order';
import Paragraph, { ParagraphType, ParagraphSize } from './models/paragraph';
import PaymentIntent, {
  PaymentIntentStatus,
  AlipayHandleRedirect,
  RedirectToUrl,
  NextAction,
  NextActionType,
  OxxoDisplayDetails,
} from './models/paymentIntent';
import PaymentMethod, { MinifiedPaymentMethod, Card, CardBrands } from './models/paymentMethod';
import Player, { PlayerPosition, PlayerSide } from './models/player';
import Portfolio from './models/portfolio';
import Quotation from './models/quotation';
import Rank from './models/rank';
import Ranking, { RankingPeriod } from './models/ranking';
import Score from './models/score';
import Session from './models/session';
import Tax from './models/tax';
import Transaction from './models/transaction';
import User from './models/user';
import Wallet, { WalletType } from './models/wallet';
import {
  formatPercentage,
  formatPercentageVariation,
  resolveCurrency,
  adaptCurrency,
  formatCurrency,
  fridayCoinsSmallestUnitFactor,
  resolveFridayCoins,
  adaptFridayCoins,
  formatFridayCoins,
  formatFridayCoinsVariation,
} from './utils/trading';
import { getUserPublicName } from './utils/auth';
import unSlugify from './utils/unSlugify';

/**
 * Models
 */

export type {
  Address,
  MinifiedAddress,
  Article,
  Asset,
  AssetType,
  Billing,
  MinifiedBilling,
  Booster,
  BoosterInUse,
  BoosterInWallet,
  Checkout,
  City,
  Club,
  Country,
  Currency,
  Item,
  ItemType,
  OrderItem,
  BoosterItem,
  PackItem,
  League,
  Order,
  OrderType,
  Paragraph,
  ParagraphType,
  ParagraphSize,
  PaymentIntent,
  PaymentIntentStatus,
  AlipayHandleRedirect,
  RedirectToUrl,
  NextAction,
  NextActionType,
  OxxoDisplayDetails,
  PaymentMethod,
  MinifiedPaymentMethod,
  Card,
  CardBrands,
  Player,
  PlayerPosition,
  PlayerSide,
  Portfolio,
  Quotation,
  Rank,
  Ranking,
  RankingPeriod,
  Score,
  Session,
  Tax,
  Transaction,
  User,
  Wallet,
  WalletType,
};

export { formatFullAddress };

/**
 * Utils
 */

export {
  formatPercentage,
  formatPercentageVariation,
  resolveCurrency,
  adaptCurrency,
  formatCurrency,
  fridayCoinsSmallestUnitFactor,
  resolveFridayCoins,
  adaptFridayCoins,
  formatFridayCoins,
  formatFridayCoinsVariation,
};

export { getUserPublicName };

export { unSlugify };
