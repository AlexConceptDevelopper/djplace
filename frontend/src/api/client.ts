const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erreur HTTP (${response.status}) sur ${endpoint}`);
  }

  // Si le back renvoie du texte brut (comme ton message de succès)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return (await response.text()) as unknown as T;
}

export function getApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}