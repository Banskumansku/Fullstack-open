import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Entry } from '../types';
import HospitalEntryForm from './HospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Entry, "id">) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const form = <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && (
          <Segment inverted color="red">
            {`Error: ${error}`}
          </Segment>
        )}
        {form}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
