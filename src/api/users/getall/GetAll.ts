'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";

export class GetAll extends RequestController {
    validate?: Joi.JoiObject;

    async getAll(): Promise<User[]> {
        const users = await User.find({
                where: { role: 'user' }
        });
        return users;
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<User[]> {
        return await this.getAll();
    }

}