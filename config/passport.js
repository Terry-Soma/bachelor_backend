const Sequelize = require('sequelize');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const models = require('../models');

passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: '695757838439083',
      clientSecret: '63d4aee56d73deabe34642e7e375c27d',
    },
    async (accessToken, refreshToken, profile, done, res) => {
      console.log(profile, done, res);
      const existingUser = await models.fb.findOne({
        where: {
          [Sequelize.Op.or]: [
            { facebookid: { [Sequelize.Op.eq]: profile.id } },
            {
              email: { [Sequelize.Op.eq]: profile.emails[0].value },
            },
          ],
        },
        attributes: ['id', 'email', 'facebookid'],
      });

      if (existingUser) {
        console.log(existingUser);
        return done(null, existingUser);
      }

      const newuser = await models.fb.create({
        email: profile.emails[0].value,
        facebookid: profile.id !== null ? profile.id : null,
      });

      if (typeof newuser !== 'undefined' && newuser !== null) {
        console.log(`record inserted successfully`);
        return done(null, newuser);
      }
    }
  )
);
// var GoogleStrategy = require('passport-google-oidc');

// passport.use(new GoogleStrategy({
//     clientID: process.env['GOOGLE_CLIENT_ID'],
//     clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//     callbackURL: 'https://www.example.com/oauth2/redirect'
//   },
//   function verify(issuer, profile, cb) {
//     db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//       issuer,
//       profile.id
//     ], function(err, cred) {
//       if (err) { return cb(err); }
//       if (!cred) {
//         // The account at Google has not logged in to this app before.  Create a
//         // new user record and associate it with the Google account.
//         db.run('INSERT INTO users (name) VALUES (?)', [
//           profile.displayName
//         ], function(err) {
//           if (err) { return cb(err); }

//           var id = this.lastID;
//           db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
//             id,
//             issuer,
//             profile.id
//           ], function(err) {
//             if (err) { return cb(err); }
//             var user = {
//               id: id.toString(),
//               name: profile.displayName
//             };
//             return cb(null, user);
//           });
//         });
//       } else {
//         // The account at Google has previously logged in to the app.  Get the
//         // user record associated with the Google account and log the user in.
//         db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
//           if (err) { return cb(err); }
//           if (!user) { return cb(null, false); }
//           return cb(null, user);
//         });
//       }
//     }
//   })
// ));

// app.get('/oauth2/redirect',
//   passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/');
//   });

// app.get('/login/google', passport.authenticate('google'));
