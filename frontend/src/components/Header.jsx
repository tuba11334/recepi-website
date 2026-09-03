function Header() {
  return (
    <header className="topbar">
      <a className="logo" href="/">
        RecipeNest
      </a>

      <nav>
        <a href="#recipes">Browse Recipes</a>
        <a href="#submit">Submit Recipe</a>
        <a href="#profile">User Profile</a>
      </nav>
    </header>
  );
}

export default Header;