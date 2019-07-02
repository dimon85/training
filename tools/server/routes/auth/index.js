import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel';

// const User = require('../models/UserModel');
// const secret = require('../secrets');

const EXPIRE_TIME = '1h'; // //expire in 1h (example 1m, 1h or 60*60)

const router = express.Router(); // eslint-disable-line

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// mongoose.set('debug', true);

// POST /register
// router.post('/register', function(req, res, next) {
//   const { name, email, password } = req.body;

//   if (name && email && password) {
//     const newUser = { name, email, password};
//     return User.create(newUser)
//       .then((user) => {
//         // user.publicFormat()  // delete the __v
//         const copyUser = { ...user.publicFormat() };
//         delete copyUser.password;

//         const token = jwt.sign(
//           copyUser, //payload
//           'secret_string', //super secret string
//           { expiresIn: EXPIRE_TIME }
//         );

//         res.status(201).json({ message: 'Registered successfully', token })
//       })
//       .catch((err)=> {
//         if (err.code === 11000) {
//           res.status(422).send({ errors: { email: 'is already in use' }, type: 'internal' }); 
//         }

//         console.log('[1] Error', err);
//         next(err); // for other err status codes
//       });
//   }

//   const errorObj = {
//     errors: {
//       name: 'Name is required',
//       email: 'Email is required',
//       password: 'Password is required',
//     },
//     type: 'internal',
//   };
//   res.status(400).send(errorObj);
// });

/**
 * POST /login
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return User.authenticate(email, password)
      .then((user) => {
        // user.publicFormat()  // delete the __v
        const copyUser = { ...user.publicFormat() };
        delete copyUser.password;

        const token = jwt.sign(
          copyUser, //payload
          'secret_string', //super secret string
          { expiresIn: EXPIRE_TIME }
        );

        res.status(200).json({ message: 'Authenticated', token });
      })
      .catch((err) => {
        console.log('[2] Error', err);
        res.status(err.status).send({ errors: err.errors, type: 'internal' }); 
      });
  }

  const errorObj = {
    errors: {
      email: 'Email is required',
      password: 'Password is required',
    },
    type: 'internal',
  };
  res.status(400).send(errorObj);
});

/**
 * Get current user details
 */
router.get('/profile', (req, res, next) => {
  if (req.user) {
    return User.findOne({ _id: req.user._id })
      .then((user) => {
        user = user.publicFormat();
        res.json({ user })})
      .catch((err)=> next(err))
  }

  res.status(403).send({ errors: { token:'Couldn\'t retrieve user id from token' }, type: 'internal' }); 
});

router.post('/update', (req, res, next) => {
  console.log('************', req.body);

  if (req.user) {
    return User.findByIdAndUpdate(req.user._id, req.body)
      .then(() => User.findOne({ _id: req.user._id }))
      .then((user) => {
        console.log('user', user);
        user = user.publicFormat();
        res.json({ user })})
      .catch((err)=> next(err))
  }

  res.status(403).send({ errors: { token:'Couldn\'t retrieve user id from token' }, type: 'internal' }); 
});

module.exports = router;
