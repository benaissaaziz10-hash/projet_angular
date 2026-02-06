import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  searchTerm = '';
  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  // Method to increment likes (Event Binding)
  incrementLikes(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  // Method to add to favorites (Event Binding)
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris!`);
    } else {
      alert(`"${suggestion.title}" est déjà dans les favoris!`);
    }
  }

  // Check if suggestion is in favorites
  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === suggestion.id);
  }

  // Filter suggestions based on search term (Property Binding)
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

  // Get status label in French
  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'acceptee': 'Acceptée',
      'refusee': 'Refusée',
      'en_attente': 'En attente'
    };
    return statusLabels[status] || status;
  }

  // Get status class for styling
  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}