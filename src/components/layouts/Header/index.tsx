/** @jsxImportSource @emotion/react */
import { MdOutlineSearch } from "react-icons/md";
import HamburgerButton from "../../common/HamburgerButton";
import { useMemo } from "react";
import { useTheme, Theme, css } from "@mui/material";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  className?: string;
  sidebarOpen: boolean;
  handleSearch: () => void;
  title: string;
  isLg: boolean;
  searchIconVisibility?: boolean;
}
import {
  StyledToggleBtn,
  StyledHeaderIconsWrapper,
  StyledHeader,
} from "./Header.styles";

const titleStyle = (theme: Theme) => css`
  color: ${theme.global.mainColor};
  font-size: 1.2rem;
`;

const searchIconStyle = (visible: boolean) => css`
  cursor: pointer;
  display: flex;
  justify-content: center;

  visibility: ${visible ? "visible" : "hidden"};

  .search-icon {
    height: 1.7rem;
    width: 100%;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`;

const Header: React.FC<HeaderProps> = ({
  onClick: toggle,
  title,
  sidebarOpen,
  isLg,
  handleSearch,
  searchIconVisibility = true,
  ...rest
}) => {
  const conditionalProps = useMemo(
    () => (isLg ? {} : { onClick: toggle }),
    [toggle, isLg]
  );
  const theme = useTheme();

  return (
    <StyledHeader {...rest}>
      <StyledHeaderIconsWrapper>
        {!isLg && (
          <StyledToggleBtn active={sidebarOpen}>
            <HamburgerButton
              {...conditionalProps}
              active={sidebarOpen}
              onClick={toggle}
            />
          </StyledToggleBtn>
        )}
        <h2 css={titleStyle(theme)}>{title}</h2>
        <div css={searchIconStyle(searchIconVisibility)} onClick={handleSearch}>
          <MdOutlineSearch className="search-icon" />
        </div>
      </StyledHeaderIconsWrapper>
    </StyledHeader>
  );
};

export default Header;
