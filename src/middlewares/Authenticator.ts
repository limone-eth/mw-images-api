import {PassportComponent} from "../components/Passport"
import * as express from "express";

const passport = new PassportComponent();
export class Authenticator {

    constructor(public requestedRole: string[] | string) {

    }

    authorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        return passport.p().authenticate('bearer', (err, user, info) => {
            if (err) {
                // log.error(err, 'authentication error', {headers: req.headers, ip: req.ip});
                return res.status(500).json({message: 'Authentication error', err});
            }
            if (user === false) return res.sendStatus(401);
            if (this.requestedRole) {
                if (typeof this.requestedRole === 'string') {
                    if (this.requestedRole !== info.role) return res.sendStatus(401);
                } else {
                    if (this.requestedRole.constructor === Array) {
                        if (this.requestedRole.indexOf(info.role) === -1) {
                            return res.sendStatus(401);
                        }
                    }
                }
            }

            // Those 3 lines: https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js#L193-L195
            // Bypass a lot of Jared's work!
            req.user = user;
            req.authInfo = info;
            next();
        })(req, res, next);
    };

}
