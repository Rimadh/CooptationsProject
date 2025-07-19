import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-cooptation-form',
  templateUrl: './cooptation-form.component.html',
  styleUrls: ['./cooptation-form.component.css'] // tu peux ajouter du style ici
})
export class CooptationFormComponent implements OnInit {
  cooptationForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  currentUserEmail: string = '';
  currentUserFirstName: string = '';
  currentUserLastName: string = '';
  router: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: MsalService
  ) {
    this.cooptationForm = this.fb.group({
      genre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      villeResidence: ['', Validators.required],
      commentaire: [''],
      cguAcceptees: [false, Validators.requiredTrue],
      cv: [null]
    });
  }

  ngOnInit(): void {
    const user = this.authService.instance.getActiveAccount();
    if (user) {
      this.currentUserEmail = user.username;
      this.currentUserFirstName = user.name?.split(' ')[0] || '';
      this.currentUserLastName = user.name?.split(' ')[1] || '';
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  submitForm(): void {
    if (this.cooptationForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    const formValues = this.cooptationForm.value;
    const formData = new FormData();

    formData.append('genre', formValues.genre);
    formData.append('prenom', formValues.prenom);
    formData.append('nom', formValues.nom);
    formData.append('email', formValues.email);
    formData.append('telephone', formValues.telephone);
    formData.append('dateNaissance', formValues.dateNaissance);
    formData.append('villeResidence', formValues.villeResidence);
    formData.append('commentaire', formValues.commentaire || '');
    formData.append('cguAcceptees', formValues.cguAcceptees.toString());
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }

    this.http.post('http://localhost:9191/api/cooptations', formData)
      .subscribe({
        next: () => {
          this.successMessage = '✅ Cooptation envoyée avec succès !';
          this.errorMessage = '';
          this.cooptationForm.reset();
          this.selectedFile = null;
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = "❌ Erreur lors de l'envoi de la cooptation.";
          this.successMessage = '';
        }
      });
  }


}
