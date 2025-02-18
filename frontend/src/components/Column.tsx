import { IColumn, ITask } from "@task-manager/types";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <>
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              padding: "16px",
              background: "#474747",
              borderRadius: "8px",
            }}
          >
            {tasks.map((task, index: number) => (
              <Task key={task.id} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Column;
