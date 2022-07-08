const commentsRouter = require("express").Router();
const {
  getAllComments,
  getCommentsById,
  getCommentsByUser,
  getCommentsByProject,
  createComment,
  updateComment,
  deleteComment,
} = require("../db");
const { requireUser } = require("./utils");

commentsRouter.get("/", async (req, res, next) => {
  try {
    const comments = await getAllComments();

    if (!comments) {
      next({
        name: "MissingComments",
        message: "There are no comments available at this time",
      });
      return;
    }

    res.send(comments);
  } catch (error) {
    console.error(error);
    next({
      name: "fetchCommentError",
      message: "Cannot get all comments",
    });
  }
});

commentsRouter.get("/commentId/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await getCommentsById(id);
    res.send(comment);
  } catch (error) {
    next(error);
  }
});

commentsRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const commentByUser = await getCommentsByUser(username);

    if (commentByUser.length === 0) {
      next({
        name: "InvalidComments",
        message: "There are no comments yet!",
      });
      return;
    }

    res.send(commentByUser);
  } catch (error) {
    console.error(error);
    next({
      name: "noExistingComments",
      message: "There are no comments under that username",
    });
  }
});

commentsRouter.get("/project/:projectId", async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const commentsByProject = await getCommentsByProject(projectId);

    if (commentsByProject.length === 0) {
      next({
        name: "MissingComments",
        message: "There are no comments available at this time",
      });
      return;
    }

    res.send(commentsByProject);
  } catch (error) {
    console.error(error);
    next({
      name: "noExistingComments",
      message: "There are no comments for the project",
    });
  }
});

commentsRouter.post("/", requireUser, async (req, res, next) => {
  const { id } = req.user;
  const { projectId, headline, description, username } = req.body;
  try {
    const newComment = await createComment({
      userId: id,
      projectId,
      headline,
      description,
      username,
    });

    res.send(newComment);
  } catch (error) {
    console.log("Error at creating a new comment", error);
    next(error);
  }
});

commentsRouter.patch("/:commentId", requireUser, async (req, res, next) => {
  const { commentId } = req.params;
  const { headline, description } = req.body;
  try {
    const commentById = await getCommentById(commentId);

    if (!commentById) {
      next({
        name: "InvalidCommentId",
        message: "This comment does not exist.",
      });
      return;
    }

    if (commentById.userId === req.user.id) {
      const updatedComments = await updateComment({
        id: commentId,
        headline,
        description,
      });
      res.send(updatedComment);
    } else {
      next({
        name: "userUnauthorizeToUpdate",
        message: "User is not authorize to make an update",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

commentsRouter.delete("/:commentId", requireUser, async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const commentById = await getCommentById(commentId);

    if (!commentById) {
      next({
        name: "InvalidCommentId",
        message: "This comment does not exist.",
      });
      return;
    }

    if (commentById.userId === req.user.id || req.user.isAdmin === true) {
      const comment = await deleteComment(commentId);
      res.send(comment);
    } else {
      next({
        name: "userUnauthorizeToUpdate",
        message: "User is not authorize to delete a comment",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = commentsRouter;
