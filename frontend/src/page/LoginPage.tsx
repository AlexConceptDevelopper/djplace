import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../api/user";
import Navbar from "../component/Navbar";

export default function ProfilPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // États pour la modale de suppression
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }

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
      setUsername(payload.sub || "Utilisateur");
      setEmail(payload.email || "");
      setRole(payload.role || "ROLE_USER");
    } catch (e) {
      console.error("Erreur lors de la lecture du token", e);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setErrorMessage("");
    try {
      await deleteMyAccount();
      localStorage.removeItem("jwt_token");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Une erreur est survenue lors de la suppression.");
      setIsDeleting(false);
    }
  };

  const isAdmin = role === "ADMIN";

  // Formattage du rôle pour l'affichage
  const displayRole = isAdmin ? "Administrateur ⚡" : "Membre de la communauté 🎧";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Intégration de la vraie Navbar */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* En-tête de bienvenue */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Espace Personnel
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Salut, {username} ! 🎧
            </h1>
            <p className="text-slate-400 text-sm">
              Gère tes informations personnelles et les paramètres de ton compte.
            </p>
          </div>
          
          <div className="flex items-center gap-3 z-10">
            {isAdmin && (
              <button
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer text-xs font-bold text-amber-400 hover:text-amber-300 transition-all bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-4 py-3 rounded-2xl shadow-lg shadow-amber-500/5 flex items-center gap-2"
              >
                Dashboard Admin ⚙️
              </button>
            )}
            <button
              onClick={handleLogout}
              className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white transition-all bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2"
            >
              Se déconnecter 🚪
            </button>
          </div>
        </div>

        {/* Carte des informations utilisateur */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl space-y-6 backdrop-blur-md">
          <h2 className="text-lg font-bold text-white border-b border-slate-800/80 pb-4 flex items-center gap-2">
            <span>📋</span> Détails du compte
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-2xl space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pseudo</span>
              <p className="text-white font-semibold text-base">{username}</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-2xl space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Adresse Email</span>
              <p className="text-white font-semibold text-base truncate" title={email}>{email || "Non renseigné"}</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-2xl space-y-1">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Statut / Rôle</span>
              <p className="text-amber-400 font-semibold text-sm pt-0.5">{displayRole}</p>
            </div>
          </div>
        </div>

        {/* Section Zone de Danger (RGPD) */}
        <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Zone de danger</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La suppression de ton compte est définitive et effacera l'ensemble de tes données personnelles conformément aux réglementations RGPD.
            </p>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="cursor-pointer whitespace-nowrap text-xs font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 border border-red-500/30 px-5 py-3 rounded-2xl transition-all shadow-lg shadow-red-600/10"
          >
            Supprimer mon compte
          </button>
        </div>

      </main>

      {/* Modale de confirmation RGPD */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">
                Action irréversible
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Êtes-vous sûr de vouloir supprimer votre compte ?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cette action entraînera la suppression totale et définitive de toutes vos données personnelles conformément au RGPD. Vous ne pourrez plus récupérer votre accès.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
                className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="cursor-pointer px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {isDeleting ? "Suppression..." : "Oui, supprimer définitivement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}