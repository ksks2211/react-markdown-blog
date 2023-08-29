import { useMediaQuery } from "react-responsive";

const useDeviceDetect = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return {
    isDesktop,
    isTablet,
    isTabletOrMobile,
    isMobile,
  };
};

export default useDeviceDetect;
