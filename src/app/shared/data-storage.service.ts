import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService  ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://curso-recetas-libro-default-rtdb.firebaseio.com/recipes.json', 
            recipes).subscribe(Response => {
                console.log (Response);
            })
    }

    fetchRecipes() {
        return this.http
        .get<Recipe[]>(
            'https://family-favorites.firebaseio.com/recipes.json'
        )
        .pipe(
            map(recipes => {
            return recipes.map( recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}
