import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Suggestion } from '../../models/suggestion';

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  suggestionUrl = 'http://localhost:3000/suggestions';

  suggestionList: Suggestion[] = [
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

  constructor(private http: HttpClient) {}

  getSuggestionsList(): Observable<Suggestion[]> {
  return this.http.get<any>(this.suggestionUrl).pipe(
    map((response) => {
      return response.suggestions || response;
    })
  );
}

 getSuggestionById(id: number): Observable<any> {
  console.log('Fetching suggestion with id:', id);
  return this.http.get<any>(`${this.suggestionUrl}/${id}`);
}

  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  addSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, s);
  }

  updateSuggestion(s: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${s.id}`, s);
  }

 updateLikes(s: Suggestion): Observable<Suggestion> {
  const updated = { ...s, nbLikes: s.nbLikes + 1 }; 
  return this.http.put<Suggestion>(`${this.suggestionUrl}/${s.id}`, updated);
}
}