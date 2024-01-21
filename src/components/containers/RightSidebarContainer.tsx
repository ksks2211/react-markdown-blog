import RightSidebar, { RightSidebarProps } from "../layouts/RightSidebar";

export const RightSidebarContainer: React.FC<RightSidebarProps> = (props) => {
  const title = "right side bar";
  return <RightSidebar {...props} children={title} />;
};
