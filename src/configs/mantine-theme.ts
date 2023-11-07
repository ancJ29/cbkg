import { createTheme } from "@mantine/core";

export const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: "2.6rem",
      },
    },
    fontFamily: "Quicksand",
    fontWeight: "900",
  },
  primaryColor: "more-dark",
  defaultRadius: "sm",
  colors: {
    "more-dark": [
      "#F8FAFC",
      "#D8E5F7",
      "#B4CBEF",
      "#829FD0",
      "#5670A2",
      "#263964",
      "#1B2B56",
      "#132048",
      "#0C153A",
      "#070E30",
    ],
  },
});
