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
}

export interface ITask {
  id?: number; // Optional for when a new task hasn't been saved yet
  title: string;
  description?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
