import { Routes, Route } from 'react-router-dom';
import GrainOverlay from './components/GrainOverlay.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ScrollCue from './components/ScrollCue.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Home from './pages/Home.jsx';
import Vault from './pages/Vault.jsx';
import WhyWorkWithMe from './sections/WhyWorkWithMe.jsx';

/**
 * App — route shell.
 * GrainOverlay, ScrollCue, and ThemeToggle are mounted once here
 * so they're consistent across every route without touching the
 * page files themselves. Homepage content lives untouched in
 * pages/Home.jsx; The Vault lives in pages/Vault.jsx. The
 * "Why Work With Me" section is composed after Vault on the same
 * route here, so Vault.jsx itself is never modified. ScrollToTop
 * resets scroll position on every route change.
 */
export default function App() {
  return (
    <>
      <GrainOverlay />
      <ScrollCue />
      <ThemeToggle />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/vault"
          element={
            <>
              <Vault />
              <WhyWorkWithMe />
            </>
          }
        />
      </Routes>
    </>
  );
}
