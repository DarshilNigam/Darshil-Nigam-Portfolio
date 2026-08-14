import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Resets the window scroll position on every route change. React
 * Router does not do this automatically, so without it a route
 * navigated to from further down a previous page (e.g. clicking
 * "EXPLORE THE VAULT →" near the bottom of Home) inherits that
 * scroll offset instead of opening at the top.
 *
 * Mounted once in App.jsx at the router level — this is the single
 * scroll-position fix for the whole app, covering every current and
 * future route (including sections composed onto a route, like
 * "Why Work With Me" on /vault). Renders nothing; no visual output.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
