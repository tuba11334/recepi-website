function RecipeCard({ recipe }) {
  return (
    <article className="card">
      <img src={recipe.image} alt={recipe.title} />

      <div className="card-body">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>

        <div className="meta">
          <span className="pill">{recipe.category}</span>
          <span className="pill">{recipe.difficulty}</span>
          <span className="pill">{recipe.cookingTime} min</span>
          <span className="pill">Rating {recipe.rating || "New"}</span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;