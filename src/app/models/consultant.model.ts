export interface Consultant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  managerId?: string;
  department?: string;
  managerEmail: string;
}