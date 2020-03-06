'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Image} from "../../../db/models/Image.model";
import * as fs from "fs";
import * as path from "path";


export class Delete extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            id: Joi.string().required()
        }
    });

    async delete(req: Request): Promise<Image[]> {
        const id = req.params.id;
        const users_id = req.user.id;
        const image = await Image.findOne({
            where: {
                id,
                users_id,
                view: true
            }
        });
        if (!image) {
            throw new XError(Image.IMAGE_NOT_FOUND_ERROR, 419, "Image not found or not belonging to current user")
        }
        image.view = false;
        await image.save();
        try {
            await fs.unlinkSync(path.resolve() + "/images/" + users_id + '/' + image.key + '.png')
            // file removed
        } catch (err) {
            throw new XError(Image.DELETING_IMAGE_ERROR, 419, "Error deleting image from disk.")
        }
        return await Image.find({
            where: {
                view: 1,
                users_id
            }
        })
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
        return await this.delete(req);
    }

}
