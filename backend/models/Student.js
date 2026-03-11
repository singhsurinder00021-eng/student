const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  className: { type: String, required: true },
  whatsapp: { type: String, required: true }
},
{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);