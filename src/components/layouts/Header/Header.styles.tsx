import { styled } from "@mui/material";

export const StyledToggleBtn = styled("div")<{ active: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) =>
    props.active ? "translateX(calc(var(--sidebar-width) - 1rem))" : 0};
  transition: transform 0.3s ease;
`;
export const StyledWrapper = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.4rem;
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
