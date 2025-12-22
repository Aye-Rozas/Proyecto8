const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Pet = require("../../api/models/pet");


const pets = [
  {
    name: "Ginny",
    species: "dog",
    breed: "Corgi",
    age: 4,
    weight: 12,
    photo: "https://res.cloudinary.com/demo/image/upload/123123123/default-dog.jpg",
    owner: "6949628531a8da84450d8f4c"
  },
  {
    name: "Luffy",
    species: "cat",
    breed: "rescue",
    age: 6,
    weight: 5,
    photo: "https://res.cloudinary.com/demo/image/upload/123123123/default-cat.jpg",
    owner: "6949628531a8da84450d8f4c"
  }
];

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");

    const allPets = await Pet.find();
    if (allPets.length) {
      await Pet.collection.drop();
      console.log("Collection 'pets' cleared");
    }

    await Pet.insertMany(pets);
    console.log(` ${pets.length} pets inserted`);
  })
  .catch((err) => console.log(`Error inserting pets: ${err}`))
  .finally(() => mongoose.disconnect());

