import { PubSub } from "graphql-subscriptions";
import { Task } from "../models";

const pubsub = new PubSub();

export const resolvers = {
	Query: {
		getTasks: async () => {
			return await Task.findAll();
		}
	},
	Mutation: {
		createTask: async (_: any, { title, description, status }: Task) => {
			const task = await Task.create({ title, description, status });
			pubsub.publish("TASK_UPDATED", { taskUpdated: task });
			return task;
		}
	},
	Subscription: {
		taskUpdated: {
			subscribe: () => pubsub.asyncIterableIterator(["TASK_UPDATED"]),
		}
	}
};