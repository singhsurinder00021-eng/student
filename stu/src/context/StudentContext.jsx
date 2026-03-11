import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setStudents(
        students.map((s) =>
          s._id === editId ? { ...form, _id: editId } : s
        )
      );
      setEditId(null);
    } else {
      setStudents([...students, { ...form, _id: Date.now() }]);
    }

    setForm({
      studentId: "",
      name: "",
      email: "",
      course: "",
      age: ""
    });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        form,
        setForm,
        handleSubmit,
        editId
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}