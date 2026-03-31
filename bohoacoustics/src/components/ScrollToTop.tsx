import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (hash) {
      return;
    }

    const forceScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run immediately and again after paint so smooth-scroll controllers cannot retain old position.
    forceScrollTop();
    const rafId = window.requestAnimationFrame(forceScrollTop);
    const timeoutId = window.setTimeout(forceScrollTop, 40);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
