// src/components/Footer.tsx
export default function Footer() {
  return (
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
  );
}