import { recipes } from "./data/recipes";

export const searchRecipesAutocomplete = (search: string) => {
  const newRecipes = recipes.filter((recipe) =>
    recipe.name.toLocaleLowerCase().includes(search)
  );
  return newRecipes;
};
