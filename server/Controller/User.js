const User = require("../Model/User");
const { createToken } = require("../Service/service");

const registerUser = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
      phone,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.matchpassword(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = createToken(user);
    if (!token) {
      console.error("JWT token creation failed");
      return res.status(500).json({ message: "Internal server error" });
    }
    // hide password before sending user object
    const userSafe = user.toObject();
    delete userSafe.password;
    res
      .status(200)
      .json({ message: "Login successful", user: userSafe, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true },
      { returnOriginal: false }
    ).select("-password");
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, login, updateUser };
