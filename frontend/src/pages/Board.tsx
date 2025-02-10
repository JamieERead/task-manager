import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { GET_BOARD } from "../graphql/queries";
import Column from "../components/Column";
import { IBoard } from "@task-manager/types";

const Board = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: { id },
  });
  const board: IBoard = data?.getBoard;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </DragDropContext>
  );
};

export default Board;
