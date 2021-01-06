module.exports = {
    mongoosesToObject: function(mongooses){
        return mongooses.map(mogoose => mogoose.toObject());
    },
    
    mongooseToObject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}