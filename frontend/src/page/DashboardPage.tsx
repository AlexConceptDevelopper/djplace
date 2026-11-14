import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../component/Navbar";
import Editor from "../component/Editor";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth("ROLE_ADMIN");

  // État pour gérer l'onglet actif : "overview", "articles", "users", "hardware"
  const [activeTab, setActiveTab] = useState("overview");

  // États pour le formulaire d'article
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleArticleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!editorData.trim() || editorData === "<p></p>") {
      setErrorMessage("Le contenu de l'article ne peut pas être vide.");
      return;
    }

    setIsSubmitting(true);

    const articlePayload = {
      title,
      content: editorData,
      author: user?.username,
    };

    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch("http://localhost:8080/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(articlePayload),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la publication de l'article.");
      }

      setSuccessMessage("Article publié avec succès ! 🚀");
      setTitle("");
      setEditorData("");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-amber-400 font-medium animate-pulse">Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* En-tête Admin */}
        <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Panneau de Contrôle ⚡
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Dashboard de {user?.username}
            </h1>
            <p className="text-slate-400 text-sm">
              Supervise l'activité de djplace.fr, gère les articles et modère la communauté.
            </p>
          </div>

          <button
            onClick={() => navigate("/profil")}
            className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-4 py-3 rounded-2xl transition-all shadow-lg z-10"
          >
            Mon Profil 👤
          </button>
        </div>

        {/* Barre de Navigation par Onglets */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "overview" ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"}`}
          >
            📊 Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "articles" ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"}`}
          >
            📝 Gestion des Articles
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "users" ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"}`}
          >
            👥 Utilisateurs
          </button>
          <button
            onClick={() => setActiveTab("hardware")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "hardware" ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20" : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"}`}
          >
            🎛️ Fiches Matériel
          </button>
        </div>

        {/* --- ONGLET : VUE D'ENSEMBLE --- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div onClick={() => setActiveTab("articles")} className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl space-y-2 cursor-pointer hover:border-amber-500/50 transition">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Articles & Tutoriels</span>
                <p className="text-3xl font-black text-white">--</p>
                <p className="text-xs text-amber-400 font-semibold pt-1">Gérer les publications 📝</p>
              </div>

              <div onClick={() => setActiveTab("users")} className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl space-y-2 cursor-pointer hover:border-amber-500/50 transition">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Membres inscrits</span>
                <p className="text-3xl font-black text-white">--</p>
                <p className="text-xs text-amber-400 font-semibold pt-1">Voir la communauté 🎧</p>
              </div>

              <div onClick={() => setActiveTab("hardware")} className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl space-y-2 cursor-pointer hover:border-amber-500/50 transition">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Matériel référencé</span>
                <p className="text-3xl font-black text-white">--</p>
                <p className="text-xs text-amber-400 font-semibold pt-1">Gérer les fiches tech 🎛️</p>
              </div>
            </div>
          </div>
        )}

        {/* --- ONGLET : ARTICLES (Avec l'éditeur Tiptap) --- */}
        {activeTab === "articles" && (
          <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-4 flex items-center gap-2">
              <span>📝</span> Rédiger un nouvel article ou tutoriel
            </h2>

            <form onSubmit={handleArticleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Titre de l'article (H1 principal)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Ex: Bien débuter avec ses platines vinyles..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contenu de l'article (Éditeur riche)
                </label>
                <Editor onChange={(htmlContent) => setEditorData(htmlContent)} initialContent={editorData} />
              </div>

              {successMessage && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/15 disabled:opacity-50"
              >
                {isSubmitting ? "Publication en cours..." : "Publier l'article 🚀"}
              </button>
            </form>
          </div>
        )}

        {/* --- ONGLET : UTILISATEURS --- */}
        {activeTab === "users" && (
          <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-4">
              👥 Gestion des membres de la communauté
            </h2>
            <p className="text-slate-400 text-sm">Tableau de gestion des utilisateurs à venir...</p>
          </div>
        )}

        {/* --- ONGLET : MATÉRIEL --- */}
        {activeTab === "hardware" && (
          <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-4">
              🎛️ Gestion du matériel référencé
            </h2>
            <p className="text-slate-400 text-sm">Catalogue des fiches techniques du matériel à venir...</p>
          </div>
        )}

      </main>
    </div>
  );
}