import { useQuery, useMutation, useQueryClient } from "react-query";
import { Todos, fetchTodos, addTodo } from "../api";
import { useState } from "react";

export default function Demo() {
  const queryClient = useQueryClient();

  const [query] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery<Todos, Error>({
    queryFn: () => fetchTodos(query),
    queryKey: ["todos", { query }],
    // staleTime: Infinity,
    // cacheTime : 0
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        onClick={async () => {
          try {
            await addTodoMutation({ title });
            setTitle("");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Add Todo
      </button>
      {todos?.todos.map((todo) => {
        return <div key={todo.id}> {todo.title} </div>;
      })}
    </div>
  );
}
