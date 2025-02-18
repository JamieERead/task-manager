export interface IBoard {
  id?: number; // Optional for when a new task hasn't been saved yet
  title: string;
  description?: string;
  columns: IColumn[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IColumn {
	id: number;
	title: string;
	boardId: number;
	order: number;
	tasks: ITask[];

	[Symbol.iterator](): Iterator<IColumn>;
}

export interface ITask {
  id?: string; // Optional for when a new task hasn't been saved yet
	columnId: number;
  title: string;
  description?: string;
  status: string;
	order: number;
  createdAt?: string;
  updatedAt?: string;
}
