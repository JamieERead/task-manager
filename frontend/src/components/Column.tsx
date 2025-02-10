import { IColumn } from "@task-manager/types";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  // const onDragEnd = (result) => {
  //   if (!result.destination) return; // If dropped outside the list, do nothing

  //   const updatedTasks = [...tasks];
  //   const [movedTask] = updatedTasks.splice(result.source.index, 1);
  //   updatedTasks.splice(result.destination.index, 0, movedTask);

  //   //setTasks(updatedTasks);
  // };

  return (
    <Droppable droppableId="tasks">
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
          {column?.tasks.map((task, index: number) => (
            <Task key={task.id} index={index} task={task} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
