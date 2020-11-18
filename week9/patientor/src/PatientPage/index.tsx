import React from 'react';
import axios from "axios";
import { useStateValue, setPatient, addEntry } from "../state";
import { Entry, Patient } from '../types';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import EntryComp from './Entry';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {

    const [ismodalOpen, setModalOpen] = React.useState<boolean>(false);
    const { id } = useParams<{ id: string }>();


    const [{ patient }, dispatch] = useStateValue();
    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatient();
    }, []);


    if (!patient) {
        return <div>patient not found</div>;
    }
    let genderIcon: string;
    if (patient.gender === 'male') {
        genderIcon = 'venus icon'
    } else if (patient.gender === 'female') {
        genderIcon = 'mars icon'
    } else {
        genderIcon = 'transgender alternate big icon'
    }

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const submitNewEntry = async (values: Omit<Entry, "id">) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
            dispatch(addEntry(patient, newEntry));
            closeModal();
        } catch (e) {
            throw new Error(e.response.data.error);
        }
    };

    return (
        <div>
            <div> {patient.name} <i className={genderIcon} /> </div>
            <div> ssn: {patient.ssn} </div>
            <div> occupation: {patient.occupation} </div>
            <h3>Entries</h3>
            {patient.entries && patient.entries.map(entry => <EntryComp entry={entry} />)}
            <AddEntryModal
                modalOpen={ismodalOpen}
                onSubmit={submitNewEntry}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>add entry</Button>
        </div>
    );
};

export default PatientPage;