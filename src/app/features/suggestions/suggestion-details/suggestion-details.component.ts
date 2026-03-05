import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SuggestionService
  ) {}

 ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  console.log('ID from URL:', id);

  this.service.getSuggestionsList().subscribe({
    next: (data) => {
      console.log('All suggestions:', data);
      this.suggestion = data.find(s => s.id === id);
      console.log('Found suggestion:', this.suggestion);
    },
    error: (err) => console.error('Erreur:', err)
  });
}

  updateSuggestion(id: number | undefined): void {
    this.router.navigate(['../edit', id], { relativeTo: this.route });
  }

  backToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}