import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Board } from "./Board";

export class Column extends Board {}

Column.init(
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
		boardId: {
			type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "boards",
        key: "id"
      },
      onDelete: "CASCADE"
		}
	},
	{    
		sequelize,
    modelName: "Column",
    tableName: "columns",
	}
);