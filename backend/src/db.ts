import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
	dialect: "postgres",
	logging: false
});

// Ensure models as initalised
import "./models/Task";

if (process.env.NODE_ENV !== "production") {
	sequelize.sync(); // sync models with DB
}