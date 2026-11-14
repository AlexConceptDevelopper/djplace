// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserPayload {
  username: string;
  email: string;
  role: string;
}

export function useAuth(requiredRole?: string) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);

      const userData = {
        username: payload.username || "Utilisateur",
        email: payload.sub || "",
        role: payload.role || "ROLE_USER", // Ex: "ROLE_ADMIN" ou "ROLE_USER"
      };

      // Si un rôle spécifique est requis (ex: "ROLE_ADMIN"), on vérifie
      if (requiredRole && userData.role !== requiredRole) {
        navigate("/");
        return;
      }

      setUser(userData);
    } catch (e) {
      console.error("Erreur de décodage du token", e);
      localStorage.removeItem("jwt_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate, requiredRole]);

  return { user, loading, isAuthenticated: !!user };
}