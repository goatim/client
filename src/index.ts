import env, { Env, NativeEnv } from './env';
import {
  Model,
  PaginatedList,
  ApiErrorData,
  ApiError,
  isApiError,
  RequestBody,
  buildRequestBody,
  RequestQuery,
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
import {
  useSession,
  useActiveSession,
  SignInBody,
  useSignIn,
  useSignOut,
} from './auth/sessions/api';
import User from './auth/users/model';
import UserEvent from './auth/userEvents/model';
import {
  useUserEvent,
  UserEventsQuery,
  UserEventList,
  useUserEvents,
  useDoesUserEventExists,
  UserEventBody,
  usePostUserEvent,
} from './auth/userEvents/api';
import {
  useUser,
  useMe,
  UserList,
  useUsers,
  UserBody,
  usePostUser,
  PutUserVariables,
  usePutUser,
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
import Billing from './market/billings/model';
import Capture, { CaptureStatus } from './market/captures/model';
import Checkout from './market/checkouts/model';
import {
  useCurrentCheckout,
  CheckoutList,
  useCheckouts,
  CheckoutItemBody,
  CheckoutBody,
  usePostCheckout,
  usePutCheckout,
  useDeleteCheckout,
  useAddCheckoutItem,
  PutCheckoutItemVariables,
  useRemoveCheckoutItem,
  ConfirmCheckoutBody,
  CheckoutConfirmation,
  useConfirmCheckout,
} from './market/checkouts/api';
import Currency from './market/currencies/model';
import {
  useCurrency,
  CurrencyList,
  GetCurrenciesQuery,
  useCurrencies,
} from './market/currencies/api';
import { resolveCurrency, adaptCurrency, formatCurrency } from './market/currencies/adapters';
import {
  fridayCoinsSmallestUnit,
  resolveFridayCoins,
  adaptFridayCoins,
  formatFridayCoins,
  formatFridayCoinsVariation,
} from './market/currencies/fridayCoins';
import CurrenciesRate from './market/currenciesRates/model';
import {
  useCurrenciesRate,
  CurrenciesRateList,
  GetCurrenciesRatesQuery,
  useCurrenciesRates,
  useFridayCoinOverEtherConvertor,
} from './market/currenciesRates/api';
import Item, { ItemType, OrderItem, BoosterItem, PackItem } from './market/items/model';
import Tax from './market/taxes/model';
import {
  useTax,
  TaxList,
  GetTaxesQuery,
  useTaxes,
  useVats,
  TaxBody,
  usePostTax,
  PutTaxVariables,
  usePutTax,
} from './market/taxes/api';
import Wallet, { WalletType } from './market/wallets/model';
import {
  GetWalletQuery,
  useWallet,
  useDefaultWallet,
  useCurrentWallet,
  useWallets,
  WalletBody,
  usePostWallet,
  PutWalletVariables,
  usePutWallet,
  AddWalletPictureBody,
  AddWalletPictureVariables,
  useAddWalletPicture,
} from './market/wallets/api';
import Withdrawal, { WithdrawalStatus, WithdrawalCurrencyIso } from './market/withdrawals/model';
import {
  useWithdrawal,
  WithdrawalList,
  GetWithdrawalsQuery,
  useWithdrawals,
  useCurrentWalletWithdrawals,
  WithdrawalBody,
  usePostWithdrawal,
  PutWithdrawalVariables,
  usePutWithdrawal,
} from './market/withdrawals/api';
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
  GetClubsQuery,
  useClubs,
  ClubBody,
  usePostClub,
  PutClubVariables,
  usePutClub,
  AddClubPictureBody,
  AddClubPictureVariables,
  useAddClubIcon,
} from './soccer/clubs/api';
import Composition, { CompositionPosition } from './soccer/compositions/model';
import {
  GetCompositionQuery,
  useComposition,
  CompositionList,
  useCompositions,
  CompositionPositionBody,
  CompositionBody,
  usePostComposition,
  usePutComposition,
  useDeleteComposition,
} from './soccer/compositions/api';
import CompositionSetting, { CompositionSettingPosition } from './soccer/compositionSettings/model';
import {
  useCompositionSetting,
  CompositionSettingList,
  useCompositionSettings,
  CompositionSettingBody,
  usePostCompositionSetting,
  PutCompositionSettingVariables,
  usePutCompositionSetting,
} from './soccer/compositionSettings/api';
import League from './soccer/leagues/model';
import {
  useLeague,
  LeagueList,
  GetLeaguesQuery,
  useLeagues,
  LeagueBody,
  usePostLeague,
  usePutLeague,
  AddLeaguePictureBody,
  AddLeaguePictureVariables,
  useAddLeagueIcon,
} from './soccer/leagues/api';
import Match, { MatchStatus } from './soccer/matches/model';
import {
  useMatch,
  useMatchLiveStatus,
  MatchList,
  GetMatchesQuery,
  useMatches,
  useSpotlightMatches,
  MatchBody,
  usePostMatch,
  PutMatchVariables,
  usePutMatch,
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
  usePostPhysicalEvent,
  PutPhysicalEventVariables,
  usePutPhysicalEvent,
  AddPhysicalEventPictureBody,
  AddPhysicalEventPictureVariables,
  useAddPhysicalEventPicture,
} from './soccer/physicalEvents/api';
import Player, { PlayerPosition, PlayerSide } from './soccer/players/model';
import {
  usePlayer,
  PlayerList,
  GetPlayersQuery,
  usePlayers,
  getPlayers,
  PlayerBody,
  usePostPlayer,
  PutPlayerVariables,
  usePutPlayer,
  AddPlayerPictureBody,
  AddPlayerPictureVariables,
  useAddPlayerIllustration,
  PostPlayerBulkBody,
  PostPlayerBulkResponse,
  usePostPlayerBulk,
} from './soccer/players/api';
import Spotlight, { SpotlightType } from './soccer/spotlights/model';
import {
  useSpotlight,
  SpotlightList,
  GetSpotlightsQuery,
  useSpotlights,
  SpotlightBody,
  usePostSpotlight,
  PutSpotlightVariables,
  usePutSpotlight,
  AddSpotlightIllustrationBody,
  AddSpotlightIllustrationVariables,
  useAddSpotlightIllustration,
} from './soccer/spotlights/api';
import Asset, { AssetType } from './trading/assets/model';
import {
  useAsset,
  AssetList,
  GetAssetsQuery,
  useAssets,
  AssetBody,
  usePostAsset,
  PutAssetVariables,
  usePutAsset,
  AddAssetPictureBody,
  AddAssetPictureVariables,
  useAddAssetIllustration,
  useAssetQuotation,
  useAssetQuotationHistory,
} from './trading/assets/api';
import Booster from './trading/boosters/model';
import {
  useBooster,
  BoosterList,
  GetBoostersQuery,
  useBoosters,
  useCurrentWalletBoosters,
  BoosterBody,
  usePostBooster,
  PutBoosterVariables,
  usePutBooster,
  useDeleteBooster,
} from './trading/boosters/api';
import BoosterInUse from './trading/boostersInUse/model';
import BoosterInWallet from './trading/boostersInWallet/model';
import Dividend from './trading/dividends/model';
import {
  useDividend,
  DividendList,
  useDividends,
  DividendBody,
  usePostDividend,
  useDistributeDividend,
  usePutDividend,
  PostDividendBulkBody,
  PostDividendBulkResponse,
  usePostDividendBulk,
} from './trading/dividends/api';
import Ipo, { IpoType } from './trading/ipos/model';
import {
  useIpo,
  IpoList,
  GetIposQuery,
  useIpos,
  IpoBody,
  usePostIpo,
  PutIpoVariables,
  usePutIpo,
} from './trading/ipos/api';
import Order, { OrderType } from './trading/orders/model';
import {
  useOrder,
  OrderList,
  GetOrdersQuery,
  useOrders,
  useCurrentWalletOrders,
  OrderBody,
  usePostOrder,
  PutOrderVariables,
  usePutOrder,
  useDeleteOrder,
} from './trading/orders/api';
import { OrderEvent, OrderMatchEventPayload } from './trading/orders/events';
import OrderBook from './trading/orders/book/model';
import { useOrderBook, GetOrderBookQuery } from './trading/orders/book/api';
import Portfolio from './trading/portfolios/model';
import {
  usePortfolio,
  PortfolioList,
  GetPortfoliosQuery,
  usePortfolios,
  useCurrentWalletPortfolios,
} from './trading/portfolios/api';
import Quotation, { QuotationDataPoint, QuotationHistory } from './trading/quotations/model';
import Ranking, { RankingPeriod } from './trading/rankings/model';
import {
  GetRankingQuery,
  useRanking,
  RankingList,
  useRankings,
  RankingBody,
  usePostRanking,
  PutRankingVariables,
  usePutRanking,
  useDeleteRanking,
} from './trading/rankings/api';
import Rank from './trading/ranks/model';
import {
  useRank,
  RankList,
  useRanks,
  RankBody,
  usePostRank,
  PutRankVariables,
  usePutRank,
  useDeleteRank,
} from './trading/ranks/api';
import Score from './trading/scores/model';
import Stock from './trading/stocks/model';
import {
  useStock,
  StockList,
  GetStocksQuery,
  useStocks,
  PostStockBody,
  usePostStock,
  PutStockBody,
  PutStockVariables,
  usePutStock,
} from './trading/stocks/api';
import ShareBulk from './trading/shareBulks/model';
import MinifiedShareBulk from './trading/shareBulks/minified';
import PackFactory from './trading/packFactories/model';
import {
  usePackFactory,
  PackFactoryList,
  GetPackFactoriesQuery,
  usePackFactories,
  PackFactoryBody,
  usePostPackFactory,
  PutPackFactoryVariables,
  usePutPackFactory,
  AddPackFactoryPictureBody,
  AddPackFactoryPictureVariables,
  useAddPackFactoryIcon,
} from './trading/packFactories/api';
import Pack from './trading/packs/model';
import {
  usePack,
  PackList,
  GetPacksQuery,
  usePacks,
  PostPackBody,
  usePostPack,
  PutPackBody,
  PutPackVariables,
  usePutPack,
} from './trading/packs/api';
import Transaction from './trading/transactions/model';
import {
  useTransaction,
  TransactionList,
  GetTransactionsQuery,
  useTransactions,
} from './trading/transactions/api';
import { formatPercentage, formatPercentageVariation } from './utils/adapters';
import { getUserPublicName } from './utils/auth';
import unSlugify from './utils/unSlugify';
import FridayClient, { FridayClientContext, useFridayClient } from './client';
import Notification from './notifications/model';
import { OnboardingUserEvents } from './onboarding/userEvents';

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
  ApiErrorData,
  RequestBody,
  RequestQuery,
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
  PutUserVariables,
  AddUserPictureBody,
  AddUserPictureVariables,
  UserEvent,
  UserEventsQuery,
  UserEventList,
  UserEventBody,
};

