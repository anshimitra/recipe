import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl2 = 'http://localhost:5000/api/search';

  constructor(private http:HttpClient) { }
  searchRecipes(query: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl2}?q=${query}`);
  }

}
