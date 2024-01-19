import { Role } from "@/auto-generated/prisma-schema/enums";

export type RoleConfig = {
  only?: Role[];
  except?: Role[];
  public?: boolean;
  guestOnly?: boolean;
};

export const onlyAdmin: RoleConfig = {
  only: [Role.ADMIN],
};

export const publicAction: RoleConfig = {
  public: true,
};

export const guestAction: RoleConfig = {
  guestOnly: true,
};

export const branchConfig: RoleConfig = {
  only: [Role.ADMIN, Role.OWNER, Role.CHAIN_MANAGER],
};

export const chainConfig: RoleConfig = {
  only: [Role.ADMIN, Role.OWNER],
};

export const userConfig: RoleConfig = {
  except: [Role.STAFF],
};

export const allUserConfig: RoleConfig = {
  only: [
    Role.ADMIN,
    Role.OWNER,
    Role.MANAGER,
    Role.CHAIN_MANAGER,
    Role.STAFF,
  ],
};
