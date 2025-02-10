import { Board } from "./Board";
import { Column } from "./Column";
import { Task } from "./Task";

// Define relationships
Board.hasMany(Column, { foreignKey: "boardId", as: "columns", onDelete: "CASCADE" });
Column.belongsTo(Board, { foreignKey: "boardId", onDelete: "CASCADE" });

Column.hasMany(Task, { foreignKey: "columnId", as: "tasks", onDelete: "CASCADE" });
Task.belongsTo(Column, { foreignKey: "columnId", onDelete: "CASCADE" });

export { Board, Column, Task };