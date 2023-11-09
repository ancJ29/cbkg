import useTranslation from "@/hooks/useTranslation";
import { buildMenu } from "@/services/navbar";
import useAuthStore from "@/stores/auth.store";
import { Anchor, Box, Image, ScrollArea } from "@mantine/core";
import classes from "./navbar.module.scss";

const Navbar = () => {
  const t = useTranslation();
  const authStore = useAuthStore();
  const menu = buildMenu(authStore?.user?.role || "STAFF");

  return (
    <Box>
      <Box pt='xl' className={classes.links} component={ScrollArea}>
        {menu &&
          menu.map((item, index) => (
            <Anchor href={item.url} className={classes.item} key={index}>
              <Image radius='md' h={20} w={20} src={`/menu/${item.icon}.svg`} />
              <Box fz={14}>{t(item.label)}</Box>
            </Anchor>
          ))}
      </Box>
    </Box>
  );
};
export default Navbar;
