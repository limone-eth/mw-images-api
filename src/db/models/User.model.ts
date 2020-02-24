import {
    BaseEntity, BeforeInsert,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import * as shortid from "shortid";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import {XLoDash} from "../../utils/XLoDash";
import {XError} from "../../routing-utilities/XError";
import {CustomError} from "../../routing-utilities/CustomError";
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

    /**
     * ERRORS
     */
    static readonly CRYPTING_ERROR = new CustomError(1, 'crypting_error');
    static readonly ALREADY_EXISTENT_EMAIL_ERROR = new CustomError(2, 'email_already_exists');
    static readonly INVALID_CREDENTIALS_ERROR = new CustomError(3, 'invalid_credentials');
    static readonly WRONG_PASSWORD_ERROR = new CustomError(4, 'wrong_password');
    static readonly USER_WITH_EMAIL_NOT_FOUND_ERROR = new CustomError(5, 'user_with_email_not_found');
    static readonly RESET_PWD_EMAIL_NOT_SENT_ERROR = new CustomError(6, 'reset_pwd_email_not_sent');
    static readonly INVALID_TOKEN_RESET_PASSWORD_ERROR = new CustomError(7, 'invalid_token_to_reset_password');
    static readonly NO_USER_ID_INVALID_TOKEN_ERROR = new CustomError(8, 'no_user_id_invalid_token_to_reset_password');
    static readonly RESET_PWD_MALFORMED_ERROR = new CustomError(9, 'reset_pwd_malformed_reset');
    static readonly RESET_PWD_NULL_ERROR = new CustomError(10, 'reset_pwd_is_null');
    static readonly ID_PASSWORD_NOT_MATCH_ERROR = new CustomError(11, 'id_password_not_matching');
    static readonly UPDATE_USER_ERROR_ERROR = new CustomError(12, 'update_user_error');

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
