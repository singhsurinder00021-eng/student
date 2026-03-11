import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import StudentForm from "../components/StudentFrom";
import StudentTable from "../components/StudentTable";
import Marksheet from "../components/MarksChart";
import { getStudents, deleteStudent as deleteStudentAPI } from "../api/studentApi";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [editStudentData, setEditStudentData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudents();
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await deleteStudentAPI(id);

      setStudents(
        students.filter((student) => student._id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit Student
  const editStudent = (student) => {
    setEditStudentData(student);
  };

  // Open Marksheet
  const openMarksheet = (student) => {
    setSelectedStudent(student);
  };

  // Close Marksheet
  const closeMarksheet = () => {
    setSelectedStudent(null);
  };

  // Update Marks
  const updateMarks = (id, newMark) => {
    const updatedStudents = students.map((student) => {
      if (student._id === id) {
        return {
          ...student,
          marks: [...(student.marks || []), newMark],
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  return (
  <div className="dashboard-wrapper container-fluid">
  <div className="row">

    <div className="col-12">
      <Navbar />
    </div>

    <div className="col-12">
      <div className="dashboard-content mt-4">

        {/* Student Form */}
        <div className="dashboard-card mb-4">
          <StudentForm
            students={students}
            setStudents={setStudents}
            editStudentData={editStudentData}
            setEditStudentData={setEditStudentData}
          />
        </div>

        {/* Student Table */}
        <div className="dashboard-card mb-4">
          <StudentTable
            students={students}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
            openMarksheet={openMarksheet}
          />
        </div>

        {/* Marksheet */}
        {selectedStudent && (
          <div className="dashboard-card">
            <Marksheet
              student={students.find(
                (s) => s._id === selectedStudent._id
              )}
              updateMarks={updateMarks}
              close={closeMarksheet}
            />
          </div>
        )}

      </div>
    </div>

  </div>
</div>
  );
}

export default Dashboard;