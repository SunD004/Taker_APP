var express = require('express');
var router = express.Router();
var lodash = require('lodash');
var fs = require("fs");

router.get('/:search', async function(req, res, next) {
  try {
    const search = req.params.search.split(' ');
    console.log("search =", search)
    var pos = 0;
    var array = [];
    var fileContent = fs.readFileSync(__dirname + "/data.txt", 'utf-8').split('\n').filter(Boolean)
    var key = 0

    fileContent.map(content => {
      const line = content.split(' ')
      line.map(el => {
        if (el == search[pos]) {
          pos++
          if (pos >= search.length) {
            array.push(line.toString())
            pos = 0
            return;
          }
        }
        if (el == line[line.length-1])
          pos = 0
      })
    })
    pos = 0
    var finalArray =  array.map(k => {
      var myArrayEl = k.split(',')
      myArrayEl.splice(0, 1)
      search.map(el => {
        myArrayEl.splice(myArrayEl.indexOf(el) , 1)
      })
      myArrayEl.splice(myArrayEl.indexOf('') , 1)
      return {key: key++, data: myArrayEl}
    })
    res.send(finalArray)
  } catch (e) {
    res.sendStatus(404)
  }
});

module.exports = router;
