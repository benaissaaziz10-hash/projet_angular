import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← pour ngModel

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component'; // ← AJOUTER

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent,
    ListSuggestionComponent  // ← AJOUTER
  ],
  imports: [
    CommonModule,
    FormsModule,             // ← pour ngModel
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }