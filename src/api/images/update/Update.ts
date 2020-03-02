'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Image} from "../../../db/models/Image.model";
import * as fs from "fs";
import * as path from "path";


export class Update extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            id: Joi.string().required()
        },
        body: {
            title: Joi.string().required()
        }
    });

    async update(req: Request): Promise<Image[]> {
        const id = req.params.id;
        const title = req.body.title;
        const users_id = req.user.id;
        const image = await Image.findOne({
            where: {
                id,
                users_id
            }
        });
        if (!image) {
            throw new XError(Image.IMAGE_NOT_FOUND_ERROR,419, "Image not found or not belonging to current user")
        }
        image.title = title;
        await image.save();
        return await Image.find({
            where: {
                view: 1,
                users_id
            }
        });
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
        return await this.update(req);
    }

}
