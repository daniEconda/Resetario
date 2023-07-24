import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Platano maduro relleno',
  //     'simplemente delicioso y colombiano ;)',
  //     'https://blog.redbus.co/wp-content/uploads/2020/03/1511198102-platanos-con-queso-616.jpg',
  //     [
  //       new Ingredient('Platanos maduros', 1),
  //       new Ingredient('Mantequilla derretida', 1),
  //       new Ingredient('rebanadas de bocadillo de guayaba', 6),
  //       new Ingredient('rebanas de queso mozzarella', 0)

  //     ]),
  //   new Recipe('Huevos rancheros',
  //     '¿necesitas algo más?',
  //     'https://huevos-rancheros.net/wp-content/uploads/2017/11/04.-huevos-rancheros-colombianos.jpg',
  //     [
  //       new Ingredient('Huevos', 5),
  //       new Ingredient('Salchichas', 2),
  //       new Ingredient('Tomates', 2),
  //       new Ingredient('Queso mozzarella', 0),
  //       new Ingredient('Sal y pimienta', 0)
  //     ])
  // ];

  private recipes: Recipe[] = [];
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
