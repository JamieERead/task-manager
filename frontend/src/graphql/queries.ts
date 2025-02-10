import { gql } from "@apollo/client";

export const GET_BOARDS = gql`
	query {
		getBoards {
			id
			title
			description
		}
	}
`;

export const GET_BOARD = gql`
	query GetBoard($id: ID!){
		getBoard(id: $id) {
			id
			title
			description
			columns {
				id	
				boardId
				title
				order
				tasks {
					id
					title
					status
				}
			}
		}
	}
`;

export const GET_TASKS = gql`
	query {
		getTasks {
			id
			title
			description
			status
		}
	}
`;

export const CREATE_TASK = gql`
	mutation ($title: String!, $description: String, $status: String!) {
		createTask(title: $title, description: $description, status: $status) {
			id
			title
			description
			status
		}
	}
`;