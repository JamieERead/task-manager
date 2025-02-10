import { Board } from "./Board";
import { Column } from "./Column";
import { Task } from "./Task";

// Define relationships
Board.hasMany(Column, { foreignKey: "boardId", as: "columns" });
Column.belongsTo(Board, { foreignKey: "boardId" });

Column.hasMany(Task, { foreignKey: "columnId", as: "tasks" });
Task.belongsTo(Column, { foreignKey: "columnId" });

export { Board, Column, Task };