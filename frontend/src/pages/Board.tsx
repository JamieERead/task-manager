import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_TASKS } from "../graphql/queries";

const Board = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.getTasks);

  return <div></div>;
};

export default Board;
