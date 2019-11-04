const express = require('express');
const router = express.Router();
const fs = require('fs');
const marked = require('marked');

router.get("/:docName", function(req, res, next) {
  // console.log('name:' + req.params.docName);
  fs.readFile(__dirname + '/../public/blog/' + req.params.docName + '.md', function(err, data) {
    if (err) {
      console.log("文件不存在！");
      res.send("文件不存在！");
    } else {
      // console.log(data);
      htmlStr = marked(data.toString());
      // console.log(htmlStr);
      res.render('blog/doc', { doc: htmlStr });
    }
  });
});

module.exports = router;