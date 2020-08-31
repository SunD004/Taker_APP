var express = require('express');
var router = express.Router();
var sha256 = require('sha256')
const mongoose = require('mongoose')
var lodash = require('lodash');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})
const table = mongoose.model('users', userSchema)

/* GET users listing. */
router.get('/:name/:pwd', async function(req, res, next) {
  try {
    const user = await table.find({
      name: req.params.name,
      password: sha256(req.params.pwd)
    });
    console.log(user)
    if (lodash.isEmpty(user))
      res.sendStatus(404)
    else res.sendStatus(220)
  } catch (e) {
    res.sendStatus(404)
  }
});

module.exports = router;
