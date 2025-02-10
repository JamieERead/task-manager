import React from "react";
import { ITask } from "@task-manager/types";
import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: ITask;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
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
  );
};

export default Task;
