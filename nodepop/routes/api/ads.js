
const express = require('express');
const Ads= require('../../models/Ads');

const router = express.Router();;


// Recuperar anuncios a través de la API
router.get('/', function (req, res, next) {


    const tags = req.query.tags;
    const sold = req.query.sold;
    const name = req.query.name;

    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const filter = {};

    if (tags) {
        filter.tags = tags;
    }

    if (sold) {
        filter.sold = sold;
    }


    if (name) { 
        filter.name = new RegExp('^' + name, 'i');
    }

    Ads.list(filter, limit, sort, function (err, anuncios) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: anuncios});
    });
});

router.post('/', function (req, res, next) {

    const ad = new Ads(
    {
        name: req.body.name,
        sold: req.body.sold,
        price: req.body.price,
        photo: req.body.photo,
        tags: req.body.tags
    });

    ad.save(function (err, adsCreated) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }

        res.json({sucess: true, data: adsCreated});
    });

});

router.delete('/:id', function (req, res, next) {

    const id = req.params.id;
    Ads.remove({_id: id}, function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

router.delete('/', function (req, res, next) {

    Ads.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

router.get('/tags', function (req, res, next) {

    const tags = req.query.tags;

    const filter = {};

    if (tags) {
        filter.tags = tags;
    }

    Ads.list(filter, null, null, function (err, tags) {
        if (err) {
            res.json({sucess: false, error: err});
            return;
        }
        res.json({sucess: true, data: tags});
    });
});

module.exports = router;