import { IBoard, IColumn, ITask } from "@task-manager/types";
import { PubSub } from "graphql-subscriptions";
import { Board, Column, Task } from "../models";

const pubsub = new PubSub();

export const resolvers = {
	Query: {
		getBoard: async (_: any, { id }: {id: number}) => {
			console.log(id)
			if (!id) {
				throw new Error("ID is required!");
			}

			try {
				const board = await Board.findOne({
					where: { id },
					include: [
						{
							model: Column,
							as: 'columns',
							include: [
								{
									model: Task,
									as: 'tasks',
								}
							]
						}
					],
					raw: false,
				});
		
				if (!board) {
					throw new Error(`Board with ID ${id} not found`);
				}
				return board.toJSON();
			} catch (error) {
				console.error("Error fetching board:", error);
				throw new Error("Internal server error");
			}
		},
		
		getBoards: async () => {
			try {
				const boards = await Board.findAll({ include: [{ model: Column, as: "columns" }] });
				
				return boards.map((board) => ({
					...board.toJSON(),
					columns: board.columns ?? [],
				}));
			} catch (error) {
				console.error("Error fetching boards:", error);
				throw new Error("Internal server error");
			}
		},
		getTasks: async () => {
			try {
				const tasks = await Task.findAll({ raw: true });
				return tasks;
			} catch (error) {
				console.error("Error fetching tasks:", error);
				throw new Error("Internal server error");
			}
		}
	},
	Mutation: {
		createBoard: async (_: any, { title, description }: IBoard) => {
			if (!title) {
				throw new Error("Title is required!");
			}

			try {
				const board = await Board.create({ title, description });

				if (!board) {
					throw new Error("Failed to create board");
				}

				const boardJson = board.toJSON();
				const toDoColumn = await Column.create({
					title: "To Do",
					boardId: boardJson.id,
					order: 0
				});

				return {
					...boardJson,
					columns: [toDoColumn.toJSON]
				};
			} catch (error) {
				console.error("Error creating board:", error);
				throw new Error("Internal server error");
			}
		},
		createTask: async (_: any, { title, description, status, order, columnId }: ITask) => {
			if (!title) {
				throw new Error("Title is required!");
			}
			if (!status) {
				throw new Error("Status is required!");
			}
			if (order === undefined || order === null) {
				throw new Error("Order is required!");
			}
			if (!columnId) {
				throw new Error("ColumnId is required!");
			}
	
			try {
				const task = await Task.create({ title, description, status, order, columnId });

				if (!task) {
					throw new Error("Failed to create task");
				}
				
				pubsub.publish("TASK_UPDATED", { taskUpdated: task });

				return {
					id: task.id ?? 0, // Ensure ID is never null
					title: task.title || "Untitled Task",
					description: task.description || "",
					status: task.status || "Pending",
					order: task.order ?? 0,
					columnId: task.columnId ?? 0
				};
			} catch (error) {
				console.error("Error creating task:", error);
				throw new Error("Internal server error");
			}
		}
	},
	Subscription: {
		taskUpdated: {
			subscribe: () => pubsub.asyncIterableIterator(["TASK_UPDATED"]),
		}
	}
};