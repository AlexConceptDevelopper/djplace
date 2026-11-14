import { apiFetch } from "./client";

/**
 * Supprime le compte de l'utilisateur connecté (RGPD)
 */
export async function deleteMyAccount(): Promise<void> {
  await apiFetch<void>("/api/users/me", {
    method: "DELETE",
  });
}