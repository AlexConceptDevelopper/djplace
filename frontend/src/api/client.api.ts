const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

interface CustomRequestInit extends RequestInit {
  skipAuth?: boolean; 
}

export async function apiFetch<T>(
  endpoint: string,
  options: CustomRequestInit = {},
): Promise<T | null> {
  const token = localStorage.getItem("jwt_token");

  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // N'envoie le token que s'il existe ET que l'option skipAuth n'est pas activée
  if (token && !options.skipAuth) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let message = `Erreur HTTP ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.message) {
          message = errorData.message;
        }
      } catch {
        // Réponse sans JSON
      }

      // Si le token est rejeté (401 ou 403), on le nettoie direct du localStorage
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}