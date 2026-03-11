import React from "react";
import './StudentTable.css'
function StudentTable({ students, deleteStudent, editStudent, openMarksheet }) {
  return (
   <div className="student-table-container table-responsive">
  <table className="table student-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Class</th>
        <th>WhatsApp</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {students.map((student) => (
        <tr key={student._id}>
          <td>{student.studentId}</td>
          <td>{student.name}</td>
          <td>{student.className}</td>
          <td>{student.whatsapp}</td>
          <td className="action-buttons">

            <button
              className="edit-btn"
              onClick={() => editStudent(student)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteStudent(student._id)}
            >
              🗑️
            </button>

            <button className="marks-btn" onClick={() => openMarksheet(student)}>
              Marks
            </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default StudentTable;