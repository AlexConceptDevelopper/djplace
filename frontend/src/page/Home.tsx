// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { ArticleResponseDto } from "../types";
import { articleApi } from "../api/article.api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ArticleCard from "../component/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState<ArticleResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleApi
      .getAll()
      .then((data) => setArticles(data))
      .catch((err) => console.error("Erreur chargement articles:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>djplace.fr - Cours de DJ en ligne, Tutoriels et Matériel</title>
        <meta
          name="description"
          content="La plateforme historique de référence pour apprendre le mix, structurer ses sets et maîtriser son matériel DJ."
        />
        <link rel="canonical" href="https://www.djplace.fr/" />
      </Helmet>

      <div className="min-h-screen bg-slate-800 bg-[url('/images/abstract-nightlife-background.jpg')] bg-cover bg-center bg-fixed bg-no-repeat bg-blend-overlay text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
        <Navbar />

        <main className="grow relative z-10">
          {/* Hero Section */}
          <section className="py-16 lg:py-24 border-b border-slate-800/50 bg-slate-950/40 backdrop-blur-xs">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Cours de DJ en ligne & Gratuit
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
                Le rendez-vous des DJs pour{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">
                  perfectionner leur mix
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal mb-10 leading-relaxed drop-shadow-sm">
                Retrouve l'esprit de la plateforme historique : des guides
                pratiques, des analyses de régies platines et des techniques
                pour enchaîner comme un pro.
              </p>
            </div>
          </section>

          {/* Grille principale : Articles & Sidebar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Colonne centrale : Articles dynamiques */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    Dernières publications & Dossiers
                  </h2>
                </div>

                {loading ? (
                  <p className="text-slate-400 text-center py-10">
                    Chargement des articles...
                  </p>
                ) : articles.length === 0 ? (
                  <p className="text-slate-400 text-center py-10">
                    Aucun article publié pour le moment.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
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
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        🎛️ Matériel & Régies
                      </span>
                    </li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        🎧 Cours de Mix & Scratch
                      </span>
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
