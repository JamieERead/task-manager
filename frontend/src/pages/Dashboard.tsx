import { useQuery } from "@apollo/client";
import { GET_BOARDS } from "../graphql/queries";
import { IBoard } from "@task-manager/types";
import { Link } from "react-router-dom";

const style = {
  ul: {
    listStyle: "none",
    padding: 0,
  },
  li: {
    padding: "0",
  },
  a: {
    background: "#3b3b3b",
    borderRadius: "10px",
    padding: "10px",
    color: "white",
    display: "block",
  },
};

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_BOARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Task Manager</h1>
      <ul style={style.ul}>
        {data.getBoards.map((board: IBoard) => (
          <li style={style.li} key={board.id}>
            <Link to={`/board/${board.id}`} style={style.a}>
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
