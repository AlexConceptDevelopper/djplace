import { getApiUrl } from "./client";

/**
 * Supprime le compte de l'utilisateur connecté (RGPD)
 */
export async function deleteMyAccount(): Promise<void> {
  const token = localStorage.getItem("jwt_token");

  const response = await fetch(getApiUrl("/api/users/me"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erreur lors de la suppression du compte.");
  }
}