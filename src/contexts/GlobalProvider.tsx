import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import {
  getUsername,
  hasValidToken,
  removeTokenFromBrowser,
  getDisplayName,
  getProfileImageId,
  setProfileImageIdInStorage,
} from "../services/storageService";
import Menu from "./Menu.enum";
import { useRemoveRefreshToken } from "../hooks/useToken";
import throttle from "lodash-es/throttle";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(hasValidToken()); // Login State Check
  const [username, setUsername] = useState<string>(getUsername());
  const [displayName, setDisplayName] = useState<string>(getDisplayName());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImageId, setProfileImageId] = useState(getProfileImageId());

  const [profileImageUrl, setProfileImageUrl] = useState<undefined | string>(
    undefined
  );

  const mutation = useRemoveRefreshToken();

  // Login State Double Checker
  useEffect(() => {
    setIsLoggedIn(hasValidToken());
  }, []);

  const logout = throttle(async () => {
    try {
      await mutation.mutateAsync();
    } catch (e) {
      console.warn(e);
    }

    setIsLoggedIn(false);
    setUsername("");
    setDisplayName("");
    removeTokenFromBrowser();
  }, 2000);

  const changeProfileImageId = (id: number) => {
    setProfileImageIdInStorage(id);
    setProfileImageId(id);
  };

  const globalValue = {
    selectedMenu,
    changeMenu: setSelectedMenu,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    logout,
    displayName,
    setDisplayName,
    sidebarOpen,
    setSidebarOpen,
    profileImageId,
    changeProfileImageId,
    profileImageUrl,
    setProfileImageUrl,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
