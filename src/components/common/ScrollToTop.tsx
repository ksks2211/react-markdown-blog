import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";
import { FaArrowCircleUp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import throttle from "lodash-es/throttle";

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", throttle(checkVisibility, 300));
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power2.inOut",
    });

    setIsVisible(false);
  };

  return (
    isVisible && (
      <button className={styles.ScrollToTop} onClick={scrollToTop}>
        <FaArrowCircleUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
