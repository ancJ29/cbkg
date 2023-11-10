import control from "@/configs/navbar/menu-acl.json";
import menu from "@/configs/navbar/menu.json";
import { Role } from "@/types/auth";
import z from "zod";

export function buildMenu(role: Role): Array<Menu> | undefined {
  const controls = getAllowedMenuItems(role);
  return controls.map((menuItem) => menu[menuItem as keyof typeof menu]);
}

export const menuSchema = z.object({
  label: z.string(),
  icon: z.string(),
  url: z.string(),
});
type Menu = z.infer<typeof menuSchema>;

const controlSchema = z.string().array();
function getAllowedMenuItems(role: Role) {
  const res = controlSchema.safeParse(control[role]);
  return res.success ? res.data : [];
}
