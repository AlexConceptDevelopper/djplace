import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import ProfilPage from './page/ProfilPage';
import DashboardPage from './page/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Routes d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Espace membre & Profil */}
        <Route path="/profil" element={<ProfilPage />} />

        {/* Espace d'administration (CMS / Articles) */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}