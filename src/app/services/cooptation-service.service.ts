import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import{CooptationResponseDTO} from '../models/cooptation.model';
import { AuthService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class CooptationService {

  private apiUrl = 'http://localhost:9191/api/cooptations';
  getToken: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

 // 1. GET all cooptations
  getAllCooptations(): Observable<CooptationResponseDTO[]> {
    return this.http.get<CooptationResponseDTO[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // 2. GET cooptation by ID
  getCooptationById(id: string): Observable<CooptationResponseDTO> {
    return this.http.get<CooptationResponseDTO>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // 3. GET cooptations by statut
  getCooptationsByStatut(statut: string): Observable<CooptationResponseDTO[]> {
    return this.http.get<CooptationResponseDTO[]>(`${this.apiUrl}/statut/${statut}`)
      .pipe(catchError(this.handleError));
  }

  updateCooptation(id: string, formData: FormData): Observable<CooptationResponseDTO> {
    // Pas besoin de headers 'Content-Type', Angular les gère automatiquement avec FormData
    return this.http.put<CooptationResponseDTO>(`${this.apiUrl}/${id}`, formData);
  }
  
deleteCooptation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  notifyManager(cooptationId: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/${cooptationId}/notify-manager`, {}, { responseType: 'text' });
  }


  // 6. GET cooptations by consultant
  getCooptationsByConsultant(consultantId: string): Observable<CooptationResponseDTO[]> {
    return this.http.get<CooptationResponseDTO[]>(`${this.apiUrl}/consultant/${consultantId}`)
      .pipe(catchError(this.handleError));
  }

  // 7. PATCH update status
  updateStatus(id: string, status: string): Observable<CooptationResponseDTO> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<CooptationResponseDTO>(`${this.apiUrl}/${id}/status`, null, { params })
      .pipe(catchError(this.handleError));
  }



 getCvFileName(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/cv/filename`);
  }

  downloadCv(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/cv`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map(response => {
        // Optionnel : tu peux récupérer le nom de fichier via header Content-Disposition si besoin
        return response.body as Blob;
      }),
      catchError(this.handleError)
    );
  }

  // 11. POST création cooptation avec formulaire complet (multipart/form-data)
submitCooptation(data: FormData, cvFile: File | null): Observable<any> {
  return this.http.post('http://localhost:9191/api/cooptations', data);
}


  // Gestion des erreurs générique
  private handleError(error: any) {
    console.error('Erreur API', error);
    return throwError(() => new Error(error.message || 'Erreur serveur'));
  }


}