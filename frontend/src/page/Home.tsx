// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { ArticleResponseDto } from "../types";
import { articleApi } from "../api/article.api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ArticleCard from "../component/ArticleCard";

const LEVEL_FILTERS = [
  { value: "ALL", label: "Tous" },
  { value: "DEBUTANT", label: "Débutant" },
  { value: "INTERMEDIAIRE", label: "Intermédiaire" },
  { value: "AVANCE", label: "Avancé" },
] as const;

export default function Home() {
  const [articles, setArticles] = useState<ArticleResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  useEffect(() => {
    articleApi
      .getAll()
      .then((data) => setArticles(data))
      .catch((err) => console.error("Erreur chargement articles:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles =
    selectedLevel === "ALL"
      ? articles
      : articles.filter((article) => article.level === selectedLevel);

  return (
    <>
      <Helmet>
        <title>DjPlace - Cours de DJ en ligne, Tutoriels et Matériel</title>
        <meta
          name="description"
          content="La plateforme historique de référence pour apprendre le mix, structurer ses sets et maîtriser son matériel DJ."
        />
        <link rel="canonical" href="https://www.djplace.fr/" />
      </Helmet>

      <div className="min-h-screen bg-slate-800 bg-[url('/images/abstract-nightlife-background.jpg')] bg-cover bg-center bg-fixed bg-no-repeat bg-blend-overlay text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
        <Navbar />

        <main className="grow relative z-10">
          {/* Hero Section resserré */}
          <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Cours de DJ en ligne · Accès libre &amp; Membres
              </div>

              {/* Titre principal */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Le rendez-vous des DJs pour{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
                  perfectionner leur mix
                </span>
              </h1>

              {/* Description alignée SEO & contenu */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Cours de DJ en ligne, actus et conseils pour apprendre à mixer
                et maîtriser son matériel DJ.
              </p>
            </div>
          </section>

          {/* Grille principale : Articles & Sidebar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Colonne centrale : Articles dynamiques */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    Dernières publications & Dossiers
                  </h2>
                </div>

                {/* Widget de sélection du niveau */}
                <div className="bg-slate-950/75 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 mr-1">
                      Filtrer par niveau :
                    </span>
                    {LEVEL_FILTERS.map((levelItem) => {
                      const isActive = selectedLevel === levelItem.value;
                      return (
                        <button
                          key={levelItem.value}
                          type="button"
                          onClick={() => setSelectedLevel(levelItem.value)}
                          className={`cursor-pointer text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all ${
                            isActive
                              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm shadow-amber-500/20"
                              : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-amber-400"
                          }`}
                        >
                          {levelItem.label}
                        </button>
                      );
                    })}
                  </div>

                  {!loading && (
                    <span className="text-xs text-slate-400">
                      {filteredArticles.length}{" "}
                      {filteredArticles.length > 1 ? "articles" : "article"}
                    </span>
                  )}
                </div>

                {loading ? (
                  <p className="text-slate-400 text-center py-10">
                    Chargement des articles...
                  </p>
                ) : filteredArticles.length === 0 ? (
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3">
                    <p className="text-slate-400 text-sm">
                      {selectedLevel === "ALL"
                        ? "Aucun article publié pour le moment."
                        : "Aucun article publié pour ce niveau pour le moment."}
                    </p>
                    {selectedLevel !== "ALL" && (
                      <button
                        type="button"
                        onClick={() => setSelectedLevel("ALL")}
                        className="cursor-pointer text-xs font-bold text-amber-400 hover:underline"
                      >
                        Afficher tous les niveaux
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Droite */}
              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-slate-950/75 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    Rubriques
                  </h3>
                  <ul className="space-y-3 text-xs font-medium text-slate-400">
                    <li>
                      <Link
                        to="/articles/type/MATERIEL"
                        className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          🎛️ Matériel & Régies
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/articles/type/TUTO"
                        className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          🎧 Cours de Mix & Tutoriels
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/articles/type/WARMUP_SELECTION"
                        className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          🔥 Warm-up Selection
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
