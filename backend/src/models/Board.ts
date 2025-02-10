import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import { Column } from "./Column";

export class Board extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public columns!: Column[];
}

Board.init(
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
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "boards",
    timestamps: true,
  }
);