import { Component, Input } from '@angular/core';
import { FavoriteService } from '../shared/services/favorite.service';
import { Recipe } from '../shared/services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

favoriteRecipes: any[] = [];

  addToFavorites(recipe: any) {
    if (!this.favoriteRecipes.some(r => r._id === recipe._id)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFromFavorites(recipeId: string) {
    this.favoriteRecipes = this.favoriteRecipes.filter(r => r._id !== recipeId);
  }

  isFavorite(recipeId: string): boolean {
    return this.favoriteRecipes.some(r => r._id === recipeId);
  }

  getFavorites(): any[] {
    return this.favoriteRecipes;
  }

}
