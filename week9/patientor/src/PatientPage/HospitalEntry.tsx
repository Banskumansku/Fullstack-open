import React, { FC } from 'react';
import { HospitalEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HospitalEntryComp: FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div>
            <div><Icon name="h square" /></div>
            <div>date: {entry.discharge.date}</div>
            <div>criteria: {entry.discharge.criteria}</div>
        </div>
    );
}

export default HospitalEntryComp;