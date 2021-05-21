import CommentService from "../services/CommentService.js";

class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentService.create(req.body);

      return res.status(201).json(comment);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getAll(req, res) {
    try {
      const comments = await CommentService.getAll();

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getOne(req, res) {
    try {
      const comment = await CommentService.getOne(req.params.id);

      return res.json(comment);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedComment = await CommentService.update(req.body);

      return res.status(200).json(updatedComment);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      const comments = await CommentService.delete(req.params.id);

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new CommentController();
