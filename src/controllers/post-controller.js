const prisma = require("@/config/client");
const sharp = require("sharp");

// ! Get all posts
const select = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// ! Create a new post
const create = async (req, res) => {
  try {
    const { title } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        imageUrl: req.file ? req.file.path : null,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post" });
  }
};

//  ! Update a post by ID
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updateData = { title, description };
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};

// ! Delete a post by ID
const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting post" });
  }
};

module.exports = { select, create, update, destroy };
