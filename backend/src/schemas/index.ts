import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
	}

	type Task {
		id: ID!
		title: String!
		description: String
		status: String!
		assignedTo: User
	}

	type Query {
		getTasks: [Task!]
	}

	type Mutation {
		createTask(title: String!, description: String, status: String!): Task!
	}

	type Subscription {
		taskUpdated: Task!
	}
`;