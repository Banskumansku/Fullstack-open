import express from 'express';
import patientService from '../services/patientService'
import { NewHospitalEntry, Patient } from '../types';
import utils from '../utils'


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
})

router.get('/:id', (req, res) => {
  console.log("asd")
  const body = req.params;
  console.log(body)
  const patient = patientService.getPatient(body.id)
  res.send(patient)
})

router.post('/', (req, res) => {
  const body = req.body;
  patientService.addPatient(body)
  res.send(body as Patient)
})

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    throw new Error(`patient not found`);
  }
  const newEntry: NewHospitalEntry = utils.toNewHospitalEntry(req.body);
  patientService.addEntry(patient.id, newEntry);
  res.send({ newEntry });
});


export default router;