import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Column extends Model {
	public id!: number;
  public title!: string;
  public description?: string;
	public boardId!: number;
	public order!: number;
}

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
		},
		order: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
		}
	},
	{    
		sequelize,
    modelName: "Column",
    tableName: "columns",
	}
);