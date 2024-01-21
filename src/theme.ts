import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          --header-height: 44px;
          --sidebar-width: 265px;
          --right-sidebar-color:white;
          --header-color:rgba(250, 250, 250, 0.8);
          --left-sidebar-color:#eeeeee;
          --content-color:white;
          --footer-color:white;
          --main-color:#6189be;
          --btn-color:#53a8b6;
        }
      `,
    },
  },
});
