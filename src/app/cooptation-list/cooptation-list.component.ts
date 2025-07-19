import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CooptationService } from '../services/cooptation-service.service';
import { CooptationResponseDTO } from '../models/cooptation.model';
import { saveAs } from 'file-saver';
import { MsalService } from '@azure/msal-angular';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cooptation-list',
  templateUrl: './cooptation-list.component.html',
  styleUrls: ['./cooptation-list.component.css']
})
export class CooptationListComponent implements OnInit {
  cooptations: CooptationResponseDTO[] = [];
  filteredCooptations: CooptationResponseDTO[] = [];
  errorMsg = '';
  isLoading = false;
  currentUserEmail = '';
  currentUserFirstName = '';
  currentUserLastName = '';
  isHR = false;
  searchTerm = '';
  statusFilter = 'ALL';
  snackBar: any;


  constructor(
    private cooptationService: CooptationService,
    private authService: MsalService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.isHR = true; 
    this.loadCooptations();
  }

  loadCurrentUser(): void {
    const account = this.authService.instance.getActiveAccount();
    if (account) {
      this.currentUserEmail = account.username || '';
      this.isHR = account.idTokenClaims?.roles?.includes('HR') || false;
      if (account.name) {
        const parts = account.name.split(' ');
        this.currentUserFirstName = parts[0];
        this.currentUserLastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
      }
    }
  }

  loadCooptations(): void {
    this.isLoading = true;
    this.cooptationService.getAllCooptations().subscribe({
      next: (data) => {
        this.cooptations = data;
        this.applyFilters();
        this.errorMsg = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = err.message || 'Erreur lors du chargement des cooptations';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredCooptations = this.cooptations.filter(c => {
      const matchesSearch =
        this.searchTerm === '' ||
        c.candidatPrenom.toLowerCase().includes(search) ||
        c.candidatNom.toLowerCase().includes(search) ||
        c.candidatEmail.toLowerCase().includes(search);

      const matchesStatus = this.statusFilter === 'ALL' || c.statut === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  downloadCv(cooptation: CooptationResponseDTO): void {
    if (!cooptation.cvFileName) {
      alert('Aucun CV disponible pour ce candidat');
      return;
    }
    this.isLoading = true;
    this.cooptationService.downloadCv(cooptation.id).subscribe({
      next: (blob) => {
        saveAs(blob, cooptation.cvFileName || `CV_${cooptation.candidatNom}_${cooptation.candidatPrenom}.pdf`);
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Erreur lors du téléchargement du CV';
        this.isLoading = false;
      }
    });
  }

  editCooptation(cooptation: CooptationResponseDTO): void {
    this.router.navigate(['/update', cooptation.id]);
  }



  showDetails(cooptation: CooptationResponseDTO): void {
    alert(`Détails du candidat : ${cooptation.candidatPrenom} ${cooptation.candidatNom}`);
  }
  goToStats(): void {
  this.router.navigate(['/stats']);
}


  addCooptation(): void {
    this.router.navigate(['/cooptations']);
  }

  canEdit(cooptation: CooptationResponseDTO): boolean {
    return this.isHR;
  }

  canDelete(cooptation: CooptationResponseDTO): boolean {
    return this.isHR;
  }
deleteCooptation(cooptation: CooptationResponseDTO): void {
  this.isLoading = true;
  this.cooptationService.deleteCooptation(cooptation.id).subscribe({
    next: () => {
      this.loadCooptations();
      this.isLoading = false;
      this.snackBar.open('Suppression avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
    },
    error: (err) => {
      this.errorMsg = 'Erreur lors de la suppression : ' + err.message;
      this.isLoading = false;
      this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  });
}

  getStatusClass(status: string): string {
    switch (status) {
      case 'SOUMIS': return 'status-submitted';
      case 'EN_REVUE': return 'status-review';
      case 'VALIDE': return 'status-valid';
      case 'REJETE': return 'status-rejected';
      default: return '';
    }
  }

 onNotifyManager(cooptation: CooptationResponseDTO): void {
  console.log('Notifier manager pour cooptation:', cooptation.id);
  this.cooptationService.notifyManager(cooptation.id).subscribe({
    next: () => alert('Manager notifié avec succès'),
    error: () => alert('Erreur lors de la notification du manager')
  });
}


}
