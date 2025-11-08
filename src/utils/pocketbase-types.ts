export const Collections = {
  Users: "users",
  Lunettes: "lunettes",
};
export type RecordIdString = string;

export type IsoDateString = string;

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

  created?: IsoDateString;
  updated?: IsoDateString;
}
