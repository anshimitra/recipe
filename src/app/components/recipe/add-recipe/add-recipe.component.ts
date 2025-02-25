import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../../shared/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  recipe = {
    title: '',
    description: '',
    ingredients: '', // Accepts comma-separated input
    instructions: '', // Accepts comma-separated input
    image: null as File | null,
    user: '65d4b62c7a3c1f1234567890' // Replace with actual user ID
  };

  constructor(private recipeService: RecipeService, private router: Router) {}

  // Handle file selection
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.recipe.image = file;
    }
  }

  // Submit form
  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.recipe.title);
    formData.append('description', this.recipe.description);
    formData.append('ingredients', JSON.stringify(this.recipe.ingredients.split(',').map(i => i.trim())));
    formData.append('instructions', JSON.stringify(this.recipe.instructions.split(',').map(i => i.trim())));
    formData.append('user', this.recipe.user);


    if (this.recipe.image) {
      formData.append('image', this.recipe.image, this.recipe.image.name);
    }

    this.recipeService.addRecipe(formData).subscribe({
      next: (response) => {
        console.log('Recipe added successfully:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding recipe:', err);
      },
    });
  }
}
