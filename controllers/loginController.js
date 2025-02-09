const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthModel = require("../modules/AuthModule");

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("[DEBUG] Incoming login request:", { email });

        // Check if email exists
        const emailExist = await AuthModel.findOne({ email });
        if (!emailExist) {
            console.error("[ERROR] Email not found:", email);
            return res.status(404).json({ message: "Email does not exist" });
        }

        console.log("[DEBUG] Email found:", emailExist);

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, emailExist.password);
        if (!passwordMatch) {
            console.error("[ERROR] Password mismatch for email:", email);
            return res.status(404).json({ message: "Password is incorrect" });
        }

        console.log("[DEBUG] Password matched for email:", email);

        // Generate token
        const token = jwt.sign(
            { id: emailExist._id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h" } // Options
        );

        console.log("[DEBUG] Token generated:", token);

        const currentUser = await AuthModel.findOne({email});
        const username = currentUser.username;
        // Send success response
        res.status(200).json({ message: "Login successful", token,username });
    } catch (error) {
        console.error("[ERROR] Login failed:", error);
        res.status(500).json({ message: "Connection error on server", error });
    }
};
