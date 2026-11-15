// src/pages/DashboardPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../component/Navbar";
import Editor from "../component/Editor";
import { articleApi } from "../api/article.api";
import { categoryApi } from "../api/category.api";
import type { ArticleType, DifficultyLevel, CategoryResponseDto } from "../types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth("ROLE_ADMIN");

  const [activeTab, setActiveTab] = useState("overview");

  // États pour les catégories
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [catMessage, setCatMessage] = useState("");

  // États pour le formulaire d'article
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [articleType, setArticleType] = useState<ArticleType>("TUTO");
  const [articleLevel, setArticleLevel] = useState<DifficultyLevel>("DEBUTANT");
  const [published, setPublished] = useState(false); // État pour la publication directe
  const [editorData, setEditorData] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Charger les catégories au démarrage
  useEffect(() => {
    categoryApi.getAll()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      })
      .catch(console.error);
  }, []);

  // Création d'une catégorie à la volée
  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCatMessage("");
    try {
      const created = await categoryApi.create({ name: newCatName, description: newCatDesc });
      if (created) {
        setCategories([...categories, created]);
        setNewCatName("");
        setNewCatDesc("");
        setCatMessage("Catégorie créée avec succès ! 🎉");
        setCategoryId(created.id); // Sélection automatique de la nouvelle catégorie
      }
    } catch (err) {
      setCatMessage("Erreur lors de la création de la catégorie.");
    }
  };

  // Soumission de l'article
  const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!editorData.trim() || editorData === "<p></p>") {
      setErrorMessage("Le contenu de l'article ne peut pas être vide.");
      return;
    }

    if (categoryId === "") {
      setErrorMessage("Veuillez sélectionner ou créer une catégorie.");
      return;
    }

    setIsSubmitting(true);

    try {
      await articleApi.create({
        title,
        content: editorData,
        summary: summary || undefined,
        mainImageUrl: mainImageUrl || undefined,
        type: articleType,
        level: articleLevel,
        categoryId: Number(categoryId),
        published, // Envoi de l'état de publication
      });

      setSuccessMessage("Article enregistré avec succès ! 🚀");
      setTitle("");
      setSummary("");
      setMainImageUrl("");
      setPublished(false);
      setEditorData("");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Une erreur est survenue lors de la publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-amber-400 font-medium animate-pulse">Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-8">
        
        {/* En-tête Admin */}
        <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Panneau de Contrôle ⚡
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Dashboard de {user?.username}
            </h1>
            <p className="text-slate-400 text-sm">
              Supervise l'activité de djplace.fr, gère les articles et modère la communauté.
            </p>
          </div>

          <button
            onClick={() => navigate("/profil")}
            className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-4 py-3 rounded-2xl transition-all shadow-lg z-10"
          >
            Mon Profil 👤
          </button>
        </div>

        {/* Navigation par Onglets */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "overview" ? "bg-amber-500 text-slate-950 shadow-lg" : "bg-slate-950 text-slate-400 border border-slate-800"}`}
          >
            📊 Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${activeTab === "articles" ? "bg-amber-500 text-slate-950 shadow-lg" : "bg-slate-950 text-slate-400 border border-slate-800"}`}
          >
            📝 Gestion des Articles
          </button>
        </div>

        {/* --- ONGLET : ARTICLES & CATÉGORIES --- */}
        {activeTab === "articles" && (
          <div className="space-y-8">
            
            {/* Bloc de création rapide de catégorie */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📁</span> Ajouter une nouvelle catégorie
              </h3>
              <form onSubmit={handleCategorySubmit} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nom de la catégorie</label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    required
                    placeholder="Ex: Platines & Vinyles"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Description (Optionnelle)</label>
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Description..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition"
                >
                  Créer Catégorie ➕
                </button>
              </form>
              {catMessage && <p className="text-xs text-amber-300">{catMessage}</p>}
            </div>

            {/* Formulaire de rédaction d'article */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800/80 pb-4 flex items-center gap-2">
                <span>📝</span> Rédiger un nouvel article ou tutoriel
              </h2>

              <form onSubmit={handleArticleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Titre de l'article</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Ex: Bien débuter..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Résumé court</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={2}
                    placeholder="Courte description affichée sur la carte de l'article..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                    <select 
                      value={articleType} 
                      onChange={(e) => setArticleType(e.target.value as ArticleType)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="TUTO">Tuto</option>
                      <option value="ACTU">Actu</option>
                      <option value="MATERIEL">Matériel</option>
                      <option value="WARMUP_SELECTION">Warmup Selection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Niveau</label>
                    <select 
                      value={articleLevel} 
                      onChange={(e) => setArticleLevel(e.target.value as DifficultyLevel)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="DEBUTANT">Débutant</option>
                      <option value="INTERMEDIAIRE">Intermédiaire</option>
                      <option value="AVANCE">Avancé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie</label>
                    <select 
                      value={categoryId} 
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none"
                    >
                      {categories.length === 0 ? (
                        <option value="" disabled>Aucune catégorie disponible</option>
                      ) : (
                        categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Contenu (Éditeur riche)</label>
                  <Editor onChange={(html) => setEditorData(html)} initialContent={editorData} />
                </div>

                {/* Case à cocher pour publier directement */}
                <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 rounded bg-slate-900 border-slate-800 cursor-pointer"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-slate-200 cursor-pointer select-none">
                    Publier immédiatement sur la page d'accueil (Rendre visible)
                  </label>
                </div>

                {successMessage && <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">{successMessage}</div>}
                {errorMessage && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{errorMessage}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer bg-linear-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Publication..." : "Publier l'article 🚀"}
                </button>
                
              </form>
              
            </div>

          </div>
        )}

      </main>
    </div>
  );
}