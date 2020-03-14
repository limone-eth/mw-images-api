import {RequestController} from "../../../routing-utilities/RequestController";

import * as Joi from "joi";
import {Request, Response, NextFunction} from "express";
import {User} from "../../../db/models/User.model";
import {JoiObject} from "joi";
import {Authentication} from "../../../routing-utilities/Authentication";
import {OAuth2Client} from 'google-auth-library';
import * as shortid from "shortid";
import * as request from "request-promise";


import {XError} from "../../../routing-utilities/XError";
import {Google} from "../../../db/models/Google.model";
import {Config} from "../../../components/Environment";


export class GoogleAccess extends RequestController {
    validate: JoiObject = Joi.object().keys({
        body: Joi.object().keys({
            token: Joi.string(),
            code: Joi.string()
        }).or('token', 'code')
    });

    async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
        return await this.google(req);
    }

    async google(req: Request): Promise<{ authentication: Authentication, user: { id: number } }> {
        console.log(req.body);
        let code;
        if (req.body.code) {
            code = req.body.code;
        }
        let token;
        if (req.body.token) {
            token = req.body.token;
        }
        let userCreated = false;
        // init Google client and get token
        if (code) {
            const client = new OAuth2Client(Config.Google.id, Config.Google.secret, Config.Google.redirect_url);
            try {
                const result = await client.getToken(code);
                token = result.tokens.id_token;
            } catch (error) {
                throw new XError(Google.GET_TOKEN_FROM_CODE_ERROR, 400, "Error in getting token from code.", error)
            }
        }
        // get User info from Google
        let googleUserInfo;
        try {
            const response = await request.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + token);
            googleUserInfo = JSON.parse(response);
        } catch (error) {
            throw new XError(Google.GET_USER_INFO_FROM_GOOGLE_ERROR, 400, "Error getting user info from Google.", error)
        }
        // check if user is already registered. If not, create it
        let user = await User.findOne({
            where: {
                email: googleUserInfo.email
            }
        });
        if (!user) {
            user = new User();
            user.first_name = googleUserInfo.given_name;
            user.last_name = googleUserInfo.family_name;
            user.password = shortid.generate();
            user.email = googleUserInfo.email;
            user.seed = shortid.generate();
            user.role = 'user';
            await user.save();
            userCreated = true;
        }
        let u;
        if (userCreated) {
            u = await User.findOne(user.id);
        } else {
            u = user;
        }
        // insert or update Google record
        let google = await Google.findOne({
            where: {
                id: u.id
            }
        });
        if (!google) {
            google = new Google();
            google.id = u.id;
        }
        google.alg = googleUserInfo.alg;
        google.at_hash = googleUserInfo.at_hash;
        google.aud = googleUserInfo.aud;
        google.azp = googleUserInfo.azp;
        google.google = googleUserInfo.google;
        google.iss = googleUserInfo.iss;
        google.kid = googleUserInfo.kid;
        google.sub = googleUserInfo.sub;
        google.typ = googleUserInfo.typ;
        await google.save();
        return {
            authentication: {
                access_token: await u.genToken()
            },
            user: {
                id: u.id
            }
        };
    }

}







