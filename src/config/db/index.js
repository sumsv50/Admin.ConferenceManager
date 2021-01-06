const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect successful!');
    } catch (error) {
        console.log('Connect fail!');
    }
}
module.exports = { connect };