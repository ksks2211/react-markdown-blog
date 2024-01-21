import { styled } from "@mui/material";
import { HTMLAttributes } from "react";

export interface RightSidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hidden: boolean;
}

const StyledRightSidebar = styled("div")`
  background-color: var(--right-sidebar-color);
`;

const RightSidebar: React.FC<RightSidebarProps> = (props) => {
  return <StyledRightSidebar {...props} />;
};

export default RightSidebar;
