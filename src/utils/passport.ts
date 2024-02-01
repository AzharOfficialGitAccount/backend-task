import passport from 'passport';
import { Strategy as OIDCStrategy } from 'passport-openidconnect';
import User from '../models/User';
import { generateRandomString } from '../utils/random';

const clientID = generateRandomString(16);
const clientSecret = generateRandomString(32);

passport.use(
    new OIDCStrategy(
        {
            issuer: 'http://localhost:3000',
            authorizationURL: 'http://localhost:3000/auth/authorize',
            tokenURL: 'http://localhost:3000/auth/token',
            userInfoURL: 'http://localhost:3000/auth/userinfo',
            clientID,
            clientSecret,
            callbackURL: 'http://localhost:4000/callback',
        },
        async (issuer: any, sub: any, profile: any, accessToken: any, refreshToken: any, done: any) => {
            try {
                let user = await User.findOne({ sub });

                if (!user) {
                    const randomPassword = generateRandomString(12);
                    user = new User({
                        sub,
                        issuer,
                        username: profile.username,
                        password: randomPassword,
                        accessToken,
                        refreshToken,
                    });

                    await user.save();
                } else {
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    )
);

export { clientID, clientSecret };
