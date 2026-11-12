import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Routes d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}