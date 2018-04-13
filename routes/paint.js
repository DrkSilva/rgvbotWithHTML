var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var url = process.env.URL;
var db = mongojs(url, ['paints']);

// Get All Paints
router.get('/paints', function(req, res, next){
    db.paints.find(function(err, paints){
        if(err){ 
            res.send(err);
        }
        res.json(paints);
    });
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