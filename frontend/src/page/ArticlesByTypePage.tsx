// src/pages/ArticlesByTypePage.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import type { ArticleResponseDto, ArticleType } from "../types";
import { articleApi } from "../api/article.api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ArticleCard from "../component/ArticleCard";

const TYPE_CONFIG: Record<
  string,
  { label: string; description: string; seoTitle: string }
> = {
  TUTO: {
    label: "Tutoriels & Cours DJ",
    description:
      "Guides pratiques, techniques de mix et conseils pas à pas pour progresser sur djplace.fr.",
    seoTitle: "Tutoriels DJ | DJ Place",
  },
  MATERIEL: {
    label: "Matériel & Régies DJ",
    description:
      "Analyses de contrôleurs, platines, tables de mixage et configurations de régie.",
    seoTitle: "Matériel DJ | DJ Place",
  },
  WARMUP_SELECTION: {
    label: "Warm-up Selection",
    description:
      "Inspirations, ambiances et pistes pour lancer une soirée et chauffer le dancefloor.",
    seoTitle: "Warm-up DJ | DJ Place",
  },
  ACTU: {
    label: "Actualités DJ",
    description:
      "Les dernières actualités et dossiers de la scène et du métier de DJ.",
    seoTitle: "Actualités DJ | DJ Place",
  },
};

export default function ArticlesByTypePage() {
  const { type } = useParams<{ type: string }>();
  const normalizedType = (type || "TUTO").toUpperCase();
  const config = TYPE_CONFIG[normalizedType] || {
    label: `Articles — ${normalizedType}`,
    description: "Tous les articles publiés sur djplace.fr.",
    seoTitle: `${normalizedType} | DJ Place`,
  };

  const [articles, setArticles] = useState<ArticleResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    articleApi
      .getAll()
      .then((data) => {
        const filtered = data.filter(
          (art) => (art.type as ArticleType) === normalizedType
        );
        setArticles(filtered);
      })
      .catch((err) =>
        console.error("Erreur chargement articles par catégorie:", err)
      )
      .finally(() => setLoading(false));
  }, [normalizedType]);

  return (
    <>
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.description} />
        <link
          rel="canonical"
          href={`https://www.djplace.fr/articles/type/${normalizedType}`}
        />
      </Helmet>

      <div className="min-h-screen bg-slate-800 bg-[url('/images/abstract-nightlife-background.jpg')] bg-cover bg-center bg-fixed bg-no-repeat bg-blend-overlay text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
        <Navbar />

        <main className="grow relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 mb-6 transition-colors"
          >
            ← Retour à l'accueil
          </Link>

          <div className="bg-slate-950/75 border border-slate-800/80 rounded-3xl p-6 sm:p-8 mb-8 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Rubrique
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
              {config.label}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              {config.description}
            </p>
          </div>

          {loading ? (
            <p className="text-slate-400 text-center py-12">
              Chargement des articles...
            </p>
          ) : articles.length === 0 ? (
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-10 text-center space-y-3">
              <p className="text-slate-300 font-medium">
                Aucun article publié dans cette rubrique pour le moment.
              </p>
              <Link
                to="/"
                className="inline-block text-xs font-bold text-amber-400 hover:underline"
              >
                Voir toutes les publications récentes →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}