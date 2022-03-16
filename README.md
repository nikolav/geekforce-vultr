

encrypt jwt
===========
- str1     = base64url <header{}> <payload{}>
- sigFn.write(str1).end()
- sig64    = sigFn.sign(<key.ppk>, "base64")
- sig64url = base64url.from(sig64)
  or `jsonwebtoken` module
- jwt.sign(<payload>, <secret> [, <config>]), 
  jwt.verify(<token>, <secret.pub> [, <config>, <callback>])



auth, passport-jwt, .pseudo
==================
==================


I) sign jwt, POST /register
===========================

// veify no user exists in db
//   else status/403;
// create user{ passwordHash }
// dbSave record
// fetch saved user's `_id` 
//   jwt.sign token with { _id }
// send token to client, status/201
// 

const newUser = new User({
  name         : req.body.username, 
  email        : req.body.email,
  passwordHash : hash( req.body.password, hashSalt, hashNumOfTurns  ),
})

newUser
  .save()
  .then(user => {

    const { _id } = user;
 
    const token = jwt.sign(
      { _id },  // payload
      <secret | key.priv>,
      {
        expiresIn : '10d',
        algorithm : 'RS256',
      });

      return res.json({ token });
  })



II) verify jwt; POST /login
===========================

// check .username exists in db
//   else status.403
// jwt.compare passwords, req.body.password, user.passwordHash
//   if no match status.401
// jwt.sign { _id }, send.200


III) passport-jwt, ANY /a/protected/route
================================================

router.get(
  "protected", 
  passport.authenticate("jwt", { session: false }), 
  (req, res, next) => res.status(200));

--

const {
  JwtStrategy, 
  ExtractJwt
} = require("jsonwebtoken");

const jwtConfig = {

  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey    : string,
  
  // algorithms: ['RS256'],
  
  jsonWebTokenOptions: {
    maxAge: number | string, // [sec], '10d', etc.
  }
};

passport.use(new JwtStrategy(

  jwtConfig,

  // verifyCallback
  ( payload, done ) => {

    // payload == { _id: <token> }, @36

    User
      .accessData( { filter, payload } )
      .then( signalDone( done ) );
    
    return done(
        <error>   | null, 
        <user>    | false, 
        <options> | void) ;
  }

));
