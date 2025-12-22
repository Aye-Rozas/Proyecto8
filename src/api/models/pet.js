const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    breed: { type: String, trim: true },
    age: { type: Number },
    weight: { type: Number },
    photo: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owners",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "pets",
  }
);

const Pet = mongoose.model("pets", petSchema, "pets");

module.exports = Pet;
