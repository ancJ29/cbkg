import logger from "@/services/logger";

enum Role {
  "ADMIN" = "Admin",
  "OWNER" = "Owner",
  "CHAIN-MANAGER" = "Chain Manager",
  "MANAGER" = "Branch Manager",
  "STAFF" = "Staff",
}

const RoleAcl = {
  "ADMIN": ["CHAIN-MANAGER", "MANAGER", "STAFF"],
  "OWNER": ["CHAIN-MANAGER", "MANAGER", "STAFF"],
  "CHAIN-MANAGER": ["MANAGER", "STAFF"],
  "MANAGER": ["STAFF"],
};

export const roles = (role: string) => {
  if (!RoleAcl[role as keyof typeof RoleAcl]) {
    logger.error("Invalid role provided.");
  }

  return RoleAcl[role as keyof typeof RoleAcl].map((roleId) => ({
    id: roleId as Role,
    name: Role[roleId as keyof typeof Role],
  }));
};
