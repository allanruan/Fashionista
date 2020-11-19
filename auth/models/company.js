const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
    _id:Number,
    name: String
});

module.exports = mongoose.model('Company', CompanySchema);