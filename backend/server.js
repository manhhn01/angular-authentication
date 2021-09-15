const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const config = require('./config');
const checkTokenMiddleware = require('./middleware/checkToken')

const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/angularAuth')
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log(err);
  })

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then((result) => {
      if (!result) {
        res.json({
          success: false,
          message: 'Your account doesn\'t exist. Please try again'
        });
        return Promise.reject();
      } else
        return bcrypt.compare(req.body.password, result.password)
    })
    .then((result) => {
      if (result) {
        const token = jwt.sign({ username: req.body.username }, config.tokenSecret, { expiresIn: config.tokenLife });
        res.json({
          success: true,
          message: 'Login successful',
          token: token,
        })
      } else {
        res.json({
          success: false,
          message: 'Login failed'
        });
      }
    })
    .catch((err) => {
      if (err) {
        res.json({
          success: false,
          message: 'Login failed'
        });
      }
    });
})

app.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hashed => {
      var newUser = new User({ username: req.body.username, password: hashed });
      newUser.save()
        .then((result) => {
          res.json({
            success: true,
            message: 'User created'
          })
        })
        .catch((err) => {
          if (err.code == 11000)
            res.json({
              success: false,
              message: 'Username was used',
              err: err,
            })
          else
            res.json({
              success: false,
              message: 'User create failed',
              err: err,
            })
        })
    });
})

app.get('/user', checkTokenMiddleware, (req, res) => {
  const user = req.decoded;
  res.json(user);
})

app.listen(3000, () => {
  console.log('server is running');
})