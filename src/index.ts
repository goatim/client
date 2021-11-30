import Address, { MinifiedAddress, formatFullAddress } from './models/address';
import Article from './models/article';
import Billing, { MinifiedBilling } from './models/billing';
import Category from './models/category';
import Checkout from './models/checkout';
import City from './models/city';
import Collect, { CollectStatus } from './models/collect';
import Country from './models/country';
import Currency, { formatCurrencyAmount } from './models/currency';
import Invoice from './models/invoice';
import Item from './models/item';
import Order, { OrderType, OrderStatus, formatOrderStatus } from './models/order';
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
import Period, { TimeSlot, PeriodType, formatTimeSlot } from './models/period';
import Product, { ProductAvailability } from './models/product';
import Recipient from './models/recipient';
import Session from './models/session';
import Shipment, { ShipmentStatus, formatShipmentStatus } from './models/shipment';
import Shop from './models/shop';
import Tax from './models/tax';
import User from './models/user';
import {
  StandardTimeSlot,
  standardsTimeSlots,
  StandardTimeSlotObject,
  containsTimeSlot,
  addTimeSlot,
  removeTimeSlot,
  formatDateAndTimeslot,
} from './utils/time';
import unSlugify from './utils/unSlugify';

/**
 * Models
 */

export type {
  Address,
  MinifiedAddress,
  Article,
  Billing,
  MinifiedBilling,
  Category,
  Checkout,
  City,
  Collect,
  CollectStatus,
  Country,
  Currency,
  Invoice,
  Item,
  Order,
  OrderType,
  OrderStatus,
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
  Period,
  TimeSlot,
  PeriodType,
  Product,
  ProductAvailability,
  Recipient,
  Session,
  Shipment,
  ShipmentStatus,
  Shop,
  Tax,
  User,
};

export {
  formatFullAddress,
  formatCurrencyAmount,
  formatTimeSlot,
  formatShipmentStatus,
  formatOrderStatus,
};

/**
 * Utils
 */

export type { StandardTimeSlot, StandardTimeSlotObject };

export {
  standardsTimeSlots,
  containsTimeSlot,
  addTimeSlot,
  removeTimeSlot,
  formatDateAndTimeslot,
  unSlugify,
};
