var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://kvoruh:password@ds115799.mlab.com:15799/mytasklist_kvoruh', ['guys']);
var db2 = mongojs('mongodb://kvoruh:password@ds115799.mlab.com:15799/mytasklist_kvoruh', ['users']);
router.get('/users', function(req, res, next){
    db2.users.find(function(err, users){
        if(err){ 
            res.send(err);
        }
        res.json(users);
    });
});


//Save Guy
router.post('/user', function(req, res, next){
    var user = req.body;
    if(!user.ip){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db2.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});


// Get All Guys
router.get('/guys', function(req, res, next){
    db.guys.find(function(err, guys){
        if(err){ 
            res.send(err);
        }
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guysnam', function(req, res, next){
    db.guys.find().sort({name:1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guyssub', function(req, res, next){
    db.guys.find().sort({subname:1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guysisw', function(req, res, next){
    db.guys.find().sort({isWorking:1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guysnamdes', function(req, res, next){
    db.guys.find().sort({name:-1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guyssubdes', function(req, res, next){
    db.guys.find().sort({subname:-1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});

// Get All Guys ordered
router.get('/guysiswdes', function(req, res, next){
    db.guys.find().sort({isWorking:-1},function(err, guys){
        if(err){ 
            res.send(err);
        } 
        res.json(guys);
    });
});
// Get Single Guy
router.get('/guy/:id', function(req, res, next){
    db.guys.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, guy){
        if(err){
            res.send(err);
        }
        res.json(guy);
    });
});

//Save Guy
router.post('/guy', function(req, res, next){
    var guy = req.body;
    if(!guy.name || !guy.subname || !(guy.isWorking + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.guys.save(guy, function(err, guy){
            if(err){
                res.send(err);
            }
            res.json(guy);
        });
    }
});

// Delete Guy
router.delete('/guy/:id', function(req, res, next){
    db.guys.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, guy){
        if(err){
            res.send(err);
        }
        res.json(guy);
    });
});

// Update Guy
router.put('/guy/:id', function(req, res, next){
    var guy = req.body;
    var updGuy = {};
    
    if(guy.isWorking){
        updGuy.isWorking = guy.isWorking;
    }
    
    if(guy.name){
        updGuy.name = guy.name;
    }
    if(guy.subname){
        updGuy.subname = guy.subname;
    }
    
    if(!updGuy){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.guys.update({_id: mongojs.ObjectId(req.params.id)},updGuy, {}, function(err, guy){
        if(err){
            res.send(err);
        }
        res.json(guy);
    });
    }
});

module.exports = router;