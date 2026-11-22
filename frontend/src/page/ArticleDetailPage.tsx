// src/pages/ArticleDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articleApi } from "../api/article.api";
import type { ArticleResponseDto } from "../types";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ArticleResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    articleApi
      .getBySlug(slug)
      .then((data) => {
        if (!data) setError(true);
        else setArticle(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 mb-8 transition-colors"
        >
          ← Retour aux articles
        </button>

        {loading ? (
          <div className="text-center py-20 text-amber-400 animate-pulse font-medium">
            Chargement de l'article...
          </div>
        ) : error || !article ? (
          <div className="bg-slate-950/75 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">
              Article introuvable
            </h1>
            <p className="text-slate-400 text-sm">
              Cet article n'existe pas ou n'est pas encore publié.
            </p>
          </div>
        ) : (
          <>
            <Helmet>
              <title>{article.title} | DJ Place</title>

              <meta
                name="description"
                content={
                  article.summary ||
                  "Guide et tutoriel DJ sur djplace.fr pour progresser au mix et maîtriser son matériel."
                }
              />

              {/* Adresse officielle propre à cet article */}
              <link
                rel="canonical"
                href={`https://www.djplace.fr/articles/${article.slug}`}
              />

              {/* Open Graph (Facebook, WhatsApp, LinkedIn...) */}
              <meta property="og:type" content="article" />
              <meta
                property="og:url"
                content={`https://www.djplace.fr/articles/${article.slug}`}
              />
              <meta property="og:title" content={article.title} />
              <meta
                property="og:description"
                content={
                  article.summary ||
                  "Guide et tutoriel DJ sur djplace.fr pour progresser au mix et maîtriser son matériel."
                }
              />
              {article.mainImageUrl && (
                <meta property="og:image" content={article.mainImageUrl} />
              )}

              {/* Twitter / X */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={article.title} />
              <meta
                name="twitter:description"
                content={
                  article.summary ||
                  "Guide et tutoriel DJ sur djplace.fr pour progresser au mix et maîtriser son matériel."
                }
              />
              {article.mainImageUrl && (
                <meta name="twitter:image" content={article.mainImageUrl} />
              )}
            </Helmet>

            <article className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
              {/* En-tête de l'article */}
              <header className="space-y-4 border-b border-slate-800/80 pb-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full">
                    {article.type}
                  </span>
                  <span className="bg-slate-900 text-slate-300 border border-slate-800 px-3 py-1 rounded-full">
                    {article.categoryName}
                  </span>
                  <span className="text-slate-500 ml-auto">
                    Publié le{" "}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("fr-FR")
                      : ""}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {article.title}
                </h1>

                {article.summary && (
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed italic">
                    {article.summary}
                  </p>
                )}
              </header>

              {/* Image principale si présente */}
              {article.mainImageUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={article.mainImageUrl}
                    alt={article.title}
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Contenu HTML généré par l'éditeur */}
              <div
                className="space-y-4 text-slate-300 leading-relaxed text-base [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_strong]:text-white [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_a]:text-amber-400 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
