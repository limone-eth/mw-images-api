'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Image} from "../../../db/models/Image.model";
import * as fs from "fs";
import * as path from "path";
import {User} from "../../../db/models/User.model";


export class Retrieve extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            id: Joi.string().required()
        }
    });

    async retrieve(req: Request): Promise<Image[]> {
        const users_id = req.user.id;
        const user = await User.findOne(users_id, {
            relations: ['images']
        });
        return user.images;
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
        return await this.retrieve(req);
    }

}
