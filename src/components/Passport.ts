'use strict';


import {Strategy} from "passport-http-bearer"
import * as jwt from "jsonwebtoken";
import {Passport} from "passport"
import {User} from "../db/models/User.model";

const BearerStrategy = Strategy;
const passport = new Passport();

passport.use(new BearerStrategy(async (token, done) => {

    let decodedToken;
    try {
        decodedToken = jwt.decode(token);
    } catch (e) {
        return done(e);
    }

    if (!decodedToken || !decodedToken.sub) return done(new Error('Decoded token is not valid'));

    const user = await User.findOne(
        decodedToken.sub
    );
    if (!user) return done(null, false);
    try {
        const jsonToken = await jwt.verify(token, user.seed);
        const string = (user.revoked_tokens);
        const revokedTokens = (string) ? JSON.parse(string) : [];
        if (!(jsonToken instanceof String)){
            const tok: any = jsonToken;
            if (revokedTokens && revokedTokens.indexOf(tok.id) !== -1) return done(null, false);
        }
        const options: any = {
            role: user.role, token: jsonToken
        };
        return done(null, user, options);
    } catch (e) {
        done(e, user)
    }
}));

export class PassportComponent {

    p() {
        return passport;
    }

}

