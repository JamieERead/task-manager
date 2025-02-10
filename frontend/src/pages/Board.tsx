import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BOARD, GET_TASKS } from "../graphql/queries";

const Board = () => {
  const { id } = useParams();
  console.log(id);
  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: { id },
  });
  //const { data, loading, error } = useQuery(GET_TASKS, { boardId: id });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.getTasks);

  return <div></div>;
};

export default Board;
