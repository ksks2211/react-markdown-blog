import NavBar, { NavBarContainerProps } from "../layouts/NavBar";
import useGlobal from "../../hooks/useGlobal";
import useBreakpoints from "../../hooks/useBreakPoints";
import Menu from "../../contexts/Menu.enum";

export const NavBarContainer: React.FC<NavBarContainerProps> = (props) => {
  const global = useGlobal();

  const { isLg } = useBreakpoints();

  const menu = Object.values(Menu);

  const title = "NAV BAR";
  return (
    <NavBar menu={menu} isLg={isLg} {...global} {...props}>
      {title}
    </NavBar>
  );
};
