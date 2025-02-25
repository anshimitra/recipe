import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { AddRecipeComponent } from './components/recipe/add-recipe/add-recipe.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { AboutUsComponent } from './components/page/about-us/about-us.component';
import { ContactComponent } from './components/page/contact/contact.component';
import { PrivacyPolicyComponent } from './components/page/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'add', component: AddRecipeComponent },
  // { path: 'share-recipe', component: AddRecipeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritesComponent },
  {path:'about',component:AboutUsComponent},
  {path:'contact',component:ContactComponent},
  {path:'privacy',component:PrivacyPolicyComponent},
  { path: '**', redirectTo: '' }
];
