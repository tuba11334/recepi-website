import { useEffect, useState } from "react";
import { getRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";

const categories = ["Breakfast", "Vegan", "Desserts", "Dinner"];

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    time: ""
  });
  const [message, setMessage] = useState("Loading recipes...");

  useEffect(() => {
    async function loadRecipes() {
      try {
        setMessage("Loading recipes...");
        const data = await getRecipes(filters);
        setRecipes(data);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadRecipes();
  }, [filters]);

  function handleFilterChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Cook, share, and discover simple recipes.</h1>
          <p>Find meals by ingredient, category, and time.</p>
        </div>
      </section>

      <form className="search-panel" onSubmit={handleSearchSubmit}>
        <input
          name="search"
          type="search"
          placeholder="Search by recipe title or ingredient"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <button type="submit">Search</button>
      </form>

      <section className="section">
        <div className="section-title">
          <h2>Browse Recipes</h2>

          <div className="filters">
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select name="time" value={filters.time} onChange={handleFilterChange}>
              <option value="">Any time</option>
              <option value="10">10 minutes</option>
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        {!message && recipes.length === 0 && <p>No recipes found.</p>}
      </section>
    </>
  );
}

export default Recipes;