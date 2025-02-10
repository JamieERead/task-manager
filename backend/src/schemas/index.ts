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
		boardId: ID!
		title: String!
		tasks: [Task!]!
		order: Int!
	}

	type Task {
		id: ID!
		title: String!
		description: String
		status: String!
		assignedTo: User
		columnId: ID!
		order: Int!
	}

	type Query {
		getBoards: [Board!]
		getBoard(id: ID!): Board
		getTasks: [Task!]
	}

	type Mutation {
		createBoard(title: String!, description: String): Board!
		createColumn(boardId: ID!, title: String!, orderIndex: Int!): Column!
		createTask(title: String!, description: String, status: String!, order: Int!, columnId: Int!): Task!
		updateTask(id: ID!, columnId: ID!): Task!
	}

	type Subscription {
		taskUpdated: Task!
	}
`;