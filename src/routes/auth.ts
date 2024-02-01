import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User';

const router = Router();

declare module 'express' {
    interface Request {
        user?: IUser;
    }
}

router.get('/authorize', passport.authenticate('openidconnect'));

router.get('/callback', passport.authenticate('openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

router.post('/token', passport.authenticate('openidconnect', { session: false }));


router.get('/userinfo', passport.authenticate('openidconnect', { session: false }), async (req: any, res: any) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = req.user as IUser;
        const existingUser = await User.findOne({ sub: user.sub, issuer: user.issuer }).exec();

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            sub: existingUser.get('sub'),
            issuer: existingUser.get('issuer'),
            username: existingUser.get('username'),
            accessToken: existingUser.get('accessToken'),
            refreshToken: existingUser.get('refreshToken'),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { sub, issuer, username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            sub,
            issuer,
            username,
            password: hash,
            accessToken: null,
            refreshToken: null,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
