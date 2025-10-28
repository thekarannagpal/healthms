const express = require('express');
const router = express.Router();
const {
  Patient, Doctor, Department, Nurse, Room,
  Appointment, Medication, Procedure, Prescribes, Undergoes
} = require('../models/models');

// ============ PATIENT ROUTES ============
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ DOCTOR ROUTES ============
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('departmentId');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/doctors/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ DEPARTMENT ROUTES ============
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/departments', async (req, res) => {
  try {
    const department = new Department(req.body);
    const savedDepartment = await department.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ NURSE ROUTES ============
router.get('/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find().populate('departmentId');
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/nurses', async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    const savedNurse = await nurse.save();
    res.status(201).json(savedNurse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ ROOM ROUTES ============
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/rooms/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ APPOINTMENT ROUTES ============
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId')
      .populate('doctorId')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/appointments/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ MEDICATION ROUTES ============
router.get('/medications', async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/medications', async (req, res) => {
  try {
    const medication = new Medication(req.body);
    const savedMedication = await medication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ PROCEDURE ROUTES ============
router.get('/procedures', async (req, res) => {
  try {
    const procedures = await Procedure.find();
    res.json(procedures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/procedures', async (req, res) => {
  try {
    const procedure = new Procedure(req.body);
    const savedProcedure = await procedure.save();
    res.status(201).json(savedProcedure);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ PRESCRIPTION ROUTES ============
router.get('/prescriptions', async (req, res) => {
  try {
    const prescriptions = await Prescribes.find()
      .populate('patientId')
      .populate('doctorId')
      .populate('medicationId');
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/prescriptions', async (req, res) => {
  try {
    const prescription = new Prescribes(req.body);
    const savedPrescription = await prescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ============ UNDERGOES ROUTES ============
router.get('/undergoes', async (req, res) => {
  try {
    const undergoes = await Undergoes.find()
      .populate('patientId')
      .populate('procedureId')
      .populate('doctorId')
      .populate('roomId');
    res.json(undergoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/undergoes', async (req, res) => {
  try {
    const undergoes = new Undergoes(req.body);
    const savedUndergoes = await undergoes.save();
    res.status(201).json(savedUndergoes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
