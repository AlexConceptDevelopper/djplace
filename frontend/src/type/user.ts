export type Role = "ROLE_USER" | "ROLE_ADMIN"; // À adapter selon ce que renvoie exactement ton back-end (avec ou sans le préfixe ROLE_)

export interface User {
  id?: number;
  username: string;
  email: string;
  role: Role;
}