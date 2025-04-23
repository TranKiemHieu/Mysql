import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from './user.model';

@Table({
  tableName: "tutorials",
})
export default class Tutorial extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.STRING(255),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "published"
  })
  published?: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'userid',
  })
  userid?: number;

  @BelongsTo(() => User)
  user?: User;
}