const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80"
    },
    description: {
      type: String,
      default: "A community-submitted recipe.",
      trim: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    category: {
      type: String,
      required: [true, "Recipe category is required"],
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"]
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "At least one ingredient is required"
      }
    },
    instructions: {
      type: [String],
      required: [true, "Instructions are required"],
      validate: {
        validator: function (steps) {
          return steps.length > 0;
        },
        message: "At least one instruction step is required"
      }
    },
createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);