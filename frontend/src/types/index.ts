// Reprise stricte de tes Enums Java
export type ArticleType = 'TUTO' | 'MATERIEL' | 'ACTU' | 'WARMUP_SELECTION';
export type DifficultyLevel = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE';

// --- CATÉGORIES ---
export interface CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// --- ARTICLES ---
export interface ArticleResponseDto {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  mainImageUrl?: string;
  type: ArticleType;
  level: DifficultyLevel;
  published: boolean;
  createdAt: string;
  categoryName: string;
}