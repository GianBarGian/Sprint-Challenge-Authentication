const axios = require('axios');
const bcrypt = require('bcryptjs');
const helpers = require('./helpers');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '12h'
  }

  return  jwt.sign(payload, 'add a .env file to root of project with the JWT_SECRET variable', options)
}

function register(req, res) {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

  helpers.add(user)
    .then(() => {
      res.json({ message: 'user registered succesfully'})
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem adding the user'});
    })
}

function login(req, res) {
  let user = req.body;

  helpers.findByName(user.username)
    .then(response => {
      if (response && bcrypt.compareSync(user.password, response.password)) {
        const token = makeToken(response);
        res.json({
          message: `Welcome ${user.username}`,
          token,
        })
      }
      res.status(401).json({ message: 'invalid credentials'});
        
    })
    .catch(err => {
      res.status(500).json({ message: 'There was a problem logging in. Retry.'});
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
