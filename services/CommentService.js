import Comment from '../models/Comment.js';

class CommentService {
    async create(comment) {
        const createdPost = await Comment.create(comment);

        return createdPost;
    }

    async getAll() {
        const comments = await Comment
            .find()
            .sort({date: -1});

        return comments;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('No ID specified');
        }

        const comment = Comment.findById(id);

        return comment;
    }

    async update(comment) {
        if (!comment._id) {
            throw new Error('No ID specified');
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            comment._id,
            comment,
            {new: true}
        );

        return updatedComment;
    }

    async delete(id) {
        if (!id) {
            throw new Error('No ID specified');
        }

        const comment = await Comment.findByIdAndDelete(id);

        return comment;
    }
}

export default new CommentService();
