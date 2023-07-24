import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    Resolve, 
    RouterStateSnapshot 
} from "@angular/router";
import { map, tap } from "rxjs";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "src/app/recipes/recipe.service";
import { DataStorageService } from "src/app/shared/data-storage.service";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, 
                private recipesService: RecipeService) {}
 
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const recipes = this.recipesService.getRecipes();
 
            if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
            } else {
                return recipes;
            }
        }
    }