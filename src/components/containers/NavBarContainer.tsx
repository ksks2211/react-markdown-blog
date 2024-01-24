import NavBar, { NavBarContainerProps } from "../layouts/NavBar";
import useGlobal from "../../hooks/useGlobal";
import useBreakpoints from "../../hooks/useBreakPoints";
import Menu from "../../contexts/Menu.enum";

import { GoHome, GoFile, GoTag, GoFileDirectory } from "react-icons/go";

export const NavBarContainer: React.FC<NavBarContainerProps> = (props) => {
  const global = useGlobal();
  const { isLg } = useBreakpoints();

  // const menu = Object.values(Menu);

  const menu = {
    [Menu.HOME]: GoHome,
    [Menu.POSTS]: GoFile,
    [Menu.CATEGORIES]: GoFileDirectory,
    [Menu.TAGS]: GoTag,
  };

  return <NavBar menu={menu} isLg={isLg} {...global} {...props}></NavBar>;
};
