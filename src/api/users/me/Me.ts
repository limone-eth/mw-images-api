'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";
import {XError} from "../../../routing-utilities/XError";

export class Me extends RequestController {
    validate?: Joi.JoiObject;

    async me(req: Request): Promise<User> {
        // Each user can only retrieve its own profile
        const id = req.user.id;
        const user = await User.findOne({
            where: {
                id,
                role: 'user'
            }
        });
        return user;
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<User> {
        return await this.me(req);
    }

}
