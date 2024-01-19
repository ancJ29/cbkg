/* cspell:disable */
import { z } from "zod";

export const roleEnum = z.nativeEnum({
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  CHAIN_MANAGER: "CHAIN_MANAGER",
  MANAGER: "MANAGER",
  OWNER: "OWNER",
} as {
  ADMIN: "ADMIN";
  STAFF: "STAFF";
  CHAIN_MANAGER: "CHAIN_MANAGER";
  MANAGER: "MANAGER";
  OWNER: "OWNER";
});

export type Role =
  | "ADMIN"
  | "STAFF"
  | "CHAIN_MANAGER"
  | "MANAGER"
  | "OWNER";

export const Role = {
  ADMIN: "ADMIN" as Role,
  STAFF: "STAFF" as Role,
  CHAIN_MANAGER: "CHAIN_MANAGER" as Role,
  MANAGER: "MANAGER" as Role,
  OWNER: "OWNER" as Role,
};

export const genderEnum = z.nativeEnum({
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as {
  MALE: "MALE";
  FEMALE: "FEMALE";
  OTHER: "OTHER";
});

export type Gender = "MALE" | "FEMALE" | "OTHER";

export const Gender = {
  MALE: "MALE" as Gender,
  FEMALE: "FEMALE" as Gender,
  OTHER: "OTHER" as Gender,
};

export const reservationStatusEnum = z.nativeEnum({
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  RESERVED: "RESERVED",
  CANCELLED: "CANCELLED",
  ARRIVED: "ARRIVED",
  COMPLETED: "COMPLETED",
} as {
  PENDING: "PENDING";
  CONFIRMED: "CONFIRMED";
  RESERVED: "RESERVED";
  CANCELLED: "CANCELLED";
  ARRIVED: "ARRIVED";
  COMPLETED: "COMPLETED";
});

export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RESERVED"
  | "CANCELLED"
  | "ARRIVED"
  | "COMPLETED";

export const ReservationStatus = {
  PENDING: "PENDING" as ReservationStatus,
  CONFIRMED: "CONFIRMED" as ReservationStatus,
  RESERVED: "RESERVED" as ReservationStatus,
  CANCELLED: "CANCELLED" as ReservationStatus,
  ARRIVED: "ARRIVED" as ReservationStatus,
  COMPLETED: "COMPLETED" as ReservationStatus,
};

export const messageStatusEnum = z.nativeEnum({
  PENDING: "PENDING",
  SENT: "SENT",
  FAILED: "FAILED",
} as {
  PENDING: "PENDING";
  SENT: "SENT";
  FAILED: "FAILED";
});

export type MessageStatus = "PENDING" | "SENT" | "FAILED";

export const MessageStatus = {
  PENDING: "PENDING" as MessageStatus,
  SENT: "SENT" as MessageStatus,
  FAILED: "FAILED" as MessageStatus,
};

export const messageTypeEnum = z.nativeEnum({
  SMS: "SMS",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  SLACK: "SLACK",
  ZALO: "ZALO",
} as {
  SMS: "SMS";
  EMAIL: "EMAIL";
  PHONE: "PHONE";
  SLACK: "SLACK";
  ZALO: "ZALO";
});

export type MessageType =
  | "SMS"
  | "EMAIL"
  | "PHONE"
  | "SLACK"
  | "ZALO";

export const MessageType = {
  SMS: "SMS" as MessageType,
  EMAIL: "EMAIL" as MessageType,
  PHONE: "PHONE" as MessageType,
  SLACK: "SLACK" as MessageType,
  ZALO: "ZALO" as MessageType,
};
