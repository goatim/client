export type ModelName =
  | 'address'
  | 'article'
  | 'asset'
  | 'billing'
  | 'booster'
  | 'booster_factory'
  | 'capture'
  | 'checkout'
  | 'city'
  | 'club'
  | 'composition'
  | 'composition_setting'
  | 'country'
  | 'currency'
  | 'currencies_rate'
  | 'distribution'
  | 'dividend'
  | 'invoice'
  | 'ipo'
  | 'league'
  | 'match'
  | 'media'
  | 'notification'
  | 'order'
  | 'pack'
  | 'pack_factory'
  | 'paragraph'
  | 'payment_intent'
  | 'payment_method'
  | 'permission'
  | 'physical_event'
  | 'player'
  | 'portfolio'
  | 'rank'
  | 'ranking'
  | 'section'
  | 'session'
  | 'spotlight'
  | 'stock'
  | 'tax'
  | 'ticket'
  | 'tournament'
  | 'tournament_participant'
  | 'transaction'
  | 'user'
  | 'user_event'
  | 'wallet'
  | 'wheel_draw'
  | 'withdrawal'
  | 'post';

export enum ModelISO {
  ADDRESS = 'ad',
  ARTICLE = 'ar',
  ASSET = 'as',
  BILLING = 'bi',
  BOOSTER = 'bo',
  BOOSTER_FACTORY = 'bf',
  CAPTURE = 'ca',
  CHECKOUT = 'ch',
  CITY = 'ci',
  CLUB = 'cl',
  COMPOSITION = 'cm',
  COMPOSITION_SETTING = 'cs',
  COUNTRY = 'co',
  CURRENCIES_RATE = 'cr',
  CURRENCY = 'cu',
  DISTRIBUTION = 'di',
  DIVIDEND = 'dv',
  INVOICE = 'in',
  IPO = 'ip',
  LEAGUE = 'le',
  MATCH = 'ma',
  MEDIA = 'me',
  NOTIFICATION = 'no',
  ORDER = 'or',
  PACK = 'pc',
  PACK_FACTORY = 'pf',
  PARAGRAPH = 'pa',
  PAYMENT_INTENT = 'pi',
  PAYMENT_METHOD = 'pm',
  PERMISSION = 'pe',
  PHYSICAL_EVENT = 'ph',
  PLAYER = 'pl',
  PORTFOLIO = 'po',
  POST = 'ps',
  RANK = 'rk',
  RANKING = 'ra',
  SCORE = 'so',
  SECTION = 'sc',
  SESSION = 'se',
  SPOTLIGHT = 'sp',
  STOCK = 'st',
  TAX = 'ta',
  TICKET = 'ti',
  TOURNAMENT = 'to',
  TOURNAMENT_PARTICIPANT = 'tp',
  TRANSACTION = 'tr',
  USER = 'us',
  USER_EVENT = 'ue',
  WALLET = 'wa',
  WHEEL_DRAW = 'wd',
  WITHDRAWAL = 'wi',
}

export enum ModelIdLength {
  ADDRESS = 32,
  ARTICLE = 20,
  ASSET = 15,
  BILLING = 15,
  BOOSTER = 15,
  BOOSTER_FACTORY = 4,
  CAPTURE = 10,
  CHECKOUT = 30,
  CITY = 15,
  CLUB = 8,
  COMPOSITION = 12,
  COMPOSITION_SETTING = 5,
  COUNTRY = 5,
  CURRENCIES_RATE = 5,
  CURRENCY = 5,
  DISTRIBUTION = 8,
  DIVIDEND = 20,
  INVOICE = 15,
  IPO = 20,
  LEAGUE = 5,
  MATCH = 8,
  MEDIA = 20,
  NOTIFICATION = 40,
  ORDER = 15,
  PACK = 15,
  PACK_FACTORY = 5,
  PARAGRAPH = 30,
  PAYMENT_INTENT = 40,
  PAYMENT_METHOD = 40,
  PERMISSION = 15,
  PHYSICAL_EVENT = 12,
  PLAYER = 12,
  PORTFOLIO = 15,
  RANK = 15,
  RANKING = 15,
  SECTION = 15,
  SESSION = 32,
  SPOTLIGHT = 8,
  STOCK = 30,
  TAX = 15,
  TICKET = 30,
  TOURNAMENT = 10,
  TOURNAMENT_PARTICIPANT = 15,
  TRANSACTION = 10,
  USER = 15,
  USER_EVENT = 40,
  WALLET = 12,
  WHEEL_DRAW = 30,
  WITHDRAWAL = 30,
  POST = 30,
}

export const forbiddenSlugs = ['goatim', 'default', 'all', 'any', 'bulk', 'me', 'active'];
