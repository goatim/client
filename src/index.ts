import env, { Env, NativeEnv } from './env';
import {
  Model,
  PaginatedList,
  FormErrors,
  ApiErrorData,
  ApiError,
  isApiError,
  RequestBody,
  buildRequestBody,
  RequestParams,
  buildRequestConfig,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiConfig,
  ApiContext,
  useApi,
  ApiProvider,
} from './api';
import {
  Dimension,
  Format,
  Image,
  AspectRatio,
  Orientation,
  resolveRatio,
  calcHeight,
  calcWidth,
} from './medias/image';
import Permission, { PermissionLevel } from './auth/permissions/model';
import Session from './auth/sessions/model';
import { useSession, useActiveSession, SignInBody, useSignIn } from './auth/sessions/api';
import User from './auth/users/model';
import {
  useUser,
  useMe,
  UserList,
  useUsers,
  UserBody,
  useCreateUser,
  UpdateUserVariables,
  useUpdateUser,
  AddUserPictureBody,
  AddUserPictureVariables,
  useAddUserPicture,
} from './auth/users/api';
import Article from './blog/articles/model';
import Paragraph from './blog/paragraphs/model';
import Address, {
  MinifiedAddress,
  serializeGeoLocation,
  parseGeoLocation,
  GeoLocation,
  formatFullAddress,
} from './geo/addresses/model';
import City from './geo/cities/model';
import Country from './geo/countries/model';
import Currency from './geo/currencies/model';
import Billing from './market/billings/model';
import Checkout from './market/checkouts/model';
import {
  useCurrentCheckout,
  CheckoutList,
  useCheckouts,
  CheckoutItemBody,
  CheckoutBody,
  useCreateCheckout,
  useUpdateCheckout,
  useDeleteCheckout,
  useAddCheckoutItem,
  UseUpdateCheckoutItem,
  useRemoveCheckoutItem,
  ConfirmCheckoutBody,
  CheckoutConfirmation,
  useConfirmCheckout,
} from './market/checkouts/api';
import Item, { ItemType, OrderItem, BoosterItem, PackItem } from './market/items/model';
import Tax from './market/taxes/model';
import {
  useTax,
  TaxList,
  UseTaxesParams,
  useTaxes,
  useVats,
  TaxBody,
  useCreateTax,
  UpdateTaxVariables,
  useUpdateTax,
} from './market/taxes/api';
import Wallet, { WalletType } from './market/wallets/model';
import {
  UseWalletParams,
  useWallet,
  useDefaultWallet,
  useCurrentWallet,
  useWallets,
  WalletBody,
  useCreateWallet,
  UpdateWalletVariables,
  useUpdateWallet,
  AddWalletPictureBody,
  AddWalletPictureVariables,
  useAddWalletPicture,
} from './market/wallets/api';
import PaymentIntent, {
  RedirectToUrl,
  AlipayHandleRedirect,
  OxxoDisplayDetails,
  NextActionType,
  NextAction,
  PaymentIntentStatus,
} from './payment/intents/model';
import PaymentMethod, { CardBrands, Card, MinifiedPaymentMethod } from './payment/methods/model';
import {
  PaymentMethodList,
  usePaymentMethods,
  CreditCardBody,
  useAddCreditCard,
} from './payment/methods/api';
import Club from './soccer/clubs/model';
import {
  useClub,
  ClubList,
  UseClubsParams,
  useClubs,
  ClubBody,
  useCreateClub,
  UpdateClubVariables,
  useUpdateClub,
  AddClubPictureBody,
  AddClubPictureVariables,
  useAddClubIcon,
} from './soccer/clubs/api';
import Composition, { CompositionPosition } from './soccer/compositions/model';
import {
  UseCompositionParams,
  useComposition,
  CompositionList,
  useCompositions,
  CompositionPositionBody,
  CompositionBody,
  useCreateComposition,
  useUpdateComposition,
  useDeleteComposition,
} from './soccer/compositions/api';
import CompositionSetting, { CompositionSettingPosition } from './soccer/compositionSettings/model';
import {
  useCompositionSetting,
  CompositionSettingList,
  useCompositionSettings,
} from './soccer/compositionSettings/api';
import League from './soccer/leagues/model';
import {
  useLeague,
  LeagueList,
  UseLeaguesParams,
  useLeagues,
  LeagueBody,
  useCreateLeague,
  useUpdateLeague,
  AddLeaguePictureBody,
  AddLeaguePictureVariables,
  useAddLeagueIcon,
} from './soccer/leagues/api';
import Match, { MatchStatus } from './soccer/matches/model';
import {
  useMatch,
  MatchList,
  UseMatchesParams,
  useMatches,
  useSpotlightMatches,
  MatchBody,
  useCreateMatch,
  UpdateMatchVariables,
  useUpdateMatch,
  AddMatchPictureBody,
  AddMatchPictureVariables,
  useAddMatchIcon,
} from './soccer/matches/api';
import PhysicalEvent, { PhysicalEventType } from './soccer/physicalEvents/model';
import {
  usePhysicalEvent,
  PhysicalEventList,
  usePhysicalEvents,
  PhysicalEventBody,
  useCreatePhysicalEvent,
  UpdatePhysicalEventVariables,
  useUpdatePhysicalEvent,
  AddPhysicalEventPictureBody,
  AddPhysicalEventPictureVariables,
  useAddPhysicalEventIcon,
} from './soccer/physicalEvents/api';
import Player, { PlayerPosition, PlayerSide } from './soccer/players/model';
import {
  usePlayer,
  PlayerList,
  UsePlayersParams,
  usePlayers,
  GetPlayersParams,
  getPlayers,
  PlayerBody,
  useCreatePlayer,
  UpdatePlayerVariables,
  useUpdatePlayer,
  AddPlayerPictureBody,
  AddPlayerPictureVariables,
  useAddPlayerIllustration,
} from './soccer/players/api';
import Asset, { AssetType } from './trading/assets/model';
import {
  useAsset,
  AssetList,
  UseAssetsParams,
  useAssets,
  AssetBody,
  useCreateAsset,
  UpdateAssetVariables,
  useUpdateAsset,
  AddAssetPictureBody,
  AddAssetPictureVariables,
  useAddAssetIllustration,
} from './trading/assets/api';
import Booster from './trading/boosters/model';
import {
  useBooster,
  BoosterList,
  UseBoostersParams,
  useBoosters,
  useCurrentWalletBoosters,
  BoosterBody,
  useCreateBooster,
  UpdateBoosterVariables,
  useUpdateBooster,
  useDeleteBooster,
} from './trading/boosters/api';
import BoosterInUse from './trading/boostersInUse/model';
import BoosterInWallet from './trading/boostersInWallet/model';
import Dividend from './trading/dividends/model';
import Order, { OrderType } from './trading/orders/model';
import {
  useOrder,
  OrderList,
  UseOrdersParams,
  useOrders,
  useCurrentWalletOrders,
  OrderBody,
  useCreateOrder,
  UpdateOrderVariables,
  useUpdateOrder,
  useDeleteOrder,
} from './trading/orders/api';
import OrderBook from './trading/orders/book/model';
import { useOrderBook, UseOrderBookParams } from './trading/orders/book/api';
import Portfolio from './trading/portfolios/model';
import {
  usePortfolio,
  PortfolioList,
  UsePortfoliosParams,
  usePortfolios,
  useCurrentWalletPortfolios,
  PortfolioBody,
  useCreatePortfolio,
  UpdatePortfolioVariables,
  useUpdatePortfolio,
  useDeletePortfolio,
} from './trading/portfolios/api';
import Quotation from './trading/quotations/model';
import Ranking, { RankingPeriod } from './trading/rankings/model';
import {
  UseRankingParams,
  useRanking,
  RankingList,
  useRankings,
  RankingBody,
  useCreateRanking,
  UpdateRankingVariables,
  useUpdateRanking,
  useDeleteRanking,
} from './trading/rankings/api';
import Rank from './trading/ranks/model';
import {
  useRank,
  RankList,
  useRanks,
  RankBody,
  useCreateRank,
  UpdateRankVariables,
  useUpdateRank,
  useDeleteRank,
} from './trading/ranks/api';
import Score from './trading/scores/model';
import Transaction from './trading/transactions/model';
import {
  useTransaction,
  TransactionList,
  UseTransactionsParams,
  useTransactions,
} from './trading/transactions/api';
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
import FridayClient, { FridayClientContext, useFridayClient } from './client';
import Notification from './notifications/model';
import NotificationEvent, { EventOrderMatchPayload } from './notifications/events';

