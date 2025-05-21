const express = require("express");
const { addTable, getTables, updateTable ,deleteTable} = require("../Controllers/TableControlers");
const { protect } = require("../middlewares/Authprotect"); 
const router = express.Router();

// Protect all routes using your middleware
router.post("/", protect, addTable);
router.get("/", protect, getTables);
router.put("/:id", protect, updateTable);
router.delete("/:id", deleteTable); 

module.exports = router;
