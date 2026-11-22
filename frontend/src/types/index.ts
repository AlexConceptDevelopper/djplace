// Reprise stricte de tes Enums Java
export type ArticleType = 'TUTO' | 'MATERIEL' | 'ACTU' | 'WARMUP_SELECTION';
export type DifficultyLevel = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE' | 'TOUS_NIVEAUX';


export const getDifficultyLevelLabel = (level: string) => {
  switch (level) {
    case "DEBUTANT":
      return "Débutant";
     case "INTERMEDIAIRE":
       return "Intermédiaire";
     case "AVANCE":
      return "Avancé";
    case "TOUS_NIVEAUX":
      return "Tous niveaux";
    default:
      return level;
   }
};

// --- CATÉGORIES ---
export interface CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryRequestDto {
  name: string;
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
  commentCount?: number;
}