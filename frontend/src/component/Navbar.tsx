// src/component/Navbar.tsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  // Vérification de la connexion à chaque changement de route ou montage
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payload = JSON.parse(jsonPayload);
        setUsername(payload.username || "Mon Profil");
      } catch (e) {
        setUsername("Mon Profil");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="border-b border-slate-800/60 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo vers l'accueil */}
        <Link to="/" className="flex items-center cursor-pointer h-full py-2">
          <img
            src="/djplace-logo.jpg"
            alt="DJPLACE.FR"
            className="h-12 w-auto object-contain hover:opacity-95 transition-opacity"
          />
        </Link>

        {/* Navigation principale */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <span className="hover:text-amber-400 transition-colors cursor-pointer">
            Tutoriels
          </span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer">
            Matériel
          </span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer">
            Warm-up
          </span>
          <span className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
            Cours
            <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-1.5 py-0.5 rounded-full font-semibold">
              Accès libre & Membres
            </span>
          </span>
        </nav>

        {/* Boutons dynamiques selon l'authentification */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/profil")}
                className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
              >
                <span>🎧</span> {username}
              </button>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                title="Se déconnecter"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-95"
            >
              Connexion / Inscription
            </button>
          )}
        </div>
      </div>
    </header>
  );
}