import { styled } from "@mui/material";

export const StyledLoginWrapper = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const StyledLoginCard = styled("div")`
  border: 2px solid #fff;
  padding: 1.2rem 3.4rem;
  box-shadow: 0 7px 14px rgba(231, 177, 177, 0.25),
    0 5px 5px rgba(0, 0, 0, 0.22);

  margin-top: 2.6rem;
  min-width: 65vw;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  border-radius: 2.6rem;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-width: 58vw;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 2.8rem;
    min-width: 30%;
  }
`;
