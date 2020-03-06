import {
    BaseEntity, BeforeInsert,
    Column,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "./User.model";
import {CustomError} from "../../routing-utilities/CustomError";
@Entity('images')
export class Image extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    title: string;

    @Column()
    users_id: number;

    @Column()
    view: boolean;

    @Column()
    image_base64: string;

    @ManyToOne(type => User, user => user.images)
    @JoinColumn({name: "users_id"})
    user: User;

    static readonly WRITING_IMAGE_ERROR = new CustomError(1, 'write_image_error');
    static readonly IMAGE_NOT_FOUND_ERROR = new CustomError(2, 'image_not_found_error');
    static readonly DELETING_IMAGE_ERROR = new CustomError(3, 'delete_image_error');
    static readonly NOT_UNIQUE_KEY_ERROR = new CustomError(3, 'not_unique_image_key_error');
}
