const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, minlength: 1 , maxlength: 300 },
  likes: { type: Number, default: 0, min: 0 },
}, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
