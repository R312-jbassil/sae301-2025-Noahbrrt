// ⚠️ Fichier manuel : mets à jour dès que tu changes la collection dans PocketBase

export enum Collections {
  Lunettes = "lunettes",
  // ajoute d'autres collections ici si besoin
}

export type RecordIdString = string;

export type IsoDateString = string;

/** Champs de la collection "lunettes" (vue côté client) */
export interface LunettesRecord {
  id?: RecordIdString;
  nom_lunette: string;
  code_svg: string;
  prompt_ia: string;
  prix: number;

  couleur_monture?: string;
  couleur_branches?: string;
  teinte_verres?: string;

  largeur_pont?: string | number;
  taille_verre?: string | number;

  genere_IA?: boolean;

  // meta PocketBase (optionnels si tu veux les exploiter)
  created?: IsoDateString;
  updated?: IsoDateString;
}
