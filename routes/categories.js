const express = require('express');
const router = express.Router();
const categoryModel = require('../schemas/category');

// Hàm buildQuery để xây dựng truy vấn tìm kiếm
function buildQuery(obj) {
  let result = {};
  if (obj.name) {
    result.name = new RegExp(obj.name, "i");
  }
  return result;
}

// GET all categories
router.get('/', async function (req, res, next) {
  try {
    let categories = await categoryModel.find(buildQuery(req.query));
    res.status(200).send({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
});

// GET a category by id
router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let category = await categoryModel.findById(id);
    if (category) {
      res.status(200).send({
        success: true,
        data: category,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Category not found",
    });
  }
});

// POST a new category
router.post('/', async function (req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description,
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      data: newCategory,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
});

// PUT (update) a category by id
router.put('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    if (category) {
      for (const key of Object.keys(req.body)) {
        category[key] = req.body[key];
      }
      await category.save();
      res.status(200).send({
        success: true,
        data: category,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
});

// DELETE (soft delete) a category by id
router.delete('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    if (category) {
      category.isDelete = true;
      await category.save();
      res.status(200).send({
        success: true,
        data: category,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;