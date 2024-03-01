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
import { useRef } from "react";

const NavBar: React.FC<NavBarProps> = ({
  logout,
  changeMenu,
  selectedMenu,
  displayName,
  profileUrl,
  menu,
  handleImageChange,
  ...props
}) => {
  const menuList = Object.keys(menu);
  const imageRef = useRef<HTMLInputElement>(null);

  const onImageClick = () => {
    if (imageRef) {
      imageRef.current?.click();
    }
  };

  return (
    <StyledNavBarWrapper {...props}>
      <StyledProfileCard>
        <div className="profile-image">
          <img src={profileUrl} alt="profile" onClick={onImageClick} />
          <input
            ref={imageRef}
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <Link className="profile-name" to="/">
          {displayName}
        </Link>
      </StyledProfileCard>

      <StyledList>
        {menuList.map((item, key) => {
          const selected = item === selectedMenu;

          const Icon = menu[item];

          return (
            <StyledListItem key={key} selected={selected}>
              <Link
                to={`/${item.toLowerCase()}`}
                onClick={() => changeMenu(item as Menu)}
              >
                <Icon />
                <div>{item}</div>
              </Link>
            </StyledListItem>
          );
        })}
      </StyledList>

      <div className="sidebar-bottom" onClick={logout}>
        <StyledLogoutButton content="Log out">
          <FiLogOut />
        </StyledLogoutButton>
      </div>
    </StyledNavBarWrapper>
  );
};

export default NavBar;
