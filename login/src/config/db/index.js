const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/user_info'), {
            useNewUrlParser: true,
            useCreateIndexes: true,
            useUnifiedTopology: true
        }
        console.log('Successfully connect');
    } catch (error) {
        console.log('Failed connect')
    }
}




module.exports = { connect };