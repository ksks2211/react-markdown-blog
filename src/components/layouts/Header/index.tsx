import { MdOutlineSearch } from "react-icons/md";
import HamburgerButton from "../../common/HamburgerButton";
import { useMemo } from "react";
import { styled } from "@mui/material";
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

export const StyledTitle = styled("div")`
  color: ${(props) => props.theme.global.mainColor};
  font-size: 1.2rem;
`;

interface StyledSearchIconProps {
  visible: boolean;
}

export const StyledSearchIcon = styled("div")<StyledSearchIconProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;

  visibility: ${(props) => (props.visible ? "visible" : "hidden")};

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
        <StyledTitle>{title}</StyledTitle>
        <StyledSearchIcon visible={searchIconVisibility} onClick={handleSearch}>
          <MdOutlineSearch className="search-icon" />
        </StyledSearchIcon>
      </StyledHeaderIconsWrapper>
    </StyledHeader>
  );
};

export default Header;
