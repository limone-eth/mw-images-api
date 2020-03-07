'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Image} from "../../../db/models/Image.model";
import * as fs from "fs";
import * as path from "path";
import {User} from "../../../db/models/User.model";
import * as stream from "stream";
import * as mime from "mime";


export class Download extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            id: Joi.string().required()
        }
    });

    async retrieve(req: Request, res: Response, next: NextFunction): Promise<any> {
        const users_id = req.user.id;
        const id = req.params.id;
        const image = await Image.findOne({
            where: {
                id,
                users_id,
                view: 1
            }
        });
        if (!image) {
            throw new XError(Image.IMAGE_NOT_FOUND_ERROR,419, "Image not found or not belonging to current user")
        }
        const imagePath = path.resolve() + "/images/" + users_id + '/' + image.key + '.png';

        const filename = path.basename(imagePath);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'image/png');

        const filestream = fs.createReadStream(imagePath).on('close', () => {
            console.log('done');
        });
        res.attachment(imagePath);
        filestream.pipe(res);
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
        return await this.retrieve(req,res,next);
    }

}
