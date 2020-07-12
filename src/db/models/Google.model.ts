import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {CustomError} from "../../routing-utilities/CustomError";

@Entity('googles')
export class Google extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    alg: string;

    @Column()
    at_hash: string;

    @Column()
    aud: string;

    @Column()
    azp: string;

    @Column()
    google: string;

    @Column()
    iss: string;

    @Column()
    kid: string;

    @Column()
    sub: string;

    @Column()
    typ: string;


    static readonly GET_TOKEN_FROM_CODE_ERROR = new CustomError(9, 'get_token_from_code_error');
    static readonly GET_USER_INFO_FROM_GOOGLE_ERROR = new CustomError(10, 'get_user_info_from_google_error');

}
