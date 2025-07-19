import { CooptationStatus } from './cooptation.model';

export interface Candidat {
submissionDate: string|number|Date;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cvFile?: File | string;
  skills: string[];
  experience: number;
  consultantId: string;
  managerId?: string;
  status?: string; // 'PENDING' | 'APPROVED' | 'REJECTED'
  comment?: string;
}