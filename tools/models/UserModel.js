import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';


// Use native promises
// mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

// authenticate user login input against db document
UserSchema.statics = {
  /**
   * Check auth for user
   * @param {string} email - The email of user.
   * @param {string} password - The password of user.
   * @returns {Promise<User, APIError>}
   */
  authenticate(email, password) {
    console.log('-****-', email, password)

    return this.findOne({ email }).exec()
      .then(((user) => {
        console.log('USER', user);
        return user;
      }))
      .catch((err) => {
        console.log('ERROR',)
        throw err;
      });

    // return this.model('users')
    // return new Promise((resolve, reject) => {
    //   console.log('USERs', this);
    //   this.model('users').findOne({ email }).exec()
    //     .then((user) => {
    //       console.log('USER', user);
    //       if (user) {
    //         bcrypt.compare(password, user.password, function (err, match) {
    //           // password matches hashed password from db
    //           if (err) return reject(err);
    //           match ? resolve(user) : function(){
    //             const err = new Error('Invalid password');
    //             // although i wouldn't differentiate
    //             // username error from pass error for the sake of security
    //             err.status = 401;
    //             reject(err);
    //           }();
    //         });
    //       } else {
    //         const err = new Error('User not found');
    //         err.status = 401;
    //         reject(err);
    //       }
    //     })
    //     .catch((err)=> reject(err));
    // })
  }
};

// hash and salt password before saving to db
UserSchema.pre('save', function(next) { // !!! this and arrow function
  bcrypt.hash(this.password, 10)
    .then((hash) => {
      console.log('new hash', hash);
      this.password = hash;
      next();
    }).catch( err => next(err));
});

/**
 * Methods
 */
UserSchema.method({
  publicFormat() {
    const result = this.toJSON();
    // this is to get rid of the  __v
    delete(result.__v);
    delete result.password;
    return result
  }
});

/**
 * @typedef users
 */
module.exports = mongoose.model('users', UserSchema);
