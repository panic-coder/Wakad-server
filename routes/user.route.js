const express = require('express');
const router = express.Router();
const User = require('../controller/user.controller');
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    req.body.image = file.originalname;
    cb(null, req.body.image);
  }
});

var upload = multer({
  storage: storage
});

router.post('/registration', upload.single('image'), User.registration);
router.get('/users', User.getUsers);
router.put('/users', upload.single('image'), User.editUsers);
router.delete('/users', User.deleteUser);
router.get('/details/:id', User.details);

module.exports = router;
