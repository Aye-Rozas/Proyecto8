const upload = require("../../middlewares/file");
const { postPet, updatePet, deletePet, getPets } = require("../controllers/pet");


const petRouter = require("express").Router();

petRouter.get("/", getPets);

petRouter.post("/", upload.single("photo"), postPet);

petRouter.put("/:id", upload.single("photo"), updatePet);

petRouter.delete("/:id", deletePet);

module.exports = petRouter;
