import { useState, useEffect } from "react";
import "./StudentForm.css";
import { addStudent as addStudentAPI, updateStudent as updateStudentAPI } from "../api/studentApi";

const StudentForm = ({ students, setStudents, editStudentData, setEditStudentData }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    className: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (editStudentData) {
      setFormData({
        studentId: editStudentData.studentId || "",
        name: editStudentData.name || "",
        className: editStudentData.className || "",
        whatsapp: editStudentData.whatsapp || "",
      });
    } else {
      setFormData({
        studentId: "",
        name: "",
        className: "",
        whatsapp: "",
      });
    }
  }, [editStudentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editStudentData) {

      const response = await updateStudentAPI(editStudentData._id, formData);

      const updatedStudent = response.data;

      setStudents(
        students.map((s) =>
          s._id === updatedStudent._id ? updatedStudent : s
        )
      );

      setEditStudentData(null);

    } else {

      const response = await addStudentAPI(formData);

      setStudents([...students, response.data]);

    }

    setFormData({
      studentId: "",
      name: "",
      className: "",
      whatsapp: "",
    });

  } catch (error) {
    console.error(error);
    alert("Failed to save student");
  }
};

  return (
   <div className="student-form-card card p-4 shadow-sm">
  <h3 className="form-title mb-3">
    {editStudentData ? "✏️ Edit Student" : "➕ Add Student"}
  </h3>

  <form onSubmit={handleSubmit}>
    <div className="row g-3">

      <div className="col-md-6">
        <input
          type="text"
          name="studentId"
          className="form-control custom-input"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          name="name"
          className="form-control custom-input"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          name="className"
          className="form-control custom-input"
          placeholder="Student Class"
          value={formData.className}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <input
          type="text"
          name="whatsapp"
          className="form-control custom-input"
          placeholder="WhatsApp Number"
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />
      </div>

    </div>

    <button type="submit" className="submit-btn mt-4">
      {editStudentData ? "Update Student" : "Add Student"}
    </button>
  </form>
</div>
  );
};

export default StudentForm;