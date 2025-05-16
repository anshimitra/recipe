import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.baseUrl}/api/recipes`).pipe(
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return throwError(() => new Error('Failed to fetch recipes.'));
      })
    );
  }

  // Add a new recipe
  addRecipe(recipe: Recipe | FormData): Observable<Recipe> {
    let headers = new HttpHeaders();

    // Only set Content-Type if sending JSON (NOT for FormData)
    if (!(recipe instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http.post<Recipe>(`${environment.baseUrl}/api/recipes`, recipe, { headers }).pipe(
      catchError(error => {
        console.error('Error adding recipe:', error);
        return throwError(() => new Error('Failed to add recipe.'));
      })
    );
  }
  // getRecipeById(id: string): Observable<Recipe> {
  //   return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  // }
  // getRecipeById(id: string): Observable<Recipe> {
  //   console.log('Fetching recipe from:', `${this.apiUrl}/${id}`);
  //   return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
  //     catchError((error) => {
  //       console.error('API Error:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${`${environment.baseUrl}/api/recipes`}/${id}`);
  }

}
