import {User} from "../db/models/User.model";
import * as bcrypt from 'bcrypt';
import {XError} from "../routing-utilities/XError";

export class BcryptCP {
    static async hashPassword(user: User, password: string): Promise<User> {
        try {
            const result = await bcrypt.hash(password, 10);
            user.revoked_tokens = null;
            user.password = result;
            await user.save();
            return user;
        } catch (err) {
            console.log(err);
            throw new XError(User.CRYPTING_ERROR, 419, "Crypting error", err)
        }
    };
}

