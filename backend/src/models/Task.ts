import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: string;
	public columnId!: number;
	public order!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		order: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "columns",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);
