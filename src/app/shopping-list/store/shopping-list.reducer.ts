import { Ingredient } from '../../shared/ingredient.model'
import { ADD_INGREDIENTS, AddIngredients, UPDATE_INGREDIENT, UpdateIngredient, DELETE_INGREDIENT, DeleteIngredient, ShoppingListActions, SELECT_INGREDIENT, SelectIngredient, UnselectIngredient, UNSELECT_INGREDIENT } from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ],
  selectedIngredient: new Ingredient("", 0),
  selectedIngredientIndex: -1
};

export default (state: State = initialState, action: ShoppingListActions) => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      const selectIngredientAction: SelectIngredient = <SelectIngredient>action;

      return {
        ...state,
        selectedIngredient: new Ingredient(selectIngredientAction.ingredient.name, selectIngredientAction.ingredient.amount),
        selectedIngredientIndex: state.ingredients.findIndex((ingredient: Ingredient) => ingredient.name === selectIngredientAction.ingredient.name)
      }
    case UNSELECT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: initialState.selectedIngredient,
        selectedIngredientIndex: initialState.selectedIngredientIndex
      }
    case ADD_INGREDIENTS:
      const currentIngredients: Ingredient[] = [...state.ingredients];
      const ingredients: Ingredient[] = (<AddIngredients>action).ingredients;

      ingredients.forEach((ingredient: Ingredient) => {
        const foundIngredient: Ingredient = currentIngredients.find(
          (currentIngredient: Ingredient) =>
            currentIngredient.name === ingredient.name
        );

        if (foundIngredient) {
          currentIngredients[
            currentIngredients.indexOf(foundIngredient)
          ] = new Ingredient(
            ingredient.name,
            foundIngredient.amount + ingredient.amount
          );
        } else {
          currentIngredients.push(ingredient);
        }
      });

      return {
        ...state,
        ingredients: currentIngredients
      }
    case UPDATE_INGREDIENT: {
      const updateIngredientAction: UpdateIngredient = <UpdateIngredient>action;

      const ingredients: Ingredient[] = state.ingredients.map((ingredient: Ingredient) => (new Ingredient(ingredient.name, ingredient.amount)));

      if (state.selectedIngredientIndex > -1) {
        ingredients[state.selectedIngredientIndex] = updateIngredientAction.updatedIngredient;
      }

      return {
        ...state,
        ingredients
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter((ingredient: Ingredient, idx: number) => idx !== state.selectedIngredientIndex)
      }
    }
    default:
      return state;
  }
}
