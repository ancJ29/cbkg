import useTranslation from "@/hooks/useTranslation";
import { Menu, buildMenu } from "@/services/navbar";
import useAuthStore from "@/stores/auth.store";
import { Box, Flex, Image, NavLink, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./navbar.module.scss";

const Navbar = ({
  display = false,
  onClick,
  onShowFullNavbar,
}: {
  display?: boolean;
  onClick?: () => void;
  onShowFullNavbar?: () => void;
}) => {
  const t = useTranslation();
  const { user } = useAuthStore();
  const menu: Menu = buildMenu(user?.role || "STAFF");
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Box className={classes.links}>
      {menu &&
        menu.map((item, index) => (
          <Flex
            key={index}
            onClick={() => {
              if (item.subMenu) {
                onShowFullNavbar && onShowFullNavbar();
                return;
              } else {
                setActive(item.url);
                navigate(item.url);
                onClick && onClick();
              }
            }}
          >
            <Tooltip
              label={t(item.label)}
              color="#fff"
              c="black"
              classNames={{ tooltip: "bdr-f" }}
            >
              <Flex
                display={!display ? "none" : "flex"}
                className={
                  active === item.url ? classes.active : classes.item
                }
              >
                <Image
                  radius="md"
                  h={20}
                  w={20}
                  src={`/menu/${item.icon}.svg`}
                />
              </Flex>
            </Tooltip>
            <Flex className="w-full p-0" direction="column">
              <NavLink
                fz={14}
                display={display ? "none" : "flex"}
                label={t(item.label)}
                classNames={{
                  children: "p-0",
                }}
                className={
                  active === item.url ? classes.active : classes.item
                }
                leftSection={
                  <Image
                    radius="md"
                    h={20}
                    w={20}
                    src={`/menu/${item.icon}.svg`}
                  />
                }
              >
                {item.subMenu &&
                  item.subMenu.map((sub, index) => {
                    return (
                      <NavLink
                        className={
                          active === sub.url
                            ? classes.active
                            : classes.item
                        }
                        py={"1rem"}
                        key={index}
                        label={t(sub.label)}
                        display={display ? "none" : "flex"}
                        onClick={() => {
                          setActive(sub.url);
                          navigate(sub.url);
                          onClick && onClick();
                        }}
                        leftSection={
                          <Image radius="md" h={20} w={20} />
                        }
                      />
                    );
                  })}
              </NavLink>
            </Flex>
          </Flex>
        ))}
    </Box>
  );
};
export default Navbar;
