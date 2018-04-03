import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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
    return new Promise((resolve, reject) => {
      this.findOne({ email }).exec()
        .then(((user) => {
          if (user) {
            return bcrypt.compare(password, user.password, (error, match) => {
              if (error) {
                reject(error);
              }

              if (match) {
                resolve(user);
              }

              reject({ status: 400, errors: { password: 'The given data failed to pass validation' }});
            });
          }

          reject({ status: 400, errors: { password: 'These credentials do not match our records' }});
        }))
        .catch((err) => {
          throw err;
        });
    });
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
