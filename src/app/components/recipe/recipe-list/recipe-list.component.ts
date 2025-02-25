import { Component, TrackByFunction } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../../shared/services/recipe.service';
import { FavoriteService } from '../../../shared/services/favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from "../../../shared/pipes/search-filter.pipe";

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink, CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  loading = true;
  errorMessage = '';
  favoriteRecipes: Set<string> = new Set();
  searchText: string='';
  trackByRecipeId: TrackByFunction<any> = (index, recipe) => recipe._id;
  constructor(private recipeService: RecipeService,private favoriteService:FavoriteService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        console.log('Fetched Recipes:', data);  // ✅ Debugging Step 3
        this.recipes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.errorMessage = 'Failed to load recipes.';
        this.loading = false;
      }
    });


  }
  getImageSrc(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }
  // toggleFavorite(recipe: any) {
  //   if (this.favoriteRecipes.has(recipe._id)) {
  //     this.favoriteRecipes.delete(recipe._id);
  //   } else {
  //     this.favoriteRecipes.add(recipe._id);
  //   }
  // }
  toggleFavorite(recipe: any) {
    if (this.favoriteService.isFavorite(recipe._id)) {
      this.favoriteService.removeFromFavorites(recipe._id);
    } else {
      this.favoriteService.addToFavorites(recipe);
    }
  }

  isFavorite(recipe: any): boolean {
    return this.favoriteService.isFavorite(recipe._id);
  }
  get filteredRecipes() {
    return this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      recipe.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
