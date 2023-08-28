import { useEffect, ComponentType } from "react";

type WindowScroll = Window &
  typeof globalThis & {
    scrollFinished?: number;
  };

function withScroll<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
) {
  return function ScrollComponent(props: T) {
    useEffect(() => {
      let scrolling = false;

      const showScrollbar = () => {
        document.documentElement.style.setProperty(
          "--scrollbar-background-color",
          "#939393"
        );
        scrolling = true;
      };

      const hideScrollbar = () => {
        if (scrolling) {
          document.documentElement.style.setProperty(
            "--scrollbar-background-color",
            "transparent"
          );
          scrolling = false;
        }
      };

      const windowScroll = window as WindowScroll;

      windowScroll.addEventListener("scroll", showScrollbar);
      windowScroll.addEventListener("scroll", function () {
        clearTimeout(windowScroll.scrollFinished);
        windowScroll.scrollFinished = setTimeout(hideScrollbar, 1000);
      });

      return () => {
        // Cleanup event listeners on component unmount
        windowScroll.removeEventListener("scroll", showScrollbar);
        windowScroll.removeEventListener("scroll", hideScrollbar);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withScroll;
