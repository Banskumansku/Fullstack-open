import React, { FC } from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon } from "semantic-ui-react";

const OccupationalHealthcareEntryComp: FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    if(!!entry.sickLeave) {
        return (
            <div>
                <div><Icon name="bug" /></div>
                <div>start: {entry.sickLeave?.startDate}</div>
                <div>end: {entry.sickLeave?.endDate}</div>
            </div>
        ); 
    }

    return (
        <div>
            <div><Icon name="bug" /></div>
        </div>
    );
}

export default OccupationalHealthcareEntryComp; 