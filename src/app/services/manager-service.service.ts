import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Manager } from '../models/Manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {
  [x: string]: any;
  private apiUrl = 'http://localhost:9191/api/v1/managers'; // Matches your server.port=8055

  constructor(private http: HttpClient) { }

  // Create a new manager
  createManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(this.apiUrl, manager)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all managers, optionally filtered by department
  getAllManagers(department?: string): Observable<Manager[]> {
    let params = new HttpParams();
    if (department) {
      params = params.append('departement', department); // Note: matches your @RequestParam name
    }

    return this.http.get<Manager[]>(this.apiUrl, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get manager by ID
  getManagerById(id: string): Observable<Manager> {
    return this.http.get<Manager>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get manager by email
  getManagerByEmail(email: string): Observable<Manager> {
    return this.http.get<Manager>(`${this.apiUrl}/by-email/${email}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update manager
  updateManager(id: string, manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(`${this.apiUrl}/${id}`, manager)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete manager
  deleteManager(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Check if email exists
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${email}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(
      error.error?.message || error.message || 'Server error'
    ));
  }
}