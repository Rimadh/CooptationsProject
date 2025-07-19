import { Component } from '@angular/core';
import { ConsultantServiceService } from '../services/consultant-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Consultant } from '../models/consultant.model';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
})
export class ConsultantComponent {
  consultantForm: FormGroup;
  consultant?: Consultant | null;
  message = '';
  error = '';

  constructor(
    private consultantService: ConsultantServiceService,
    private fb: FormBuilder
  ) {
    this.consultantForm = this.fb.group({
      email: [''],
      managerEmail: ['']
    });
  }

  fetchConsultant() {
    const email = this.consultantForm.value.email;

    if (!email) {
      this.error = 'Veuillez saisir un email';
      this.consultant = null;
      this.message = '';
      return;
    }

    this.consultantService.getConsultantByEmail(email).subscribe({
      next: (res) => {
        if (res) {
          this.consultant = res;
          this.consultantForm.patchValue({ managerEmail: res.managerEmail || '' });
          this.message = '';
          this.error = '';
        } else {
          this.error = '❌ Consultant introuvable';
          this.consultant = null;
          this.message = '';
        }
      },
      error: (err) => {
        this.error = '❌ Erreur lors de la récupération du consultant';
        this.consultant = null;
        this.message = '';
        console.error(err);
      }
    });
  }

  updateManagerEmail() {
    if (!this.consultant) {
      this.error = 'Aucun consultant sélectionné';
      return;
    }

    const newEmail = this.consultantForm.value.managerEmail;

    if (!newEmail) {
      this.error = 'Veuillez saisir un email manager valide';
      return;
    }

    this.consultantService.updateManagerEmail(this.consultant.id, newEmail).subscribe({
      next: (res) => {
        this.message = '✅ Email du manager mis à jour avec succès !';
        this.error = '';
      },
      error: (err) => {
        this.error = '❌ Erreur lors de la mise à jour';
        this.message = '';
        console.error(err);
      }
    });
  }
}
