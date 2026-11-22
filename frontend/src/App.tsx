import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import ProfilPage from './page/ProfilPage';
import DashboardPage from './page/DashboardPage';
import ArticleDetailPage from './page/ArticleDetailPage';
import { HelmetProvider } from 'react-helmet-async';
import ArticlesByTypePage from './page/ArticlesByTypePage';
import AnalyticsTracker from './component/AnalyticsTracker';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/articles/type/:type" element={<ArticlesByTypePage />} />
          
          {/* Routes d'authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Espace membre & Profil */}
          <Route path="/profil" element={<ProfilPage />} />

          {/* Espace d'administration (CMS / Articles) */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}