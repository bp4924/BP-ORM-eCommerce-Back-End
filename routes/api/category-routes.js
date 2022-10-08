const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
  try {
    const getCategoryAllData = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    console.log(getCategoryAllData);
    res.status(200).json(getCategoryAllData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
  try {
    const getCategoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: Tag }],
    });
    res.status(200).json(getCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const createNewCategory = await Category.create(req.body);
    req.status(200).json(createNewCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updateCategoryById = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    req.status(200).json(updateCategoryById);
  } catch (err) {
    res.status(500).json(err); // <<<<< Is this the correct error code ?
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategoryById = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategoryById) {
      res.status(404).json({ message: "No category found with this ID!" });
      return;
    }
    res.status(200).json(deleteCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
