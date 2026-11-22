// src/component/ArticleManager.tsx
import { useState, useEffect } from "react";
import { articleApi } from "../api/article.api";
import { categoryApi } from "../api/category.api";
import { uploadApi } from "../api/upload.api";
import Editor from "./Editor";
import type { ArticleResponseDto, CategoryResponseDto, ArticleType, DifficultyLevel } from "../types";

export default function ArticleManager() {
  const [articles, setArticles] = useState<ArticleResponseDto[]>([]);
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  // État du formulaire (Création / Édition)
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // État pour la modale de suppression custom
  const [articleToDelete, setArticleToDelete] = useState<ArticleResponseDto | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [articleType, setArticleType] = useState<ArticleType>("TUTO");
  const [articleLevel, setArticleLevel] = useState<DifficultyLevel>("DEBUTANT");
  const [published, setPublished] = useState(false);
  const [editorData, setEditorData] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [arts, cats] = await Promise.all([
        articleApi.getAllAdmin(),
        categoryApi.getAll(),
      ]);
      setArticles(arts);
      setCategories(cats);
      if (cats.length > 0 && categoryId === "") setCategoryId(cats[0].id);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadingImage(true);
    try {
      const selectedCat = categories.find((c) => c.id === categoryId);
      const categoryName = selectedCat ? selectedCat.name : "general";
      const url = await uploadApi.uploadImage(file, categoryName);
      if (url) setMainImageUrl(url);
    } catch (err) {
      console.error("Erreur upload image :", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setMainImageUrl("");
    setPublished(false);
    setEditorData("");
    if (categories.length > 0) setCategoryId(categories[0].id);
    setShowForm(false);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleOpenEdit = (article: ArticleResponseDto) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSummary(article.summary || "");
    setMainImageUrl(article.mainImageUrl || "");
    setPublished(article.published || false);
    setEditorData(article.content || "");
    
    // Trouver la catégorie correspondante par son nom si l'ID n'est pas direct
    const foundCat = categories.find((c) => c.name === article.categoryName);
    if (foundCat) {
      setCategoryId(foundCat.id);
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }

    setShowForm(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      await articleApi.delete(articleToDelete.id);
      setArticles(articles.filter((a) => a.id !== articleToDelete.id));
      setArticleToDelete(null);
    } catch (err) {
      alert("Erreur lors de la suppression de l'article.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!editorData.trim() || editorData === "<p></p>") {
      setError("Le contenu de l'article ne peut pas être vide.");
      return;
    }

    if (categoryId === "") {
      setError("Veuillez sélectionner une catégorie.");
      return;
    }

    const payload = {
      title,
      content: editorData,
      summary: summary || undefined,
      mainImageUrl: mainImageUrl || undefined,
      type: articleType,
      level: articleLevel,
      categoryId: Number(categoryId),
      published,
    };

    try {
      if (editingId !== null) {
        await articleApi.update(editingId, payload);
        setMessage("Article mis à jour avec succès ! 🚀");
      } else {
        await articleApi.create(payload);
        setMessage("Article créé avec succès ! 🚀");
      }
      await fetchData();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📚</span> Gestion des Articles ({articles.length})
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Crée, modifie ou supprime tes tutoriels et actualités.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="cursor-pointer bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition shrink-0"
            >
              ➕ Créer un article
            </button>
          </div>

          {message && <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm">{message}</div>}

          {loading ? (
            <p className="text-sm text-amber-400 animate-pulse">Chargement des articles...</p>
          ) : articles.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm text-slate-400">Aucun article pour le moment.</p>
              <button onClick={handleOpenCreate} className="text-xs font-bold text-amber-400 hover:underline cursor-pointer">
                Rédiger ton premier article
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-slate-700 transition">
                  {article.mainImageUrl ? (
                    <img src={article.mainImageUrl} alt={article.title} className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0" />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-xs shrink-0">
                      Pas d'img
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${article.published ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-slate-700/50 text-slate-400 border border-slate-600/30"}`}>
                        {article.published ? "Publié" : "Brouillon"}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase">{article.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">{article.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{article.summary || "Aucun résumé"}</p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(article)}
                      className="cursor-pointer text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition"
                    >
                      Modifier ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleToDelete(article)}
                      className="cursor-pointer text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/20 transition"
                    >
                      Supprimer 🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Formulaire de Création / Édition */
        <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{editingId !== null ? "✏️ Modifier l'article" : "📝 Rédiger un nouvel article"}</span>
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl transition"
            >
              ← Retour à la liste
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie cible *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <select value={articleType} onChange={(e) => setArticleType(e.target.value as ArticleType)} className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none">
                  <option value="TUTO">Tuto</option>
                  <option value="ACTU">Actu</option>
                  <option value="MATERIEL">Matériel</option>
                  <option value="WARMUP_SELECTION">Warmup Selection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Niveau</label>
                <select value={articleLevel} onChange={(e) => setArticleLevel(e.target.value as DifficultyLevel)} className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none">
                  <option value="TOUS_NIVEAUX">Tous niveaux</option>
                  <option value="DEBUTANT">Débutant</option>
                  <option value="INTERMEDIAIRE">Intermédiaire</option>
                  <option value="AVANCE">Avancé</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Titre de l'article</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ex: Bien débuter..." className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Résumé court</label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} placeholder="Courte description..." className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50 resize-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Image principale</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/25 cursor-pointer bg-slate-900/80 border border-slate-800 rounded-xl" />
              {uploadingImage && <p className="text-xs text-amber-400 animate-pulse font-medium">Upload en cours...</p>}
              {mainImageUrl && (
                <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-4">
                  <img src={mainImageUrl} alt="Aperçu" className="w-32 h-24 object-cover rounded-xl border border-slate-700 shrink-0" />
                  <input type="text" value={mainImageUrl} readOnly className="w-full bg-slate-950 text-xs text-amber-400 px-3 py-2 rounded-xl border border-slate-800 outline-none select-all" />
                  <button type="button" onClick={() => setMainImageUrl("")} className="text-xs font-bold text-red-400 bg-red-500/10 px-4 py-2.5 rounded-xl cursor-pointer">Supprimer</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contenu (Éditeur riche)</label>
              <Editor onChange={(html) => setEditorData(html)} initialContent={editorData} />
            </div>

            <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl">
              <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 accent-amber-500 rounded bg-slate-900 border-slate-800 cursor-pointer" />
              <label htmlFor="published" className="text-sm font-medium text-slate-200 cursor-pointer select-none">
                Publier immédiatement sur la page d'accueil (Rendre visible)
              </label>
            </div>

            {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>}

            <div className="flex items-center gap-3">
              <button type="submit" className="cursor-pointer bg-linear-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg">
                {editingId !== null ? "Enregistrer les modifications 💾" : "Publier l'article 🚀"}
              </button>
              <button type="button" onClick={resetForm} className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- MODALE DE CONFIRMATION DE SUPPRESSION --- */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚠️</span> Confirmer la suppression
              </h3>
              <p className="text-xs text-slate-400">
                Êtes-vous sûr de vouloir supprimer l'article <strong className="text-slate-200">"{articleToDelete.title}"</strong> ? Cette action est irréversible.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="cursor-pointer bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
              >
                Oui, supprimer 🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}