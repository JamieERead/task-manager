import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
	}

	type Board {
		id: ID!
		title: String!
		description: String
		columns: [Column!]!
	}

	type Column {
		id: ID!
		title: String!
		tasks: [Task!]!
	}

	type Task {
		id: ID!
		title: String!
		description: String
		status: String!
		assignedTo: User
		columnId: ID!
	}

	type Query {
		getBoards: [Board!]
		getBoard(id: ID!): Board
		getTasks: [Task!]
	}

	type Mutation {
		createBoard(title: String!, description: String): Board!
		createTask(title: String!, description: String, status: String!): Task!
		updateTaskColumn(id: ID!, columnId: ID!): Task!
	}

	type Subscription {
		taskUpdated: Task!
	}
`;