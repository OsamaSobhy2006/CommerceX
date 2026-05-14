const mongoose = require('mongoose');

const connectDB = async () => {
try {
    await mongoose.connect(process.env.PRODUCTION_URL);
    console.log(`MongoDB connected to ${mongoose.connection.name}`);
} catch (err) {
    console.error(err);
}
};

module.exports = connectDB;