import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

export class Task extends Model {
	public id!: number;
	public title!: string;
	public description?: string;
	public status!: string;
}

// Define the task table structure
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
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	},
	{
		sequelize,
		modelName: "Task",
		tableName: "tasks",
		timestamps: true,
	}
);