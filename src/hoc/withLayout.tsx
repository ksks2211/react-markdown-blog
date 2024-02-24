import Layout from "../components/layouts/Layout";

import { RightSidebarContainer } from "../components/containers/RightSidebarContainer";
import { NavBarContainer } from "../components/containers/NavBarContainer";
import { FooterContainer } from "../components/containers/FooterContainer";
import HeaderContainer from "../components/containers/HeaderContainer";
import useGlobal from "../hooks/useGlobal";
import { useEffect } from "react";
import { scrollToTheTop } from "../helpers/scrollUtils";

export default function withLayout(MainComponent: React.FC) {
  return function WrappedWithLayout() {
    const { sidebarOpen, setSidebarOpen } = useGlobal();

    useEffect(() => {
      scrollToTheTop();
    }, []);

    return (
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        MainComponent={MainComponent}
        RightSidebarComponent={RightSidebarContainer}
        FooterComponent={FooterContainer}
        HeaderComponent={HeaderContainer}
        LeftSidebarComponent={NavBarContainer}
      />
    );
  };
}
