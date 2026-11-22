// src/utils/jwt.ts
export interface CurrentUser {
  id?: number;
  username: string;
  email: string;
  role: string;
}

export function normalizeRole(role?: string): string {
  return (role || "").replace(/^ROLE_/, "").toUpperCase();
}

export function getCurrentUser(): CurrentUser | null {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.id ?? payload.userId,
      username: payload.username || "Utilisateur",
      email: payload.sub || "",
      role: payload.role || "ROLE_USER",
    };
  } catch (e) {
    console.error("Erreur de décodage du token", e);
    return null;
  }
}