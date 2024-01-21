/** @jsxImportSource @emotion/react */
import { MdOutlineSearch } from "react-icons/md";
import { capitalizeFirst } from "../../../helpers/stringUtils";
import HamburgerButton from "../../common/HamburgerButton";
import { useMemo } from "react";
import { styled, css } from "@mui/material";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  className?: string;
  sidebarOpen: boolean;
  title: string;
  isLg: boolean;
}

const StyledHeader = styled("header")`
  --header-color: rgba(250, 250, 250, 0.8);
  --header-title-color: #6189be;
  --header-text-color: #837c7c;
  color: var(--header-text-color);
  border-bottom: 0.8px solid rgba(0, 0, 0, 0.09);
`;

const StyledWrapper = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  font-weight: 600;
  font-size: 1.3rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding-right: calc(var(--sidebar-width) + 2rem);

    font-weight: 400;
  }
`;

const titleStyle = css`
  color: var(--header-title-color);
  font-size: 1.2rem;
`;

const searchIconStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  .search--icon {
    height: 1.7rem;
    width: 100%;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`;

const StyledToggleBtn = styled("div")<{ active: boolean }>`
  transform: ${(props) =>
    props.active ? "translateX(calc(var(--sidebar-width) - 1.6rem))" : 0};
  transition: transform 0.3s ease;
  padding: 0.4rem;
`;

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
        <h2 css={titleStyle}>{capitalizeFirst(title)}</h2>
        <div css={searchIconStyle}>
          <MdOutlineSearch className="search--icon" />
        </div>
      </StyledWrapper>
    </StyledHeader>
  );
};

export default Header;
