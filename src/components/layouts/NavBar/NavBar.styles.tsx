import { styled } from "@mui/material";
import { rgba } from "polished";
export const StyledNavBarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 3.4rem;
  background-color: var(--left-sidebar-color);
  box-shadow: -3px 0px 3px -5px black inset;

  position: relative;
  overflow: auto;

  .sidebar-bottom {
    width: 100%;
    align-self: flex-end;
    margin-top: auto;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
    padding-bottom: 9rem;
    ${(props) => props.theme.breakpoints.up("md")} {
      padding-bottom: 5.5rem;
    }
  }
`;
export const StyledProfileCard = styled("div")`
  --letter-color: #868585;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;

  .profile--image {
    border: 2px solid rgba(222, 222, 222, 0.7);
    border-radius: 50%;

    transition: border 0.6s;
    width: 6rem;
    height: 6rem;

    &:hover {
      border: 2px solid #fff;
    }

    img {
      width: 6rem;
      height: 6rem;
      transition: transform 0.6s;
      &:hover {
        transform: scale(120%);
      }
    }
  }

  .profile--name {
    cursor: pointer;
    width: 100%;
    font-weight: 900;
    font-size: 1.5rem;
    color: $letter-color;
    text-align: center;
    transition: color 0.2s;
    font-family: "Roboto", sans-serif;
  }
`;
export const StyledList = styled("ul")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const StyledListItem = styled("li")<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  padding-left: 14%;
  margin: 0.07rem 0;
  width: 100%;

  a {
    height: 3rem;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 1.3rem;
    padding-right: 1.6rem;
    border-radius: 1.6rem;

    background-color: ${(props) =>
      props.selected
        ? rgba(props.theme.global.mainColor, 0.15)
        : "transparent"};

    transition: 0.4s ease-out;
    &:hover {
      background-color: ${(props) => rgba(props.theme.global.mainColor, 0.1)};
    }

    svg {
      width: 1.7rem;

      fill: ${(props) =>
        props.selected
          ? props.theme.global.mainColor
          : props.theme.palette.grey[800]};
      height: 100%;
      margin-right: 0.4rem;
    }
    div {
      font-size: 1rem;
      font-weight: 500;
      display: block;
      text-align: center;
      display: block;
      color: ${(props) =>
        props.selected
          ? props.theme.global.mainColor
          : props.theme.palette.grey[800]};
    }
  }
`;

export const StyledLogoutButton = styled("button")<{ content: string }>`
  cursor: pointer;
  min-width: 3rem;
  min-height: 3rem;
  height: 100%;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${(props) => props.theme.palette.grey[300]};
  position: relative;

  &:hover {
    background-color: ${(props) => props.theme.palette.grey[400]};
  }

  &:hover::after {
    background: ${(props) => props.theme.palette.grey[400]};
    color: ${(props) => props.theme.palette.grey[800]};
    position: absolute;
    content: "${(props) => props.content}";
    white-space: nowrap;

    display: block;
    bottom: 106%;
    padding: 0.3rem;
    border-radius: 0.2rem;
    font-size: 0.75rem;
    font-weight: 600;
    animation-delay: 0.5s;
    animation: fadeInTooltip 0.5s ease-in-out forwards;
    opacity: 1;
  }

  svg {
    font-size: 1.4rem;
  }
`;
