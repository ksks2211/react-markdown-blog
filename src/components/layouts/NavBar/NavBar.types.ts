import type { IconType } from "react-icons";
import Menu from "../../../contexts/Menu.enum";

interface MenuAndIcon {
  [key: string]: IconType;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isLg: boolean;
  menu: MenuAndIcon;
  selectedMenu: Menu;
  changeMenu: (menu: Menu) => void;
  logout: () => void;
  displayName: string;
  profileUrl?: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
