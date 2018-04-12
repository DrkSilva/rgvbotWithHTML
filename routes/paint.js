var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var url = process.env.URL;
var db = mongojs(url, ['paints']);
var db2 = mongojs(url, ['users']);
router.get('/users', function(req, res, next){
    db2.users.find(function(err, users){
        if(err){ 
            res.send(err);
        }
        res.json(users);
    });
});


//Save Paint
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


// Get All Paints
router.get('/paints', function(req, res, next){
    db.paints.find(function(err, paints){
        if(err){ 
            res.send(err);
        }
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintsnam', function(req, res, next){
    db.paints.find().sort({name:1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintssub', function(req, res, next){
    db.paints.find().sort({subname:1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintsisw', function(req, res, next){
    db.paints.find().sort({isWorking:1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintsnamdes', function(req, res, next){
    db.paints.find().sort({name:-1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintssubdes', function(req, res, next){
    db.paints.find().sort({subname:-1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});

// Get All Paints ordered
router.get('/paintsiswdes', function(req, res, next){
    db.paints.find().sort({isWorking:-1},function(err, paints){
        if(err){ 
            res.send(err);
        } 
        res.json(paints);
    });
});
// Get Single Paint
router.get('/paint/:id', function(req, res, next){
    db.paints.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, paint){
        if(err){
            res.send(err);
        }
        res.json(paint);
    });
});

//Save Paint
router.post('/paint', function(req, res, next){
    var paint = req.body;
    if(!paint.name || !paint.subname || !(paint.isWorking + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.paints.save(paint, function(err, paint){
            if(err){
                res.send(err);
            }
            res.json(paint);
        });
    }
});

// Delete Paint
router.delete('/paint/:id', function(req, res, next){
    db.paints.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, paint){
        if(err){
            res.send(err);
        }
        res.json(paint);
    });
});

// Update Paint
router.put('/paint/:id', function(req, res, next){
    var paint = req.body;
    var updPaint = {};
    
    if(paint.isWorking){
        updPaint.isWorking = paint.isWorking;
    }
    
    if(paint.name){
        updPaint.name = paint.name;
    }
    if(paint.subname){
        updPaint.subname = paint.subname;
    }
    
    if(!updPaint){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.paints.update({_id: mongojs.ObjectId(req.params.id)},updPaint, {}, function(err, paint){
        if(err){
            res.send(err);
        }
        res.json(paint);
    });
    }
});

module.exports = router;