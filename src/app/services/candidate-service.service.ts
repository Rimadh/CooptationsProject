import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../models/candidat.model';
import { CooptationStatus } from '../models/cooptation.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {
 private apiUrl = 'http://localhost:9191/api/candidats';

  constructor(private http: HttpClient) { }

  createCandidate(formData: FormData): Observable<Candidat> {
    return this.http.post<Candidat>(this.apiUrl, formData);}

  getAllCandidates(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.apiUrl);
  }

  getCandidateById(id: string): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/${id}`);
  }

  updateCandidate(id: string, candidate: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCandidateStatus(id: string, status: CooptationStatus): Observable<Candidat> {
    return this.http.patch<Candidat>(`${this.apiUrl}/${id}/status`, { status });
  }

}
