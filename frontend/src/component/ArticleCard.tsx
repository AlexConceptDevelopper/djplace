// src/component/ArticleCard.tsx
import { useNavigate } from "react-router-dom";
import type { ArticleResponseDto } from "../types";

interface ArticleCardProps {
  article: ArticleResponseDto;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();

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
      onClick={() => navigate(`/articles/${article.slug}`)}
      className="group bg-slate-950/75 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-amber-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="bg-slate-900 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-800">
            {article.type}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${getLevelBadgeClass(article.level)}`}>
            {article.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {article.summary || "Découvre ce dossier complet sur djplace.fr..."}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-400">
          {article.categoryName || "Général"}
        </span>
        <span>
          {article.createdAt ? new Date(article.createdAt).toLocaleDateString("fr-FR") : ""}
        </span>
      </div>
    </article>
  );
}