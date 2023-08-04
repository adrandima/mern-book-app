import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { IAuthor } from "../interface/book";

interface AuthorComponentProps {
  authors: IAuthor[];
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  handleCreate: (author: IAuthor) => void;
}

const UpdateAuthorModal: React.FC<AuthorComponentProps> = ({
  setShowModal,
  showModal,
  handleCreate,
}) => {
  const [author, setAuthor] = useState<IAuthor>({
    first_name: "",
    last_name: "",
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !isEdit && setIsEdit(true);
    const { name, value } = event.target;
    setAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={author?.first_name || ""}
            onChange={handleInputChange}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={author?.last_name || ""}
            onChange={handleInputChange}
            required={true}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleCreate(author)}
          disabled={!isEdit}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAuthorModal;
