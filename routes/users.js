var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var url = process.env.URL;
var db = mongojs(url, ['users']);

router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){ 
            res.send(err);
        }
        res.json(users);
    });
});

//Save user
router.post('/user', function(req, res, next){
    var user = req.body;
    if(!user.ip){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

module.exports = router; 