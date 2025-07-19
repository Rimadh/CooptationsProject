import { Consultant } from "./consultant.model";

export interface Manager {
  id: string | undefined;
  department: string | undefined;
no: any;
   idManager: string;
  nom: string;
  prenom: string;
  email: string;
  departement: string;
  teamsChannelId: string;
  profilePicturePath: string;
  consultants: Consultant[];
}