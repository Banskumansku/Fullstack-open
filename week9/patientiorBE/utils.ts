/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewHospitalEntry } from './types';

const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        ssn: parseString(object.ssn),
        entries: []
    }

    return newPatient;
}

const toNewHospitalEntry = (object: any): NewHospitalEntry => {
    const newEntry: NewHospitalEntry = {
        type: "Hospital",
        description: parseString(object.description),
        date: parseString(object.date),
        specialist: parseString(object.specialist),
        discharge: {
            date: parseString(object.discharge.date),
            criteria: parseString(object.discharge.criteria)
        }
    }
    return newEntry;
}


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseString = (comment: any): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing value: ' + comment);
    }

    return comment;
}

const isGender = (gender: any): boolean => {
    return Object.values(Gender).includes(gender)
}

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender
}


export default { toNewPatient, toNewHospitalEntry };