import { createTheme, css } from "@mui/material";

const theme = createTheme({
  global: {
    headerHeight: "44px",
    sidebarWidth: "265px",
    rightSidebarColor: "#ffffff",
    headerColor: "rgba(250, 250, 250, 0.8)",
    leftSidebarColor: "#f4f5f7",
    contentColor: "#ffffff",
    footerColor: "#ffffff",
    mainColor: "#059862",
    btnColor: "#53a8b6",
    submitBtnColor: "#059862",
  },
});

const globalStyles = css`
  :root {
    --header-height: ${theme.global.headerHeight};
    --sidebar-width: ${theme.global.sidebarWidth};
    --right-sidebar-color: ${theme.global.rightSidebarColor};
    --header-color: ${theme.global.headerColor};
    --left-sidebar-color: ${theme.global.leftSidebarColor};
    --content-color: ${theme.global.contentColor};
    --footer-color: ${theme.global.footerColor};
    --main-color: ${theme.global.mainColor};
    --btn-color: ${theme.global.btnColor};
    --submit-btn-color: ${theme.global.submitBtnColor};
  }

  @keyframes fadeInTooltip {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

theme.components = theme.components || {};
theme.components.MuiCssBaseline = {
  styleOverrides: globalStyles.styles,
};

export default theme;
