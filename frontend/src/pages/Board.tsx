import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { GET_BOARD, UPDATE_TASK } from "../graphql/queries";
import Column from "../components/Column";
import { IBoard, IColumn, ITask } from "@task-manager/types";

const Board = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: { id },
  });
  const board: IBoard = data?.getBoard;

  const [updateTask] = useMutation(UPDATE_TASK, {
    onError: () => {
      console.error("Error updating task:", error);
    },
  });

  useEffect(() => {
    if (!board) {
      return;
    }
    const allTasks: ITask[] = board.columns.reduce((tasksArr, column) => {
      return [...tasksArr, ...column.tasks];
    }, []);

    allTasks.sort((a, b) => a.order - b.order);

    setTasks(allTasks);
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // If dropped outside the list, do nothing

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // No change in position, do nothing
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    if (!draggableId) return;

    // Optimistically update the task's columnId and order
    const updatedTasks = tasks.map((task) =>
      task.id === draggedTask.id
        ? {
            ...task,
            columnId: destination.droppableId,
            order: destination.index,
          }
        : task
    );

    updatedTasks.sort((a, b) => a.order - b.order);

    setTasks(updatedTasks); // Update local state immediately

    // Call mutation to update server state
    // updateTask({
    //   variables: {
    //     taskId: draggedTask.id,
    //     columnId: destination.droppableId,
    //     order: destination.index,
    //   },
    //   optimisticResponse: {
    //     updateTask: {
    //       ...draggedTask,
    //       columnId: destination.droppableId,
    //       order: destination.index,
    //     },
    //   },
    // });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {board.columns.map((column: IColumn) => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter((task) => task.columnId === column.id)}
        />
      ))}
    </DragDropContext>
  );
};

export default Board;
