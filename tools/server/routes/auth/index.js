import express from 'express';
import mongoose from 'mongoose';
import User from '../../models/UserModel';

// const User = require('../models/UserModel');
// const secret = require('../secrets');
// const jwt = require('jsonwebtoken');

const router = express.Router(); // eslint-disable-line

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


mongoose.set('debug', true);


// POST /register
router.post('/register', function(req, res, next) {
  const { username, password, confirmPassword } = req.body;

  if (username && password && confirmPassword) {
    if (password != confirmPassword) {
      const err = new Error('Passwords didn\'t match');
      err.status = 400;
      return next(err);
    }

    const newUser = {username, password};
    User.create(newUser)
      .then((user) => {
        // TODO remove console 
        console.log('CREATED', user);
        res.status(201).json({message: 'Registered successfully'})
      })
      .catch((err)=> {
        if (err.code === 11000) {
          const err = new Error('This user exists already');
          err.status = 409; // Conflict
          return next(err);
        }

        next(err); // for other err status codes
      });
  } else {
    const err = new Error('All fields are required!');
    err.status = 400;
    return next(err);
  }
});

// POST /login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    return User.authenticate(email, password)
      .then((user) => {
        user = user.publicFormat(); // delete the __v
        delete user.password;
        console.log('User', user);
        const token = jwt.sign(
          user, //payload
          secret  // sign the token with my server-stored secret
        );
        res.status(200).json({ message: 'Authenticated', token: token });
      })
      .catch(err => {
        console.log('****', err);
        res.status(err.status).send({ errors: err.errors, type: 'internal' }); 
      });
  }

  res.status(400).send({ errors: { email: 'Email is required', password: 'Password is required' }, type: 'internal' }); 

});


// GET user details
router.get('/user-details', function (req, res, next) {
  if(req.user && req.user){
    User.findOne({_id: req.user._id})
      .then((user)=>{
        console.log('user details', user);
        user = user.publicFormat();
        res.json(user)})
      .catch((err)=> next(err))
  } else {
    const err = new Error('Couldn\'t retrieve user id from token');
    return next(err)
  }
});

module.exports = router;