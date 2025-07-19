// src/app/components/notify-manager/notify-manager.component.ts

import { Component } from '@angular/core';
import { CooptationService } from '../services/cooptation-service.service';

@Component({
  selector: 'app-notify-manager',
  template: `
    <input [(ngModel)]="cooptationId" placeholder="ID de la cooptation" />
    <button (click)="sendNotification()">Notifier le manager</button>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class NotifyManagerComponent {

  cooptationId: string = '';
  message: string = '';

  constructor(private cooptationService: CooptationService) { }

  sendNotification() {
    if (!this.cooptationId.trim()) {
      this.message = 'Merci de saisir un ID valide';
      return;
    }

    this.cooptationService.notifyManager(this.cooptationId).subscribe({
      next: (res) => this.message = res,
      error: (err) => this.message = 'Erreur : ' + (err.error || err.message)
    });
  }
}
