import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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
  // private apiUrl = 'http://localhost:5000/api/recipes';
  private apiUrl='https://recipe-backend-lgef.onrender.com/api/recipes'
  constructor(private http: HttpClient) {}

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
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

    return this.http.post<Recipe>(this.apiUrl, recipe, { headers }).pipe(
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
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}
