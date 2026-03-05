import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  id: number | null = null;
  isEditMode = false;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private service: SuggestionService,
    public router: Router,
    public actR: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.buildForm();

    const rawId = this.actR.snapshot.params['id'];
    if (rawId) {
      this.id = +rawId;
      this.isEditMode = true;
      this.loadSuggestion(this.id);
    }
  }

  buildForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category:    ['', Validators.required],
      status:      ['en_attente'],
      nbLikes:     [0],
      date:        [new Date()]
    });
  }

loadSuggestion(id: number): void {
  this.service.getSuggestionById(id).subscribe({
    next: (response) => {
      const data = response.suggestion; 
      console.log('Data extracted:', data);
      this.suggestionForm.patchValue({
        title:       data.title,
        description: data.description,
        category:    data.category,
        status:      data.status    || 'en_attente',
        nbLikes:     data.nbLikes   || 0,
        date:        data.date      || new Date()
      });
    },
    error: (err) => console.error('Erreur chargement:', err)
  });
}

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      if (this.isEditMode) {
        const updated = { ...this.suggestionForm.value, id: this.id };
        this.service.updateSuggestion(updated).subscribe({
          next: () => this.router.navigate(['../..'], { relativeTo: this.actR }),
          error: (err) => console.error('Erreur mise à jour', err)
        });
      } else {
        this.service.addSuggestion(this.suggestionForm.value).subscribe({
          next: () => this.router.navigate(['..'], { relativeTo: this.actR }),
          error: (err) => console.error('Erreur ajout', err)
        });
      }
    }
  }
}