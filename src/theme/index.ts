import { createTheme } from "@mui/material";

const theme = createTheme({
  global: {
    headerHeight: "44px",
    sidebarWidth: "265px",
    rightSidebarColor: "white",
    headerColor: "rgba(250, 250, 250, 0.8)",
    leftSidebarColor: "#eeeeee",
    contentColor: "white",
    footerColor: "white",
    mainColor: "#059862",
    btnColor: "#53a8b6",
    submitBtnColor: "#059862",
  },
});

theme.components = theme.components || {};
theme.components.MuiCssBaseline = {
  styleOverrides: `
    :root {
      --header-height: ${theme.global.headerHeight};
      --sidebar-width: ${theme.global.sidebarWidth};
      --right-sidebar-color:${theme.global.rightSidebarWidth};
      --header-color:${theme.global.headerColor};
      --left-sidebar-color:${theme.global.leftSidebarColor};
      --content-color:${theme.global.contentColor};
      --footer-color:${theme.global.footerColor};
      --main-color:${theme.global.mainColor};
      --btn-color:${theme.global.btnColor};
      --submit-btn-color:${theme.global.submitBtnColor}
    }
  `,
};

export default theme;
