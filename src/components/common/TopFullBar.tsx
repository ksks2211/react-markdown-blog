import { ComponentPropsWithoutRef } from "react";
import { capitalizeFirst } from "../../helpers/stringUtils";
import { styled } from "@mui/material";
interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  title: string;
}

const StyledHeader = styled("header")`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between; /* Aligns content to the left */

  padding: 0 1.5rem;
  font-size: 1.2rem;
  width: 100%;
  z-index: 5;
  height: var(--header-height);
  box-shadow: 0 0.8px 0 rgba(0, 0, 0, 0.09); /* X-offset, Y-offset, blur radius, color */
  background-color: var(--header-color);
  font-weight: 600;
  position: relative;

  & > div {
    div {
      white-space: nowrap;
      color: var(--main-color);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    ${(props) => props.theme.breakpoints.up("md")} {
      padding: 0 6rem;
    }
  }
`;

const TopBar: React.FC<TopBarProps> = ({ title, children }) => {
  const capitalizedTitle = title.split(" ").map(capitalizeFirst).join(" ");
  return (
    <StyledHeader>
      <div>
        {children}
        <div>{capitalizedTitle}</div>
      </div>
    </StyledHeader>
  );
};

export default TopBar;
