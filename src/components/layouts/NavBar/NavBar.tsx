import { Link } from "react-router-dom";
import Menu from "../../../contexts/Menu.enum";
import {
  StyledNavBarWrapper,
  StyledProfileCard,
  StyledList,
  StyledListItem,
  StyledLogoutButton,
} from "./NavBar.styles";
import { FiLogOut } from "react-icons/fi";

import { NavBarProps } from "./NavBar.types";

const NavBar: React.FC<NavBarProps> = (props) => {
  const profileUrl =
    props.profileUrl ||
    "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";
  const menuList = Object.keys(props.menu);

  const handleLogout = () => {
    props.logout();
  };

  return (
    <StyledNavBarWrapper {...props}>
      <StyledProfileCard>
        <Link className="profile--image" to="/">
          <img src={profileUrl} alt="profile" />
        </Link>

        <Link className="profile--name" to="/">
          {props.displayName}
        </Link>
      </StyledProfileCard>

      <StyledList>
        {menuList.map((item, key) => {
          const selected = item === props.selectedMenu;

          const Icon = props.menu[item];

          return (
            <StyledListItem key={key} selected={selected}>
              <Link
                to={`/${item.toLowerCase()}`}
                onClick={() => props.changeMenu(item as Menu)}
              >
                <Icon />
                <div>{item}</div>
              </Link>
            </StyledListItem>
          );
        })}
      </StyledList>

      <div className="sidebar-bottom" onClick={handleLogout}>
        <StyledLogoutButton content="Log out">
          <FiLogOut />
        </StyledLogoutButton>
      </div>
    </StyledNavBarWrapper>
  );
};

export default NavBar;
