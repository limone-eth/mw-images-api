import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express"
import {User} from "../../../db/models/User.model";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Authentication} from "../../../routing-utilities/Authentication";
import * as bcrypt from "bcrypt";

export class SignupV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        }
    });

    async signup(first_name: string, last_name: string, email: string, password: string): Promise<{ authentication: Authentication, user: {id: number} }> {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (user) {
            throw new XError(User.ALREADY_EXISTENT_EMAIL_ERROR, 419, "Email already exists");
        }
        const newUser = new User();
        newUser.first_name = first_name;
        newUser.role = 'user';
        newUser.last_name = last_name;
        newUser.email = email;
        const result = await bcrypt.hash(password, 10);
        newUser.password = result;
        newUser.revoked_tokens = 'null';
        newUser.view = true;
        newUser.seed = Math.floor(Math.random() * 100) + "";
        await newUser.save();
        const u = await User.findOne(newUser.id);
        return {
            authentication: {
                access_token: u.genToken()
            },
            user: {
                id: u.id
            }
        };
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<{ authentication: Authentication, user: {id:number} }> {
        return await this.signup(req.body.first_name, req.body.last_name, req.body.email, req.body.password);
    }

}
