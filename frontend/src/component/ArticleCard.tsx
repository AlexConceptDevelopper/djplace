// src/component/ArticleCard.tsx
import { Link, useNavigate } from "react-router-dom";
import type { ArticleResponseDto } from "../types";

interface ArticleCardProps {
  article: ArticleResponseDto;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();
  const articleUrl = `/articles/${article.slug}`;
  const commentCount = article.commentCount ?? 0;

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "DEBUTANT":
        return "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40";
      case "INTERMEDIAIRE":
        return "bg-blue-950/80 text-blue-400 border border-blue-800/40";
      case "AVANCE":
        return "bg-purple-950/80 text-purple-400 border border-purple-800/40";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  return (
    <article
      onClick={() => navigate(articleUrl)}
      className="group bg-slate-950/75 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md hover:border-amber-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {article.mainImageUrl && (
          <div className="w-full h-48 overflow-hidden border-b border-slate-800/80">
            <img
              src={article.mainImageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-slate-900 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-800">
              {article.type}
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-md ${getLevelBadgeClass(article.level)}`}
            >
              {article.level}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug">
            <Link
              to={articleUrl}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {article.title}
            </Link>
          </h3>

          <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {article.summary || "Découvre ce dossier complet sur djplace.fr..."}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400 truncate">
            {article.categoryName || "Général"}
          </span>

          <span
            className="inline-flex items-center gap-1.5 text-slate-500 shrink-0"
            title={`${commentCount} commentaire${commentCount > 1 ? "s" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-slate-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2c-4.418 0-8 3.134-8 7 0 1.76.74 3.366 1.958 4.582-.19.993-.658 2.022-1.42 2.75a.75.75 0 0 0 .52 1.288c1.497 0 2.866-.486 3.93-1.158.958.248 1.968.388 3.012.388 4.418 0 8-3.134 8-7s-3.582-7-8-7Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{commentCount}</span>
          </span>

          <span className="shrink-0">
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString("fr-FR")
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}