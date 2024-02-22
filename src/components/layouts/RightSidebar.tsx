import { styled } from "@mui/material";
import { HTMLAttributes } from "react";

const StyledRightSidebar = styled("div")`
  background-color: var(--right-sidebar-color);
`;

export interface RightSidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hidden: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = (props) => {
  return <StyledRightSidebar {...props} />;
};

export default RightSidebar;
