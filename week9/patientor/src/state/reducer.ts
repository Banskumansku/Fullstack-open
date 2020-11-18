import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

type SET_PATIENT_LIST = 'SET_PATIENT_LIST';
type SET_PATIENT = 'SET_PATIENT';
type ADD_PATIENT = 'ADD_PATIENT';
type SET_DIAGNOSES_LIST = 'SET_DIAGNOSES_LIST';
type ADD_ENTRY = 'ADD_ENTRY';


export type Action =
  | {
    type: SET_PATIENT_LIST;
    payload: Patient[];
  }
  | {
    type: SET_PATIENT;
    payload: Patient
  }
  | {
    type: ADD_PATIENT;
    payload: Patient;
  } | {
    type: SET_DIAGNOSES_LIST;
    payload: Diagnosis[]
  } | {
    type: ADD_ENTRY;
    entry: Entry;
    patient: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnosis: action.payload
      };
    case "ADD_ENTRY":
      action.patient.entries.push(action.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patient.id]: action.patient
        }
      };
    default:
      return state;
  }
};

export const setPatient = (patient: Patient) => {
  const type: SET_PATIENT = "SET_PATIENT";
  return {
    type: type,
    payload: patient
  };
};


export const setPatientList = (patientListFromApi: Patient[]) => {
  const type: SET_PATIENT_LIST = "SET_PATIENT_LIST";
  return {
    type: type,
    payload: patientListFromApi
  };
};

export const addPatient = (patient: Patient) => {
  const type: ADD_PATIENT = "ADD_PATIENT";
  return {
    type: type,
    payload: patient
  };
};

export const setDiagnosesList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosisList
  };
};

export const addEntry = (patient: Patient, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    entry: entry,
    patient: patient
  };
};
