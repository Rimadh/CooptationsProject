// models/user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  idp?: string; // Optionnel si utilisé
}