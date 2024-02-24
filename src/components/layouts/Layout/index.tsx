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
import { RightSidebarProps } from "../RightSidebar";
import ScrollToTop from "../../common/ScrollToTop";

import type { HeaderContainerProps } from "../../containers/HeaderContainer";
import type { NavBarContainerProps } from "../../containers/NavBarContainer";

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
  flex-grow: 0;
  flex-shrink: 0;
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

const rightSidebarStyle = css`
  height: calc(100vh - var(--header-height));
  min-width: var(--sidebar-width);
  position: sticky;
  top: var(--header-height);
  z-index: 99;
`;

interface LayoutProps {
  HeaderComponent: React.FC<HeaderContainerProps>;
  LeftSidebarComponent: React.FC<NavBarContainerProps>;
  RightSidebarComponent: React.FC<RightSidebarProps>;
  FooterComponent: React.FC<FooterProps>;
  MainComponent: React.FC;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function Layout({
  HeaderComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  FooterComponent,
  MainComponent,
  sidebarOpen,
  setSidebarOpen,
}: LayoutProps) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const { isLg, isXl } = useBreakpoints();

  const theme = useTheme();

  useEffect(() => {
    console.log("LayoutIndex Mounted");

    return () => {
      console.log("LayoutIndex Unmounted");
    };
  }, []);

  useEffect(() => {
    if (isLg) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isLg, setSidebarOpen]);

  const handleSidebarToggle = useCallback(() => {
    if (isLg) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  }, [isLg, setSidebarOpen, sidebarOpen]);

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

        <StyledLowerPartitionWrapper isDesktop={isLg}>
          <StyledMainWrapper isDesktop={isLg}>
            <MainComponent />
            <FooterComponent></FooterComponent>
          </StyledMainWrapper>

          <RightSidebarComponent hidden={!isXl} css={rightSidebarStyle} />

          <ScrollToTop />
        </StyledLowerPartitionWrapper>
      </StyledRightPartitionWrapper>
    </StyledPageWrapper>
  );
}
