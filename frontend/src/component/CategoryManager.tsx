// src/component/CategoryManager.tsx
import { useState, useEffect } from "react";
import { categoryApi } from "../api/category.api";
import type { CategoryResponseDto } from "../types";

export default function CategoryManager() {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [catMessage, setCatMessage] = useState("");

  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatDesc, setEditCatDesc] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      }
    } catch (err) {
      setCatMessage("Erreur lors de la création de la catégorie.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
    try {
      await categoryApi.delete(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      alert("Impossible de supprimer cette catégorie (peut-être liée à des articles).");
    }
  };

  const handleUpdateCategory = async (id: number) => {
    try {
      const updated = await categoryApi.update(id, { name: editCatName, description: editCatDesc });
      if (updated) {
        setCategories(categories.map((c) => (c.id === id ? updated : c)));
        setEditingCatId(null);
      }
    } catch (err) {
      alert("Erreur lors de la modification de la catégorie.");
    }
  };

  return (
    <div className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl backdrop-blur-md shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📁</span> Gestion des Catégories ({categories.length})
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ajoute, modifie ou supprime les catégories de tes articles.
          </p>
        </div>
      </div>

      {/* Formulaire de création */}
      <form onSubmit={handleCategorySubmit} className="flex flex-col md:flex-row gap-4 items-end bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60">
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
            placeholder="Courte description..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none focus:border-amber-500/50"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition shrink-0"
        >
          Créer la catégorie ➕
        </button>
      </form>
      {catMessage && <p className="text-xs text-amber-300">{catMessage}</p>}

      {/* Liste des catégories */}
      <div className="space-y-3 pt-2">
        {loading ? (
          <p className="text-xs text-amber-400 animate-pulse">Chargement des catégories...</p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Aucune catégorie enregistrée pour le moment.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
              {editingCatId === cat.id ? (
                <div className="flex flex-1 gap-2 items-center flex-wrap md:flex-nowrap">
                  <input
                    type="text"
                    value={editCatName}
                    onChange={(e) => setEditCatName(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 outline-none"
                    placeholder="Nom"
                  />
                  <input
                    type="text"
                    value={editCatDesc}
                    onChange={(e) => setEditCatDesc(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white flex-1 outline-none"
                    placeholder="Description"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateCategory(cat.id)}
                    className="bg-green-500/20 text-green-300 px-4 py-2 rounded-xl text-xs font-bold border border-green-500/30 cursor-pointer"
                  >
                    Enregistrer ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCatId(null)}
                    className="bg-slate-800 text-slate-400 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{cat.name}</h4>
                      <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                        ID: {cat.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{cat.description || "Aucune description"}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(cat.id);
                        setEditCatName(cat.name);
                        setEditCatDesc(cat.description || "");
                      }}
                      className="text-xs font-bold text-slate-300 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 cursor-pointer transition"
                    >
                      Modifier ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/20 cursor-pointer transition"
                    >
                      Supprimer 🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}