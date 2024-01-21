import { Link } from "react-router-dom";
import Menu from "../../../contexts/Menu.enum";
import { styled } from "@mui/material";

export type NavBarContainerProps = Pick<NavBarProps, "className">;
export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLg: boolean;
  menu: readonly string[];
  selectedMenu: Menu;
  changeMenu: (menu: Menu) => void;
  logout: () => void;
  displayName: string;
  profileUrl?: string;
}

const StyledNavBarWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.4rem;
  gap: 1rem;
  background-color: var(--left-sidebar-color);
`;

const StyledProfileCard = styled("div")`
  --letter-color: #868585;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 1rem;

  .profile--image {
    border: 2px solid rgba(222, 222, 222, 0.7);
    border-radius: 50%;

    transition: border 0.6s;

    &:hover {
      border: 2px solid #fff;
    }
  }

  img {
    width: 6rem;
    height: 6rem;
    transition: transform 0.6s;

    &:hover {
      transform: scale(120%);
    }
  }

  .profile--name {
    cursor: pointer;
    width: 100%;
    font-weight: 900;
    font-size: 1.5rem;
    color: $letter-color;
    text-align: center;
    transition: color 0.2s;
    font-family: "Roboto", sans-serif;
  }

  .profile--desc {
    width: 100%;
    font-size: 0.9rem;
    line-height: 1.2rem;
    word-spacing: 1px;
    text-align: center;
    font-style: italic;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
    color: var(--letter-color);
  }
`;

const StyledList = styled("ul")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledListItem = styled("li")<{ selected: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.selected ? "rgb(97, 137, 190)" : "transparent"};
  a {
    line-height: 3;
    text-align: center;
    width: 100%;
    display: block;

    color: ${(props) => (props.selected ? "white" : "gray")};
  }
`;

const NavBar: React.FC<NavBarProps> = (props) => {
  const profileUrl =
    props.profileUrl ||
    "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";
  const profileSubTitle = "Welcome ... ";

  return (
    <StyledNavBarWrapper {...props}>
      <StyledProfileCard>
        <Link className="profile--image" to="/">
          <img src={profileUrl} alt="profile" />
        </Link>

        <Link className="profile--name" to="/">
          {props.displayName}
        </Link>

        <div className="profile--desc">{profileSubTitle}</div>
      </StyledProfileCard>

      <StyledList>
        {props.menu.map((item, key) => {
          const selected = item === props.selectedMenu;

          return (
            <StyledListItem key={key} selected={selected}>
              <Link
                to={`/${item.toLowerCase()}`}
                onClick={() => props.changeMenu(item as Menu)}
              >
                {item}
              </Link>
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledNavBarWrapper>
  );
};

export default NavBar;
