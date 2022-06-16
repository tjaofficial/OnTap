// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LinkTypeEnum = {
  "MUSIC": "MUSIC",
  "SOCIAL": "SOCIAL",
  "PAYMENTS": "PAYMENTS",
  "CONTACTS": "CONTACTS",
  "MORE": "MORE"
};

const PlatformEnum = {
  "TIKTOK": "TIKTOK",
  "TWITCH": "TWITCH",
  "CLUBHOUSE": "CLUBHOUSE",
  "PINTEREST": "PINTEREST",
  "ZELLE": "ZELLE",
  "ONTAP": "ONTAP"
};

const { TeamEvents, SocialSync, Tickets, User, ProfileLinks, Platform, Venue, Event } = initSchema(schema);

export {
  TeamEvents,
  SocialSync,
  Tickets,
  User,
  ProfileLinks,
  Platform,
  Venue,
  Event,
  LinkTypeEnum,
  PlatformEnum
};