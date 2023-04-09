
const {Router}=require("express")
const {Post}=require("../model/post.model")
const {User}=require("../model/user.model")

const analyticsController= Router();
// Analytical route

analyticsController.get('/users', (req, res) => {
    User.countDocuments()
      .then(count => {
        res.json({ totalUsers: count });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve user count', error: err });
      });
  });
  

  
analyticsController.get('/users/top-active', (req, res) => {
    Post.aggregate([
      { $group: { _id: '$user_id', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { 'user.name': 1, count: 1 } }
    ])
      .then(results => {
        res.json({ topActiveUsers: results });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve top active users', error: err });
      });
  });

  analyticsController.get('/posts', async (req, res) => {
    try {
      const count = await Post.countDocuments();
      res.json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  analyticsController.get('/posts/top-liked', async (req, res) => {
    try {
      const topLikedPosts = await db.posts.find().sort({ likes: -1 }).limit(5).toArray();
      res.status(200).json(topLikedPosts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
module.exports={
    analyticsController
}