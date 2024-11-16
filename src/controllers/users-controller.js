const prismaClient = require("@/config/client");

const select = async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const selectById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const create = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "User creation failed" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = { select, selectById, create, update, destroy };
