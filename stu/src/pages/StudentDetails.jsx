import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import MarksChart from "../components/MarksChart";
import "./StudentDetails.css";

const API_URL = "https://student-rfli.onrender.com/api";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/students/${id}`)
      .then((res) => setStudent(res.data));
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      subjects: {
        ...student.subjects,
        [e.target.name]: Number(e.target.value),
      },
    });
  };

  const handleUpdate = async () => {
    await axios.put(`${API_URL}/students/${id}`, student);
    alert("Marks Updated");
  };

  const total =
    (student?.subjects?.math || 0) +
    (student?.subjects?.english || 0) +
    (student?.subjects?.science || 0) +
    (student?.subjects?.hindi || 0);

  const percentage = (total / 400) * 100;

  const downloadPDF = async () => {
    const input = document.getElementById("marksheet");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
    pdf.save("Marksheet.pdf");
  };

  const sendWhatsApp = () => {
    const message = `Hello ${student.name}, Your Total Marks: ${total} (${percentage.toFixed(
      2
    )}%)`;

    window.open(
      `https://wa.me/${student.whatsapp}?text=${encodeURIComponent(message)}`
    );
  };

  if (!student) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <div className="marksheet-card" id="marksheet">

        <h2 className="marksheet-title">📄 Student Mark Sheet</h2>

        <div className="student-info">
          <p><strong>ID:</strong> {student.studentId}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Class:</strong> {student.className}</p>
        </div>

        <div className="subject-inputs">
          <input name="math" value={student.subjects?.math || ""} onChange={handleChange} placeholder="Math"/>
          <input name="english" value={student.subjects?.english || ""} onChange={handleChange} placeholder="English"/>
          <input name="science" value={student.subjects?.science || ""} onChange={handleChange} placeholder="Science"/>
          <input name="hindi" value={student.subjects?.hindi || ""} onChange={handleChange} placeholder="Hindi"/>
        </div>

        <div className="result-box">
          <h3>Total: {total} / 400</h3>
          <h3 className="percentage">Percentage: {percentage.toFixed(2)}%</h3>
        </div>

      </div>

      <div className="chart-card">
        <MarksChart subjects={student.subjects} />
      </div>

      <div className="action-buttons">
        <button className="update-btn" onClick={handleUpdate}>Update</button>
        <button className="pdf-btn" onClick={downloadPDF}>Download PDF</button>
        <button className="whatsapp-btn" onClick={sendWhatsApp}>Send WhatsApp</button>
      </div>
    </div>
  );
}