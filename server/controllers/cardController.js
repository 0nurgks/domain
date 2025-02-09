const CardModel = require("../modules/CardModule.js");
const AuthModel = require("../modules/AuthModule.js");
const mongoose = require('mongoose');

module.exports.getOneCard = async (req,res) =>{
    try {
        const cardID = req.query;

        const card = CardModel.findOneById(cardID);  // Düzeltilmiş yazım

    if(!card){
        res.status(404).json({message:"card not found"});
    }

    res.status(200).json({message : "kartınız", card});
    } catch (error) {
        res.status(500).json({message: "Connection error on server"});
    }
}

module.exports.getCards = async (req, res) => {
    console.log("[DEBUG] Incoming request to getCards");
    console.log("[DEBUG] Request query:", req.query);

    const { username } = req.query; // Query params üzerinden username alınır
    if (!username) {
        console.error("[ERROR] Missing username in query");
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        console.log("[DEBUG] Searching cards for username:", username);

        const currentUser = await AuthModel.findOne({username});
        if (!currentUser) {
            console.error("[ERROR] User not found with username:", username);
            return res.status(404).json({ message: "User not found, please login first" });
        }

        const myCards = await CardModel.find({userid:currentUser._id});
        console.log("[DEBUG] Cards found:", myCards);

        if (myCards.length === 0) {
            console.warn("[WARN] No cards found for username:", username);
            return res.status(404).json({ message: "You have no cards" });
        }

        res.status(200).json({ myCards });
    } catch (error) {
        console.error("[ERROR] Error in getCards:", error);
        res.status(500).json({ message: "Connection error on server", error });
    }
};

module.exports.postCard = async (req, res) => {
    console.log("[DEBUG] Incoming request to postCard");
    console.log("[DEBUG] Request body:", req.body);

    const { username, textarea1, textarea2, textarea3, textarea4, textarea5, textarea6, image } = req.body;

    if (!username || !textarea1 || !image) {
        console.error("[ERROR] Missing required fields:", { username, textarea1, image });
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        console.log("[DEBUG] Creating new card with data:", {
            username,
            textarea1,
            textarea2,
            textarea3,
            textarea4,
            textarea5,
            textarea6,
            image
        });

        const currentUser = await AuthModel.findOne({ username });
        if (!currentUser) {
            console.error("[ERROR] User not found with username:", username);
            return res.status(404).json({ message: "User not found, please login first" });
        }

        const newCard = await new CardModel({
            userid: currentUser._id,
            username,
            textarea1,
            textarea2,
            textarea3,
            textarea4,
            textarea5,
            textarea6,
            image
        });

        await newCard.save();
        console.log("[DEBUG] Card saved successfully:", newCard);

        res.status(201).json({ message: "Card saved successfully" });
    } catch (error) {
        console.error("[ERROR] Error in postCard:", error);  // Hata detaylarını yazdırma
        res.status(500).json({ message: "Connection error on server", error: error.message || error });
    }
};
module.exports.deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        console.log("Silme işlemi için gelen cardId:", cardId);  // Kart ID'sini logla

        if (!mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({ message: "Geçersiz Card ID" });
        }

        const deletedCard = await CardModel.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: "Kart bulunamadı" });
        }

        res.status(200).json({ message: "Kart başarıyla silindi" });
    } catch (error) {
        console.error("[ERROR] DeleteCard işlemi sırasında hata:", error);
        res.status(500).json({ message: "Sunucu hatası", error: error.message || error });
    }
};

  