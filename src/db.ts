import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://food-delivery:azharofficial@cluster0.snirkd7.mongodb.net/food-delivery?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
