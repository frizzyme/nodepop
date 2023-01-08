const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: String,
    sold:Boolean,
    price: Number,
    photo: String,
    tags: [String]
})


adSchema.statics.list = function (filter, skip, limit, sort) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort); 
    return query.exec(); 
}

const Ads = mongoose.model('Ads', adSchema);

module.exports = Ads;