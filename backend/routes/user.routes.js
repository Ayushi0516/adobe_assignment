const {Router}=require("express")
const {User}=require("../model/user.model")

const userController= Router();

userController.post("/",async(req,res)=>{
    const { name, email, bio } = req.body;

  const newUser = new User({
    name,
    email,
    bio,
  });

  newUser.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create user', error: err });
    });
});
   
// get request


userController.get('/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json(user);
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve user', error: err });
      });
  });
  
// put request


userController.put('/:id', (req, res) => {
    const { name, bio } = req.body;
  
    User.findByIdAndUpdate(req.params.id, { name, bio }, { new: true })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json(user);
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update user', error: err });
      });
  });
//   delete request
  userController.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json({ message: 'User deleted successfully' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete user', error: err });
      });
  });
  

module.exports={
    userController
}