const express = require("express");
const router = express.Router();
const {postCard,getCards} = require("../controllers/cardController");

router.post("/",postCard );
router.get("/", getCards);

module.exports = router;