/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import useBreakpoints from "../../../hooks/useBreakPoints";
import throttle from "lodash-es/throttle";
import { Theme, css, useTheme } from "@mui/material/styles";
import {
  StyledPageWrapper,
  StyledRightPartitionWrapper,
  StyledOverlay,
  StyledLowerPartitionWrapper,
  StyledMainWrapper,
} from "./Layout.styles";
import { FooterProps } from "../Footer";
import { NavBarContainerProps } from "../NavBar";
import { RightSidebarProps } from "../RightSidebar";
import ScrollToTop from "../../common/ScrollToTop";
import { HeaderContainerProps } from "../../containers/LayoutContainer";
import { MainContainerProps } from "../Main";

const headerStyle = ({ headerVisible }: { headerVisible: boolean }) => css`
  min-height: var(--header-height);
  background-color: var(--header-color);
  position: sticky;
  top: 0;
  z-index: 99;
  transform: ${headerVisible
    ? "translateY(0)"
    : "translateY(calc(-1 * var(--header-height)))"};
  transition: transform 0.3s ease-out;
`;
const leftSidebarStyle = ({
  sidebarOpen,
  theme,
}: {
  sidebarOpen: boolean;
  theme: Theme;
}) => css`
  height: 100vh;
  min-width: var(--sidebar-width);
  margin-left: calc(-1 * var(--sidebar-width));
  transform: translateX(${sidebarOpen ? "var(--sidebar-width)" : 0});
  transition: margin-left.3s ease, transform 0.3s ease;

  position: sticky;
  top: 0;
  z-index: 200;

  ${theme.breakpoints.up("md")} {
    margin-left: 0;
    transform: translateX(0);
  }
`;

interface LayoutProps {
  HeaderComponent: React.FC<HeaderContainerProps>;
  LeftSidebarComponent: React.FC<NavBarContainerProps>;
  RightSidebarComponent: React.FC<RightSidebarProps>;
  FooterComponent: React.FC<FooterProps>;
  MainComponent: React.FC<MainContainerProps>;
}

export default function Layout({
  HeaderComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  FooterComponent,
  MainComponent,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const { isLg } = useBreakpoints();

  const theme = useTheme();

  useEffect(() => {
    if (isLg) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isLg]);

  const handleSidebarToggle = useCallback(() => {
    if (isLg) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  }, [sidebarOpen, isLg]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight / 2 <= window.scrollY) {
        if (prevScrollY + 15 < window.scrollY) {
          setHeaderVisible(false);
        } else if (prevScrollY - 30 > window.scrollY) {
          setHeaderVisible(true);
        }
      } else {
        setHeaderVisible(true);
      }
      setPrevScrollY(window.scrollY);
    };

    const throttledHandler = throttle(handleScroll, 1000);
    window.addEventListener("scroll", throttledHandler);
    return () => {
      window.removeEventListener("scroll", throttledHandler);
    };
  }, [prevScrollY]);

  const rightSidebarStyle = css`
    height: calc(100vh - var(--header-height));
    min-width: var(--sidebar-width);
    position: sticky;
    top: var(--header-height);
    z-index: 99;
  `;
  const mainContentStyle = css`
    min-height: 110vh;
  `;

  return (
    <StyledPageWrapper sidebarOpen={sidebarOpen}>
      <LeftSidebarComponent
        css={leftSidebarStyle({
          sidebarOpen,
          theme,
        })}
      />
      <StyledRightPartitionWrapper isDesktop={isLg} sidebarOpen={sidebarOpen}>
        {sidebarOpen && !isLg && (
          <StyledOverlay onClick={handleSidebarToggle} />
        )}

        <HeaderComponent
          sidebarOpen={sidebarOpen}
          css={headerStyle({ headerVisible })}
          onClick={handleSidebarToggle}
        />

        <StyledLowerPartitionWrapper>
          <StyledMainWrapper>
            <MainComponent css={mainContentStyle} />
            <FooterComponent></FooterComponent>
          </StyledMainWrapper>
          <RightSidebarComponent hidden={!isLg} css={rightSidebarStyle} />

          <ScrollToTop />
        </StyledLowerPartitionWrapper>
      </StyledRightPartitionWrapper>
    </StyledPageWrapper>
  );
}
