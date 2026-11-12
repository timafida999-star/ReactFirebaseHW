import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Games from './pages/Games';

const About = lazy(() => import('./pages/About'));
const GameDetail = lazy(() => import('./pages/GameDetail'));
const NewGame = lazy(() => import('./pages/NewGame'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="games">
            <Route index element={<Games />} />
            <Route path=":id" element={<GameDetail />} />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewGame />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="wishlist" element={<Wishlist />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
