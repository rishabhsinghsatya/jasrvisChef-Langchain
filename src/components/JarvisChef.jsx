import React, { useState } from "react";
import { askJarvisChef } from "../utils/askJarvisChef";

const JarvisChef = () => {
  const [recipeMessage, setRecipeMessage] = useState("");
  const [recipe, setRecipe] = useState("");

  const handleInputChange = (e) => {
    setRecipeMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(recipeMessage); //human message go to open AI
    const res_recipe = await askJarvisChef(recipeMessage);
    setRecipe(res_recipe);
  };

  return (
    <>
      {/* <h1>Ask Recipe</h1> */}
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={recipeMessage}
          onChange={handleInputChange}
          placeholder="Ask your Recipes"
        />
        <button>Ask</button>
      </form>
      <pre>{recipe}</pre>
    </>
  );
};

export default JarvisChef;
