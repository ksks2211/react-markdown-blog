import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import throttle from "lodash-es/throttle";
import { styled } from "@mui/material";
import { darken } from "polished";

gsap.registerPlugin(ScrollToPlugin);

const StyledButton = styled("button")`
  position: fixed;
  right: 50%;
  bottom: 2rem;
  font-size: 2.6rem;
  z-index: 1;
  cursor: pointer;
  color: #428ae8;
  background: none;
  border-radius: 50px;
  border: none;
  opacity: 0.5;
  transform: translateX(50%);
  transition: 0.2s;
  z-index: 999;

  &:hover,
  &:active {
    color: ${darken(0.1, "#6189be")};
    opacity: 0.8;
    transform: translateY(-30%) translateX(50%) scale(1.2);
  }
`;

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.33) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", throttle(checkVisibility, 1000));
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
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
      <StyledButton onClick={scrollToTop}>
        <FaArrowCircleUp />
      </StyledButton>
    )
  );
};

export default ScrollToTopButton;
