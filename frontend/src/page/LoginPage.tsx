import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ email, password });
      
      // Adaptation selon ce que ton back renvoie (token ou jwt)
      const token = data.token;
      if (token) {
        localStorage.setItem("jwt_token", token);
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Adresse e-mail ou mot de passe incorrect.");
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
              <Link
                to="/"
                className="inline-flex cursor-pointer items-center h-12 py-1"
              >
                <img
                  src="/djplace-logo.jpg"
                  alt="DJPLACE.FR"
                  className="h-30 w-auto object-contain hover:opacity-95 transition-opacity"
                />
              </Link>

              <div className="mt-8">
                <p className="text-sm font-semibold text-amber-400">
                  Bon retour.
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-white">
                  Connexion à djplace
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Retrouvez vos équipements notés, vos tutoriels et échangez
                  avec la communauté.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 placeholder:text-slate-600"
                    placeholder="jean.dupont@gmail.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
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

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer rounded-xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/15 transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Créer mon compte
                </Link>
              </div>
            </div>

            <div className="relative hidden overflow-hidden border-l border-slate-800/80 bg-linear-to-br from-amber-500/10 via-slate-950 to-orange-600/10 p-10 lg:flex lg:flex-col lg:justify-between">
              <div className="relative">
                <div className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-400">
                  Plateforme Communautaire
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-white">
                  Notez, partagez, discutez.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Partagez vos avis sur le matériel DJ (marques, modèles,
                  années) et participez aux discussions techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}