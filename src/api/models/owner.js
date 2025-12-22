const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,lowercase: true},
    phone: { type: Number, required: true },
    avatar: { type: String, required:true},
  },
  {
    timestamps: true,
    collection: "owners",
  },
);
const Owner = mongoose.model("owners", ownerSchema,"owners");
module.exports = Owner;
