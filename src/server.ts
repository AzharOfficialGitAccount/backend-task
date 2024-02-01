import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import db from './db';
import authRoutes from './routes/auth';
import './utils/passport';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(session({ secret: 'sUp3Rs3cR3TK3Y', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/test', (req, res) => {
    res.send('Test route');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
    await db.close();
    console.log('Database connection closed.');
    process.exit(0);
});
