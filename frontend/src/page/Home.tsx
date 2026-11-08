import { Helmet } from "react-helmet-async";
import type { ArticleResponseDto } from "../type";

// Données de démo
const MOCK_ARTICLES: ArticleResponseDto[] = [
  {
    id: 1,
    title: "Comment réussir son premier Warm-up en club : Les règles d’or",
    slug: "reussir-premier-warmup-club",
    content: "",
    summary:
      "La gestion de l’énergie, le choix progressif des BPM et la communication avec la tête d’affiche : tout ce qu’il faut savoir pour ouvrir une soirée.",
    type: "WARMUP_SELECTION",
    level: "INTERMEDIAIRE",
    published: true,
    createdAt: "2026-11-01T10:00:00Z",
    categoryName: "Technique de Mix",
  },
  {
    id: 2,
    title: "Pioneer CDJ-3000 vs Opus Quad : Quel choix pour ta régie ?",
    slug: "pioneer-cdj-3000-vs-opus-quad",
    content: "",
    summary:
      "Comparatif détaillé des fonctionnalités, du workflow Rekordbox et du confort de mix pour orienter ton investissement hardware.",
    type: "MATERIEL",
    level: "AVANCE",
    published: true,
    createdAt: "2026-10-28T14:30:00Z",
    categoryName: "Matériel DJ",
  },
  {
    id: 3,
    title: "Comprendre la structure en 32 temps (Phrasing musical)",
    slug: "comprendre-structure-32-temps-phrasing",
    content: "",
    summary:
      "Les bases indispensables de la métrique pour caler tes transitions au millimètre sans casser le groove ni couper les phrases vocales.",
    type: "TUTO",
    level: "DEBUTANT",
    published: true,
    createdAt: "2026-10-20T09:15:00Z",
    categoryName: "Bases du DJing",
  },
  {
    id: 4,
    title: "Sélection House & Minimal : 10 pépites pour dynamiser vos sets",
    slug: "selection-house-minimal-pinites",
    content: "",
    summary:
      "Une sélection orientée micro-house et minimal tech house pour installer une ambiance hypnotique en début de nuit.",
    type: "WARMUP_SELECTION",
    level: "INTERMEDIAIRE",
    published: true,
    createdAt: "2026-10-15T18:00:00Z",
    categoryName: "Playlists & Warmup",
  },
];

export default function Home() {
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
    <>
      <Helmet>
        <title>djplace.fr - Cours de DJ en ligne, Tutoriels et Matériel</title>
        <meta
          name="description"
          content="La plateforme historique de référence pour apprendre le mix, structurer ses sets et maîtriser son matériel DJ."
        />
      </Helmet>

      {/* Conteneur principal avec fond fixe optimisé */}
      <div className="min-h-screen bg-slate-800 bg-[url('/images/abstract-nightlife-background.jpg')] bg-cover bg-center bg-fixed bg-no-repeat bg-blend-overlay text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
        {/* ================= NAVBAR ================= */}
        {/* ================= NAVBAR ================= */}
        <header className="border-b border-slate-800/60 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo Intégré & Centré */}
            <div className="flex items-center cursor-pointer h-full py-2">
              <img
                src="/djplace-logo.jpg"
                alt="DJPLACE.FR"
                className="h-full w-auto object-contain -ml-3 sm:-ml-5 hover:opacity-95 transition-opacity"
              />
            </div>

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
              <span className="hover:text-amber-400 transition-colors cursor-pointer">
                Cours Gratuits
              </span>
            </nav>

            <div>
              <button className="bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95">
                Espace Membre
              </button>
            </div>
          </div>
        </header>

        {/* ================= CONTENU PRINCIPAL ================= */}
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

              {/* Barre de recherche rapide */}
              <div className="max-w-lg mx-auto flex items-center bg-slate-950/85 border border-slate-800/80 rounded-xl p-2 shadow-2xl backdrop-blur-md focus-within:border-amber-500/50 transition-all">
                <input
                  type="text"
                  placeholder="Rechercher un cours, une platine, une technique..."
                  className="w-full bg-transparent border-none px-4 text-sm text-white focus:outline-none placeholder:text-slate-500"
                  disabled
                />
                <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer active:scale-95">
                  Chercher
                </button>
              </div>
            </div>
          </section>

          {/* Grille principale : Articles & Sidebar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Colonne centrale principale */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    Dernières publications & Dossiers
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_ARTICLES.map((article) => (
                    <article
                      key={article.id}
                      className="group bg-slate-950/75 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-amber-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
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
                          {article.title}
                        </h3>

                        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium text-slate-400">
                          {article.categoryName}
                        </span>
                        <span>
                          {new Date(article.createdAt).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Sidebar Droite */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Bloc Catégories */}
                <div className="bg-slate-950/75 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    Rubriques
                  </h3>
                  <ul className="space-y-3 text-xs font-medium text-slate-400">
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        🎛️ Matériel & Régies
                      </span>
                      <span className="text-slate-600 bg-slate-900 px-2 py-0.5 rounded">
                        12
                      </span>
                    </li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        🎧 Cours de Mix & Scratch
                      </span>
                      <span className="text-slate-600 bg-slate-900 px-2 py-0.5 rounded">
                        24
                      </span>
                    </li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        🔥 Sélections Warm-up
                      </span>
                      <span className="text-slate-600 bg-slate-900 px-2 py-0.5 rounded">
                        8
                      </span>
                    </li>
                    <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-between group">
                      <span className="group-hover:translate-x-1 transition-transform">
                        📂 Logiciels & MAO
                      </span>
                      <span className="text-slate-600 bg-slate-900 px-2 py-0.5 rounded">
                        15
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bloc Citation */}
                <div className="bg-linear-to-br from-amber-500/10 to-slate-950/85 border border-amber-500/20 rounded-2xl p-5 text-center backdrop-blur-md shadow-xl">
                  <p className="text-xs text-amber-300 font-semibold uppercase tracking-widest mb-2">
                    L'esprit d'origine
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Transmettre la passion du mix, du beatmatching et du son
                    club sans prise de tête."
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-slate-900 bg-slate-950/95 backdrop-blur-md text-slate-500 text-xs py-8 relative z-10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} djplace.fr — Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-slate-400 font-medium">
              <span className="hover:text-amber-400 transition-colors cursor-pointer">
                Accueil
              </span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">
                Mentions Légales
              </span>
              <span className="hover:text-amber-400 transition-colors cursor-pointer">
                Contact
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
