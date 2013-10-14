var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var marketSchema = new Schema({
    slug: String,
    title:  String,
    address: String
});
 
module.exports = mongoose.model('Market', marketSchema);