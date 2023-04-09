const {Router}=require("express")
const {Post}=require("../model/post.model")

const postController= Router();

postController.post('/', (req, res) => {
    // const { user_id, content } = req.body;
    const { user, content } = req.body;
  
    if (!user || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const post = new Post({
      user,
      content
    });
  
    post.save()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create post', error: err });
      });
  });


// get request
  postController.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Post.findById(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve post', error: err });
      });
  });

//   put request

  postController.put('/:id', (req, res) => {
    const { id } = req.params;
  
    Post.findByIdAndUpdate(id, { content: req.body.content }, { new: true })
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update post', error: err });
      });
  });

//   delete request

postController.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Post.findByIdAndDelete(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete post', error: err });
      });
  });

// post likes increment


postController.post('/:id/like', (req, res) => {
    const { id } = req.params;
  
    Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update post likes', error: err });
      });
  });


// post unlike


postController.post('/:id/unlike', (req, res) => {
    const { id } = req.params;
  
    Post.findById(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        const likes = Math.max(post.likes - 1, 0);
  
        return Post.findByIdAndUpdate(id, { likes }, { new: true });
      })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update post likes', error: err });
      });
  });


  

module.exports={
    postController
}