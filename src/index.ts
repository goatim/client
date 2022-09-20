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
import Billing from './market/billings/model';
import Capture, { CaptureStatus } from './market/captures/model';
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
  useCreateTax,
  UpdateTaxVariables,
  useUpdateTax,
} from './market/taxes/api';
import Wallet, { WalletType } from './market/wallets/model';
import {
  GetWalletQuery,
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
import Withdrawal, { WithdrawalStatus, WithdrawalCurrencyIso } from './market/withdrawals/model';
import {
  useWithdrawal,
  WithdrawalList,
  GetWithdrawalsQuery,
  useWithdrawals,
  useCurrentWalletWithdrawals,
  WithdrawalBody,
  useCreateWithdrawal,
  UpdateWithdrawalVariables,
  useUpdateWithdrawal,
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
  useCreateClub,
  UpdateClubVariables,
  useUpdateClub,
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
  useCreateComposition,
  useUpdateComposition,
  useDeleteComposition,
} from './soccer/compositions/api';
import CompositionSetting, { CompositionSettingPosition } from './soccer/compositionSettings/model';
import {
  useCompositionSetting,
  CompositionSettingList,
  useCompositionSettings,
  CompositionSettingBody,
  useCreateCompositionSetting,
  UpdateCompositionSettingVariables,
  useUpdateCompositionSetting,
} from './soccer/compositionSettings/api';
import League from './soccer/leagues/model';
import {
  useLeague,
  LeagueList,
  GetLeaguesQuery,
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
  useMatchLiveStatus,
  MatchList,
  GetMatchesQuery,
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
  useCreatePlayer,
  UpdatePlayerVariables,
  useUpdatePlayer,
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
  useCreateSpotlight,
  UpdateSpotlightVariables,
  useUpdateSpotlight,
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
  useCreateAsset,
  UpdateAssetVariables,
  useUpdateAsset,
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
  useCreateBooster,
  UpdateBoosterVariables,
  useUpdateBooster,
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
  useCreateDividend,
  useDistributeDividend,
  useUpdateDividend,
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
  useCreateIpo,
  UpdateIpoVariables,
  useUpdateIpo,
} from './trading/ipos/api';
import Order, { OrderType } from './trading/orders/model';
import {
  useOrder,
  OrderList,
  GetOrdersQuery,
  useOrders,
  useCurrentWalletOrders,
  OrderBody,
  useCreateOrder,
  UpdateOrderVariables,
  useUpdateOrder,
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
import Stock from './trading/stocks/model';
import {
  useStock,
  StockList,
  GetStocksQuery,
  useStocks,
  CreateStockBody,
  useCreateStock,
  UpdateStockBody,
  UpdateStockVariables,
  useUpdateStock,
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
  useCreatePackFactory,
  UpdatePackFactoryVariables,
  useUpdatePackFactory,
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
  CreatePackBody,
  useCreatePack,
  UpdatePackBody,
  UpdatePackVariables,
  useUpdatePack,
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
  UpdateUserVariables,
  AddUserPictureBody,
  AddUserPictureVariables,
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
  UpdateTaxVariables,
  UpdateWalletVariables,
  UpdateWithdrawalVariables,
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
  useCreateCheckout,
  useCreateTax,
  useCreateWallet,
  useCreateWithdrawal,
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
  useUpdateCheckout,
  useUpdateTax,
  useUpdateWallet,
  useUpdateWithdrawal,
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
  UpdateClubVariables,
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
  UpdateCompositionSettingVariables,
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
  GetPlayersQuery,
  PlayerBody,
  UpdatePlayerVariables,
  AddPlayerPictureBody,
  AddPlayerPictureVariables,
  PostPlayerBulkBody,
  PostPlayerBulkResponse,
  Spotlight,
  SpotlightType,
  SpotlightList,
  GetSpotlightsQuery,
  SpotlightBody,
  UpdateSpotlightVariables,
  AddSpotlightIllustrationBody,
  AddSpotlightIllustrationVariables,
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
  useCreateCompositionSetting,
  useUpdateCompositionSetting,
  useLeague,
  useLeagues,
  useCreateLeague,
  useUpdateLeague,
  useAddLeagueIcon,
  useMatch,
  useMatchLiveStatus,
  useMatches,
  useSpotlightMatches,
  useCreateMatch,
  useUpdateMatch,
  useAddMatchIcon,
  usePhysicalEvent,
  usePhysicalEvents,
  useCreatePhysicalEvent,
  useUpdatePhysicalEvent,
  useAddPhysicalEventPicture,
  usePlayer,
  usePlayers,
  getPlayers,
  useCreatePlayer,
  useUpdatePlayer,
  useAddPlayerIllustration,
  usePostPlayerBulk,
  useSpotlight,
  useSpotlights,
  useCreateSpotlight,
  useUpdateSpotlight,
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
  UpdateAssetVariables,
  AddAssetPictureBody,
  AddAssetPictureVariables,
  Booster,
  BoosterList,
  GetBoostersQuery,
  BoosterBody,
  UpdateBoosterVariables,
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
  UpdateIpoVariables,
  Order,
  OrderType,
  OrderList,
  GetOrdersQuery,
  OrderBody,
  UpdateOrderVariables,
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
  UpdateRankingVariables,
  Rank,
  RankList,
  RankBody,
  UpdateRankVariables,
  Score,
  Stock,
  ShareBulk,
  MinifiedShareBulk,
  PackFactory,
  PackFactoryList,
  GetPackFactoriesQuery,
  PackFactoryBody,
  UpdatePackFactoryVariables,
  AddPackFactoryPictureBody,
  AddPackFactoryPictureVariables,
  Pack,
  PackList,
  GetPacksQuery,
  CreatePackBody,
  UpdatePackBody,
  UpdatePackVariables,
  StockList,
  GetStocksQuery,
  CreateStockBody,
  UpdateStockBody,
  UpdateStockVariables,
  Transaction,
  TransactionList,
  GetTransactionsQuery,
};

export {
  useAsset,
  useAssets,
  useCreateAsset,
  useUpdateAsset,
  useAddAssetIllustration,
  useAssetQuotation,
  useAssetQuotationHistory,
  useBooster,
  useBoosters,
  useCurrentWalletBoosters,
  useCreateBooster,
  useUpdateBooster,
  useDeleteBooster,
  useDividend,
  useDividends,
  useCreateDividend,
  useDistributeDividend,
  useUpdateDividend,
  usePostDividendBulk,
  useIpo,
  useIpos,
  useCreateIpo,
  useUpdateIpo,
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
  useStock,
  useStocks,
  useCreateStock,
  useUpdateStock,
  usePackFactory,
  usePackFactories,
  useCreatePackFactory,
  useUpdatePackFactory,
  useAddPackFactoryIcon,
  usePack,
  usePacks,
  useCreatePack,
  useUpdatePack,
  useTransaction,
  useTransactions,
};

/**
 * Notifications
 */

export type { Notification };

/**
 * Utils
 */

export { formatPercentage, formatPercentageVariation, getUserPublicName, unSlugify };

/**
 * Client
 */

export type { FridayClientContext };

export { FridayClient, useFridayClient };
