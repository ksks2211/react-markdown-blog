import { styled } from "@mui/material";
import { rgba, darken } from "polished";

const StyledButton = styled("button")`
  width: 100%;
  border-radius: 1.4rem;
  line-height: 2.4rem;
  height: 2.4rem;

  font-weight: 500;
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  margin-bottom: 1.2rem;
`;
export const LoginButton = styled(StyledButton)`
  font-size: 1rem;
  background-color: ${(props) => props.theme.global.submitBtnColor};
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      darken(0.1, props.theme.global.submitBtnColor)};
  }
`;
export const GoogleButton = styled(StyledButton)`
  color: ${(props) => props.theme.palette.grey[800]};
  border: 1px solid ${(props) => props.theme.palette.grey[500]};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      rgba(props.theme.palette.primary.light, 0.1)};
    border: 1px solid ${(props) => rgba(props.theme.palette.primary.light, 0.1)};
  }

  img {
    height: 1.3rem;
    margin: 0.3rem;
    border-radius: 50%;
  }
`;

export const StyledLoginForm = styled("form")`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */

  .logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    img {
      width: 2.6rem;
      height: 2.6rem;
    }
  }

  .greetings {
    width: 100%;
    font-size: 1.6rem;
    font-weight: 700;
    padding-top: 1rem;
    padding-bottom: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-field {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 2.8rem;
    border-radius: 0.8rem;
    border: 1px solid ${(props) => props.theme.palette.grey[300]};
    position: relative;
    margin-top: 0.8rem;

    &:hover {
      box-shadow: 0px 0px 1px
        ${(props) => rgba(props.theme.global.submitBtnColor, 0.8)}; /* Shadow effect */
    }

    &:focus-within {
      box-shadow: 0px 0px 6px
        ${(props) => rgba(props.theme.global.submitBtnColor, 0.8)}; /* Shadow effect */
    }

    .icon {
      display: block;
      margin-left: 1rem;
      margin-right: 0.8rem;
      font-size: 1.4rem;
      fill: ${(props) => props.theme.palette.grey[500]};
    }

    input {
      width: 100%;
      height: 2.6rem;
      font-size: 1rem;
      font-weight: 500;
      outline: none;
      border: none;
      margin-right: 1rem;
    }
  }

  ${(props) => props.theme.breakpoints.up("md")} {
  }
`;

export const StyledWarningWrapper = styled("div")`
  color: ${(props) => props.theme.palette.warning.dark};
  width: 100%;
  font-size: 0.8rem;
  font-weight: 450;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  max-height: 3rem;
  margin: 0.4rem 0;
  div {
    &::before {
      content: "*";
      margin-right: 0.25rem;
    }
    text-align: center;
    width: 100%;
    height: 1rem;
    transform: translateX(-1rem);
  }
`;
