export interface CooptationRequestDTO {
  consultantId: string;
  genre: string;
  prenom: string;
  nom: string;
  dateNaissance: string; // Format "yyyy-MM-dd"
  telephone: string;
  email: string;
  villeResidence: string;
  commentaire?: string;
  cguAcceptees: boolean;
  cvFile?: File;
}
// cooptation.model.ts
export interface Cooptation {
  id?: string;
  consultantId: string;
  genre: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  telephone: string;
  email: string;
  villeResidence: string;
  cguAcceptees: boolean;
  commentaire: string;
  cvFile?: File;
}

export interface CooptationResponseDTO {
  genre: string;
  telephone: string;
  villeResidence: string;
consultantEmail: any;
  id: string;
  dateSoumission: Date;
  statut: string;
  commentaire: string;
  consultantNom: string;
  consultantPrenom: string;
  candidatNom: string;
  candidatPrenom: string;
  candidatEmail: string;
  cvFileName: string;
}
export enum CooptationStatus {
  SOUMIS = 'SOUMIS',
  EN_REVUE = 'EN_REVUE',
  VALIDE = 'VALIDE',
  REJETE = 'REJETE'
}