/**
 * State
 */

export { env };

export type { Env, NativeEnv };

export {
  buildRequestBody,
  buildRequestConfig,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  useApi,
  ApiProvider,
  isApiError,
  ApiError,
};

export type {
  Model,
  PaginatedList,
  FormErrors,
  ApiErrorData,
  RequestBody,
  RequestParams,
  ApiConfig,
  ApiContext,
};

/**
 * Medias
 */

export type { Dimension, Image, Format, AspectRatio, Orientation };

export { resolveRatio, calcHeight, calcWidth };

/**
 * Auth
 */

export type {
  Permission,
  Session,
  SignInBody,
  User,
  UserList,
  UserBody,
  UpdateUserVariables,
  AddUserPictureBody,
  AddUserPictureVariables,
};

export {
  PermissionLevel,
  useSession,
  useActiveSession,
  useSignIn,
  useUser,
  useMe,
  useUsers,
  useCreateUser,
  useUpdateUser,
  useAddUserPicture,
};

/**
 * Blog
 */

export type { Article, Paragraph };

/**
 * Geo
 */

export type { Address, MinifiedAddress, GeoLocation, City, Country, Currency };

export { serializeGeoLocation, parseGeoLocation, formatFullAddress };

/**
 * Market
 */

export type {
  Billing,
  Checkout,
  CheckoutList,
  CheckoutItemBody,
  CheckoutBody,
  UseUpdateCheckoutItem,
  ConfirmCheckoutBody,
  CheckoutConfirmation,
  Item,
  ItemType,
  OrderItem,
  BoosterItem,
  PackItem,
  Tax,
  TaxList,
  UseTaxesParams,
  TaxBody,
  UpdateTaxVariables,
  Wallet,
  WalletType,
  UseWalletParams,
  WalletBody,
  UpdateWalletVariables,
  AddWalletPictureBody,
  AddWalletPictureVariables,
};

