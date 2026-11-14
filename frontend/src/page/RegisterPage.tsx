import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);

    try {
      await register({ username, email, password });

      setSuccessMessage("Compte créé avec succès ! Redirection vers la connexion...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 bg-[url('/images/abstract-nightlife-background.jpg')] bg-cover bg-center bg-fixed bg-no-repeat bg-blend-overlay text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative">
      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/85 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-12">
              <Link to="/" className="inline-flex cursor-pointer items-center h-12 py-1">
                <img
                  src="/djplace-logo.jpg"
                  alt="DJPLACE.FR"
                  className="h-30 w-auto object-contain hover:opacity-95 transition-opacity"
                />
              </Link>

              <div className="mt-8">
                <p className="text-sm font-semibold text-amber-400">Rejoignez-nous.</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-white">
                  Créer un compte djplace
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Partagez vos avis, notez le meilleur matériel et échangez avec les passionnés.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5" autoComplete="off">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Nom d'utilisateur (Pseudo)
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={20}
                    autoComplete="off"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                    placeholder="MonPseudoDJ"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                    placeholder="jean.dupont@gmail.com"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        {showPassword ? "Cacher" : "Voir"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Confirmer
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        {showConfirmPassword ? "Cacher" : "Voir"}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div role="alert" className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/15 transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Création du compte..." : "Créer mon compte"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                Déjà un compte ?{" "}
                <Link to="/login" className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                  Se connecter
                </Link>
              </div>
            </div>

            {/* Panneau latéral droit : Ce que peut faire un membre inscrit */}
            <div className="relative hidden overflow-hidden border-l border-slate-800/80 bg-linear-to-br from-amber-500/10 via-slate-950 to-orange-600/10 p-10 lg:flex lg:flex-col lg:justify-between">
              <div className="relative">
                <div className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Espace Membre djplace
                </div>
                <h2 className="mt-6 text-2xl font-black tracking-tight text-white">
                  Pourquoi créer ton compte ?
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Rejoins la communauté pour interagir et progresser dans ton mix.
                </p>
              </div>

              <div className="relative space-y-4 my-auto">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <span className="text-amber-400 text-lg">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-white">Note et commente le matos</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Partage ton avis d'expert sur les platines, tables de mixage et équipements du marché.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <span className="text-amber-400 text-lg">🎧</span>
                  <div>
                    <p className="text-xs font-bold text-white">Accède aux cours & tutos</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Profite de tous les guides de mix, techniques de warm-up et sélections réservées aux membres.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <span className="text-amber-400 text-lg">💬</span>
                  <div>
                    <p className="text-xs font-bold text-white">Échange avec la communauté</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Participe aux discussions, pose tes questions et partage ton expérience de DJ.</p>
                  </div>
                </div>
              </div>

              <div className="relative text-xs text-slate-500 border-t border-slate-800/60 pt-4">
                100% gratuit • Communauté passionnée de DJs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}