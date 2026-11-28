import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/95 backdrop-blur-md text-slate-400 text-xs relative z-10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Colonne 1 : Marque & Éditeur */}
        <div className="space-y-3">
          <Link to="/" className="inline-block text-base font-extrabold tracking-tight text-slate-100">
            djplace<span className="text-amber-400">.fr</span>
          </Link>
          <p className="text-slate-500 leading-relaxed">
            Guides pratiques, tests matériel et conseils pour préparer vos sets et soirées DJ.
          </p>
          <p className="text-slate-500">
            Une plateforme éditée par{" "}
            <a
              href="https://www.cubtaik.fr"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-400 underline underline-offset-2 transition-colors"
            >
              CubTaik
            </a>
          </p>
        </div>

        {/* Colonne 2 : Thématiques principales */}
        <div>
          <h3 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
            Rubriques
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/articles/type/tutos" className="hover:text-amber-400 transition-colors">
                Tutos DJ
              </Link>
            </li>
            <li>
              <Link to="/articles/type/materiel" className="hover:text-amber-400 transition-colors">
                Matériel &amp; Régie
              </Link>
            </li>
            <li>
              <Link to="/articles/type/warm-up" className="hover:text-amber-400 transition-colors">
                Warm-up &amp; Ambiance
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Navigation & Espace membre */}
        <div>
          <h3 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
            Navigation
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-amber-400 transition-colors">
                Connexion
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-amber-400 transition-colors">
                Créer un compte
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Informations */}
        <div>
          <h3 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
            Informations
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:contact@djplace.fr"
                className="hover:text-amber-400 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <Link to="/mentions-legales" className="hover:text-amber-400 transition-colors">
                Mentions Légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre basse */}
      <div className="border-t border-slate-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© {year} djplace.fr — Tous droits réservés.</p>
          <p className="text-[11px]">France</p>
        </div>
      </div>
    </footer>
  );
}