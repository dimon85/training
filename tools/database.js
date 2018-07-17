import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/training', { useNewUrlParser: true }); // training is name of db


const db = mongoose.connection;

db.on('error',function(err){
  console.error("DB connection error:",err)
});

db.once('open', function() {
  console.log("DB connection successful");
});

module.exports = db;