export {
  PermissionLevel,
  useSession,
  useActiveSession,
  useSignIn,
  useSignOut,
  useUser,
  useMe,
  useUsers,
  usePostUser,
  usePutUser,
  useAddUserPicture,
  useUserEvent,
  useUserEvents,
  useDoesUserEventExists,
  usePostUserEvent,
};

/**
 * Blog
 */

export type { Article, Paragraph };

/**
 * Geo
 */

export type { Address, MinifiedAddress, GeoLocation, City, Country };

export { serializeGeoLocation, parseGeoLocation, formatFullAddress };

/**
 * Market
 */

export type {
  AddWalletPictureBody,
  AddWalletPictureVariables,
  Billing,
  BoosterItem,
  Capture,
  CaptureStatus,
  Checkout,
  CheckoutBody,
  CheckoutConfirmation,
  CheckoutItemBody,
  CheckoutList,
  ConfirmCheckoutBody,
  CurrenciesRate,
  CurrenciesRateList,
  Currency,
  CurrencyList,
  GetCurrenciesQuery,
  GetCurrenciesRatesQuery,
  GetTaxesQuery,
  GetWalletQuery,
  GetWithdrawalsQuery,
  Item,
  ItemType,
  OrderItem,
  PackItem,
  PutCheckoutItemVariables,
  Tax,
  TaxBody,
  TaxList,
  PutTaxVariables,
  PutWalletVariables,
  PutWithdrawalVariables,
  Wallet,
  WalletBody,
  WalletType,
  Withdrawal,
  WithdrawalBody,
  WithdrawalCurrencyIso,
  WithdrawalList,
  WithdrawalStatus,
};

