import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = useState([
        "all the main spices",
        "pasta",
        "ground beef",
        "tomato paste",
    ]);
    const [recipeShown, setRecipeShown] = useState("");

    async function toggleRecipeShown() {
        console.log("generating recipe");
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipeShown(recipeMarkdown);
        console.log("generated!");
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            newIngredient,
        ]);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            )}

            {recipeShown !== "" && <ClaudeRecipe recipe={recipeShown} />}
        </main>
    );
}
