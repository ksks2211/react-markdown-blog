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
  border: 2px solid #fff;
  padding: 1.2rem 3.4rem;

  margin-top: 4rem;
  min-width: 65vw;
  min-height: 68vh;
  display: flex;
  justify-content: center;
  border-radius: 2.6rem;

  ${(props) => props.theme.breakpoints.up("sm")} {
    box-shadow: 0 7px 14px rgba(231, 177, 177, 0.25),
      0 5px 5px rgba(0, 0, 0, 0.22);

    min-width: 45vw;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 2.8rem;
    min-width: 30%;
  }
`;
