import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../component/Footer';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Helmet>
        <title>Mentions Légales – djplace.fr</title>
        <meta
          name="description"
          content="Mentions légales du site djplace.fr édité par l'entreprise individuelle CubTaik."
        />
        <link rel="canonical" href="https://www.djplace.fr/mentions-legales" />
      </Helmet>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Bouton Retour */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-colors mb-10"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-6">
          Mentions Légales
        </h1>

        <p className="text-slate-400 leading-relaxed mb-10">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), il est précisé aux utilisateurs du site <strong className="text-slate-100">djplace.fr</strong> l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-3">
            1. Édition du site
          </h2>
          <p className="text-slate-400 mb-4">
            Le présent site est édité par l&apos;entreprise individuelle <strong className="text-slate-100">CubTaik</strong> :
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-slate-100">Entrepreneur individuel :</strong> Alexandre Cubizolle
            </li>
            <li>
              <strong className="text-slate-100">Nom commercial :</strong> CubTaik
            </li>
            <li>
              <strong className="text-slate-100">SIREN :</strong> 109 752 832
            </li>
            <li>
              <strong className="text-slate-100">Siège social :</strong> 3 Chem des Brandes, 17600 Sablonceaux, France
            </li>
            <li>
              <strong className="text-slate-100">TVA :</strong> TVA non applicable, art. 293 B du CGI
            </li>
            <li>
              <strong className="text-slate-100">Directeur de la publication :</strong> Alexandre Cubizolle
            </li>
            <li>
              <strong className="text-slate-100">Contact :</strong>{' '}
              <a
                href="mailto:contact@djplace.fr"
                className="text-amber-400 hover:underline"
              >
                contact@djplace.fr
              </a>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-3">
            2. Hébergement et Infrastructure
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-slate-100">Hébergement de la plateforme :</strong> Railway Corp. — 548 Market St PMB 68956, San Francisco, CA 94104, États-Unis (railway.com).
            </li>
            <li>
              <strong className="text-slate-100">Sécurité &amp; CDN :</strong> Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-3">
            3. Propriété intellectuelle
          </h2>
          <p className="text-slate-400 leading-relaxed">
            L&apos;ensemble des contenus présents sur le site <strong className="text-slate-100">djplace.fr</strong> (textes, tutoriels, visuels, logos, structure et code) est protégé par le droit d&apos;auteur et demeure la propriété exclusive de CubTaik, sauf mention contraire. Toute reproduction ou représentation totale ou partielle sans autorisation préalable est interdite.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-100 mb-3">
            4. Données personnelles et cookies
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Les informations recueillies via les formulaires d&apos;inscription ou de contact sont traitées uniquement pour la gestion des comptes utilisateurs et des échanges avec le support. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en écrivant à{' '}
            <a
              href="mailto:contact@djplace.fr"
              className="text-amber-400 hover:underline"
            >
              contact@djplace.fr
            </a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}