export {
  useCurrentCheckout,
  useCheckouts,
  useCreateCheckout,
  useUpdateCheckout,
  useDeleteCheckout,
  useAddCheckoutItem,
  useRemoveCheckoutItem,
  useConfirmCheckout,
  useTax,
  useTaxes,
  useVats,
  useCreateTax,
  useUpdateTax,
  useWallet,
  useDefaultWallet,
  useCurrentWallet,
  useWallets,
  useCreateWallet,
  useUpdateWallet,
  useAddWalletPicture,
};

/**
 * Payment
 */

export type {
  PaymentIntent,
  RedirectToUrl,
  AlipayHandleRedirect,
  OxxoDisplayDetails,
  NextActionType,
  NextAction,
  PaymentIntentStatus,
  PaymentMethod,
  CardBrands,
  Card,
  MinifiedPaymentMethod,
  PaymentMethodList,
  CreditCardBody,
};

export { usePaymentMethods, useAddCreditCard };

/**
 * Soccer
 */

export type {
  Club,
  ClubList,
  UseClubsParams,
  ClubBody,
  UpdateClubVariables,
  AddClubPictureBody,
  AddClubPictureVariables,
  Composition,
  CompositionPosition,
  UseCompositionParams,
  CompositionList,
  CompositionPositionBody,
  CompositionBody,
  CompositionSetting,
  CompositionSettingPosition,
  CompositionSettingList,
  League,
  LeagueList,
  UseLeaguesParams,
  LeagueBody,
  AddLeaguePictureBody,
  AddLeaguePictureVariables,
  Match,
  MatchStatus,
  MatchList,
  UseMatchesParams,
  MatchBody,
  UpdateMatchVariables,
  AddMatchPictureBody,
  AddMatchPictureVariables,
  PhysicalEvent,
  PhysicalEventType,
  PhysicalEventList,
  PhysicalEventBody,
  UpdatePhysicalEventVariables,
  AddPhysicalEventPictureBody,
  AddPhysicalEventPictureVariables,
  Player,
  PlayerPosition,
  PlayerSide,
  PlayerList,
  UsePlayersParams,
  GetPlayersParams,
  PlayerBody,
  UpdatePlayerVariables,
  AddPlayerPictureBody,
  AddPlayerPictureVariables,
};

