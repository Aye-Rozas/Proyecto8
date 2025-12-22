const upload = require("../../middlewares/file");
const { getOwners, postOwner, deleteOwner, updateOwner } = require("../controllers/owner");

const ownerRouter = require("express").Router();

ownerRouter.get("/", getOwners);

ownerRouter.post("/", upload.single("avatar"), postOwner);

ownerRouter.put("/:id", upload.single("avatar"), updateOwner);

ownerRouter.delete("/:id", deleteOwner);

module.exports = ownerRouter;