export {
  adaptCurrency,
  adaptFridayCoins,
  formatCurrency,
  formatFridayCoins,
  formatFridayCoinsVariation,
  fridayCoinsSmallestUnit,
  resolveCurrency,
  resolveFridayCoins,
  useAddCheckoutItem,
  useAddWalletPicture,
  useCheckouts,
  useConfirmCheckout,
  usePostCheckout,
  usePostTax,
  usePostWallet,
  usePostWithdrawal,
  useCurrencies,
  useCurrenciesRate,
  useCurrenciesRates,
  useFridayCoinOverEtherConvertor,
  useCurrency,
  useCurrentCheckout,
  useCurrentWallet,
  useCurrentWalletWithdrawals,
  useDefaultWallet,
  useDeleteCheckout,
  useRemoveCheckoutItem,
  useTax,
  useTaxes,
  usePutCheckout,
  usePutTax,
  usePutWallet,
  usePutWithdrawal,
  useVats,
  useWallet,
  useWallets,
  useWithdrawal,
  useWithdrawals,
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
  GetClubsQuery,
  ClubBody,
  PutClubVariables,
  AddClubPictureBody,
  AddClubPictureVariables,
  Composition,
  CompositionPosition,
  GetCompositionQuery,
  CompositionList,
  CompositionPositionBody,
  CompositionBody,
  CompositionSetting,
  CompositionSettingPosition,
  CompositionSettingList,
  CompositionSettingBody,
  PutCompositionSettingVariables,
  League,
  LeagueList,
  GetLeaguesQuery,
  LeagueBody,
  AddLeaguePictureBody,
  AddLeaguePictureVariables,
  Match,
  MatchStatus,
  MatchList,
  GetMatchesQuery,
  MatchBody,
  PutMatchVariables,
  AddMatchPictureBody,
  AddMatchPictureVariables,
  PhysicalEvent,
  PhysicalEventType,
  PhysicalEventList,
  PhysicalEventBody,
  PutPhysicalEventVariables,
  AddPhysicalEventPictureBody,
  AddPhysicalEventPictureVariables,
  Player,
  PlayerPosition,
  PlayerSide,
  PlayerList,
  GetPlayersQuery,
  PlayerBody,
  PutPlayerVariables,
  AddPlayerPictureBody,
  AddPlayerPictureVariables,
  PostPlayerBulkBody,
  PostPlayerBulkResponse,
  Spotlight,
  SpotlightType,
  SpotlightList,
  GetSpotlightsQuery,
  SpotlightBody,
  PutSpotlightVariables,
  AddSpotlightIllustrationBody,
  AddSpotlightIllustrationVariables,
};

