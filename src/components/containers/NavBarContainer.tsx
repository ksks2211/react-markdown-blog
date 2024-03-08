import NavBar from "../layouts/NavBar";
import useGlobal from "../../hooks/useGlobal";
import useBreakpoints from "../../hooks/useBreakPoints";
import Menu from "../../contexts/Menu.enum";

import { GoHome, GoFile, GoTag, GoFileDirectory } from "react-icons/go";
import type { NavBarProps } from "../layouts/NavBar/NavBar.types";
import { useCallback, useEffect } from "react";
import { useCreateImage } from "../../hooks/useImage";
import defaultProfileUri from "../../assets/profile2.png";
import { isEmpty } from "lodash-es";

export type NavBarContainerProps = Pick<NavBarProps, "className">;

const menu = {
  [Menu.HOME]: GoHome,
  [Menu.POSTS]: GoFile,
  [Menu.CATEGORIES]: GoFileDirectory,
  [Menu.TAGS]: GoTag,
};

export const NavBarContainer: React.FC<NavBarContainerProps> = (props) => {
  const { profile, updateProfile, ...globalRest } = useGlobal();
  const { isLg } = useBreakpoints();

  useEffect(() => {
    if (isEmpty(profile)) {
      updateProfile(defaultProfileUri);
    }
  }, [profile, updateProfile]);

  const mutation = useCreateImage();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      if (files[0]) {
        const file = files[0];
        updateProfile(URL.createObjectURL(file));
        mutation.mutate(file);
      }
    },
    [mutation, updateProfile]
  );

  return (
    <NavBar
      menu={menu}
      isLg={isLg}
      profileUrl={profile}
      handleImageChange={handleImageChange}
      {...globalRest}
      {...props}
    ></NavBar>
  );
};
