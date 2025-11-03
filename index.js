const express = require('express');
const app = express(); // creates an Express application instance that is stored in app variable    
const PORT = 3000;
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');// import the users router

const log = ( reqName) => {  // logger
   console.log(`Request received at ${reqName}`);
}

app.use(express.json())
app.use(cors());
app.use((req, res, next) => {  // middleware
  log(req.originalUrl); 
  next();   // calls the next middleware or route handler
});

app.use('/users', usersRouter); // use the users router for any requests to /users

app.get('/', (req, res) => { // root route
  res.send('Welcome to the User Management API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});