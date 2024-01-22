import { Role } from "@/auto-generated/prisma-schema";
import logger from "@/services/logger";

const roleAcl: Record<Role, Role[]> = {
  ADMIN: ["CHAIN_MANAGER", "MANAGER", "STAFF"],
  OWNER: ["CHAIN_MANAGER", "MANAGER", "STAFF"],
  CHAIN_MANAGER: ["MANAGER", "STAFF"],
  MANAGER: ["STAFF"],
  STAFF: [],
};

export const roles = (role?: Role) => {
  if (!role || !roleAcl[role].length) {
    logger.error("Invalid role provided.");
    throw new Error("Invalid role provided.");
  }
  return roleAcl[role].map((role) => ({
    value: role,
    label: role,
  }));
};
