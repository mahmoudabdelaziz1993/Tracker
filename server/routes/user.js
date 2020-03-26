const router = require('express').Router();
const passport = require('passport');


/**
 * register route 
 */
router.post('/register',passport.authenticate('register',{session:false}),(req,res)=>res.send(req.body));
router.post('/login',passport.authenticate('login'))

module.exports = router