import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    global: { [key: string]: string };
  }

  interface ThemeOptions {
    global?: { [key: string]: string };
  }
}
