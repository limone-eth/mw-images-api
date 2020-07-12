'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";
import {XError} from "../../../routing-utilities/XError";
import {Authentication} from "../../../routing-utilities/Authentication";

export class LoginV1 extends RequestController {

    validate?: Joi.JoiObject = Joi.object().keys({
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    });

    async login(email: string, password: string): Promise<{ authentication: Authentication, user: {id: number} }> {
        const user = await User.findOne({
            where: {
                email,
                view: 1,
                role: 'user'
            }
        });
        if (!user) throw new XError(User.INVALID_CREDENTIALS_ERROR, 419, "Invalid credentials");
        const passwordMatch = await user.checkPwd(password);
        if (passwordMatch) {
            return {
                authentication: {
                    access_token: user.genToken()
                },
                user: {
                    id: user.id
                }
            };
        } else {
            console.log("password not matching");
            throw new XError(User.INVALID_CREDENTIALS_ERROR, 403, "Invalid credentials");
        }

    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<{ authentication: Authentication, user: {id: number} }> {
        return await this.login(req.body.email, req.body.password);
    }

}



