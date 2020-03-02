import {
    BaseEntity, BeforeInsert,
    Column,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import * as shortid from "shortid";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import {XLoDash} from "../../utils/XLoDash";
import {XError} from "../../routing-utilities/XError";
import {CustomError} from "../../routing-utilities/CustomError";
import {Image} from "./Image.model";
@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    seed: string;

    @Column()
    revoked_tokens: string;

    @Column()
    role: string;

    @Column()
    view: boolean;

    @OneToMany(type => Image, image => image.user)
    images: Image[];

    /**
     * ERRORS
     */
    static readonly CRYPTING_ERROR = new CustomError(1, 'crypting_error');
    static readonly ALREADY_EXISTENT_EMAIL_ERROR = new CustomError(2, 'email_already_exists');
    static readonly INVALID_CREDENTIALS_ERROR = new CustomError(3, 'invalid_credentials');
    static readonly CANNOT_RETRIEVE_USER_PROFILE_ERROR = new CustomError(4, 'cannot_retrieve_user_profile_error');

    /*
     * HOOKS
     */

    @BeforeInsert()
    async hashPassword() {
        try {
            const result = await bcrypt.hash(this.password, 10);
            this.password = result;
        } catch (err) {
            console.log(err);
            throw new XError(User.CRYPTING_ERROR, 419, "Crypting error")
        }
    }

    genToken(): string {
        return jwt.sign({
            email: this.email,
            role: this.role,
            id: shortid.generate()
        }, this.seed, {
            subject: this.id.toString()
        });
    };

    secureUser(): User {
        return XLoDash.excludeFieldsFromObject(this, ['password', 'seed', 'revoked_tokens'])
    }

    async checkPwd(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
