const express = require('express');
const { addMenu, getAllMenu, getMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menusControllers');
const { addMenuValidator, updateMenuValidator, getMenuItemValidator, deleteMenuItemValidator } = require('../validations/userValidation');
const router = express.Router();

router.post("/addmenu", addMenuValidator, addMenu);
router.get("/allmenu", getAllMenu);
router.get("/:_id", getMenuItem);
router.put("/:_id", updateMenuItem);
router.delete("/:_id", deleteMenuItem);

module.exports = router;