const express = require('express');
const path = require('path');
const http = require('http');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');

const start = require('./server');

dotenv.config();
const APP_PORT = process.env.PORT || 3000;

const app = express();

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  },
  ((accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    done(null, profile);
  }
  ),
);



const sess = {
  secret: 'jesuisunebelle4pplication4313',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

// if (app.get('env') === 'production') {
//   sess.cookie.secure = true; // serve secure cookies, requires https
// }

const socketServer = http.createServer(app);

(async () => {
  await start(socketServer);
  passport.use(strategy);
  // express middleware
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, './client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
  });
  socketServer.listen(APP_PORT);
  console.warn('listening on port ', APP_PORT);
})();
