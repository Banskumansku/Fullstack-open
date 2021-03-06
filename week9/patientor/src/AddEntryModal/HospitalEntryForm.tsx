import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

interface Props {
    onSubmit: (values: Omit<HospitalEntry, "id">) => void;
    onCancel: () => void;
}

const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                specialist: "",
                description: "",
                type: "Hospital",
                discharge: {
                    date: "",
                    criteria: ""
                },
                diagnosisCodes: []
            } as Omit<HospitalEntry, "id">}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnosis)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Segment>
                            <Header>
                                Discharge Details
                <span style={{ color: "red" }}>*</span>
                            </Header>
                            <Field
                                label="Date"
                                placeholder="YYYY-MM-DD"
                                name="discharge.date"
                                component={TextField}
                            />
                            <Field
                                label="Criteria"
                                placeholder="discharge criteria"
                                name="discharge.criteria"
                                component={TextField}
                            />
                        </Segment>
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default HospitalEntryForm;