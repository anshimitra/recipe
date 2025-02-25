import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:5000/api/recipes'; // Backend API

  constructor(private http: HttpClient) {}

  // Toggle Favorite Recipe
  toggleFavorite(recipeId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorite/${recipeId}`, { userId });
  }

  // Get Favorite Recipes for User
  getFavorites(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/${userId}`);
  }
  private favoriteRecipes: Set<string> = new Set(); // Set use kar rahe hain for unique IDs

  addToFavorites(recipe: any) {
    this.favoriteRecipes.add(recipe._id);
  }

  removeFromFavorites(recipeId: string) {
    this.favoriteRecipes.delete(recipeId);
  }

  isFavorite(recipeId: string): boolean {
    return this.favoriteRecipes.has(recipeId);
  }
}
