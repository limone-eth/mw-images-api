'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";

export class LogoutV1 extends RequestController {
    validate?: Joi.JoiObject;

    async logout(req: Request): Promise<null> {
        const revokedTokens: string = req.user.revoked_tokens;
        const r: string[] = (revokedTokens) ? JSON.parse(revokedTokens) : [];
        let revTokens = 'null';
        if (r) {
            r.push(req.authInfo.token.id);
            revTokens = JSON.stringify(revokedTokens) !== 'null' ? JSON.stringify(revokedTokens) : null;
        }
        const user = await User.findOne(req.user.id);
        user.revoked_tokens = revTokens;
        await user.save();
        return null;
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<null> {
        return await this.logout(req);
    }

}



