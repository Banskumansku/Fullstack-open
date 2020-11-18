import React, { FC } from 'react';
import { HealthCheckEntry } from '../types';
import { Icon } from "semantic-ui-react";

const HealthCheckEntryComp: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <div><Icon name="user md" /></div>
            <div>rating: {entry.healthCheckRating}</div>
        </div>
    );
}

export default HealthCheckEntryComp;