'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";
import {XError} from "../../../routing-utilities/XError";

export class GetById extends RequestController {
    validate?: Joi.JoiObject;

    async getById(req: Request): Promise<User> {
        // Each user can only retrieve its own profile
        if ((req.user.id).toString() === req.params.id) {
            const id = req.user.id;
            const user = await User.findOne({
                where: {
                    id,
                    role: 'user'
                }
            });
            if (!user)
                throw new XError(User.INVALID_CREDENTIALS_ERROR, 403, "Invalid credentials");
            else
                return user;

        } else {
            throw new XError(User.CANNOT_RETRIEVE_USER_PROFILE_ERROR, 403, "Cannot retrieve profile of another user");
        }
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<User> {
        return await this.getById(req);
    }

}
