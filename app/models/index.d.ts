import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum LinkTypeEnum {
  MUSIC = "MUSIC",
  SOCIAL = "SOCIAL",
  PAYMENTS = "PAYMENTS",
  CONTACTS = "CONTACTS",
  MORE = "MORE"
}

export enum PlatformEnum {
  TIKTOK = "TIKTOK",
  TWITCH = "TWITCH",
  CLUBHOUSE = "CLUBHOUSE",
  PINTEREST = "PINTEREST",
  ZELLE = "ZELLE",
  ONTAP = "ONTAP"
}



type TeamEventsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SocialSyncMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TicketsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProfileLinksMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlatformMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VenueMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TeamEvents {
  readonly id: string;
  readonly sub?: string | null;
  readonly eventID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TeamEvents, TeamEventsMetaData>);
  static copyOf(source: TeamEvents, mutator: (draft: MutableModel<TeamEvents, TeamEventsMetaData>) => MutableModel<TeamEvents, TeamEventsMetaData> | void): TeamEvents;
}

export declare class SocialSync {
  readonly id: string;
  readonly sub?: string | null;
  readonly youtubeChannelID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SocialSync, SocialSyncMetaData>);
  static copyOf(source: SocialSync, mutator: (draft: MutableModel<SocialSync, SocialSyncMetaData>) => MutableModel<SocialSync, SocialSyncMetaData> | void): SocialSync;
}

export declare class Tickets {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly seller?: string | null;
  readonly hostID: string;
  readonly event: string;
  readonly quantity: string;
  readonly paid: boolean;
  readonly emailSent: boolean;
  readonly eventID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tickets, TicketsMetaData>);
  static copyOf(source: Tickets, mutator: (draft: MutableModel<Tickets, TicketsMetaData>) => MutableModel<Tickets, TicketsMetaData> | void): Tickets;
}

export declare class User {
  readonly id: string;
  readonly ProfileLinks?: (ProfileLinks | null)[] | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly bio?: string | null;
  readonly location?: string | null;
  readonly sub: string;
  readonly PRO?: boolean | null;
  readonly profileLink?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ProfileLinks {
  readonly id: string;
  readonly link: string;
  readonly customTitle?: string | null;
  readonly user2ID: string;
  readonly platformID: string;
  readonly platformNAME?: string | null;
  readonly platformLOGO?: string | null;
  readonly platformTYPE?: string | null;
  readonly platformColor?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ProfileLinks, ProfileLinksMetaData>);
  static copyOf(source: ProfileLinks, mutator: (draft: MutableModel<ProfileLinks, ProfileLinksMetaData>) => MutableModel<ProfileLinks, ProfileLinksMetaData> | void): ProfileLinks;
}

export declare class Platform {
  readonly id: string;
  readonly title: string;
  readonly type: LinkTypeEnum | keyof typeof LinkTypeEnum;
  readonly logo: string;
  readonly url: string;
  readonly ProfileLinks?: (ProfileLinks | null)[] | null;
  readonly color?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Platform, PlatformMetaData>);
  static copyOf(source: Platform, mutator: (draft: MutableModel<Platform, PlatformMetaData>) => MutableModel<Platform, PlatformMetaData> | void): Platform;
}

export declare class Venue {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly capacity?: number | null;
  readonly VenueEvents?: (Event | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Venue, VenueMetaData>);
  static copyOf(source: Venue, mutator: (draft: MutableModel<Venue, VenueMetaData>) => MutableModel<Venue, VenueMetaData> | void): Venue;
}

export declare class Event {
  readonly id: string;
  readonly image?: string | null;
  readonly title?: string | null;
  readonly date?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly ticketPrice?: number | null;
  readonly venueNAME: string;
  readonly sub?: string | null;
  readonly ticketsSold?: number | null;
  readonly active?: boolean | null;
  readonly team?: string | null;
  readonly code?: string | null;
  readonly tickets?: (Tickets | null)[] | null;
  readonly TeamEvents?: (TeamEvents | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Event, EventMetaData>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}