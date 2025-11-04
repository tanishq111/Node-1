const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://tanishqsoni111:<db_password>@chatapp.6e9etzj.mongodb.net/")
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });



app.use(express.json());    
app.use(session({
 secret: "your-key",
 cookie:{
    secure:false,
    maxAge:24*60*60,
 }
}
));

app.get('/', (req, res) => { 
    console.log('GET request received');
    res.send('Hello, World!');
});


const requireAuth = (req, res, next) => {
    // Middleware to check if user is authenticated
    if(req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }
};

const checkAuth = (req,res,next) => {
 if(req.session.user){
    res.redirect('/profile');
 }
    else {
        next();
    }
};

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  // check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = new User({ name, email, password });
    console.log(user);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});


app.post('/login', checkAuth, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user) {
    return res.status(404).json({ error: 'User not found' });
  } else if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid password' });
  } else {
    req.session.user = {
        id:user.id,
        name:user.name,
        email:user.email
    }; 
    res.status(200).json({ message: 'Login successful', user });
  }
});


// profile route ->

app.get("/profile", requireAuth, async (req, res) => {


});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

