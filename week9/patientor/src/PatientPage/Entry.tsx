import React, { FC } from 'react'
import { useStateValue } from '../state/state';
import { Entry } from '../types'
import HealthCheckEntryComp from './HealthCheckEntry';
import HospitalEntryComp from './HospitalEntry';
import OccupationalHealthcareEntryComp from './OccupationalHealthcareCheck';

const EntryComp: FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnosis }] = useStateValue();

    const mapToDiagnoseName = (code: string): string => {
        const diagnoseWithName = diagnosis.find(diagnosis => diagnosis.code === code)
        if (!diagnoseWithName) {
            return "not found"
        }
        return diagnoseWithName.name

    }
    if (!entry) {
        return (<div>No entry</div>)
    }

    const assertNever = (value: never): never => {
        throw new Error(
            `Bad files: ${value}}`
        );
    };

    const entryType = () => {
        console.log(entry)
        switch (entry.type) {
            case 'Hospital':
                return <HospitalEntryComp entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntryComp entry={entry} />;
            case 'HealthCheck':
                return <HealthCheckEntryComp entry={entry} />;
            default:
                return assertNever(entry);
        }
    };
    return (
        <div>
            {entryType()}
            <p>{entry.date} {entry.description}</p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
                    <li key={code}>
                        <div>{code}</div>
                        <div>{mapToDiagnoseName(code)}</div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default EntryComp 