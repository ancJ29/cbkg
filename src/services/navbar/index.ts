import { Role } from "@/auto-generated/prisma-schema";
import control from "@/configs/navbar/menu-acl.json";
import menu from "@/configs/navbar/menu.json";
import z from "zod";

const controlSchema = z.string().array();
const inputMenuItem = z.object({
  key: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  url: z.string(),
  subMenu: z.string().array().optional(),
});
const outputMenuItem = z.object({
  key: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  url: z.string(),
  subMenu: z.array(inputMenuItem).optional(),
});
const menuSchema = z.array(inputMenuItem);

type InputMenuItem = z.infer<typeof inputMenuItem>;
export type OutputMenuItem = z.infer<typeof outputMenuItem>;
export type Menu = OutputMenuItem[];

const menuData = menuSchema.parse(menu).reduce((acc, el) => {
  acc[el.key] = el;
  return acc;
}, {} as Record<string, InputMenuItem>);

export function buildMenu(role: Role): Menu {
  const res = controlSchema.safeParse(control[role]);
  return (res.success ? res.data : [])
    .map((menuItemKey) => {
      const menuItem = menuData[menuItemKey];
      if (menuItem && menuItem.subMenu) {
        const subMenu = menuItem.subMenu.map((subKey: string) => {
          const subMenuItem = menuData[subKey];
          return subMenuItem || subKey;
        });
        return { ...menuItem, subMenu };
      }
      return menuItem;
    })
    .filter(Boolean) as Menu;
}
