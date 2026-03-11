import { useState } from "react";
import "./MarksChart.css";
function Marksheet({ student, updateMarks, close }) {
  const [subject, setSubject] = useState("");
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");

  const addMark = () => {
    if (!subject || !obtained || !total || !date) return;

    updateMarks(student._id,  {
      subject,
      obtained: Number(obtained),
      total: Number(total),
      date, // ✅ date added
    });

    setSubject("");
    setObtained("");
    setTotal("");
    setDate("");
  };

  const totalObtained =
    student.marks?.reduce((sum, m) => sum + m.obtained, 0) || 0;

  const totalMarks =
    student.marks?.reduce((sum, m) => sum + m.total, 0) || 0;

  const percentage =
    totalMarks > 0
      ? ((totalObtained / totalMarks) * 100).toFixed(2)
      : 0;

  return (
  <div className="marksheet-card">
  <h2 className="marksheet-title">📄 {student.name} Marksheet</h2>

  <div className="marks-form">

    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />

    <input
      type="number"
      placeholder="Obtained Marks"
      value={obtained}
      onChange={(e) => setObtained(e.target.value)}
    />

    <input
      type="number"
      placeholder="Total Marks"
      value={total}
      onChange={(e) => setTotal(e.target.value)}
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <div className="marks-buttons">
      <button className="add-btn" onClick={addMark}>
        Add Marks
      </button>

      <button className="close-btn" onClick={close}>
        Close
      </button>
    </div>

  </div>

  <div className="table-container">
    <table className="marks-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Subject</th>
          <th>Obtained</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {student.marks?.map((m, i) => (
          <tr key={i}>
            <td>{m.date}</td>
            <td>{m.subject}</td>
            <td>{m.obtained}</td>
            <td>{m.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="marks-summary">
    <h3>Total Marks: {totalObtained} / {totalMarks}</h3>
    <h3 className="percentage">Percentage: {percentage}%</h3>
  </div>
</div>
  );
}

export default Marksheet;