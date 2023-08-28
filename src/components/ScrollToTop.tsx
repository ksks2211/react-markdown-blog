import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";
import { FaArrowCircleUp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power2.inOut",
    });
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
