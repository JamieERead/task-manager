import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { sequelize } from "./db";

const app = express();
app.use(cors());2
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => { req } })

async function startServer() {
	try {
		await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

		await server.start();
		server.applyMiddleware({ app });
		
		const PORT = process.env.PORT || 4000;
		app.listen(PORT, () => {
			console.log(`🚀 Server running at http://localhost:4000${server.graphqlPath}`);
		});
	} catch (error) {
		console.error("❌ Error connecting to the database:", error);
    process.exit(1); // Exit if DB connection fails

	}
}

startServer();