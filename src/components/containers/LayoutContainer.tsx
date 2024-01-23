import Layout from "../layouts/Layout";

import Header, { HeaderProps } from "../layouts/Header";
import Footer, { FooterProps } from "../layouts/Footer";
import NavBar, { NavBarContainerProps } from "../layouts/NavBar";
import RightSidebar, { RightSidebarProps } from "../layouts/RightSidebar";
import useGlobal from "../../hooks/useGlobal";
import { capitalizeFirst } from "../../helpers/stringUtils";
import useBreakpoints from "../../hooks/useBreakPoints";
import Menu from "../../contexts/Menu.enum";
import Main, { MainContainerProps } from "../layouts/Main";
import { useState } from "react";

export type HeaderContainerProps = Omit<HeaderProps, "title" | "isLg">;
const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  const { isLg } = useBreakpoints();
  const { selectedMenu } = useGlobal();
  const title = capitalizeFirst(selectedMenu);
  return <Header isLg={isLg} title={title} {...props}></Header>;
};

const FooterContainer: React.FC<FooterProps> = (props) => {
  const footerText = "© 2023 MyBlog. All rights reserved.";
  return <Footer {...props}>{footerText}</Footer>;
};

const NavBarContainer: React.FC<NavBarContainerProps> = (props) => {
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

const RightSidebarContainer: React.FC<RightSidebarProps> = (props) => {
  const title = "right side bar";
  return <RightSidebar {...props} children={title} />;
};

interface LayoutContainerProps {
  MainComponent: React.ComponentType;
}

export default function LayoutContainer({
  MainComponent,
}: LayoutContainerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const MainContainer: React.FC<MainContainerProps> = (props) => {
    return <Main MainComponent={MainComponent} {...props}></Main>;
  };

  return (
    <Layout
      MainComponent={MainContainer}
      RightSidebarComponent={RightSidebarContainer}
      FooterComponent={FooterContainer}
      HeaderComponent={HeaderContainer}
      LeftSidebarComponent={NavBarContainer}
      setSidebarOpen={setSidebarOpen}
      sidebarOpen={sidebarOpen}
    />
  );
}
