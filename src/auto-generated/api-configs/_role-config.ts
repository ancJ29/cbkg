import { Role } from "@/auto-generated/prisma-schema/enums";

export type RoleConfig = {
  // user with following roles will be allowed (e.g. admin)
  only?: Role[];

  // user with following roles will be denied (e.g. staff)
  except?: Role[];

  // for public access
  public?: boolean;

  // ONLY for guest access, user will be redirected to home page if logged in  (e.g. login, register)
  guestOnly?: boolean;
};

const roleConfigs: { [key: string]: RoleConfig } = {
  // Role configs for actions relate to branch setting
  branchConfig: {
    only: [Role.ADMIN, Role.OWNER, Role.CHAIN_MANAGER],
  },
  // Role configs for actions relate to chain setting
  chainConfig: {
    only: [Role.ADMIN, Role.OWNER],
  },
  // Role configs for actions relate to user setting
  userConfig: {
    except: [Role.STAFF],
  },
  // Role configs for actions all login users can access
  allUserConfig: {
    only: [
      Role.ADMIN,
      Role.OWNER,
      Role.MANAGER,
      Role.CHAIN_MANAGER,
      Role.STAFF,
    ],
  },
};

export default roleConfigs;
