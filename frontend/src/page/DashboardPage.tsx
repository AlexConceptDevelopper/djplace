// src/pages/DashboardPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../component/Navbar";
import ArticleManager from "../component/ArticleManager";
import CategoryManager from "../component/CategoryManager";
import { articleApi } from "../api/article.api";
import { categoryApi } from "../api/category.api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth("ROLE_ADMIN");

  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "categories">("overview");
  
  // Stats rapides pour la vue d'ensemble
  const [articlesCount, setArticlesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const [articles, categories] = await Promise.all([
          articleApi.getAll(),
          categoryApi.getAll(),
        ]);
        setArticlesCount(articles.length);
        setCategoriesCount(categories.length);
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques du dashboard :", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [activeTab]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-amber-400 font-medium animate-pulse">Vérification des accès administrateur...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* --- EN-TÊTE ADMIN --- */}
        <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Panneau de Contrôle ⚡
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Dashboard de {user?.username || "Admin"}
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Supervise l'activité de djplace.fr, publie tes tutoriels, gère les catégories et pilote ton contenu en toute simplicité.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => navigate("/profil")}
              className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-4 py-3 rounded-2xl transition-all shadow-lg flex items-center gap-2"
            >
              <span>👤</span> Mon Profil
            </button>
          </div>
        </div>

        {/* --- NAVIGATION PAR ONGLETS --- */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <span>📊</span> Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === "articles"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <span>📝</span> Gestion des Articles
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-2 ${
              activeTab === "categories"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <span>📁</span> Gestion des Catégories
          </button>
        </div>

        {/* --- CONTENU DE L'ONGLET : VUE D'ENSEMBLE --- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Carte Stats Articles */}
              <div 
                onClick={() => setActiveTab("articles")}
                className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl hover:border-amber-500/50 transition cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Articles & Tutoriels</span>
                  <span className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                    📝
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">
                    {loadingStats ? "..." : articlesCount}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Articles enregistrés sur la plateforme</p>
                </div>
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1 pt-2">
                  Gérer les articles →
                </div>
              </div>

              {/* Carte Stats Catégories */}
              <div 
                onClick={() => setActiveTab("categories")}
                className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl hover:border-amber-500/50 transition cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Catégories</span>
                  <span className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition">
                    📁
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">
                    {loadingStats ? "..." : categoriesCount}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Catégories de classement actives</p>
                </div>
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1 pt-2">
                  Gérer les catégories →
                </div>
              </div>

            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚡</span> Actions rapides
              </h2>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setActiveTab("articles")}
                  className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-5 py-3 rounded-xl font-bold text-xs transition"
                >
                  + Rédiger un nouvel article
                </button>
                <button
                  onClick={() => setActiveTab("categories")}
                  className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-orange-400 border border-slate-700 px-5 py-3 rounded-xl font-bold text-xs transition"
                >
                  + Ajouter une catégorie
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTENU DE L'ONGLET : ARTICLES --- */}
        {activeTab === "articles" && <ArticleManager />}

        {/* --- CONTENU DE L'ONGLET : CATÉGORIES --- */}
        {activeTab === "categories" && <CategoryManager />}

      </main>
    </div>
  );
}