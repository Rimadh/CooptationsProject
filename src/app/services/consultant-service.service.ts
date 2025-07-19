import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consultant } from '../models/consultant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantServiceService {

   private apiUrl = 'http://localhost:9191/api/consultants';

  constructor(private http: HttpClient) { }

  createConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(this.apiUrl, consultant);
  }

  getAllConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(this.apiUrl);
  }

  getConsultantById(id: string): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiUrl}/${id}`);
  }

  updateConsultant(id: string, consultant: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.apiUrl}/${id}`, consultant);
  }

  deleteConsultant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
getConsultantByEmail(email: string): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiUrl}/by-email?email=${email}`);
  }

  updateManagerEmail(id: string, managerEmail: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/manager-email`, null, {
      params: { managerEmail },
      responseType: 'text',
    });
  }
    getCurrentConsultant() {
    return this.http.get('/api/consultants/me');
  }  

}
