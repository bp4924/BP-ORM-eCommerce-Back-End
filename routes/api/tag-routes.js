const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
router.get("/", async (req, res) => {
  try {
    const getTagAllData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getTagAllData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const getTagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!getTagById) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(getTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const createNewTag = await Tag.create(req.body);
    res.status(200).json(createNewTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateTagById = await Tag.update(req.body);
    if (!updateTagById) {
      res.status(404).json({ message: "No tag found with this ID!" });
      return;
    }
    res.status(200).json(updateTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTagById = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTagById) {
      res.status(404).json({ message: "No tag found with this ID!" });
      return;
    }
    res.status(200).json(deleteTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
