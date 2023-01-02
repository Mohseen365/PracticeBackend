const mongoose = require('mongoose');
const db_link = require('../secrets');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt')


mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
        // console.log(db);
    })
    .catch(function (err) {
        console.log(err);
    });


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Schema request jane se pehle hi validate kr lega agar mongo db me validate krvate to request chli jati fir vo error thorw krta 
    validate: function () {
      return emailValidator.validate(this.email);
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 7,
    validate: function () {
      this.confirmPassword == this.password;
    }
  }
});

//hooks

userSchema.pre('save', function () {
  console.log('before saving in database pre hook');
  this.confirmPassword = undefined;
})

userSchema.pre('save', async function () {
  let salt = await bcrypt.genSalt();
  console.log('salt : ', salt);
  let hashedString = await bcrypt.hash(this.password, salt);
  this.password = hashedString;
  console.log('hashedString : ', hashedString);

})

userSchema.post('save', function() {
  console.log('after saving in database post hook');
})


const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel