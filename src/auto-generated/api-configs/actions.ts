import {
  branchSchema,
  chainSchema,
  customerSchema,
  messageSchema,
  messageTemplateSchema,
  reservationSchema,
  tableSchema,
  userSchema,
} from "@/auto-generated/prisma-schema";
import {
  ReservationStatus,
  Role,
} from "@/auto-generated/prisma-schema/enums";
import { z } from "zod";
import roleConfigs from "./_role-config";
import {
  addResponse,
  dateSchema,
  emailOrPhoneSchema,
  emailSchema,
  futureDateSchema,
  getSchema,
  listResponse,
  phoneSchema,
} from "./schema";

const config = {
  "login": {
    group: "Authentications",
    roleConfig: roleConfigs.guestAction,
    schema: {
      request: z.object({
        userName: z.string(),
        password: z.string(),
        remember: z.boolean().optional(),
      }),
      response: z.object({
        token: z.string(),
      }),
    },
  },
  // Branch management
  // Chains
  "get-chains": {
    group: "Branch management",
    roleConfig: roleConfigs.publicAction,
    schema: {
      request: getSchema,
      response: listResponse.extend({
        chains: chainSchema
          .extend({
            totalBranches: z.number(),
          })
          .array(),
      }),
    },
  },
  "add-chain": {
    group: "Branch management",
    roleConfig: roleConfigs.chainConfig,
    schema: {
      request: chainSchema
        .pick({
          name: true,
        })
        .required(),
      response: addResponse,
    },
  },
  "update-chain": {
    group: "Branch management",
    roleConfig: roleConfigs.chainConfig,
    schema: {
      request: chainSchema
        .pick({
          id: true,
          name: true,
        })
        .required(),
    },
  },
  "delete-chain": {
    group: "Branch management",
    roleConfig: roleConfigs.chainConfig,
    schema: {
      request: z.object({
        id: z.string(),
      }),
    },
  },
  // Branches
  "get-branches": {
    group: "Branch management",
    roleConfig: roleConfigs.publicAction,
    schema: {
      request: getSchema.extend({
        chainId: z.string().optional(),
        name: z.string().optional(),
      }),
      response: listResponse.extend({
        branches: branchSchema.array(),
      }),
    },
  },
  "add-branch": {
    group: "Branch management",
    roleConfig: roleConfigs.branchConfig,
    schema: {
      request: z
        .object({
          chainId: z.string(),
          name: z.string(),
          address: z.string(),
          shortName: z.string(),
        })
        .extend({
          email: emailSchema,
          phone: phoneSchema,
        }),
      response: addResponse,
    },
  },
  "update-branch": {
    group: "Branch management",
    roleConfig: roleConfigs.branchConfig,
    schema: {
      request: z
        .object({
          id: z.string(),
          name: z.string(),
          address: z.string(),
          shortname: z.string(),
        })
        .extend({
          email: emailSchema,
          phone: phoneSchema,
        }),
    },
  },
  "delete-branch": {
    group: "Branch management",
    roleConfig: roleConfigs.branchConfig,
    schema: {
      request: z.object({
        id: z.string(),
      }),
    },
  },
  // Tables
  "get-tables": {
    group: "Branch management",
    roleConfig: roleConfigs.publicAction,
    schema: {
      request: getSchema.extend({
        branchId: z.string(),
      }),
      response: listResponse.extend({
        tables: tableSchema.array(),
      }),
    },
  },
  "add-tables": {
    group: "Branch management",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({
        branchId: z.string(),
        tables: z.array(
          tableSchema
            .pick({
              name: true,
            })
            .required(),
        ),
      }),
    },
  },
  "update-table": {
    group: "Branch management",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: tableSchema
        .pick({
          id: true,
          name: true,
        })
        .required(),
    },
  },
  "delete-table": {
    group: "Branch management",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: tableSchema
        .pick({
          id: true,
        })
        .required(),
    },
  },
  // Messages
  "get-messages": {
    group: "Message template",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: getSchema.extend({
        from: z.string().optional(),
        templateId: z.string().optional(),
      }),
      response: listResponse.extend({
        messages: messageSchema.array(),
      }),
    },
  },
  "get-all-message-templates": {
    group: "Message template",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({}),
      response: messageTemplateSchema.array(),
    },
  },
  "add-message-template": {
    group: "Message template",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: messageTemplateSchema
        .pick({
          name: true,
          code: true,
          description: true,
          template: true,
          type: true,
        })
        .extend({
          config: z.record(z.string(), z.string()),
        }),
    },
  },
  "disable-message-template": {
    group: "Message template",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({
        code: z.string(),
      }),
    },
  },
  "enable-message-template": {
    group: "Message template",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({
        code: z.string(),
      }),
    },
  },
  // Reservation
  "get-reservations": {
    group: "Reservation",
    roleConfig: roleConfigs.publicAction,
    schema: {
      request: getSchema.extend({
        name: z.string().optional(),
        phone: z.string().optional(),
        branchIds: z.string().array().optional(),
        statuses: z.nativeEnum(ReservationStatus).array().optional(),
        from: dateSchema.optional(),
        to: dateSchema.optional(),
      }),
      response: listResponse.extend({
        reservations: reservationSchema.array(),
      }),
    },
  },
  "add-reservation": {
    group: "Reservation",
    roleConfig: roleConfigs.allUserConfig,
    schema: {
      request: reservationSchema
        .pick({
          branchId: true,
          contact: true,
          note: true,
        })
        .extend({
          phone: phoneSchema,
          from: futureDateSchema.describe(
            "from must be greater than current time",
          ),
          adults: z.number().positive(),
          children: z.number().positive().optional(),
          status: z
            .nativeEnum(ReservationStatus)
            .refine((e) => e !== ReservationStatus.CANCELLED)
            .describe("Except Cancelled Status"),
        }),
    },
  },
  "add-reservation-by-end-user": {
    group: "Reservation",
    roleConfig: roleConfigs.guestAction,
    schema: {
      request: reservationSchema
        .pick({
          branchId: true,
          contact: true,
          note: true,
        })
        .extend({
          phone: phoneSchema,
          from: futureDateSchema.describe(
            "from must be greater than current time",
          ),
          adults: z.number().positive(),
          children: z.number().positive().optional(),
        }),
      response: z.object({
        code: z.string(),
      }),
    },
  },
  "update-reservation": {
    group: "Reservation",
    roleConfig: roleConfigs.allUserConfig,
    schema: {
      request: reservationSchema
        .pick({
          branchId: true,
          contact: true,
          note: true,
          code: true,
        })
        .extend({
          from: futureDateSchema.describe(
            "from must be greater than current time",
          ),
          phone: z.string().regex(/^(84\d{9}|842\d{10})$/),
          adults: z.number().positive(),
          children: z.number().positive().optional(),
          status: z
            .nativeEnum(ReservationStatus)
            .refine((e) => e !== ReservationStatus.CANCELLED)
            .describe("Except Cancelled Status"),
        }),
    },
  },
  "confirm-reservation": {
    group: "Reservation",
    roleConfig: {
      only: [Role.MANAGER, Role.STAFF],
    },
    schema: {
      request: reservationSchema
        .pick({
          code: true,
          contact: true,
          note: true,
        })
        .extend({
          tableId: z.string().optional(),
        }),
    },
  },
  "confirm-reservation-by-code": {
    group: "Reservation",
    roleConfig: roleConfigs.publicAction,
    schema: {
      request: reservationSchema
        .pick({
          code: true,
          contact: true,
          note: true,
        })
        .extend({
          reservationCode: z.string(),
        }),
    },
  },
  "cancel-reservation": {
    group: "Reservation",
    roleConfig: {
      only: [Role.MANAGER, Role.STAFF],
    },
    schema: {
      request: reservationSchema
        .pick({
          code: true,
          contact: true,
        })
        .extend({
          note: z.string(),
        }),
    },
  },
  // User management
  "get-users": {
    group: "User management",
    roleConfig: {
      except: [Role.STAFF],
    },
    schema: {
      request: getSchema.extend({
        name: z.string().optional(),
        chainId: z.string().optional(),
        branchId: z.string().optional(),
      }),
      response: listResponse.extend({
        users: userSchema
          .pick({
            id: true,
            userName: true,
            fullName: true,
            role: true,
            active: true,
            createdAt: true,
            updatedAt: true,
            chainIds: true,
            branchIds: true,
          })
          .array(),
      }),
    },
  },
  "change-password": {
    group: "User management",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({
        id: z.string(),
        password: z.string(),
      }),
    },
  },
  "disable-users": {
    group: "User management",
    roleConfig: roleConfigs.onlyAdmin,
    schema: {
      request: z.object({
        ids: z.array(z.string()),
      }),
    },
  },
  "add-user": {
    group: "User management",
    roleConfig: roleConfigs.userConfig,
    schema: {
      request: z.object({
        userName: z.string(),
        fullName: z.string(),
        password: z.string(),
        role: z.nativeEnum(Role),
        branchIds: z.string().array().optional(),
        chainIds: z.string().array().optional(),
      }),
      response: z.object({
        id: z.string(),
        userName: z.string(),
        fullName: z.string(),
        role: z.nativeEnum(Role).nullable(),
      }),
    },
  },
  "edit-user": {
    group: "User management",
    roleConfig: roleConfigs.userConfig,
    schema: {
      request: z.object({
        id: z.string(),
        userName: z.string().optional(),
        fullName: z.string().optional(),
        role: z.nativeEnum(Role).optional(),
        branchIds: z.string().array().optional(),
        chainIds: z.string().array().optional(),
      }),
    },
  },
  // Customer management
  "get-customers": {
    group: "Customer management",
    roleConfig: roleConfigs.allUserConfig,
    schema: {
      request: getSchema,
      response: listResponse.extend({
        customers: customerSchema.array(),
      }),
    },
  },
  "add-customer": {
    group: "Customer management",
    roleConfig: roleConfigs.allUserConfig,
    schema: {
      request: customerSchema
        .pick({
          name: true,
          address: true,
        })
        .extend(emailOrPhoneSchema),
      response: customerSchema,
    },
  },
  "edit-customer": {
    group: "Customer management",
    roleConfig: roleConfigs.allUserConfig,
    schema: {
      request: customerSchema
        .pick({
          id: true,
          name: true,
          address: true,
        })
        .extend(emailOrPhoneSchema),
    },
  },
  // ...
};
export default config;
