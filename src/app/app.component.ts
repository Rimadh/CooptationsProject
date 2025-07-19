import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService) {}
private readonly title = 'Project Talann';
  ngOnInit() {
    this.msalService.instance.handleRedirectPromise()
      .then((result) => {
        if (result !== null && result.account !== null) {
          this.msalService.instance.setActiveAccount(result.account);
          console.log('Connexion réussie:', result.account);
        } else {
          const currentAccount = this.msalService.instance.getActiveAccount();
          if (currentAccount) {
            console.log('Compte actif:', currentAccount);
          } else {
            console.log('Pas de compte actif');
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors du traitement du redirect:', error);
      });
  }
}
