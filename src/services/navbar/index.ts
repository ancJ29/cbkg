import control from "@/configs/navbar/menu-acl.json";
import menu from "@/configs/navbar/menu.json";
import { Role } from "@/types/auth";
import z from "zod";

const controlSchema = z.string().array();
const menuItem = z.object({
  key: z.string(),
  label: z.string(),
  icon: z.string(),
  url: z.string(),
});
const menuSchema = z.array(menuItem);

type MenuItem = z.infer<typeof menuItem>;
type Menu = z.infer<typeof menuItem>[];

const menuData = menuSchema.parse(menu).reduce((acc, el) => {
  acc[el.key] = el;
  return acc;
}, {} as Record<string, MenuItem>);

export function buildMenu(role: Role): Menu {
  const res = controlSchema.safeParse(control[role]);
  return (res.success ? res.data : [])
    .map((menuItem) => menuData[menuItem])
    .filter(Boolean);
}
