const bcrypt = require("bcrypt");
const AuthModel = require("../modules/AuthModule");

module.exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("[DEBUG] Incoming registration request:", { username, email });

        // Check if email already exists
        const emailExist = await AuthModel.findOne({ email });
        if (emailExist) {
            console.error("[ERROR] Email already exists:", email);
            return res.status(400).json({ message: "This email already exists" });
        }

        console.log("[DEBUG] Email is available for registration");

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("[DEBUG] Password hashed successfully");

        // Create a new user
        const newUser = await AuthModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        console.log("[DEBUG] New user created successfully:", newUser);

        // Send success response
        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        console.error("[ERROR] Registration failed:", error);
        res.status(500).json({ message: "Connection error on server", error });
    }
};