export {
  useClub,
  useClubs,
  useCreateClub,
  useUpdateClub,
  useAddClubIcon,
  useComposition,
  useCompositions,
  useCreateComposition,
  useUpdateComposition,
  useDeleteComposition,
  useCompositionSetting,
  useCompositionSettings,
  useLeague,
  useLeagues,
  useCreateLeague,
  useUpdateLeague,
  useAddLeagueIcon,
  useMatch,
  useMatches,
  useSpotlightMatches,
  useCreateMatch,
  useUpdateMatch,
  useAddMatchIcon,
  usePhysicalEvent,
  usePhysicalEvents,
  useCreatePhysicalEvent,
  useUpdatePhysicalEvent,
  useAddPhysicalEventIcon,
  usePlayer,
  usePlayers,
  getPlayers,
  useCreatePlayer,
  useUpdatePlayer,
  useAddPlayerIllustration,
};

/**
 * Trading
 */

export type {
  Asset,
  AssetType,
  AssetList,
  UseAssetsParams,
  AssetBody,
  UpdateAssetVariables,
  AddAssetPictureBody,
  AddAssetPictureVariables,
  Booster,
  BoosterList,
  UseBoostersParams,
  BoosterBody,
  UpdateBoosterVariables,
  BoosterInUse,
  BoosterInWallet,
  Dividend,
  Order,
  OrderType,
  OrderList,
  UseOrdersParams,
  OrderBody,
  UpdateOrderVariables,
  OrderBook,
  UseOrderBookParams,
  Portfolio,
  PortfolioList,
  UsePortfoliosParams,
  PortfolioBody,
  UpdatePortfolioVariables,
  Quotation,
  Ranking,
  RankingPeriod,
  UseRankingParams,
  RankingList,
  RankingBody,
  UpdateRankingVariables,
  Rank,
  RankList,
  RankBody,
  UpdateRankVariables,
  Score,
  Transaction,
  TransactionList,
  UseTransactionsParams,
};

export {
  useAsset,
  useAssets,
  useCreateAsset,
  useUpdateAsset,
  useAddAssetIllustration,
  useBooster,
  useBoosters,
  useCurrentWalletBoosters,
  useCreateBooster,
  useUpdateBooster,
  useDeleteBooster,
  useOrder,
  useOrders,
  useCurrentWalletOrders,
  useCreateOrder,
  useUpdateOrder,
  useDeleteOrder,
  useOrderBook,
  usePortfolio,
  usePortfolios,
  useCurrentWalletPortfolios,
  useCreatePortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
  useRanking,
  useRankings,
  useCreateRanking,
  useUpdateRanking,
  useDeleteRanking,
  useRank,
  useRanks,
  useCreateRank,
  useUpdateRank,
  useDeleteRank,
  useTransaction,
  useTransactions,
};

/**
 * Notifications
 */

export type { Notification, NotificationEvent, EventOrderMatchPayload };

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
  getUserPublicName,
  unSlugify,
};

/**
 * Client
 */

export type { FridayClientContext };

export { FridayClient, useFridayClient };
