import { styled } from "@mui/material";
export const StyledLoginWrapper = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  min-width: 20rem;
  padding-bottom: 3rem;
`;

export const StyledLogo = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;

  img {
    width: 2.8rem;
    height: 2.8rem;
    animation: rotation 10s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const StyledLoginCard = styled("div")`
  padding: 1.2rem 3.4rem;
  margin-top: 4.5rem;
  min-width: 65vw;
  min-height: 68vh;
  display: flex;
  justify-content: center;

  ${(props) => props.theme.breakpoints.up("sm")} {
    border-radius: 1.1rem;
    box-shadow: 0 0 2px rgba(231, 177, 177, 0.25), 0 0 5px rgba(0, 0, 0, 0.22);
    min-width: 43vw;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    border-radius: 2.2rem;
    min-width: 25vw;
  }
`;
