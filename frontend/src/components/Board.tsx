import { ITask } from "@task-manager/types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Board = ({ tasks }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    //setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            {tasks.map((task: ITask, index: number) => (
              <Draggable
                key={task.id}
                draggableId={task.id?.toString() || `${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "12px",
                      marginBottom: "8px",
                      background: "#292929",
                      borderRadius: "6px",
                      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                      ...provided.draggableProps.style,
                    }}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
