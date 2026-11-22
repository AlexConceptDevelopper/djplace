// src/component/CommentSection.tsx
import { useState, useEffect, type FormEvent } from "react";
import { commentApi } from "../api/comment.api";
import type { CommentResponse } from "../types/comment";

export interface CurrentUserInfo {
  id?: number;
  username?: string;
  role?: string;
}

interface CommentSectionProps {
  articleId: number;
  currentUser?: CurrentUserInfo | null;
}

export default function CommentSection({
  articleId,
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErrorMsg(null);

    commentApi
      .getByArticleId(articleId)
      .then((data) => {
        if (active) setComments(data);
      })
      .catch(() => {
        if (active) setErrorMsg("Impossible de charger les commentaires.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [articleId]);

  const canDeleteComment = (comment: CommentResponse) => {
    if (!currentUser) return false;
    const isAdmin = currentUser.role === "ADMIN";
    const isOwner =
      currentUser.id !== undefined && currentUser.id === comment.authorId;
    return isAdmin || isOwner;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || !currentUser) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const created = await commentApi.create(articleId, { content: trimmed });
      if (created) {
        setComments((prev) => [...prev, created]);
      }
      setContent("");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi du commentaire."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    setDeletingId(commentId);
    setErrorMsg(null);

    try {
      await commentApi.delete(commentId);
      setComments((prev) => prev.filter((item) => item.id !== commentId));
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer ce commentaire."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mt-8 bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Commentaires{" "}
          <span className="text-amber-400 text-base font-semibold ml-1">
            ({comments.length})
          </span>
        </h2>
      </div>

      {/* Formulaire si connecté / message d'invitation sinon */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Connecté en tant que{" "}
              <strong className="text-slate-200">
                {currentUser.username || "Membre"}
              </strong>
            </span>
            <span>{content.length}/1000</span>
          </div>

          <textarea
            rows={3}
            maxLength={1000}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partage ton avis, ton expérience ou une question sur ce dossier..."
            className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-amber-500 focus:outline-none p-4 text-sm text-slate-100 placeholder:text-slate-500 transition-colors"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="cursor-pointer px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-sm transition-colors"
            >
              {submitting ? "Publication..." : "Publier le commentaire"}
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 text-sm text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p>
            Connecte-toi avec ton compte pour laisser un commentaire ou gérer
            les tiens.
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl bg-rose-950/60 border border-rose-800/60 px-4 py-3 text-sm text-rose-300">
          {errorMsg}
        </div>
      )}

      {/* Liste des commentaires */}
      {loading ? (
        <p className="text-sm text-slate-400 animate-pulse">
          Chargement des commentaires...
        </p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-500">
          Aucun commentaire pour le moment. Lance la discussion !
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-amber-400">
                    {comment.authorUsername}
                  </span>
                  <span className="text-xs text-slate-500">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>

                {canDeleteComment(comment) && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                    className="cursor-pointer text-xs font-medium text-slate-400 hover:text-rose-400 disabled:opacity-40 transition-colors"
                  >
                    {deletingId === comment.id ? "Suppression..." : "Supprimer"}
                  </button>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}