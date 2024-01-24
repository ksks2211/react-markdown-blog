/** @jsxImportSource @emotion/react */
import { MdOutlineSearch } from "react-icons/md";
import { capitalizeFirst } from "../../../helpers/stringUtils";
import HamburgerButton from "../../common/HamburgerButton";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  className?: string;
  sidebarOpen: boolean;
  title: string;
  isLg: boolean;
}
import {
  StyledToggleBtn,
  StyledWrapper,
  StyledHeader,
  titleStyle,
  searchIconStyle,
} from "./Header.styles";

const Header: React.FC<HeaderProps> = ({
  onClick: toggle,
  title,
  sidebarOpen,
  isLg,
  ...rest
}) => {
  const conditionalProps = useMemo(
    () => (isLg ? {} : { onClick: toggle }),
    [toggle, isLg]
  );
  const theme = useTheme();

  return (
    <StyledHeader {...rest}>
      <StyledWrapper>
        {!isLg && (
          <StyledToggleBtn active={sidebarOpen}>
            <HamburgerButton
              {...conditionalProps}
              active={sidebarOpen}
              onClick={toggle}
            />
          </StyledToggleBtn>
        )}
        <h2 css={titleStyle(theme)}> {capitalizeFirst(title)}</h2>
        <div css={searchIconStyle}>
          <MdOutlineSearch className="search--icon" />
        </div>
      </StyledWrapper>
    </StyledHeader>
  );
};

export default Header;
