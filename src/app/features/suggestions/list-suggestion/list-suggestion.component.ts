import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchTerm = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private service: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions', err);
      }
    });
  }

  deleteSuggestion(id: number): void {
    this.service.deleteSuggestion(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }

incrementLikes(suggestion: Suggestion): void {
  this.service.updateLikes(suggestion).subscribe({
    next: () => {
      suggestion.nbLikes++; 
    },
    error: (err) => console.error('Erreur like', err)
  });
}

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris!`);
    } else {
      alert(`"${suggestion.title}" est déjà dans les favoris!`);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === suggestion.id);
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    const term = this.searchTerm.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(term) ||
      suggestion.category.toLowerCase().includes(term)
    );
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'acceptee': 'Acceptée',
      'refusee': 'Refusée',
      'en_attente': 'En attente'
    };
    return statusLabels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}