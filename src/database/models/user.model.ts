import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Tutorial from './tutorial.model';

@Table({
    tableName: 'users',
    timestamps: false,
})
export default class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    })
    id?: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'username',
    })
    username?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email',
        validate: {
            isEmail: true,
        },
    })
    email?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: 'password',
    })
    password?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        unique: true,
        field: 'google_id',
    })
    google_id?: string;

    @Column({
        type: DataType.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
        field: 'role',
    })
    role?: 'admin' | 'user';

    @HasMany(() => Tutorial)
    tutorials?: Tutorial[];
}