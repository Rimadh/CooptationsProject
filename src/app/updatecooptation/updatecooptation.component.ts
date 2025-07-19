import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CooptationService } from '../services/cooptation-service.service';
import { CooptationResponseDTO } from '../models/cooptation.model';

@Component({
  selector: 'app-updatecooptation',
  templateUrl: './updatecooptation.component.html',
  styleUrls: ['./updatecooptation.component.css']
})
export class UpdatecooptationComponent implements OnInit {
  updateForm!: FormGroup;
  selectedFile: File | null = null;
  cooptationId: string | null = null;
  isLoading = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private cooptationService: CooptationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      genre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      villeResidence: ['', Validators.required],
      commentaire: [''],
      cv: [null]
    });

    this.cooptationId = this.route.snapshot.paramMap.get('id');
    if (this.cooptationId) {
      this.loadCooptation(this.cooptationId);
    }
  }

  loadCooptation(id: string): void {
    this.isLoading = true;
    this.cooptationService.getCooptationById(id).subscribe({
      next: (cooptation) => {
        this.updateForm.patchValue({
          genre: cooptation.genre,
          prenom: cooptation.candidatPrenom,
          nom: cooptation.candidatNom,
          email: cooptation.candidatEmail,
          telephone: cooptation.telephone,
          villeResidence: cooptation.villeResidence,
          commentaire: cooptation.commentaire
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMsg = 'Erreur lors du chargement de la cooptation';
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.updateForm.invalid || !this.cooptationId) {
      return;
    }
    this.isLoading = true;

    const formData = new FormData();
    const formValues = this.updateForm.value;

    formData.append('genre', formValues.genre);
    formData.append('prenom', formValues.prenom);
    formData.append('nom', formValues.nom);
    formData.append('email', formValues.email);
    formData.append('telephone', formValues.telephone);
    formData.append('villeResidence', formValues.villeResidence);
    formData.append('commentaire', formValues.commentaire || '');

    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }

    this.cooptationService.updateCooptation(this.cooptationId, formData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Cooptation mise à jour avec succès');
        this.router.navigate(['/li'], { queryParams: { updated: 'true' } });

      },
      error: (error) => {
        this.errorMsg = 'Erreur lors de la mise à jour';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/cooptations']);
  }
}
