import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import NavBar from './NavBar';
import Loading from './Loading';

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar />
      <main className="page">
        <Suspense fallback={<Loading text="Loading level..." />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">
        Save Point · student project · game names and images belong to their owners
      </footer>
    </>
  );
}
