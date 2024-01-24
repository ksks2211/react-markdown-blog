import { Theme, css, styled } from "@mui/material";

export const StyledToggleBtn = styled("div")<{ active: boolean }>`
  transform: ${(props) =>
    props.active ? "translateX(calc(var(--sidebar-width) - 1.6rem))" : 0};
  transition: transform 0.3s ease;
  padding: 0.4rem;
`;
export const StyledWrapper = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  font-weight: 600;
  font-size: 1.3rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding-right: calc(var(--sidebar-width) + 2rem);

    font-weight: 400;
  }
`;
export const StyledHeader = styled("header")`
  --header-color: rgba(250, 250, 250, 0.8);
  --header-text-color: #837c7c;
  color: ${(props) => props.theme.palette.grey[800]};
  border-bottom: 0.8px solid rgba(0, 0, 0, 0.09);
`;
export const searchIconStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  .search--icon {
    height: 1.7rem;
    width: 100%;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`;
export const titleStyle = (theme: Theme) => css`
  color: ${theme.global.mainColor};
  font-size: 1.2rem;
`;