export {
  useClub,
  useClubs,
  usePostClub,
  usePutClub,
  useAddClubIcon,
  useComposition,
  useCompositions,
  usePostComposition,
  usePutComposition,
  useDeleteComposition,
  useCompositionSetting,
  useCompositionSettings,
  usePostCompositionSetting,
  usePutCompositionSetting,
  useLeague,
  useLeagues,
  usePostLeague,
  usePutLeague,
  useAddLeagueIcon,
  useMatch,
  useMatchLiveStatus,
  useMatches,
  useSpotlightMatches,
  usePostMatch,
  usePutMatch,
  useAddMatchIcon,
  usePhysicalEvent,
  usePhysicalEvents,
  usePostPhysicalEvent,
  usePutPhysicalEvent,
  useAddPhysicalEventPicture,
  usePlayer,
  usePlayers,
  getPlayers,
  usePostPlayer,
  usePutPlayer,
  useAddPlayerIllustration,
  usePostPlayerBulk,
  useSpotlight,
  useSpotlights,
  usePostSpotlight,
  usePutSpotlight,
  useAddSpotlightIllustration,
};

/**
 * Trading
 */

export type {
  Asset,
  AssetType,
  AssetList,
  GetAssetsQuery,
  AssetBody,
  PutAssetVariables,
  AddAssetPictureBody,
  AddAssetPictureVariables,
  Booster,
  BoosterList,
  GetBoostersQuery,
  BoosterBody,
  PutBoosterVariables,
  BoosterInUse,
  BoosterInWallet,
  Dividend,
  DividendList,
  DividendBody,
  PostDividendBulkBody,
  PostDividendBulkResponse,
  Ipo,
  IpoType,
  IpoList,
  GetIposQuery,
  IpoBody,
  PutIpoVariables,
  Order,
  OrderType,
  OrderList,
  GetOrdersQuery,
  OrderBody,
  PutOrderVariables,
  OrderBook,
  GetOrderBookQuery,
  OrderEvent,
  OrderMatchEventPayload,
  Portfolio,
  PortfolioList,
  GetPortfoliosQuery,
  Quotation,
  QuotationDataPoint,
  QuotationHistory,
  Ranking,
  RankingPeriod,
  GetRankingQuery,
  RankingList,
  RankingBody,
  PutRankingVariables,
  Rank,
  RankList,
  RankBody,
  PutRankVariables,
  Score,
  Stock,
  ShareBulk,
  MinifiedShareBulk,
  PackFactory,
  PackFactoryList,
  GetPackFactoriesQuery,
  PackFactoryBody,
  PutPackFactoryVariables,
  AddPackFactoryPictureBody,
  AddPackFactoryPictureVariables,
  Pack,
  PackList,
  GetPacksQuery,
  PostPackBody,
  PutPackBody,
  PutPackVariables,
  StockList,
  GetStocksQuery,
  PostStockBody,
  PutStockBody,
  PutStockVariables,
  Transaction,
  TransactionList,
  GetTransactionsQuery,
};

