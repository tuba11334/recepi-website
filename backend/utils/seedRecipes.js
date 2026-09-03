const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

dotenv.config();

const recipes = [
  {
    title: "Berry Breakfast Bowl",
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=900&q=80",
    description: "A quick fruit, yogurt, and oat bowl for busy mornings.",
    rating: 4.8,
    category: "Breakfast",
    difficulty: "Easy",
    cookingTime: 10,
    ingredients: ["Greek yogurt", "Mixed berries", "Rolled oats", "Honey"],
    instructions: ["Add yogurt to a bowl.", "Top with berries and oats.", "Drizzle honey and serve."]
  },
  {
    title: "Creamy Vegan Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    description: "Simple pasta with a silky cashew and herb sauce.",
    rating: 4.6,
    category: "Vegan",
    difficulty: "Medium",
    cookingTime: 25,
    ingredients: ["Pasta", "Cashews", "Garlic", "Lemon", "Basil"],
    instructions: [
      "Boil pasta until tender.",
      "Blend soaked cashews, garlic, lemon, and basil.",
      "Toss pasta with sauce and serve warm."
    ]
  },
  {
    title: "Chocolate Mug Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    description: "A soft dessert ready in minutes with pantry basics.",
    rating: 4.9,
    category: "Desserts",
    difficulty: "Easy",
    cookingTime: 8,
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Milk", "Oil"],
    instructions: [
      "Mix dry ingredients in a mug.",
      "Stir in milk and oil.",
      "Microwave for 90 seconds and cool briefly."
    ]
  }
];

async function seedRecipes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);

    console.log("Recipes seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

seedRecipes();