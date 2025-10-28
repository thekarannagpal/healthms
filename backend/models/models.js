const mongoose = require('mongoose');

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: String,
  dob: Date,
  gender: { type: String, required: true },
  address: String,
  contact: { type: String, required: true },
  email: String,
  bloodGroup: String,
  admissionDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  contact: String,
  email: String,
  gender: String,
  bloodGroup: String,
  dateOfJoining: Date
}, { timestamps: true });

// Department Schema
const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  description: String
}, { timestamps: true });

// Nurse Schema
const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  contact: String,
  shift: String
}, { timestamps: true });

// Room Schema
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: String,
  status: { type: String, default: 'Available' },
  floor: Number
}, { timestamps: true });

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, default: 'Scheduled' }
}, { timestamps: true });

// Medication Schema
const medicationSchema = new mongoose.Schema({
  medicationName: { type: String, required: true },
  type: String,
  dosage: String,
  price: Number
}, { timestamps: true });

// Procedure Schema
const procedureSchema = new mongoose.Schema({
  procedureName: { type: String, required: true },
  description: String,
  cost: Number
}, { timestamps: true });

// Prescribes Schema
const prescribesSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  prescriptionDate: { type: Date, default: Date.now },
  dosage: String,
  instructions: String
}, { timestamps: true });

// Undergoes Schema
const undergoesSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  procedureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Procedure', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  procedureDate: { type: Date, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
}, { timestamps: true });

module.exports = {
  Patient: mongoose.model('Patient', patientSchema),
  Doctor: mongoose.model('Doctor', doctorSchema),
  Department: mongoose.model('Department', departmentSchema),
  Nurse: mongoose.model('Nurse', nurseSchema),
  Room: mongoose.model('Room', roomSchema),
  Appointment: mongoose.model('Appointment', appointmentSchema),
  Medication: mongoose.model('Medication', medicationSchema),
  Procedure: mongoose.model('Procedure', procedureSchema),
  Prescribes: mongoose.model('Prescribes', prescribesSchema),
  Undergoes: mongoose.model('Undergoes', undergoesSchema)
};
