import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { IAuthor } from "../interface/book";

interface AuthorComponentProps {
  authors: IAuthor[];
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  handleUpdate: (author: IAuthor) => void;
}

const UpdateAuthorModal: React.FC<AuthorComponentProps> = ({
  authors,
  setShowModal,
  showModal,
  handleUpdate,
}) => {
  const [author, setAuthor] = useState<IAuthor>({
    _id: "",
    first_name: "",
    last_name: "",
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);


  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    !isEdit && setIsEdit(true)
    const { name, value } = event.target;
    setAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthorSelection = (selectedAuthor: IAuthor) => {
    setSelectedAuthor(selectedAuthor);
    setAuthor(selectedAuthor);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Author Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Author:</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              {selectedAuthor
                ? `${selectedAuthor?.first_name} ${selectedAuthor?.last_name}`
                : "Select an author"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {authors.map((author) => (
                <Dropdown.Item
                  key={author._id}
                  onClick={() => handleAuthorSelection(author)}
                >
                  {`${author.first_name} ${author.last_name}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={author?.first_name || ""}
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={author?.last_name || ""}
            onChange={handleInputChange} 
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={()=> handleUpdate(author)} disabled={!isEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAuthorModal;

