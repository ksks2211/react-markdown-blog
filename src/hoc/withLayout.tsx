import Layout from "../components/layouts/Layout";

import Main, { MainContainerProps } from "../components/layouts/Main";
import { RightSidebarContainer } from "../components/containers/RightSidebarContainer";
import { NavBarContainer } from "../components/containers/NavBarContainer";
import { FooterContainer } from "../components/containers/FooterContainer";
import HeaderContainer from "../components/containers/HeaderContainer";

export default function withLayout<T extends MainContainerProps>(
  MainComponent: React.ComponentType
) {
  return function WrappedWithLayout(wrapperProps: T) {
    const MainContainer: React.FC<MainContainerProps> = (props) => {
      return (
        <Main MainComponent={MainComponent} {...props} {...wrapperProps}></Main>
      );
    };

    return (
      <Layout
        MainComponent={MainContainer}
        RightSidebarComponent={RightSidebarContainer}
        FooterComponent={FooterContainer}
        HeaderComponent={HeaderContainer}
        LeftSidebarComponent={NavBarContainer}
      />
    );
  };
}
