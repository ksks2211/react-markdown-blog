import NavBar from "../layouts/NavBar";
import useGlobal from "../../hooks/useGlobal";
import useBreakpoints from "../../hooks/useBreakPoints";
import Menu from "../../contexts/Menu.enum";

import { GoHome, GoFile, GoTag, GoFileDirectory } from "react-icons/go";
import type { NavBarProps } from "../layouts/NavBar/NavBar.types";
import { useCallback, useEffect, useState } from "react";
import { useCreateImage, useGetImageUrl } from "../../hooks/useImage";

export type NavBarContainerProps = Pick<NavBarProps, "className">;

const menu = {
  [Menu.HOME]: GoHome,
  [Menu.POSTS]: GoFile,
  [Menu.CATEGORIES]: GoFileDirectory,
  [Menu.TAGS]: GoTag,
};

const DEFAULT_IMAGE_SRC =
  "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";

export const NavBarContainer: React.FC<NavBarContainerProps> = (props) => {
  const global = useGlobal();
  const { isLg } = useBreakpoints();

  const [loadImage, setLoadImage] = useState(false);
  const { data } = useGetImageUrl({
    imageId: global.profileImageId,
    enabled: loadImage,
  });

  useEffect(() => {
    if (global.profileImageId > 0) {
      setLoadImage(true);
    }
  }, [global.profileImageId]);

  useEffect(() => {
    if (global.profileImageId < 1 && global.profileImageUrl === undefined) {
      global.setProfileImageUrl(DEFAULT_IMAGE_SRC);
    }
  }, [global]);

  useEffect(() => {
    if (data !== undefined) {
      global.setProfileImageUrl(data.imageUrl);
    }
  }, [data, global]);

  const mutation = useCreateImage();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      if (files[0]) {
        const file = files[0];
        global.setProfileImageUrl(URL.createObjectURL(file));
        mutation.mutate(file);
        setLoadImage(true);
      }
    },
    [global, mutation]
  );

  return (
    <NavBar
      menu={menu}
      isLg={isLg}
      profileUrl={global.profileImageUrl}
      handleImageChange={handleImageChange}
      {...global}
      {...props}
    ></NavBar>
  );
};
