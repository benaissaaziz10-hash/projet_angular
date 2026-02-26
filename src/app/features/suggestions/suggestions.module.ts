import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ← AJOUTER

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailsComponent,
    ListSuggestionComponent,
    SuggestionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,          
    SuggestionsRoutingModule
  ],
  providers: [
    ListSuggestionComponent
  ]
})
export class SuggestionsModule { }