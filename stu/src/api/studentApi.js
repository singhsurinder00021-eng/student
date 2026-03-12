import axios from "axios";

const API = axios.create({
  baseURL: "https://student-data-h2dd.onrender.com/api",
});

export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getStudents = () => API.get("/students");

export const addStudent = (data) =>
  API.post("/students", data);

export const updateStudent = (id, data) =>
  API.put(`/students/${id}`, data);

export const deleteStudent = (id) =>
  API.delete(`/students/${id}`);