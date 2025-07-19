import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { loginRequest, protectedResources } from '../msal-config';
import { User } from '../models/user.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AccountInfo | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  http: any;

  constructor(
    private msalService: MsalService, 
    private router: Router
  ) {
    this.initialize();
  }

  private initialize(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.setUser(accounts[0]);
    }

    this.msalService.instance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const authResult = event.payload as AuthenticationResult;
        this.setUser(authResult.account);
        this.router.navigate(['/cooptations']);
      } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
        this.setUser(null);
        this.router.navigate(['/login']);
      }
    });
  }

  private setUser(account: AccountInfo | null): void {
    this.msalService.instance.setActiveAccount(account);
    this.currentUserSubject.next(account);
  }

  login(): void {
    this.msalService.loginRedirect({
      scopes: loginRequest.scopes
    });
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }

  async getToken(): Promise<string | null> {
    const account = this.msalService.instance.getActiveAccount();
    if (!account) return null;

    try {
      const result = await this.msalService.instance.acquireTokenSilent({
        scopes: protectedResources.api.scopes,
        account
      });
      return result.accessToken;
    } catch (err) {
      console.error('Token silent failed, fallback popup', err);
      try {
        const result = await this.msalService.instance.acquireTokenPopup({
          scopes: protectedResources.api.scopes
        });
        return result.accessToken;
      } catch (popupErr) {
        console.error('Token popup failed', popupErr);
        return null;
      }
    }
  }

   getCurrentUser(): AccountInfo | null {
    const accounts = this.msalService.instance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  }

 getCurrentUserId(): string {
  const user = this.getCurrentUser();
  return user?.localAccountId ?? '';
}

getCurrentUserAsUser(): User | null {
  const a = this.getCurrentUser();
  return a ? {
    id: a.localAccountId,
    username: a.username,
    email: a.username
  } : null;
}


  getAccessToken(): string {
    // Implémentez la logique pour récupérer le token d'accès
    // Cela dépend de votre configuration MSAL
    return localStorage.getItem('access_token') || '';
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }


  getCurrentConsultant() {
  const token = localStorage.getItem('access_token'); // ou d’où tu stockes le token

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get('/api/consultants/me', { headers });
}
}