import axios from "axios";
import blogApi from "./auth";

import type { FeatureCollection } from "geojson";

export const fetchGeoJson = async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/ksks2211/data/main/geojson/UsStatesData.geojson"
  );
  const { data } = response;
  return data as FeatureCollection;
};

interface LoginForm {
  username: string;
  password: string;
}

export const getToken = async (loginForm: LoginForm) => {
  const response = await blogApi.post("/log-in", loginForm);
  return response.data;
};

export const getPostById = async (postId: number) => {
  const { data } = await blogApi.get(`/posts/${postId}`);
  return data;
};

export const getPosts = async (page: number) => {
  const query = new URLSearchParams();
  query.set("page", `${page}`);
  const { data } = await blogApi.get(`/posts?${query.toString()}`);
  return data;
};

// SAMPLE
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface Todos {
  todos: Todo[];
}

const globalTodos: Todos = {
  todos: [
    { id: 1, title: "Learn HTML", completed: true },
    { id: 2, title: "Learn Javascript", completed: false },
    { id: 3, title: "Learn Python", completed: true },
    { id: 4, title: "Learn CSS", completed: true },
    { id: 5, title: "Learn Java", completed: false },
    { id: 6, title: "Learn C++", completed: false },
  ],
};
export const fetchTodos = async (query = "") => {
  //const response = await axios.get("/todos.json");
  //const { data } = response;
  console.log(query);
  return globalTodos;
};

export const addTodo = async (todo: Pick<Todo, "title">) => {
  const response = await axios.get("/todos.json");
  const { data } = response;

  const todos = data as Todos;

  const newTodo = {
    id: todos.todos.length + 1,
    title: todo.title,
    completed: false,
  };

  globalTodos.todos.push(newTodo);

  return newTodo;
};
