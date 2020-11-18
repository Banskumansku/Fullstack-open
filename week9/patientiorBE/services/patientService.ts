import patients from '../data/patientData'
import { HospitalEntry, NewHospitalEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
import utils from '../utils'

const getPatients = () => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id)
    if (!!patient) {
        return patient
    } else {
        return undefined
    }
}

const addPatient = (patient: NewPatient): Patient => {

    const newPatient: Patient = {
        id: patients.length + 1 + '',
        ...utils.toNewPatient(patient),
    }
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, newEntry: NewHospitalEntry): Patient | undefined => {
    const toEntry: HospitalEntry = {
        id: patients.length + 1 + '',
        ...newEntry
    }
    const updatePatient = getPatient(patientId)
    if (!!updatePatient) {
        updatePatient.entries?.push(toEntry)
        patients.filter(patient => patient.id !== updatePatient.id)
        patients.push(updatePatient)
        return updatePatient;
    }
    return undefined
}

export default {
    getPatients,
    addPatient,
    getNonSensitivePatients,
    getPatient,
    addEntry
};