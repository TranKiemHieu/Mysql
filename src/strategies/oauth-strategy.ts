import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import User from '../database/models/user.model';

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, (user as User).id); //ép kiểu để serializeUser biết chắc chắc trong db có id để tránh undefined
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findOne({
            where: { id: id }
        });
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        done(err, null);
    }
})
passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            //localhost: callbackURL: "http://localhost:8080/api/auth/google/redirect",
            callbackURL: "http://api.dimori.net/api/auth/google/redirect",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            let findUser
            try {
                findUser = await User.findOne({
                    where: { google_id: profile.id }
                });
            } catch (err) {
                return done(err, null)
            }
            try {
                if (!findUser) {
                    const newUser = new User({
                        username: profile.displayName,
                        email: profile.email,
                        google_id: profile.id,
                    })
                    const newSavedUser = await newUser.save();
                    return done(null, newSavedUser);
                }
                return done(null, findUser)
            } catch (err) {
                console.log(err)
                return done(err, null)
            }
        }
    )
);