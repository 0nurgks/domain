const express = require("express");
const router = express.Router();
const {postCard,getCards,deleteCard} = require("../controllers/cardController");

router.post("/",postCard );
router.get("/", getCards);
router.delete("/:cardId",deleteCard)

module.exports = router;