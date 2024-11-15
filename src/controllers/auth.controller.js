const prismaClient = require("@/config/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!user.role || !user.role.name)
    throw new Error("Role information is missing");

  return jwt.sign(
    { userId: user.id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    // ! Check if the user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // ! Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ! Find role in the database
    const userRole = await prismaClient.role.findUnique({
      where: { name: role },
    });

    if (!userRole)
      return res.status(400).json({ error: "Role does not exist" });

    // ! Create new user
    const newUser = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: userRole.id,
      },
      include: { role: true },
    });

    // ! Return JWT token
    const token = generateToken(newUser);

    // ! return the response with token and user information
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering user" });
  }
};

// ! Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ! Find user by email
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: { role: true },
    });

    //  ! check if user found
    if (!user) return res.status(404).json({ error: "User not found" });

    // ! Check if user credentials
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ! Return response with token and user info
    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ! Get all Users (Admin-only route)
const getAllAuth = async (req, res) => {
  try {
    const users = await prismaClient.user.findMany({
      include: { role: true },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ! Get current User info
const getAuth = async (req, res) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: req.user.userId },
      include: { role: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = { register, login, getAllAuth, getAuth };
