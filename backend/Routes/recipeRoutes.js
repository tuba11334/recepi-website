const requireAuth = require("../middleware/authMiddleware");
const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

function listFromText(text) {
  return String(text || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeRecipeBody(body) {
  return {
    title: body.title,
    image: body.image,
    description: body.description,
    rating: body.rating,
    category: body.category,
    difficulty: body.difficulty,
    cookingTime: body.cookingTime,
    ingredients: Array.isArray(body.ingredients) ? body.ingredients : listFromText(body.ingredients),
    instructions: Array.isArray(body.instructions) ? body.instructions : listFromText(body.instructions)
  };
}

router.get("/", async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const category = String(req.query.category || "").trim();
    const maxTime = Number(req.query.time || 0);

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (maxTime) {
      query.cookingTime = { $lte: maxTime };
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch recipes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Invalid recipe ID" });
  }
});

router.post("/", requireAuth, async (req, res) => {  
  try {
    const recipeData = normalizeRecipeBody(req.body);
    recipeData.createdBy = req.user._id; // Associate the recipe with the authenticated user
    const recipe = await Recipe.create(recipeData);

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const recipeData = normalizeRecipeBody(req.body);

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, recipeData, {
      new: true,
      runValidators: true
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid recipe ID" });
  }
});

module.exports = router;