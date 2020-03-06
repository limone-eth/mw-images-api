'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {User} from "../../../db/models/User.model";
import {XError} from "../../../routing-utilities/XError";
import {Image} from "../../../db/models/Image.model";
import * as fs from "fs";
import * as path from "path";
import * as shortid from "shortid";



export class Upload extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        body: {
            title: Joi.string().required(),
            image_base64: Joi.string(),
        }
    });

    async upload(req: Request): Promise<Image[]> {
        const title = req.body.title;
        const image_base64 = req.body.image_base64;
        const users_id = req.user.id;
        const userFolderPath = path.resolve() + "/images/" + users_id + '/';
        const key = shortid.generate();
        const [images,count] = await Image.findAndCount({
            where: {
                key
            }
        });
        if (count > 0){
            throw new XError(Image.NOT_UNIQUE_KEY_ERROR,419, "There exists another image with that key");
        }
        const newImage = new Image();
        newImage.key = key;
        newImage.title = title;
        newImage.view = true;
        newImage.users_id = users_id;
        newImage.image_base64 = image_base64;
        await newImage.save();
        const toConvertBase64 = image_base64.substring(image_base64.indexOf(",") + 5);
        await fs.writeFile(userFolderPath + key + '.png', toConvertBase64, 'base64', (err) => {
            if (err){
                console.log(err);
                throw new XError(Image.WRITING_IMAGE_ERROR,419, "Error writing image on disk");
            }
        });
        return await Image.find({
            where: {
                view: 1,
                users_id
            }
        })
    };

    async exec(req: Request, res: Response, next: NextFunction): Promise<Image[]> {
        return await this.upload(req);
    }

}