export {
  useAsset,
  useAssets,
  usePostAsset,
  usePutAsset,
  useAddAssetIllustration,
  useAssetQuotation,
  useAssetQuotationHistory,
  useBooster,
  useBoosters,
  useCurrentWalletBoosters,
  usePostBooster,
  usePutBooster,
  useDeleteBooster,
  useDividend,
  useDividends,
  usePostDividend,
  useDistributeDividend,
  usePutDividend,
  usePostDividendBulk,
  useIpo,
  useIpos,
  usePostIpo,
  usePutIpo,
  useOrder,
  useOrders,
  useCurrentWalletOrders,
  usePostOrder,
  usePutOrder,
  useDeleteOrder,
  useOrderBook,
  usePortfolio,
  usePortfolios,
  useCurrentWalletPortfolios,
  useRanking,
  useRankings,
  usePostRanking,
  usePutRanking,
  useDeleteRanking,
  useRank,
  useRanks,
  usePostRank,
  usePutRank,
  useDeleteRank,
  useStock,
  useStocks,
  usePostStock,
  usePutStock,
  usePackFactory,
  usePackFactories,
  usePostPackFactory,
  usePutPackFactory,
  useAddPackFactoryIcon,
  usePack,
  usePacks,
  usePostPack,
  usePutPack,
  useTransaction,
  useTransactions,
};

/**
 * Notifications
 */

export type { Notification };

/**
 * Onboarding
 */

export { OnboardingUserEvents };

/**
 * Utils
 */

export { formatPercentage, formatPercentageVariation, getUserPublicName, unSlugify };

/**
 * Client
 */

export type { FridayClientContext };

export { FridayClient, useFridayClient };
