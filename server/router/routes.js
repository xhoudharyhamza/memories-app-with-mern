let express = require("express");
let Memory = require("../models/memoriesModel");
let router = express.Router();
router.post("/memories", async (req, res) => {
  let { title, author, image, description } = req.body;
  let memory = new Memory({ title, author, image, description });
  try {
    await memory.save();
    res.status(200).json({ memory });
  } catch (error) {
    res.status(401).json({ error: "something went wrong" });
  }
});
router.get("/memories", async (req, res) => {
  try {
    let memories = await Memory.find();
    res.status(200).json({ memories });
  } catch (error) {
    res.status(401).json({ error: "something went wrong" });
  }
});
router.delete("/memories/:id", async (req, res) => {
  let _id = req.params.id;
  try {
    let memory = await Memory.findByIdAndDelete(_id);
    res.status(200).json({ memory });
  } catch (error) {
    res.status(401).json({ error: "memory is not deleted" });
  }
});
router.patch("/memories/like/:id", async (req, res) => {
  let _id = req.params.id;
  try {
    let memory = await Memory.findOne({ _id });
    let likes = memory.likes;
    let likedMemory = await Memory.findByIdAndUpdate(_id, { likes: likes + 1 });
    res.status(200).json({ likedMemory });
  } catch (error) {
    res.status(401).json({ error: "some error" });
  }
});
module.exports = router;
